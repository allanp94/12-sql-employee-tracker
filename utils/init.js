const inquirer = require("inquirer");
const db = require("../db/connection");
const {
  viewAllEmployees,
  viewAllEmployeesByDepartmentId,
  addEmployee,
  employeeByManager,
  addManager,
  removeEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewAllRoles,
} = require("./sql");
let Table = require("easy-table");

const init = async () => {
  inquirer
    .prompt({
      type: "list",
      name: "answer",
      message:
        "What would you like to do? (7sec timer until menu shows up again) ",
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
        "Exit",
      ],
    })
    .then(({ answer }) => {
      if (answer === "View all employees") {
        viewAllEmployees();
        // setTimeout(() => init(), 3000);
      } else if (answer === "View all employees by Department") {
        viewAllEmployeesByDepartmentId();
        // setTimeout(() => init(), 3000);
      } else if (answer === "View all employees by Manager") {
        employeeByManager();
      } else if (answer === "Add Employee") {
        addEmployee();
      } else if (answer === "Add Manager") {
        addManager();
      } else if (answer === "Remove Employee") {
        removeEmployee();
      } else if (answer === "Update Employee Role") {
        updateEmployeeRole();
      } else if (answer === "Update Employee Manager") {
        updateEmployeeManager();
      } else if (answer === "View all Roles") {
        viewAllRoles();
      } else {
        return;
      }

      //timeout to delay the init() function from exucuting so the user can enter the information required
      setTimeout(() => {
        init();
      }, 9000);
    })
    .catch((err) => console.log(err));
};

module.exports = init;
