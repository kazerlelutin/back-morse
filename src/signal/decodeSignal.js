const db = require("../helpers/db/db"),
  _ = require("lodash"),
  today = require("../helpers/today/today");
const morseConverter = require("../helpers/morseConverter/morseConverter");

async function decodeSignal(ctx) {
  const { lang, msg } = JSON.parse(ctx.request.body),
    data = db.getData("/"),
    msgData = _.get(data, today());

  if (msgData[lang] === morseConverter(msg)) {
    const winners = msgData.winners + 1;
    msgData.winners = winners;
    ctx.io.emit("classment", winners);
    db.push("/" + today(), msgData);
    ctx.body = "win";
  } else {
    ctx.body = "loose";
  }
}

module.exports = decodeSignal;
