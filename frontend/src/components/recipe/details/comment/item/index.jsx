import React, { useCallback, useEffect, useState } from "react";
import { userImage } from "../../../../../constant/Image";
import { ImReply } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import PropTypes from "prop-types";

import "./style.scss";

import {
  createRecipeCommentReplyApi,
  deleteRecipeComment,
  getAllReplyCommentListAndLoggedInUserApi,
  getAllReplyCommentListApi,
  updateRecipeCommentApi,
} from "../../../../../api/comment.api";
import { useAuth } from "../../../../../redux/selector";
import { toast } from "react-toastify";
import UpdateCommentPopup from "../update";
import ReplyForm from "./ReplyForm";
import { Tooltip } from "@mui/material";
import { calculateRelativeTime } from "../../../../../utils/date";
import DeleteCommentPopup from "../delete";

const renderCommentUserRole = (userRole) => {
  switch (userRole) {
    case "CREATOR":
      return "Recipe creator";
    case "OWNER":
      return "Recipe owner";
    default:
      return "";
  }
};

const unshiftElement = (array, element) => {
  array.unshift(element);
  return [...array];
};

unshiftElement.propTypes = {
  array: PropTypes.array.isRequired,
  element: PropTypes.any.isRequired,
};

const renderLocateDateString = (date, locale, dateStyle, timeStyle) => {
  if (date instanceof Date && locale) {
    return date.toLocaleString(locale || "en-EN", {
      dateStyle: dateStyle || "short",
      timeStyle: timeStyle || "short",
    });
  }

  return "";
};

