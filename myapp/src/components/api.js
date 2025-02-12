export const addVendor = async (vendorData) => {
    const response = await fetch("https://hallbooking-backend-9e8d.onrender.com/api/vendors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorData),
    });
  
    if (!response.ok) {
      throw new Error("Failed to add vendor");
    }
  
    return response.json();
  };
  