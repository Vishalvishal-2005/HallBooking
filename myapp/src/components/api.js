/**
 * Asynchronously adds a new vendor by sending a POST request to the vendor API.
 *
 * This function takes vendor data as input, sends it to the specified API endpoint,
 * and returns the response in JSON format. If the request fails, an error is thrown.
 *
 * @param {Object} vendorData - The data of the vendor to be added.
 * @param {string} vendorData.name - The name of the vendor.
 * @param {string} vendorData.contact - The contact information of the vendor.
 * @param {string} vendorData.address - The address of the vendor.
 *
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the API.
 *
 * @throws {Error} Throws an error if the response from the API is not successful.
 *
 * @example
 * const newVendor = {
 *   name: "Vendor Name",
 *   contact: "123-456-7890",
 *   address: "123 Vendor St, City, Country"
 * };
 *
 * addVendor(newVendor)
 *   .then(response => {
 *     console.log("Vendor added successfully:", response);
 *   })
 *   .catch(error => {
 *     console.error("Error adding vendor:", error);
 *   });
 */
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
  