const { format_nums } = require("../utils");

describe("format_nums", () => {
  describe("when format_nums is provided 6 figures", () => {
    it("should format numbers in to K format", (done) => {
      let response = format_nums(123456);
      expect(response).toEqual("123.5K");
      done();
    });
  });
  describe("when format_nums is provided 8 figures", () => {
    it("should format numbers in to M format", (done) => {
      let response = format_nums(12345678);
      expect(response).toEqual("12.3M");
      done();
    });
  });
  describe("when format_nums is provided 10 figures", () => {
    it("should format numbers in to G format", (done) => {
      let response = format_nums(1234567891);
      expect(response).toEqual("1.2G");
      done();
    });
  });
});
