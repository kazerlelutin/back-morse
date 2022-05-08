const todayWinners = require("./winners/todayWinners"),
  home = require("./home/home"),
  Router = require("@koa/router"),
  decodeSignal = require("./signal/decodeSignal"),
  router = new Router();

router.get("/", home);
router.get("/winner", todayWinners);
router.post("/message", decodeSignal);

module.exports = router;
