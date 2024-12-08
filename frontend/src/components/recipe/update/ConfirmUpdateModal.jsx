import React from "react";
import CustomConfirmPopup from "../../styled/popup/confirm";
import CustomConfirmPopupHeader from "../../styled/popup/confirm/header";
import { MdClose } from "react-icons/md";
import CustomConfirmPopupBody from "../../styled/popup/confirm/body";
import CustomConfirmPopupFooter from "../../styled/popup/confirm/footer";
import SubmitButton from "../../styled/button/submit";
import StyledWarningText from "../../styled/text/StyledWarningText";

const ConfirmUpdateModal = ({
  active,
  activeSubmitButton,
  submitButtonText,
  handleSubmit,
  handleClose,
}) => {
  return (
    <CustomConfirmPopup className="confirm-update-modal" active={active}>
      <CustomConfirmPopupHeader>
        <h3>Confirm Update</h3>
        <MdClose id="close-popup-btn" onClick={handleClose} />
      </CustomConfirmPopupHeader>
      <CustomConfirmPopupBody>
        <StyledWarningText>
          This action will update your recipe. Are you sure you want to proceed
          with these changes?
        </StyledWarningText>
      </CustomConfirmPopupBody>
      <CustomConfirmPopupFooter>
        <SubmitButton
          value={submitButtonText || "I'm sure, update"}
          active={activeSubmitButton}
          onSubmit={handleSubmit}
        />
      </CustomConfirmPopupFooter>
    </CustomConfirmPopup>
  );
};

export default ConfirmUpdateModal;
