const random = require("../helpers/random/random"),
  tmdb = require("./tmdb");

/**
 * @param {Array} idsDejaVu - Array with ids for exclude to returns.
 * @returns {{id: Number, tagline: {fr: String,en:String}}} tagline is small  sentence, id for save in DB.
 */
async function getRandomTaglineFromTmdb(idsDejaVu = []) {
  let selectMovie = undefined,
    fetchTry = 0;

  do {
    const res = await tmdb("discover/movie", "&page=" + random(1, 700));

    if (res) {
      const ids = [...res.results.map((movie) => movie.id)],
        index = random(0, ids.length - 1),
        select = ids[index],
        movieFr = await tmdb("movie/" + select, "&language=fr-FR"),
        movieEn = await tmdb("movie/" + select);

      if (
        movieEn &&
        movieFr &&
        movieEn.tagline &&
        movieFr.tagline &&
        !idsDejaVu.find((o) => o === movieFr.id)
      ) {
        selectMovie = {
          id: movieEn.id,
          tagline: {
            fr: movieFr.tagline,
            en: movieEn.tagline,
          },
        };
      }
    }

    fetchTry++;

    if (fetchTry === 300) {
      selectMovie = {
        id: movieFr.id,
        tagline: {
          fr: "Parfois, nous échouons",
          en: "Sometimes we fail",
        },
      };
    }
  } while (selectMovie === undefined);

  return selectMovie;
}

module.exports = getRandomTaglineFromTmdb;
