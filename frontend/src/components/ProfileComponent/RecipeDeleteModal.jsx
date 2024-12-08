import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import CustomConfirmPopup from "../styled/popup/confirm";
import CustomConfirmPopupHeader from "../styled/popup/confirm/header";
import CustomConfirmPopupFooter from "../styled/popup/confirm/footer";
import CustomConfirmPopupBody from "../styled/popup/confirm/body";
import StyledTextarea from "../styled/textarea";
import StyledWarningText from "../styled/text/StyledWarningText";
import SubmitButton from "../styled/button/submit";

const RecipeDeleteModal = ({ recipe, handleClose, handleSubmitDelete }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [activeSubmitButton, setActiveSubmitButton] = useState(false);

  const handleChangeConfirmMessage = (event) => {
    if (!event || !event.target) return;
    setConfirmMessage(event.target.value);
  };

  const handleClick = () => {
    setIsDeleting(true);
  };

  useEffect(() => {
    if (isDeleting) {
      setTimeout(() => {
        handleSubmitDelete();
        setIsDeleting(false);
      }, 1000);
    }

    //eslint-disable-next-line
  }, [isDeleting]);

  useEffect(() => {
    setActiveSubmitButton(confirmMessage.trim() === recipe?.name);
  }, [confirmMessage, recipe]);

  useEffect(() => {
    setIsShowModal(!!recipe);
  }, [recipe]);

  return (
    <CustomConfirmPopup className="recipe-delete-modal" active={isShowModal}>
      <CustomConfirmPopupHeader>
        <h3>Warning!</h3>
        <MdClose
          id="close-popup-btn"
          onClick={() => {
            setConfirmMessage("");
            handleClose();
          }}
        />
      </CustomConfirmPopupHeader>
      <CustomConfirmPopupBody>
        <StyledWarningText>
          This action will permanently delete your recipe and can't be restore
          again, are you sure you want to delete this recipe?
        </StyledWarningText>
        <br />
        <StyledWarningText>
          To continue, please enter this recipe name "
          <b>{recipe?.name || "unknown name"}</b>" in the input box below:
        </StyledWarningText>
        <div className="confirm-input">
          <StyledTextarea
            rows={3}
            value={confirmMessage}
            onChange={handleChangeConfirmMessage}
            spellCheck={false}
          />
        </div>
      </CustomConfirmPopupBody>
      <CustomConfirmPopupFooter>
        <SubmitButton
          value={
            isDeleting
              ? "Deleting, please wait a moment..."
              : "I'm sure, delete"
          }
          active={activeSubmitButton}
          onSubmit={handleClick}
        />
      </CustomConfirmPopupFooter>
    </CustomConfirmPopup>
  );
};

export default RecipeDeleteModal;
