const axios = require("axios");

// The SearchArtistAPI call Method with the user input query and return type of Promise
//1. Call Axios get with the search artist API URL along with the string input for artist name.
//2. In case of success, check if status is 200 and data key is nothing else than an expected Object.
//3. If successful response is as expected resolve promise with data else reject promise with Error.
//4. In case of failure, resolve promise with null.
export const searchArtistAPI = (artist_query) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://rest.bandsintown.com/artists/${artist_query}?app_id=${process.env.NEXT_PUBLIC_APP_ID}`
      )
      .then(({ status, data }) => {
        if (status === 200 && data != "" && !data.error) {
          resolve(data);
        } else {
          reject(new Error("error"));
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });
};

// The GetArtistEventsAPI call Method with the user input query and return type of Promise
//1. Call Axios get with the get artist events API URL along with the string input for artist name.
//2. In case of success, check if status is 200 and data key is nothing else than an expected Object.
//3. If successful response is as expected resolve promise with data else reject promise with Error.
//4. In case of failure, resolve promise with null.
export const getArtistEventsAPI = (artist_query) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://rest.bandsintown.com/artists/${artist_query}/events?app_id=${process.env.NEXT_PUBLIC_APP_ID}`
      )
      .then(({ status, data }) => {
        if (status === 200 && data != "" && !data.error) {
          resolve(data);
        } else {
          reject(new Error("error"));
        }
      })
      .catch((err) => {
        resolve([]);
      });
  });
};
