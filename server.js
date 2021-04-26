const app = require("./app");
const db = require("./database");
const config = require("./config");

db()
  .then((info) => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    app.listen(config.PORT, () => {
      console.log(`Example app listening at http://localhost:${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the DB, error: " + error);
    process.exit(1);
  });