const RecipeCommentItem = ({
  comment,
  parentComment,
  handleDeleteCommentSuccess,
}) => {
  const [commentId, setCommentId] = useState(null);
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("top");
  const [replies, setReplies] = useState([]);
  const [replyCount, setReplyCount] = useState(0);
  const [lastReplyId, setLastReplyId] = useState();

  const [createDate, setCreateDate] = useState();
  const [createdTimeAgoStr, setCreatedTimeAgoStr] = useState("");
  // const [updateDate, setUpdateDate] = useState()

  const [isMine, setIsMine] = useState(false);
  const [isFetchingReplies, setIsFetchingReplies] = useState(false);
  const [isShowUpdatePopup, setIsShowUpdatePopup] = useState(false);
  const [isShowDeleteModal, setIsShowDeletePopup] = useState(false);

  const [isShowReplyForm, setIsShowReplyForm] = useState(false);

  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;

  const renderReplyCount = useCallback(() => {
    if (!replyCount) return;

    if (isFetchingReplies && !replies.length) {
      return (
        <div className="recipe-comment-reply-count">
          <button style={{ pointerEvents: "unset", cursor: "progress" }}>
            Loading...
          </button>
        </div>
      );
    }

    if (replies.length > 0) {
      return (
        <div className="recipe-comment-reply-count">
          <button
            type="button"
            onClick={() => {
              setReplies([]);
            }}
          >
            {replyCount === 1 ? "Hide reply" : `Hide all replies`}
            <span>
              <IoMdArrowDropup />
            </span>
          </button>
        </div>
      );
    }

    return (
      <div className="recipe-comment-reply-count">
        <button onClick={() => handleGetCommentReplies(lastReplyId)}>
          {replyCount === 1 ? "View 1 reply" : `View all ${replyCount} replies`}
          <span>
            <IoMdArrowDropdown />
          </span>
        </button>
      </div>
    );

    //eslint-disable-next-line
  }, [isFetchingReplies, replyCount, replies, lastReplyId]);

  const renderViewMoreReplyCount = useCallback(() => {
    const currentShowCount = replies.length;
    if (!currentShowCount || !replyCount || currentShowCount >= replyCount)
      return;

    if (isFetchingReplies) {
      return (
        <div className="recipe-comment-reply-count">
          <button style={{ pointerEvents: "unset", cursor: "progress" }}>
            Loading...
          </button>
        </div>
      );
    }

    return (
      <div className="recipe-comment-reply-count">
        <button onClick={() => handleGetCommentReplies(lastReplyId)}>
          View more {Number(replyCount - currentShowCount)} replies
        </button>
      </div>
    );
    // eslint-disable-next-line
  }, [replies, replyCount, lastReplyId, isFetchingReplies]);

  const renderCommentReplies = useCallback(() => {
    if (!replies || !replies.length) return;
    return (
      <div className={`recipe-comment-replies ${level}`}>
        <ul>
          {replies.map((item) => (
            <RecipeCommentItem
              key={item.id}
              comment={item}
              parentComment={comment}
              handleDeleteCommentSuccess={(deletedReplyId) => {
                setReplyCount((prevCount) => prevCount - 1);
                setReplies((prevList) =>
                  prevList.filter((item) => item.id !== deletedReplyId)
                );
              }}
            />
          ))}
        </ul>
      </div>
    );
  }, [replies, level, comment]);

  const handleGetCommentReplies = useCallback(
    async (referenceReplyCommentId) => {
      if (!replyCount) return;
      setIsFetchingReplies(true);
      try {
        const size = 5;
        if (currentUser) {
          const accessToken = currentUser.token;
          const res1 = await getAllReplyCommentListAndLoggedInUserApi(
            commentId,
            referenceReplyCommentId,
            size,
            accessToken
          );
          setTimeout(() => {
            setReplies((prevList) => prevList.concat(res1.data));
            setIsFetchingReplies(false);
          }, 500);
        } else {
          const res2 = await getAllReplyCommentListApi(
            commentId,
            referenceReplyCommentId,
            size
          );
          setTimeout(() => {
            setReplies((prevList) => prevList.concat(res2.data));
            setIsFetchingReplies(false);
          }, 500);
        }
      } catch (error) {
        setIsFetchingReplies(false);
        toast.error("Failed get comment reply!");
      }
    },
    [currentUser, replyCount, commentId]
  );

  const handleSubmitUpdateComment = useCallback(
    async function (message) {
      if (!currentUser || !commentId) return;
      console.log("Updating comment: ", commentId);
      try {
        const res = await updateRecipeCommentApi(
          commentId,
          message,
          currentUser.token
        );
        const updatedData = res.data;
        toast.success("Comment updated successfully!");
        setMessage(updatedData.message);

        setTimeout(() => {
          setIsShowUpdatePopup(false);
        }, 200);
      } catch (error) {
        toast.error("Update failed!");
      }
    },
    [commentId, currentUser]
  );

  const handleSubmitDeleteComment = useCallback(() => {
    if (!commentId) return;
    deleteRecipeComment(commentId, currentUser.token)
      .then((res) => {
        setIsShowDeletePopup(false);
        handleDeleteCommentSuccess(commentId);
        toast.success("Deleted comment successfully!");
      })
      .catch((err) => {
        toast.error("Delete comment failed!");
      });
    //eslint-disable-next-line
  }, [commentId, currentUser]);

  const handleReplyComment = useCallback(
    (message) => {
      if (!commentId || !currentUser) return;
      createRecipeCommentReplyApi(commentId, message, currentUser.token)
        .then((res) => {
          const newComment = res.data;
          setIsShowReplyForm(false);
          setReplyCount((prevCount) => prevCount + 1);
          setReplies((prevList) => unshiftElement(prevList, newComment));
        })
        .catch(() => {
          toast.error("Comment failed, please try again!");
        });
    },
    //eslint-disable-next-line
    [commentId, currentUser]
  );

  useEffect(() => {
    if (createDate) {
      setCreatedTimeAgoStr(calculateRelativeTime(createDate));
      const commentCreatedTimeInterval = setInterval(
        () => setCreatedTimeAgoStr(calculateRelativeTime(createDate)),
        30000
      );
      return () => clearInterval(commentCreatedTimeInterval);
    }
  }, [createDate]);

  useEffect(() => {
    setLastReplyId(
      replies.length > 0 ? replies[replies.length - 1]["id"] : null
    );
    setReplyCount((prevCount) =>
      replies.length > prevCount ? replies.length : prevCount
    );
  }, [replies]);

  useEffect(() => {
    setCommentId(comment.id);
    setMessage(comment.message);
    setReplyCount(comment.subCommentCount);
    setLevel(comment.level.toLowerCase());
    setIsMine(comment.isMine);
    setCreateDate(new Date(comment.createDate));
    setReplies([]);
    // setUpdateDate(new Date(comment.updateDate));
  }, [comment]);

  return (
    <li className="recipe-comment">
      <div className="recipe-comment-details">
        <p className="recipe-comment-details-msg">{message}</p>
        <ul className="recipe-comment-details-info">
          <li className="recipe-comment-details-info-item">
            <div className="avatar">
              <img
                src={
                  comment.user.avatarUrl ? comment.user.avatarUrl : userImage
                }
                loading="lazy"
                alt="recipe-comment-details-user-img"
              />
            </div>
            <div>
              <p className="fullname">{comment.user.fullName}</p>
              {comment.userRole !== "NORMAL" && (
                <p className="user-role">
                  {renderCommentUserRole(comment.userRole)}
                </p>
              )}
              {createDate && (
                <Tooltip
                  title={renderLocateDateString(
                    createDate,
                    "en-EN",
                    "full",
                    "medium"
                  )}
                >
                  <p>{createdTimeAgoStr}</p>
                </Tooltip>
              )}
            </div>
          </li>
          {!!currentUser && (
            <li className="recipe-comment-details-info-item recipe-comment-details-actions">
              {isMine && (
                <>
                  <div>
                    <button onClick={() => setIsShowUpdatePopup(true)}>
                      <span>Edit</span>
                      <AiFillEdit />
                    </button>
                    <span>|</span>
                  </div>
                  <div>
                    <button onClick={() => setIsShowDeletePopup(true)}>
                      <span>Delete</span>
                      <MdDeleteSweep />
                    </button>
                    <span>|</span>
                  </div>
                </>
              )}
              <div>
                <button
                  onClick={() => {
                    setIsShowReplyForm((prevState) => !prevState);
                  }}
                >
                  {isShowReplyForm ? (
                    <>
                      <span>Cancel reply</span>
                      <MdCancel />
                    </>
                  ) : (
                    <>
                      <span>Reply</span>
                      <ImReply />
                    </>
                  )}
                </button>
              </div>
            </li>
          )}
        </ul>
        {!!currentUser && (
          <ReplyForm
            active={isShowReplyForm}
            comment={comment}
            handleSubmit={handleReplyComment}
          />
        )}
        {isMine && (
          <>
            <UpdateCommentPopup
              currentMessage={message}
              isShow={isShowUpdatePopup}
              onClose={() => setIsShowUpdatePopup(false)}
              onSubmit={handleSubmitUpdateComment}
            />
            <DeleteCommentPopup
              isShow={isShowDeleteModal}
              onClose={() => setIsShowDeletePopup(false)}
              onSubmit={handleSubmitDeleteComment}
            />
          </>
        )}
      </div>
      {renderReplyCount()}
      {renderCommentReplies()}
      {renderViewMoreReplyCount()}
    </li>
  );
};

export default RecipeCommentItem;
