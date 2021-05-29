const db = require("./db/connection");
const init = require("./utils/init");

new Promise((resolve, reject) => {
  db.connect((err) => {
    if (err) throw err;
    console.log("Database connected.");
  });
})
  .then(init())
  .catch((err) => console.log(err));
