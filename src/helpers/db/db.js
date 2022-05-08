const { JsonDB } = require('node-json-db'),
 { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new Config("save", true, false, '/'));

module.exports = db;