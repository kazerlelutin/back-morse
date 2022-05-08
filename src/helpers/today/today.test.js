const today = require("./today");

describe("random", () => {
  it("check min and max", () => {
    jest
    .useFakeTimers()
    .setSystemTime(new Date('2022-05-05'));

    expect(today()).toStrictEqual('5_4_2022')
  });
});
