import Head from "next/head";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import ArtistCard from "../components/ArtistCard";

export default function Home() {
  const data = {
    thumb_url: "https://photos.bandsintown.com/thumb/8668226.jpeg",
    mbid: "2c26fddb-3926-4004-ae27-22a3896a4f26",
    facebook_page_url: "",
    image_url: "https://photos.bandsintown.com/large/8668226.jpeg",
    tracker_count: 157326,
    tracking: [],
    upcoming_event_count: 1,
    url: "https://www.bandsintown.com/a/9047?came_from=267&app_id=abc",
    support_url: "",
    name: "Atif Aslam",
    options: {
      display_listen_unit: false,
    },
    links: "",
    id: "9047",
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
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      {/* Main Section */}
      <main className="flex flex-col p-4 w-full center">
        {/* Search Input */}
        <div className="h-28 w-full center">
          <div className="flex items-center justify-between rounded-full xl:text-lg lg:text-sm md:text-xs border-[1px] border-gray-300 p-3  ">
            <input
              type="text"
              placeholder="Search Artists"
              className="outline-none  focus:py-1 focus:px-2 transition-all duration-300"
            />
            <SearchIcon className="h-5 w-5 text-gray-300" />
          </div>
        </div>
        <span className=""></span>

        {/* Output Results List */}
        <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full py-10 px-20">
          <ArtistCard data={data} />
          <ArtistCard data={data} />
          <ArtistCard data={data} />
          <ArtistCard data={data} />
        </div>
      </main>
    </div>
  );
}
