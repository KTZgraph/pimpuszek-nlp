"use client";
import axios from "axios";
import { useState } from "react";

const MultipleFileUpload = ({ lessonName, setFileList }) => {
  const [uploading, setUploading] = useState(null);
  const [fileListUpload, setFileListUpload] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const handleClick = async () => {
    if (fileListUpload.length === 0) return;

    try {
      for (const fileUpload of fileListUpload) {
        console.log("fileUpload: ", fileUpload);
        const formData = new FormData();
        formData.append("lessonFile", fileUpload);
        const { data } = await axios.post(
          `/api/lesson-files?lessonName=${lessonName}`,
          formData
        );
        console.log(data);
        setFileList((prevState) => [...prevState, data.data]);
      }
    } catch (err) {
      console.log("err:", err);
      console.log(err.response?.data);
    } finally {
      // czyszczenie po uploadzie
      setFileListUpload([]);
    }
  };

  const handleChange = async (e) => {
    if (e.target.files) {
      const chosenFiles = Array.prototype.slice.call(e.target.files);
      setFileListUpload(chosenFiles);
    }
  };

  return (
    <div>
      <h1>Wile plikow</h1>
      {/* wyświetlanie nazw uploadowanych plków */}
      <div className="uploaded-files-list">
        {fileListUpload.map((file) => (
          <div key={file.name}>{file.name}</div>
        ))}
      </div>
      <div>
        <label htmlFor="fileSelect">
          <input
            type="file"
            hidden
            style={{ display: "none" }}
            // BUG - problem jest w multiple
            multiple
            id="fileSelect"
            name="fileSelect"
            onChange={async (e) => await handleChange(e)}
          />
          <div>
            <span>Kliknij by wybrać WIĘCEJ plików</span>
          </div>
          {fileListUpload.length ? (
            <button type="submit" onClick={handleClick}>
              UPLOAD WIĘCEJ
            </button>
          ) : null}
        </label>
      </div>
    </div>
  );
};

export default MultipleFileUpload;
