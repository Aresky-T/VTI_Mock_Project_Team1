import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteAvatarApi } from "../../api/user.api";
import { setNullAvatar } from "../../redux/user.slice";
import CustomConfirmPopup from "../styled/popup/confirm";
import CustomConfirmPopupHeader from "../styled/popup/confirm/header";
import CustomConfirmPopupBody from "../styled/popup/confirm/body";
import CustomConfirmPopupFooter from "../styled/popup/confirm/footer";
import SubmitButton from "../styled/button/submit";
import StyledWarningText from "../styled/text/StyledWarningText";
import { useAuth } from "../../redux/selector";
import { toast } from "react-toastify";

const AvatarDeleteConfirmPopup = ({ active, onClose }) => {
  const [isActiveSubmitButton, setIsActiveSubmitButton] = useState(true);
  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  const dispatch = useDispatch();

  function handleDeleteAvatar() {
    setIsActiveSubmitButton(false);
    const loading = toast.loading("Deleting, please wait a moment!", {
      position: "bottom-right",
    });
    deleteAvatarApi(currentUser.token)
      .then((res) => {
        const timeout = setTimeout(() => {
          dispatch(setNullAvatar());
          setIsActiveSubmitButton(true);
          onClose();
          toast.dismiss(loading);
          toast.success("Avatar delete successfully!", {
            position: "bottom-right",
          });
          clearTimeout(timeout);
        }, 1000);
      })
      .catch((err) => {
        setIsActiveSubmitButton(true);
        toast.dismiss(loading);
        toast.error("Delete avatar failed!", { position: "bottom-right" });
      });
  }

  return (
    <CustomConfirmPopup
      className={"avatar-delete-confirm-popup"}
      active={active}
    >
      <CustomConfirmPopupHeader>
        <p>Confirm remove your profile picture</p>
        <MdClose id="close-popup-btn" onClick={onClose} />
      </CustomConfirmPopupHeader>
      <CustomConfirmPopupBody>
        <StyledWarningText>
          <span>Are you sure you want to remove your profile picture?</span>
          <br />
          <span>
            Once deleted, it cannot be restored. You can always upload a new
            picture later!
          </span>
        </StyledWarningText>
      </CustomConfirmPopupBody>
      <CustomConfirmPopupFooter>
        <SubmitButton
          active={isActiveSubmitButton}
          value={"Delete profile picture"}
          onSubmit={handleDeleteAvatar}
        />
      </CustomConfirmPopupFooter>
    </CustomConfirmPopup>
  );
};

export default AvatarDeleteConfirmPopup;
