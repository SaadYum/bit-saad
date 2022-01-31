import Link from "next/link";
import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import GoogleMapReact from "google-map-react";

function EventCard({ event_data, artist_data }) {
  const [openModal, setOpenModal] = useState(false); // For Controlling Event Detail Modal Open/Close
  const closeButtonRef = useRef(null);

  return (
    <>
      {/* Main Card */}
      <div
        data-tip="Open Details"
        className=" flex flex-col h-44 mx-2 p-4 shadow-xl cursor-pointer hover:scale-110 transition-all duration-200"
        onClick={() => setOpenModal(!openModal)}
      >
        <span className="border-b-2 w-full font-medium">EVENT DETAILS</span>
        <div className="flex py-2">
          <div className="w-1/2 flex flex-col">
            <span className="truncate font-medium">Country</span>
            <span className="truncate text-gray-600">
              {event_data.venue.country}
            </span>
            <span className="truncate font-medium">Venue</span>
            <span className="truncate text-gray-600">
              {event_data.venue.name}
            </span>
          </div>
          <div className="w-1/2 flex flex-col">
            <span className="truncate font-medium">City</span>
            <span className="truncate text-gray-600">
              {event_data.venue.city}
            </span>
            <span className="truncate font-medium">Date</span>
            <span className="truncate text-gray-600">
              {new Date(event_data.datetime).toDateString()}
            </span>
          </div>
        </div>
      </div>

      {/*Details Modal  */}
      <Transition.Root show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          //   initialFocus={closeButtonRef}
          onClose={setOpenModal}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/50 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block backdrop-blur align-bottom bg-white/30 dark:bg-stone-800/50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-3/4">
                {/* Modal Content */}
                <div className="sm:flex  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col sm:w-2/4">
                    <span className="text-2xl font-medium truncate">
                      {artist_data.name}
                    </span>
                    <span className="text-xl truncate ">
                      {event_data.venue.name}
                    </span>
                    <span className="text-lg truncate ">
                      {new Date(event_data.datetime).toUTCString()}
                    </span>
                    <span className=" truncate ">
                      Tickets Status :{" "}
                      {event_data?.offers[0]?.status
                        ? event_data?.offers[0]?.status
                        : "N/A"}
                    </span>
                    <div className="flex flex-col space-y-2 sm:w-3/4 md:space-y-0 md:flex-row my-4 md:mt-20 md:space-x-2">
                      {event_data?.offers[0]?.status ? (
                        <a href={event_data?.offers[0]?.url} target="blank">
                          <div className=" center text-lg bg-red-500 py-1 sm:px-2 truncate rounded hover:scale-110 transition-transform duration-150 shadow-xl">
                            <span className="text-white">Get Tickets</span>
                          </div>
                        </a>
                      ) : null}

                      <a href={event_data.url} target="blank">
                        <div className=" center text-lg bg-blue-500 py-1 sm:px-2 truncate rounded hover:scale-110 transition-transform duration-150 shadow-xl">
                          <span className="text-white">Go To Website</span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Google Map Component with venue Marker */}
                  {event_data.venue ? (
                    <div className="sm:w-2/4 h-60 xs">
                      <GoogleMapReact
                        //   bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                        defaultCenter={{
                          lat: parseFloat(event_data.venue.latitude),
                          lng: parseFloat(event_data.venue.longitude),
                        }}
                        defaultZoom={11}
                      >
                        <MarkerComponent
                          lat={parseFloat(event_data.venue.latitude)}
                          lng={parseFloat(event_data.venue.longitude)}
                          avatar={artist_data.thumb_url}
                        />
                      </GoogleMapReact>
                    </div>
                  ) : null}
                </div>

                {/* Modal Close button */}
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md hover:brightness-125 outline-none shadow-sm px-4 py-2 bg-white dark:bg-stone-700 text-base font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpenModal(false)}
                    ref={closeButtonRef}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default EventCard;

const MarkerComponent = (props) => (
  <img
    src={props.avatar}
    className="rounded-full w-10 h-10 shadow-2xl"
    alt="avatar"
  />
);
