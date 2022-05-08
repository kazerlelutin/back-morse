const morseConverter = require("./morseConverter");

describe("morseConverter", () => {
  it("code a message", () => {
    expect(morseConverter('Mon texte en morse.'))
    .toEqual("=.===.=.===.......===.===...===.===.===...===.=.......==="+
    "...=...===.=.=.===...===...=.......=...===.=.......===.===...===.==="+
    ".===...=.===.=...=.=.=...=...=.===.=.===.=.===......=.===.=.===.=.......");
  });
});
