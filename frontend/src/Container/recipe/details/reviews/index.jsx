import React, { useCallback, useEffect, useState } from "react";
// import Reviews from "../../../../components/RecipeDetailComponent/Reviews";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  getCommentListForCurrentRecipeApi,
  getCommentListForCurrentRecipeAndLoggedInUserApi,
  createRecipeCommentApi,
} from "../../../../api/comment.api";
import { useAuth } from "../../../../redux/selector";
import { compareDate } from "../../../../utils/compare";
import StyledTextarea from "../../../../components/styled/textarea";
import ReviewType from "../../../../components/RecipeDetailComponent/ReviewType";
import SubmitButton from "../../../../components/styled/button/submit";
import { size } from "lodash";

const ReviewContainer = ({
  recipe,
  onShowLoginModal,
  handleClickToScrollTop,
}) => {
  const [message, setMessage] = useState("");
  const [isValidMessage, setIsValidMessage] = useState(false);

  const [currentUserComment, setCurrentUserComment] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentUserCommentList, setCurrentUserCommentList] = useState([]);
  const [otherUserList, setOtherUserList] = useState([]);
  const [page, setPage] = useState(1);

  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleGetCommentsForRecipe = useCallback(async () => {
    if (!recipe) return;
    const recipeId = recipe.id;
    try {
      if (!currentUser) {
        const response1 = await getCommentListForCurrentRecipeApi(
          recipeId,
          page,
          5
        );
        setComments(response1.data.content);
      } else {
        const accessToken = currentUser.token;
        const response2 =
          await getCommentListForCurrentRecipeAndLoggedInUserApi(
            recipeId,
            accessToken,
            page,
            size
          );
        const dataWithPagination = response2.data;
        setOtherUserList(dataWithPagination.content);
        console.log(response2.data);
      }
    } catch (err) {
      console.log(err);
    }
    // getCommentListForCurrentRecipeApi(recipe.id, page, 5)
    //   .then((res) => {
    //     const data = res.data;
    //     console.log(data);
    //     const comments = data.content;
    //     if (currentUser) {
    //       setOtherUserList(comments);
    //     } else {
    //       setComments(comments);
    //     }

    //     // const userComments = [];
    //     // const otherComments = [];

    //     // list.forEach((element) => {
    //     //   if (currentUser && currentUser.id === element.user.id) {
    //     //     userComments.push(element);
    //     //   } else {
    //     //     otherComments.push(element);
    //     //   }
    //     // });

    //     // setComments([...list].sort(compareDate("updateDate", "desc")));
    //     // setCurrentUserCommentList(
    //     // userComments.sort(compareDate("updateDate", "desc"))
    //     // );
    //     // setOtherUserList(otherComments.sort(compareDate("updateDate", "desc")));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [recipe, currentUser, page]);

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
          recipe.id,
          message,
          currentUser.token
        );
        const newCommentData = res.data;
        setTimeout(() => {
          setMessage("");
          setCurrentUserCommentList((prevList) => [
            ...prevList,
            newCommentData,
          ]);
          setComments((prevList) => [...prevList, newCommentData]);
          toast.dismiss(loading);
          toast.success("Comment successfully!");
        }, 1000);
      } catch (error) {
        let message = "";
        if (error instanceof AxiosError) {
          console.log(error.response.data.message);
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
    handleGetCommentsForRecipe();
  }, [handleGetCommentsForRecipe]);

  return (
    <div className="reviews">
      {currentUser ? (
        <>
          <form className="form-reviews" onSubmit={handleSubmitComment}>
            <p className="input-label">Leave a comment</p>
            <StyledTextarea
              name="message"
              value={message}
              placeholder="Let us know your thoughts..."
              onChange={handleChangeMessage}
              rows={10}
            />
            <SubmitButton
              type={"submit"}
              active={isValidMessage}
              value={"Comment"}
            />
          </form>
          <ReviewType
            list={currentUserCommentList}
            label="Your"
            recipe={recipe}
            toggleScroll={handleClickToScrollTop}
          />
          <ReviewType list={otherUserList} label="Other" />
        </>
      ) : (
        <ReviewType list={comments} label="" />
      )}
    </div>
  );
};

export default ReviewContainer;
