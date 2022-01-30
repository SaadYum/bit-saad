import React from "react";

function EventCard({ data, eventKey }) {
  return (
    <div
      key={eventKey}
      className=" flex flex-col h-44 mx-2 p-4 shadow-xl cursor-pointer hover:scale-110 transition-all duration-200"
    >
      <span className="border-b-2 w-full font-medium">EVENT DETAILS</span>
      <div className="flex py-2">
        <div className="w-1/2 flex flex-col">
          <span className="truncate font-medium">Country</span>
          <span className="truncate text-gray-600">{data.venue.country}</span>
          <span className="truncate font-medium">Venue</span>
          <span className="truncate text-gray-600">{data.venue.name}</span>
        </div>
        <div className="w-1/2 flex flex-col">
          <span className="truncate font-medium">City</span>
          <span className="truncate text-gray-600">{data.venue.city}</span>
          <span className="truncate font-medium">Date</span>
          <span className="truncate text-gray-600">
            {new Date(data.datetime).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
