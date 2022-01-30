export const artistAPI = (artistName, app_id) =>
  `https://rest.bandsintown.com/artists/${artist_query}?app_id=${app_id}`;
export const eventsAPI = (artistName, app_id) =>
  `https://rest.bandsintown.com/artists/${artist_query}/events?app_id=${app_id}`;
