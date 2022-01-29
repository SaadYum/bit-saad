import React from "react";

function ArtistCard({ data }) {
  return (
    <div className=" border-none rounded h-28 mx-5 flex center shadow-xl cursor-pointer hover:scale-125 transition-all duration-200">
      <img
        src={data.thumb_url}
        className="rounded-full w-16 h-1w-16 border-gray-500 border-4"
        alt="avatar"
      />
      <div className="flex flex-col ml-4">
        <span className="text-lg font-bold truncate">{data.name}</span>
        <span className=" ">Followers: {data.tracker_count}</span>
      </div>
    </div>
  );
}

export default ArtistCard;
