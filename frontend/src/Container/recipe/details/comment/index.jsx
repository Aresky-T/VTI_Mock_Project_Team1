import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../redux/selector";
import {
  createRecipeCommentApi,
  getCommentCountForCurrentRecipeApi,
  getCommentListForCurrentRecipeAndLoggedInUserApi,
  getCommentListForCurrentRecipeApi,
} from "../../../../api/comment.api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import StyledTextarea from "../../../../components/styled/textarea";
import SubmitButton from "../../../../components/styled/button/submit";
import { IoMdArrowDropdown } from "react-icons/io";
import RecipeCommentItem from "../../../../components/recipe/details/comment/item";
import "./style.scss";

const SORT_TYPE = {
  NEWEST: {
    name: "NEWEST",
    description: "Newest first",
  },
  OLDEST: {
    name: "OLDEST",
    description: "Oldest first",
  },
  MOST_REPLIED: {
    name: "MOST_REPLIED",
    description: "Most replied",
  },
};

const renderSortBy = (sortType) => {
  return sortType && SORT_TYPE[sortType]
    ? SORT_TYPE[sortType].description
    : "Unknown type";
};

const RecipeCommentContainer = ({ recipe, onShowLoginModal }) => {
  const [recipeId, setRecipeId] = useState(0);
  const [message, setMessage] = useState("");
  const [isValidMessage, setIsValidMessage] = useState(false);

  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState({
    value: "NEWEST",
    prevValue: "",
  });
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);

  const [lastCommentId, setLastCommentId] = useState(0);
  const rowsPerPage = 5;

  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleGetCommentsForRecipe = useCallback(
    async (lastCommentId, sortType, isShowMoreOption) => {
      if (!recipeId) return;
      try {
        if (!currentUser) {
          const response1 = await getCommentListForCurrentRecipeApi(
            recipeId,
            lastCommentId,
            rowsPerPage,
            sortType
          );
          const data = response1.data;
          setComments((prevList) =>
            isShowMoreOption ? prevList.concat(data) : data
          );
        } else {
          const accessToken = currentUser.token;
          const response2 =
            await getCommentListForCurrentRecipeAndLoggedInUserApi(
              recipeId,
              lastCommentId,
              rowsPerPage,
              sortType,
              accessToken
            );
          const data = response2.data;
          setComments((prevList) =>
            isShowMoreOption ? prevList.concat(data) : data
          );
        }

        setSort((prevSort) => ({ ...prevSort, prevValue: sortType }));
      } catch (err) {}
    },
    [recipeId, currentUser]
  );

  const handleSubmitComment = useCallback(
    async (e) => {
      e.preventDefault();
      if (!currentUser) {
        onShowLoginModal();
        return;
      }
      if (!isValidMessage) return;
      const loading = toast.loading("Please wait a moment...");
      try {
        const res = await createRecipeCommentApi(
          recipeId,
          message,
          currentUser.token
        );
        const newCommentData = res.data;
        setTimeout(() => {
          setMessage("");
          setComments((prevList) => {
            prevList.unshift(newCommentData);
            return [...prevList];
          });
          setCount((prevCount) => prevCount + 1);
          toast.dismiss(loading);
          toast.success("Comment successfully!");
        }, 1000);
      } catch (error) {
        let message = "";
        if (error instanceof AxiosError) {
          message = message.concat(error.response.data.message || "");
        } else {
          message = message.concat("Comment failed!");
        }
        setTimeout(() => {
          toast.dismiss(loading);
          toast.error(message, { duration: 1000 });
        }, 1000);
      }
    },
    //eslint-disable-next-line
    [currentUser, recipe, message]
  );

  useEffect(() => {
    setIsValidMessage(message.trim() !== "");
  }, [message]);

  useEffect(() => {
    if (comments.length) {
      const lastIndex = comments.length - 1;
      const lastComment = comments[lastIndex];
      setLastCommentId(lastComment.id);
    }
  }, [comments]);

  useEffect(() => {
    if (!sort.value || sort.value === sort.prevValue) return;
    handleGetCommentsForRecipe(null, sort.value, false);

    //eslint-disable-next-line
  }, [sort]);

  useEffect(() => {
    if (recipeId) {
      getCommentCountForCurrentRecipeApi(recipeId)
        .then((res) => res.data)
        .then((count) => {
          if (count > 0) {
            setCount(count);
            handleGetCommentsForRecipe(null, "NEWEST", false);
          }
        })
        .catch((err) => setCount(0));
    }

    //eslint-disable-next-line
  }, [recipeId]);

  useEffect(() => {
    if (recipe) {
      setRecipeId(recipe.id);
    }
  }, [recipe]);

  return (
    <div className="recipe-comment-container">
      <form className="recipe-comment-form" onSubmit={handleSubmitComment}>
        <p className="input-label">Leave a comment</p>
        <StyledTextarea
          name="message"
          value={message}
          placeholder="Let us know your thoughts about my recipe"
          onChange={handleChangeMessage}
          rows={10}
        />
        <SubmitButton
          type={"submit"}
          active={isValidMessage}
          value={"Comment"}
        />
      </form>
      <div className={`recipe-comment-list`}>
        <div className="recipe-comment-list_head">
          <h2>All comments ({count})</h2>
          {/* <p className="back-to-top" onClick={handleClickToScrollTop}>
            Back to Top
            <IoMdArrowDropup />
          </p> */}
          <div className="recipe-comment-list-sort-by">
            <p>Sort by:</p>
            <p
              className={`sort-by-button${isOpenSortMenu ? " active" : ""}`}
              onClick={() => setIsOpenSortMenu(!isOpenSortMenu)}
            >
              <span>{renderSortBy(sort.value)}</span>
              <IoMdArrowDropdown />
            </p>
            <ul className={`sort-by-menu${isOpenSortMenu ? " active" : ""}`}>
              {[SORT_TYPE.NEWEST, SORT_TYPE.OLDEST, SORT_TYPE.MOST_REPLIED].map(
                (option) => (
                  <li
                    className={`sort-by-menu-option${
                      option.name === sort ? " selected" : ""
                    }`}
                    key={option.name}
                    onClick={(e) => {
                      if (option.name !== sort) {
                        setSort((prevSort) => ({
                          ...prevSort,
                          value: option.name,
                        }));
                      }

                      setIsOpenSortMenu(false);
                    }}
                  >
                    <span>{option.description}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="recipe-comment-list_body">
          {count > 0 ? (
            <>
              <ul>
                {comments.map((item, index) => (
                  <RecipeCommentItem
                    key={item.id}
                    comment={item}
                    handleDeleteCommentSuccess={(deletedCommentId) => {
                      setComments((prevList) =>
                        prevList.filter((item) => item.id !== deletedCommentId)
                      );
                      setCount((prevCount) => prevCount - 1);
                    }}
                  />
                ))}
              </ul>
              {comments.length !== count && (
                <SubmitButton
                  value={"Show more"}
                  active={true}
                  className="view-more-btn"
                  onSubmit={() => {
                    handleGetCommentsForRecipe(lastCommentId, sort.value, true);
                  }}
                />
              )}
            </>
          ) : (
            <div className="no-comment-available">No comment available!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCommentContainer;
