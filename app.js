require("dotenv").config();

const Koa = require("koa"),
  router = require("./src/router"),
  app = new Koa(),
  koaBody = require("koa-body"),
  cors = require("@koa/cors"),
  http = require("http"),
  httpServer = http.createServer(app.callback()),
  sendSignalCron = require("./src/cron/sendSignal.cron"),
  io = require("socket.io")(httpServer, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    },
  });

app
  .use(koaBody())
  .use(cors())
  .use((ctx, next) => {
    if (!ctx.io) ctx.io = io;
    next();
  })
  .use(router.routes())
  .use(router.allowedMethods());

//cron taskes launch
sendSignalCron(io);

httpServer.listen(3000);
