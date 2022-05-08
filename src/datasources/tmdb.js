const axios = require("axios");

async function tmdb(path, params = "") {
  const url =
    process.env.TMDB_BASE_URL +
    path +
    "?api_key=" +
    process.env.TMDB_API_KEY +
    params;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (_e) {
    return undefined;
  }
}

module.exports = tmdb;
