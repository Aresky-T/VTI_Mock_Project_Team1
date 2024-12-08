import React, { useEffect, useState, useCallback } from "react";
import CustomConfirmPopup from "../../../../components/styled/popup/confirm";
import CustomConfirmPopupHeader from "../../../../components/styled/popup/confirm/header";
import CustomConfirmPopupBody from "../../../../components/styled/popup/confirm/body";
import CustomConfirmPopupFooter from "../../../../components/styled/popup/confirm/footer";
import { MdClose } from "react-icons/md";
import { createPurchaseRecipeTransactionApi } from "../../../../api/recipe.transaction.api";
import { useAuth } from "../../../../redux/selector";
import { toast } from "react-toastify";
import StyledWarningText from "../../../../components/styled/text/StyledWarningText";
import StyledTextarea from "../../../../components/styled/textarea";
import SubmitButton from "../../../../components/styled/button/submit";

const RecipePurchaseContainer = ({
  recipe,
  isOwner,
  handleLogin,
  handleRefetchRecipe,
}) => {
  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;

  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [activeSubmitButton, setActiveSubmitButton] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [submitMessage, setSubmitMessage] = useState("");

  const handleShowConfirmModal = () => {
    if (!currentUser) {
      handleLogin();
      return;
    }
    setIsShowConfirmModal(true);
  };
  const handleCloseConfirmModal = () => {
    setSubmitMessage("");
    setIsShowConfirmModal(false);
  };

  const handleChangeMessage = (event) => {
    if (event && event.target) {
      setSubmitMessage(event.target.value);
    }
  };

  const handlePurchaseRecipe = useCallback(() => {
    if (!currentUser.token || !recipe.id) return;
    createPurchaseRecipeTransactionApi(recipe.id, currentUser.token)
      .then((res) => {
        handleRefetchRecipe();
        toast.success(res.data || "Purchased recipe successfully!", {
          closeOnClick: true,
          autoClose: 2500,
          closeButton: true,
        });
        handleCloseConfirmModal();
      })
      .catch((err) => {
        toast.error("Failed perform transaction!", {
          closeOnClick: true,
          autoClose: 2500,
          closeButton: true,
        });
      });

    //eslint-disable-next-line
  }, [recipe, currentUser]);

  const handleSubmit = () => {
    setIsProcessing(true);
  };

  useEffect(() => {
    if (isProcessing) {
      const timeout = setTimeout(() => {
        setIsProcessing(false);
        handlePurchaseRecipe();
      }, 1000);
      return () => clearTimeout(timeout);
    }

    //eslint-disable-next-line
  }, [isProcessing]);

  useEffect(() => {
    const isValidMessage =
      submitMessage && submitMessage.trim() === recipe.name;

    setActiveSubmitButton(!isProcessing && isValidMessage);
  }, [recipe, isProcessing, submitMessage]);

  return (
    <div className="recipe-purchase-container">
      {!isOwner && recipe.point > 0 && (
        <div className="view-more">
          <button className="view-more-btn" onClick={handleShowConfirmModal}>
            VIEW COOKING STEPS
          </button>
        </div>
      )}
      <CustomConfirmPopup
        className="confirm-purchase-modal"
        active={isShowConfirmModal}
      >
        <CustomConfirmPopupHeader>
          <h3>Confirm Purchase Recipe</h3>
          <MdClose id="close-popup-btn" onClick={handleCloseConfirmModal} />
        </CustomConfirmPopupHeader>
        <CustomConfirmPopupBody>
          <StyledWarningText>
            This recipe requires {recipe.point} points to purchase. On complete,
            you will have ownership this recipe.
          </StyledWarningText>
          <StyledWarningText>
            To proceed this transaction, please enter recipe name{" "}
            <b>"{recipe.name}"</b> in the input box below:
          </StyledWarningText>
          <StyledTextarea
            type="text"
            rows={3}
            spellCheck={false}
            value={submitMessage}
            onChange={handleChangeMessage}
          />
        </CustomConfirmPopupBody>
        <CustomConfirmPopupFooter>
          <SubmitButton
            active={activeSubmitButton}
            value={
              isProcessing
                ? "Completing you transaction..."
                : "I'm sure, purchase"
            }
            onSubmit={handleSubmit}
          />
        </CustomConfirmPopupFooter>
      </CustomConfirmPopup>
    </div>
  );
};

export default RecipePurchaseContainer;
