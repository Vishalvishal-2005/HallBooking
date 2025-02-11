import React, { useState } from "react";
import { toast } from "react-toastify";

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    onImageUpload(image); // Send the image file to AdminAddVendor.js
  };

  return (
    <div className="mb-3">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="btn btn-secondary btn-sm">Upload</button>
    </div>
  );
};

export default ImageUpload;
