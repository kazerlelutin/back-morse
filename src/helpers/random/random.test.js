const random = require("./random");

describe("random", () => {
  it("check min and max", () => {
    const rand = random(5, 6);
    expect(rand).toBeLessThanOrEqual(6);
    expect(rand).toBeGreaterThanOrEqual(5);
  });
});
