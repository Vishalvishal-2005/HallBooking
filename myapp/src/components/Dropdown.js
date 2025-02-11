import React, { useState } from "react";
function Dropdown(){
    const [selectedLocation, setSelectedLocation] = useState("");
  
    const handleChange = (event) => {
      setSelectedLocation(event.target.value);
    };
    const locations = [
        "Chennai",
        "Madurai",
        "Delhi",
        "Hyderabad",
        "Luknow",
        "Pune",
        "Mumbai",
        "Jaipur",
        "Taj Hotel",
        "Jammu Kashmiri"
      ];
      const events=[
          "Marriage",
          "BirthDay",
          "Welcome Party",
          "Wedding",
          "Success Party",
          "CockTail"
      ];
    return(
    <div className="dropdown-container">
    <select id="location" value={selectedLocation} onChange={handleChange}>
    <option value="" disabled>Select a location</option>
    {locations.map((location, index) => (
      <option key={index} value={location}>
        {location}
      </option>
    ))}
  </select>
    <select id="location" value={selectedLocation} onChange={handleChange}>
    <option value="" disabled>Event</option>
    {events.map((event, index) => (
      <option key={index} value={event}>
        {event}
      </option>
    ))}
  </select>
    <div className="searb">search</div>
  </div>
    );
}
export default Dropdown;