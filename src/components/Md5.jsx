import React, { useState } from "react";
import CryptoJS from "crypto-js";

const Md5 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileHash, setFileHash] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Hash the image file using MD5
  const hashImage = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      // Convert file data to a WordArray for hashing
      const wordArray = CryptoJS.lib.WordArray.create(fileData);
      // Generate MD5 hash
      const hash = CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Hex);
      setFileHash(hash);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>MD5 Image Hashing</h2>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={hashImage} style={{ marginLeft: "10px" }}>
          Generate Hash
        </button>
      </div>

      {fileHash && (
        <div style={{ marginTop: "20px" }}>
          <h4>MD5 Hash (Hex):</h4>
          <textarea
            value={fileHash}
            readOnly
            rows="5"
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default Md5;
