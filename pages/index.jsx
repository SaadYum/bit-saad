import Head from "next/head";
import Image from "next/image";
import { MoonIcon, SearchIcon, SunIcon } from "@heroicons/react/outline";
import ArtistCard from "../components/ArtistCard";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { format_nums } from "../utils";
import EventCard from "../components/EventCard";

const data = {
  id: "25888",
  name: "Chris Brown",
  url: "https://www.bandsintown.com/a/25888?came_from=267&app_id=abc",
  mbid: "c234fa42-e6a6-443e-937e-2f4b073538a3",
  options: {
    display_listen_unit: false,
  },
  tracking: [],
  image_url: "https://photos.bandsintown.com/large/8442994.jpeg",
  thumb_url: "https://photos.bandsintown.com/thumb/8442994.jpeg",
  facebook_page_url: "http://www.facebook.com/6329881653",
  tracker_count: 3933882,
  upcoming_event_count: 3,
  support_url: "",
  links: [
    {
      type: "website",
      url: "http://www.chrisbrownworld.com/",
    },
    {
      type: "facebook",
      url: "https://www.facebook.com/chrisbrown/",
    },
  ],
};
export default function Home() {
  const [query, setQuery] = useState("");
  const [artistResult, setartistResult] = useState(null);
  const [searchingArtist, setSearchingArtist] = useState(false);
  const [searchingEvents, setSearchingEvents] = useState(false);
  const [events, setEvents] = useState([]);

  const changeHandler = (event) => {
    let searchedQuery = event.target.value;
    localStorage.setItem("searchedQuery", searchedQuery);
    setQuery(searchedQuery);
    setSearchingArtist(true);
    searchArtist(searchedQuery);
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    []
  );

  const searchArtist = (artist_query) => {
    if (artist_query) {
      axios
        .get(`https://rest.bandsintown.com/artists/${artist_query}?app_id=abc`)
        .then((res) => {
          if (!res.data.error) {
            setartistResult(res.data);
            localStorage.setItem("artistResults", res.data);
            setTimeout(getArtistEvents(artist_query), 1000);
          } else {
            setartistResult(null);
          }
          setSearchingArtist(false);
        })
        .catch((err) => {
          setartistResult(null);
          setSearchingArtist(false);
        });
    }
  };

  const getArtistEvents = (artist_query) => {
    setSearchingEvents(true);
    axios
      .get(
        `https://rest.bandsintown.com/artists/${artist_query}/events?app_id=abc`
      )
      .then((res) => {
        if (!res.data.error) {
          setEvents(res.data);
          localStorage.setItem("artistEvents", res.data);
        } else {
          setEvents([]);
        }
        setSearchingEvents(false);
      })
      .catch((err) => {
        setEvents([]);
        setSearchingEvents(false);
      });
  };

  return (
    <div className="w-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Bands in Town App" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

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
              {artistResult ? "Artist found" : "No Artists found for " + query}
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
                              target="_blank"
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
                        <EventCard data={event} key={index + "event"} />
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
