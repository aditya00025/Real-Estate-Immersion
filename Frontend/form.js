// Function to get latitude, longitude, and pincode from the address using Google Geocoding API.
async function getLatLngPincode(address) {
  const apiKey = "AIzaSyCQghbrbSPfhZ0GC5fZ5eGhPSofstkt1vU";
  const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
  const params = new URLSearchParams({
    address: address,
    key: apiKey
  });
  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      const postalComponent = data.results[0].address_components.find(component =>
        component.types.includes("postal_code")
      );
      const pincode = postalComponent ? postalComponent.long_name : "";
      return { latitude: location.lat, longitude: location.lng, pincode: pincode };
    } else {
      console.error("Geocode API error:", data.status);
      return { latitude: "", longitude: "", pincode: "" };
    }
  } catch (error) {
    console.error("Error in getLatLngPincode:", error);
    return { latitude: "", longitude: "", pincode: "" };
  }
}

document.getElementById("propertyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Retrieve the address entered by the user.
  const addressValue = document.getElementById("address").value;
  // Get geocoded latitude, longitude, and pincode based on the address.
  const { latitude, longitude, pincode } = await getLatLngPincode(addressValue);

  // Create a FormData object and append all fields using the exact field names.
  const formData = new FormData();
  formData.append("3D Model", document.getElementById("threeDModel").checked);
  formData.append("Address", addressValue);
  formData.append("Pincode", pincode); // Auto-filled from geocoding.
  formData.append("Landmark", document.getElementById("landmark").value);
  formData.append("Railway Stn", document.getElementById("railwayStn").value);
  formData.append("Latitude", latitude);
  formData.append("Longitude", longitude);
  formData.append("Price", document.getElementById("price").value);
  formData.append("Rooms", document.getElementById("rooms").value);
  formData.append("Washroom", document.getElementById("washroom").value);
  formData.append("Area", document.getElementById("area").value);
  formData.append("Bus Stop", document.getElementById("busStop").value);
  formData.append("Sale", document.getElementById("sale").checked);
  formData.append("Seller Name", document.getElementById("sellerName").value);
  formData.append("Seller Contact", document.getElementById("sellerContact").value);
  formData.append("Description", document.getElementById("description").value);

  // Append amenities fields.
  formData.append("AC", document.getElementById("AC").value);
  formData.append("Furnish", document.getElementById("Furnish").checked);
  formData.append("Gas", document.getElementById("Gas").checked);
  formData.append("Lift", document.getElementById("Lift").checked);
  formData.append("Parking", document.getElementById("Parking").checked);
  formData.append("Water Supply", document.getElementById("WaterSupply").value);
  formData.append("Wifi", document.getElementById("Wifi").checked);

  // Process the image file, if provided, and convert it to Base64.
  const imageInput = document.getElementById("image");
  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        formData.append("Image", reader.result);
        submitForm(formData);
      };
      reader.onerror = (err) => {
        console.error("Error processing image:", err);
        alert("Error processing the image. Please try again.");
      };
    } catch (err) {
      console.error("Error processing image:", err);
      alert("Error processing the image. Please try again.");
    }
  } else {
    formData.append("Image", "");
    submitForm(formData);
  }
});

// Function to send the form data to the backend.
async function submitForm(formData) {
  try {
    const response = await fetch("http://localhost:5000/submit-form", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      alert("Property submitted successfully!");
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}
