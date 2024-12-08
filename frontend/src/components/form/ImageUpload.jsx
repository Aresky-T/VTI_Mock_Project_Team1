import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { TbCamera } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";

const ImageUpload = ({ file, url, handleChangeFile, title1, title2 }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const inputId = useId();
  const frameRef = useRef();
  const inputFileRef = useRef();

  const generateImageUrl = (imageFile) => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  };

  const handleChangeUrl = (event) => {
    const file = event.target.files[0];
    handleChangeFile(file);
  };

  const handleDeleteFile = () => {
    setImageUrl("");
    handleChangeFile(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  const handleFocusInput = useCallback(() => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }, []);

  useEffect(() => {
    setIsDeleted(!imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    if (!file && !url) {
      setImageUrl("");
    } else if (file) {
      setImageUrl(generateImageUrl(file));
    } else {
      setImageUrl(url);
    }
  }, [file, url]);

  useEffect(() => {
    const handleClick = (event) => {
      if (frameRef.current && frameRef.current.contains(event.target)) {
        handleFocusInput();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleFocusInput]);

  return (
    <div className="image-upload">
      <div className="image-upload__frame">
        {isDeleted ? (
          <div className="image-upload__frame--empty" ref={frameRef}>
            <div className="icon">
              <TbCamera />
            </div>
            {title1 && <p className="title1">{title1}</p>}
            {title2 && <p className="title2">{title2}</p>}
          </div>
        ) : (
          <div className="image-upload__frame--present">
            <img src={imageUrl} alt="file-upload-img" loading="lazy" />
            <div className="options">
              <button
                type="button"
                className="options--delete"
                onClick={handleDeleteFile}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="image-upload__input">
        <input
          type="file"
          ref={inputFileRef}
          id={inputId}
          onChange={handleChangeUrl}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
