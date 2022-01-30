const axios = require("axios");

const MockAdapter = require("axios-mock-adapter");
const { searchArtistAPI, getArtistEventsAPI } = require("../api");

describe("searchArtist", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("when searchArtistAPI call is successful", () => {
    it(" should return data ", (done) => {
      const data = { response: true };
      mock
        .onGet(
          `https://rest.bandsintown.com/artists/atif?app_id=${process.env.NEXT_PUBLIC_APP_ID}`
        )
        .reply(200, data);

      searchArtistAPI("atif").then((response) => {
        expect(response).toEqual(data);
        done();
      });
    });
  });
  describe("when searchArtistAPI call is unsuccessful", () => {
    it(" should return null as result", (done) => {
      mock
        .onGet(
          `https://rest.bandsintown.com/artists/atif%20a?app_id=${process.env.NEXT_PUBLIC_APP_ID}`
        )
        .networkErrorOnce();

      searchArtistAPI("atif%20a").then((response) => {
        expect(response).toEqual(null);
        done();
      });
    });
  });
});

describe("getEvents", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });
  describe("when getArtistEventsAPI call is successful", () => {
    it("should return events data for a provided artist", (done) => {
      const data = { response: true };
      mock
        .onGet(
          `https://rest.bandsintown.com/artists/chris/events?app_id=${process.env.NEXT_PUBLIC_APP_ID}`
        )
        .reply(200, data);

      getArtistEventsAPI("chris").then((response) => {
        expect(response).toEqual(data);
        done();
      });
    });
  });

  describe("when getArtistEventsAPI call is unsuccessful", () => {
    it("should return empty list of events", (done) => {
      mock
        .onGet(
          `https://rest.bandsintown.com/artists//events?app_id=${process.env.NEXT_PUBLIC_APP_ID}`
        )
        .networkErrorOnce();

      getArtistEventsAPI("").then((response) => {
        expect(response).toEqual([]);
        done();
      });
    });
  });
});
