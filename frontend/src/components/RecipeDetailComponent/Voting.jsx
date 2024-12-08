import React from "react";
import { MdStarRate } from "react-icons/md";

const colors = {
  pink: "var(--primary-color)",
  grey: "rgb(201, 201, 201)",
};

const Voting = ({
  averageStars,
  votingCount,
  hoverStars,
  currentStars,
  starList,
  handleMouseoverStar,
  handleMouseleaveStar,
  handleMousedownStar,
  handleSubmitVoting,
  isVoted,
}) => {
  return (
    <>
      <div className="voting">
        <div className="voting-wrapper">
          <div className="voting-statistic">
            <span>Average Rating:</span>
            <span className="average-star">
              {averageStars} <MdStarRate />
            </span>
            <span>({votingCount})</span>
          </div>
          <p className="voting-text">How would you rate this Recipe?</p>
          <div className="voting-action">
            <div className="stars">
              {starList.map((_, index) => (
                <MdStarRate
                  key={index}
                  size={60}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  color={
                    (hoverStars || currentStars) > index
                      ? colors.pink
                      : colors.grey
                  }
                  onMouseOver={() => handleMouseoverStar(index + 1)}
                  onMouseLeave={handleMouseleaveStar}
                  onClick={() => handleMousedownStar(index + 1)}
                />
              ))}
            </div>
          </div>
          <button
            className={
              currentStars > 0 ? "submit-voting active" : "submit-voting"
            }
            onClick={() => handleSubmitVoting()}
          >
            {isVoted ? "UPDATE RATING" : "SUBMIT RATING"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Voting;
