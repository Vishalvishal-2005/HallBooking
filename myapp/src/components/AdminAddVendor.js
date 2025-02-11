import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

const AdminAddVendor = ({ onVendorAdded }) => {
  const [vendor, setVendor] = useState({
    name: "",
    category: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (file) => {
    if (!file) {
      alert("Please select an image");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await fetch("http://localhost:3060/api/images/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const imageUrl = await response.text();
        setVendor({ ...vendor, imageUrl });  // ✅ Store the correct image URL
        alert("Image uploaded successfully");
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    }
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3060/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendor),
      });
  
      if (response.ok) {
        alert("Vendor added successfully");
        setVendor({ name: "", category: "", description: "", imageUrl: "" });
  
        // Call only if function is provided
        if (onVendorAdded) {
          onVendorAdded();
        }
      } else {
        alert("Failed to add vendor");
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("Failed to add vendor");
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>Add Vendor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={vendor.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input type="text" name="category" className="form-control" value={vendor.category} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" value={vendor.description} onChange={handleChange}></textarea>
        </div>

        {/* Image Upload Component */}
        <ImageUpload onImageUpload={handleImageUpload} />

        <button type="submit" className="btn btn-success mt-3">Submit</button>
      </form>
    </div>
  );
};

export default AdminAddVendor;
