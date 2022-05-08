const _ = require("lodash"),
  alphabetMorse = require("../../../data/alphabet.morse");

/**
 * @param {string} text
 * @returns {string} - morse code
 */
function morseConverter(text) {
  const textSplit = text.split(""),
    letters = textSplit.map((letter) => {
      const morseLetter = alphabetMorse[_.deburr(letter).toLowerCase()];
      if (morseLetter) {
        const code = morseLetter.split(""),
          convertToSignal = code.map(
            (signal) => signal.replace("-", "===").replace(".", "=") + "."
          );

        return convertToSignal.join("") + "..";
      } else {
        return "....";
      }
    }),
    msg = letters.join("") + "...";
  //add begin and end instructions.
  return "=.===.=.===......." + msg + "=.===.=.===.=.......";
}

module.exports = morseConverter;
