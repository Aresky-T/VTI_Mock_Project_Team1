import React, { useEffect, useState } from "react";
import StyledTextarea from "../../../../styled/textarea";
import Tooltip from "@mui/material/Tooltip";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

const ReplyForm = ({ active, comment, handleSubmit }) => {
  const [message, setMessage] = useState("");
  const [isActiveSubmitButton, setIsActiveSubmitButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeMessage = (event) => {
    if (event && event.target) {
      setMessage(event.target.value);
    }
  };

  const handleClick = (event) => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (!active) setMessage("");
  }, [active]);

  useEffect(() => {
    if (isLoading) {
      const loadingTimeout = setTimeout(() => {
        handleSubmit(message);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(loadingTimeout);
    }

    //eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    setIsActiveSubmitButton(message && message.trim() !== "");
  }, [message]);

  return (
    <div className={`recipe-comment-reply-form${active ? " active" : ""}`}>
      <div className="recipe-comment-reply-form-input">
        <StyledTextarea
          rows={5}
          spellCheck
          placeholder="Enter your comment here"
          name="message"
          value={message}
          onChange={handleChangeMessage}
        />
      </div>
      <div className="recipe-comment-reply-form-actions">
        <Tooltip title="Comment">
          <LoadingButton
            className={isActiveSubmitButton ? "active" : ""}
            loading={isLoading}
            loadingPosition="center"
            onClick={handleClick}
          >
            <SendIcon />
          </LoadingButton>
          {/* <IconButton
            className={`${isActiveSubmitButton ? "active" : ""}`}
            onClick={(e) => handleSubmit(message)}
          >
            <SendIcon />
          </IconButton> */}
        </Tooltip>
      </div>
    </div>
  );
};

export default ReplyForm;
