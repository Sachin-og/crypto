import React, { useState } from "react";
import forge from "node-forge";

const HybridEncryption = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [encryptedFile, setEncryptedFile] = useState("");
  const [encryptedKey, setEncryptedKey] = useState("");
  const [error, setError] = useState("");

  // Generate RSA key pair
  const generateKeys = () => {
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    setPublicKey(forge.pki.publicKeyToPem(keyPair.publicKey));
    setPrivateKey(forge.pki.privateKeyToPem(keyPair.privateKey));
    setError("");
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError("");
    } else {
      setError("No file selected.");
    }
  };

  // Encrypt file using Hybrid Encryption
  const encryptFile = () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    if (!publicKey) {
      setError("Please generate RSA keys first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = new Uint8Array(e.target.result); // File as byte array

      // Step 1: Generate AES key
      const aesKey = forge.random.getBytesSync(32); // 256-bit AES key

      // Step 2: Encrypt file using AES
      const cipher = forge.cipher.createCipher("AES-CBC", aesKey);
      const iv = forge.random.getBytesSync(16); // Initialization vector
      cipher.start({ iv });
      cipher.update(forge.util.createBuffer(fileData));
      cipher.finish();
      const encryptedFileData = cipher.output.getBytes(); // Encrypted file bytes

      // Step 3: Encrypt AES key using RSA
      const publicKeyObject = forge.pki.publicKeyFromPem(publicKey);
      const encryptedAesKey = publicKeyObject.encrypt(aesKey, "RSA-OAEP");

      // Step 4: Encode results
      setEncryptedKey(forge.util.encode64(encryptedAesKey)); // Base64 encoded AES key
      setEncryptedFile(forge.util.encode64(encryptedFileData)); // Base64 encoded file
      setError("");
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hybrid Encryption</h2>

      {/* Generate Keys */}
      <div>
        <button onClick={generateKeys}>Generate RSA Keys</button>
      </div>

      {/* Display RSA Keys */}
      {publicKey && (
        <div style={{ marginTop: "10px" }}>
          <h4>Public Key:</h4>
          <textarea
            value={publicKey}
            readOnly
            rows="5"
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <h4>Private Key:</h4>
          <textarea
            value={privateKey}
            readOnly
            rows="5"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
      )}

      {/* File Selection */}
      <div style={{ marginTop: "20px" }}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={encryptFile} style={{ marginLeft: "10px" }}>
          Encrypt File
        </button>
      </div>

      {/* Error Handling */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Encrypted AES Key */}
      {encryptedKey && (
        <div style={{ marginTop: "20px" }}>
          <h4>Encrypted AES Key (Base64):</h4>
          <textarea
            value={encryptedKey}
            readOnly
            rows="3"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
      )}

      {/* Display Encrypted File */}
      {encryptedFile && (
        <div style={{ marginTop: "20px" }}>
          <h4>Encrypted File (Base64):</h4>
          <textarea
            value={encryptedFile}
            readOnly
            rows="10"
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default HybridEncryption;
