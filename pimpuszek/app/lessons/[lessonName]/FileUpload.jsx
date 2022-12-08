"use client";
import axios from "axios";
import { useState } from "react";

const FileUpload = ({ lessonName, setFileList }) => {
  const [uploading, setUploading] = useState(null);
  const [fileListUpload, setFileListUpload] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const handleClick = async () => {
    console.log("fileListUpload: ", fileListUpload);
    if (fileListUpload.length === 0) return;

    // for (const fileUpload in fileListUpload) {
    try {
      const formData = new FormData();
      formData.append("lessonFile", fileListUpload);
      const { data } = await axios.post(
        `/api/lesson-files?lessonName=${lessonName}`,
        formData
      );
      console.log(data);
    } catch (err) {
      console.log("err:", err);
      console.log(err.response?.data);
    }
  };

  const handleChange = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFileListUpload(file);
      // const chosenFiles = Array.prototype.slice.call(e.target.files);

      // setFileListUpload((prevState) => [...prevState, e.target.files]);
      // setFileListUpload((prevState) => [...prevState, chosenFiles]);
      // setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <h1>File upload</h1>
      <div>
        <label htmlFor="fileSelect">
          <input
            type="file"
            hidden
            // BUG - problem jest w multiple
            // multiple
            id="fileSelect"
            name="fileSelect"
            onChange={async (e) => await handleChange(e)}
          />
          <div>
            <span>Kliknij tu aby wybrać obrazek</span>
          </div>
        </label>

        {/* {fileListUpload.length ? ( */}
        {fileListUpload ? (
          <button type="submit" onClick={handleClick}>
            dodaj
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default FileUpload;
