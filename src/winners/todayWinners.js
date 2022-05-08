const db = require("../helpers/db/db"),
  _ = require("lodash"),
  today = require("../helpers/today/today");

async function todayWinners(ctx) {
  const data = db.getData("/"),
    msgData = _.get(data, today());
  ctx.body = msgData.winners;
}

module.exports = todayWinners;
