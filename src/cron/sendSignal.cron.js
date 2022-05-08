const today = require("../helpers/today/today"),
  getRandomTaglineFromTmdb = require("../datasources/getRandomTaglineFromTmdb"),
  _ = require("lodash"),
  db = require("../helpers/db/db"),
  CronJob = require("cron").CronJob,
  morseConverter = require("../helpers/morseConverter/morseConverter");

function sendSignalCron(io) {
  let index = 0,
    indexFr = 0,
    msg = morseConverter("this is a message."),
    msgFr = morseConverter("ceci est un message."),
    splitMsgFr = msgFr.split(""),
    splitMsg = msg.split("");
    
  const database = db.getData("/"),
    todayData = _.get(database, today());

  if (!todayData) {
    db.push("/" + today(), { winners: 0, en: msg, fr: msgFr });
  } else {
    msg = morseConverter(todayData.en);
    msgFr = morseConverter(todayData.fr);
    splitMsgFr = msgFr.split("");
    splitMsg = msg.split("");
  }

  setInterval(() => {
    io.emit("signal_fr", splitMsgFr[index]);
    io.emit("signal_en", splitMsg[index]);

    if (index === splitMsg.length - 1) {
      index = 0;
    } else {
      index++;
    }
    if (indexFr === splitMsgFr.length - 1) {
      indexFr = 0;
    } else {
      indexFr++;
    }
  }, 200);

  const job = new CronJob("4 0 * * *", async () => {
    const database = db.getData("/"),
      selectMovie = await getRandomTaglineFromTmdb(_.get(database.ids));
      
    if (selectMovie) {
      msg = morseConverter(selectMovie.tagline.en);
      msgFr = morseConverter(selectMovie.tagline.fr);
      splitMsgFr = msgFr.split("");
      splitMsg = msg.split("");
      db.push("/ids[]", selectMovie.id);
      db.push("/" + today(), { winners: 0, en: msg, fr: msgFr });
      //trigger for reload front page
      io.emit("reload", true);
      db.save();
    }
  });
  job.start();
}

module.exports = sendSignalCron;
