import React, { useCallback, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateAvatarApi } from "../../api/user.api";
import { updateAvatarStart, updateAvatarSuccess } from "../../redux/user.slice";
import { offLoading, onLoading } from "../../redux/loading.slice";
import CustomConfirmPopup from "../styled/popup/confirm";
import CustomConfirmPopupHeader from "../styled/popup/confirm/header";
import CustomConfirmPopupBody from "../styled/popup/confirm/body";
import CustomConfirmPopupFooter from "../styled/popup/confirm/footer";
import { toast } from "react-toastify";
import ValidateUtils from "../../utils/validate2";
import { useAuth } from "../../redux/selector";

const AvatarUpdateConfirmPopup = ({ imageFile, onClose }) => {
  const [avatar, setAvatar] = useState("");
  const [active, setActive] = useState(false);
  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  const dispatch = useDispatch();

  const handleUpdateAvatar = useCallback(() => {
    if (!currentUser || !imageFile) return;

    const formData = new FormData();
    formData.append("imageFile", imageFile);

    dispatch(updateAvatarStart());
    dispatch(onLoading());

    updateAvatarApi(formData, currentUser.token)
      .then((response) => response.data)
      .then((newAvatarUrl) => {
        setTimeout(() => {
          dispatch(updateAvatarSuccess(newAvatarUrl));
          dispatch(offLoading());
          onClose();
          toast.success("Avatar updated successfully!");
        }, 100);
      })
      .catch((err) => {
        dispatch(offLoading());
        toast.error("Update avatar failed!");
      });

    //eslint-disable-next-line
  }, [imageFile, currentUser]);

  useEffect(() => {
    setActive(!!avatar);
  }, [avatar]);

  useEffect(() => {
    if (!imageFile) {
      setAvatar("");
      return;
    }

    const imageFileValidator = new ValidateUtils({ imageFile });
    imageFileValidator.imageFile(
      "imageFile",
      "The selected file is not in the correct format!"
    );
    const { isValid, errors } = imageFileValidator.validate();

    if (!isValid) {
      toast.error(
        errors.get("imageFile")["IMAGE_FILE"] || "Invalid selected file!"
      );
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setAvatar(url);
  }, [imageFile]);

  return (
    <CustomConfirmPopup
      active={active}
      className={"avatar-update-confirm-popup"}
    >
      <CustomConfirmPopupHeader>
        <p>Confirm update your new profile picture</p>
        <MdClose id="close-popup-btn" onClick={onClose} />
      </CustomConfirmPopupHeader>
      <CustomConfirmPopupBody>
        <div className="avatar-image">
          <img src={avatar} alt="" loading="lazy" />
        </div>
      </CustomConfirmPopupBody>
      <CustomConfirmPopupFooter>
        <button
          className="confirm-popup-btn active"
          onClick={handleUpdateAvatar}
        >
          Set new profile picture
        </button>
      </CustomConfirmPopupFooter>
    </CustomConfirmPopup>
  );
};

export default AvatarUpdateConfirmPopup;
