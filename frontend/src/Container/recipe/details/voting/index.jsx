import React, { useCallback, useEffect, useState } from "react";
import {
  createVotingApi,
  getAllUsersVotedApi,
  getAverageStarsApi,
  getStarsApi,
  updateStarsApi,
} from "../../../../api/voting.api";
import { useAuth } from "../../../../redux/selector";
import Voting from "../../../../components/RecipeDetailComponent/Voting";
import { toast } from "react-toastify";

const VotingContainer = ({ recipe, onShowLoginModal }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [starsAvg, setStarsAvg] = useState(0);
  const [allUsers, setAllUsers] = useState(0);
  const [isVoted, setIsVoted] = useState(false);

  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  const stars = Array(5).fill(0);

  const handleMousedown = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  function getAverageStars(recipe) {
    getAverageStarsApi(recipe.id)
      .then((res) => {
        setStarsAvg(Number(res.data, 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAllUsers(recipe) {
    getAllUsersVotedApi(recipe.id)
      .then((res) => {
        setAllUsers(Number(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCreateVoting(formData, token) {
    createVotingApi(formData, token)
      .then((res) => {
        const data = res.data;
        setIsVoted(true);
        setStarsAvg(data.averageVote);
        setAllUsers(data.voteCount);
        toast.success("Rating success!");
      })
      .catch((err) => {
        toast.error("Rating error!");
      });
  }

  function handleUpdateVoting(formData, token) {
    updateStarsApi(formData, token)
      .then((res) => {
        const data = res.data;
        setStarsAvg(data.averageVote);
        setAllUsers(data.voteCount);
        toast.success("Update stars success!");
      })
      // .then(() => {
      //   setTimeout(() => getAverageStars(recipe), 400);
      // })
      .catch((err) => {
        toast.error("Rating again failed!");
      });
  }

  const handleSubmitVoting = useCallback(() => {
    if (!currentUser) {
      onShowLoginModal();
      return;
    }
    const accessToken = currentUser.token;
    const formData = {
      recipeId: recipe.id,
      stars: currentValue,
    };

    if (isVoted) {
      handleUpdateVoting(formData, accessToken);
    } else {
      handleCreateVoting(formData, accessToken);
    }

    //eslint-disable-next-line
  }, [isVoted, currentValue, recipe, currentUser]);

  const handleCheckVoted = useCallback(() => {
    if (!currentUser || !recipe) {
      return;
    }

    const params = {
      userId: currentUser.id,
      recipeId: recipe.id,
    };

    getStarsApi(params, currentUser.token)
      .then((res) => {
        setCurrentValue(res.data);
        setIsVoted(true);
      })
      .catch((err) => {
        setIsVoted(false);
      });
  }, [currentUser, recipe]);

  useEffect(() => {
    handleCheckVoted();
  }, [handleCheckVoted]);

  useEffect(() => {
    recipe && getAverageStars(recipe);
  }, [recipe]);

  useEffect(() => {
    recipe && getAllUsers(recipe);
  }, [recipe]);

  return (
    <Voting
      currentStars={currentValue}
      hoverStars={hoverValue}
      averageStars={starsAvg}
      votingCount={allUsers}
      starList={stars}
      isVoted={isVoted}
      handleMousedownStar={handleMousedown}
      handleMouseoverStar={handleMouseOver}
      handleMouseleaveStar={handleMouseLeave}
      handleSubmitVoting={handleSubmitVoting}
    />
  );
};

export default VotingContainer;
