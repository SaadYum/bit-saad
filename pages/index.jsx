import Head from "next/head";
import { SearchIcon } from "@heroicons/react/outline";

import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { format_nums } from "../utils/utils";
import EventCard from "../components/EventCard";
import { getArtistEventsAPI, searchArtistAPI } from "../utils/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [artistResult, setArtistResult] = useState(null);
  const [searchingArtist, setSearchingArtist] = useState(false);
  const [searchingEvents, setSearchingEvents] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("searchedQuery")) {
      let searchedQuery = localStorage.getItem("searchedQuery");
      setQuery(searchedQuery);
      searchArtist(searchedQuery);
    }
  }, []);

  const changeHandler = (event) => {
    let searchedQuery = event.target.value;
    localStorage.setItem("searchedQuery", searchedQuery);
    setQuery(searchedQuery);
    searchArtist(searchedQuery);
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    []
  );

  const searchArtist = (artist_query) => {
    if (artist_query) {
      setSearchingArtist(true);
      searchArtistAPI(artist_query)
        .then((res) => {
          setArtistResult(res);
          localStorage.setItem("artistResults", res);
          setTimeout(getArtistEvents(artist_query), 1000);
          setSearchingArtist(false);
        })
        .catch((err) => {
          setArtistResult(null);
          setSearchingArtist(false);
        });
    }
  };

  const getArtistEvents = (artist_query) => {
    if (artist_query) {
      setSearchingEvents(true);
      getArtistEventsAPI(artist_query)
        .then((res) => {
          setEvents(res);
          localStorage.setItem("artistEvents", res);

          setSearchingEvents(false);
        })
        .catch((err) => {
          console.log("EVENT ERR: ", err);
          setEvents([]);
          setSearchingEvents(false);
        });
    }
  };

  return (
    <div className="w-screen">
      {/* Main Section */}
      <main className="flex flex-col p-4 w-full center bg-transparent">
        {/* Search Input */}
        <div className="h-20 w-full center">
          <div className="flex items-center justify-between relative rounded-full xl:text-lg lg:text-sm md:text-xs border-[1px] border-gray-300 p-3  ">
            <input
              type="text"
              placeholder="Search Artists"
              onChange={debouncedChangeHandler}
              className="outline-none  focus:py-1 focus:px-2 bg-transparent transition-all duration-300"
            />
            <SearchIcon className="h-5 w-5 text-gray-300" />
          </div>
        </div>

        {searchingArtist ? (
          <div className="flex justify-center items-center">
            <ThreeDots color="#00BFFF" height={80} width={80} />
          </div>
        ) : query ? (
          <>
            <span className="text-lg font bold">
              {artistResult
                ? "Artist found for '" + query + "'"
                : "No Artists found for " + query}
            </span>

            {/* ARTIST INFO HEADER */}
            {artistResult ? (
              <>
                <div className="flex items-center 2xl:w-1/3 xl:w-1/2 cursor-pointer mt-1 mx-12 bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-400  p-4 rounded-lg shadow-md ">
                  <img
                    src={artistResult.thumb_url}
                    className="rounded-full w-20 h-20 shadow-2xl"
                    alt="avatar"
                  />
                  <div className="flex flex-col ml-4">
                    <span className="text-xl font-medium truncate">
                      {artistResult.name}
                    </span>
                    <div className="grid grid-cols-[5rem_auto]  gap-2">
                      <div className="flex flex-col">
                        <span>Followers: </span>
                        <span>Facebook: </span>
                      </div>
                      <div className="flex flex-col truncate">
                        <span>{format_nums(artistResult.tracker_count)}</span>
                        {artistResult.facebook_page_url ? (
                          <>
                            <a
                              href={artistResult.facebook_page_url}
                              target="blank"
                            >
                              <span className="underline underline-offset-2">
                                {artistResult.facebook_page_url}
                              </span>
                            </a>
                          </>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <span className="text-lg font-medium mt-4">
                  {artistResult.upcoming_event_count} Upcoming Events
                </span>
                {searchingEvents ? (
                  <div className="flex justify-center items-center">
                    <ThreeDots color="#00BFFF" height={80} width={80} />
                  </div>
                ) : (
                  <>
                    {/* EVENTS */}
                    <div className=" grid gap-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  md:w-full mt-2 px-16 custom-scroll 2xl:h-[60vh] xl:h-[50vh]  ">
                      {events.map((event, index) => (
                        <EventCard data={event} eventKey={index + "event"} />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : null}
          </>
        ) : null}
      </main>
    </div>
  );
}
