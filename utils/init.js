const inquirer = require("inquirer");
const db = require("../db/connection");
const query = require("./sql");

const init = () => {
  inquirer
    .prompt({
      type: "list",
      name: "answer",
      message: "What would you like to do? ",
      choices: [
        "View all employees",
        "View all employees by Department",
        "View all employees by Manager",
        "Add Employee",
        "Add Manager",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View all Roles",
      ],
    })
    .then((data) => {
      console.log(data.answer);
      let sql;

      if (data.answer === "View all employees") {
        sql = query("employee");
      } else if (data.answer === "View all employees by Department") {
        // sql = `SELECT * FROM employees`;
      } else {
      }

      // simple query
      db.query(sql, function (err, rows) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(rows); // results contains rows returned by server
      });
    });
};

module.exports = init;
