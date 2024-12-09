import React, { useState } from "react";
import CryptoJS from "crypto-js";

const Hmac = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [secretKey, setSecretKey] = useState("");
  const [fileHash, setFileHash] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Hash the image file using HMAC
  const hashImage = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    if (!secretKey) {
      alert("Please enter a secret key!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      // Convert file data to a WordArray for hashing
      const wordArray = CryptoJS.lib.WordArray.create(fileData);
      // Generate HMAC hash
      const hash = CryptoJS.HmacSHA256(wordArray, secretKey).toString(CryptoJS.enc.Hex); // Using SHA-256 as the underlying hash function
      setFileHash(hash);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>HMAC Image Hashing</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Secret Key:
          <input
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            style={{ marginLeft: "10px", width: "300px" }}
          />
        </label>
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={hashImage} style={{ marginLeft: "10px" }}>
          Generate HMAC
        </button>
      </div>

      {fileHash && (
        <div style={{ marginTop: "20px" }}>
          <h4>HMAC Hash (Hex):</h4>
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

export default Hmac;
