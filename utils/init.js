const inquirer = require("inquirer");
const db = require("../db/connection");
const {
  viewAllEmployees,
  viewAllEmployeesByDepartmentId,
  addEmployee,
} = require("./sql");
let Table = require("easy-table");

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

      if (data.answer === "View all employees") {
        viewAllEmployees();
        init();
      } else if (data.answer === "View all employees by Department") {
        viewAllEmployeesByDepartmentId();
        // init();
      } else if (data.answer === "Add Employee") {
        addEmployee();
        // init();
      }
    });
};

module.exports = init;
