const axios = require("axios");

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
