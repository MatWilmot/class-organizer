const inquirer = require("inquirer");

const studentNames = ["Mathew", "Hedi", "Jim"];
const staffNames = ["Donny", "Thomas"];

start();

function start() {
  inquirer
    .prompt([
      {
        name: "start",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "See staff, students, and grades",
          "Add a student to the class",
          "Remove a student from the class",
          "Add, remove, or update a student's grade",
          "Add staff to the class",
          "Remove staff from the class",
          "Quit",
        ],
      },
      {
        name: "seeClass",
        message: "Select a student to see their grades",
        type: "list",
        choices: [...studentNames, ...staffNames, "Go Back"],
        when: (answers) => answers.start === "See staff, students, and grades",
      },
      {
        name: "addStudent",
        message: "Enter student name:",
        type: "input",
        when: (answers) => answers.start === "Add a student to the class",
        default: "Type 'go back' to go back",
      },
      {
        name: "removeStudent",
        message: "Which student would you like to remove?",
        type: "list",
        choices: [...studentNames, "Go Back"],
        when: (answers) => answers.start === "Remove a student from the class",
      },
      {
        name: "confirmDeleteStudent",
        message: "Are you sure?",
        type: "confirm",
        when: (answers) =>
          typeof answers.removeStudent === "string" &&
          answers.removeStudent != "Go Back",
      },
      {
        name: "addGrade",
        message: "Select which student update:",
        type: "list",
        choices: [...studentNames, "Go Back"],
        when: (answers) =>
          answers.start === "Add, remove, or update a student's grade",
      },
      {
        name: "addStaff",
        message: "Enter staff name:",
        type: "input",
        when: (answers) => answers.start === "Add staff to the class",
        default: "Type 'go back' to go back",
      },
      {
        name: "removeStaff",
        message: "Which staff member would you like to remove?",
        type: "list",
        choices: [...staffNames, "Go Back"],
        when: (answers) => answers.start === "Remove staff from the class",
      },
      {
        name: "confirmDeleteStaff",
        message: "Are you sure?",
        type: "confirm",
        when: (answers) =>
          typeof answers.removeStaff === "string" &&
          answers.removeStaff != "Go Back",
      },
    ])
    .then((res) => {
      if (
        res.seeClass === "Go Back" ||
        res.removeStudent === "Go Back" ||
        res.addGrade === "Go Back" ||
        res.removeStaff === "Go Back"
      ) {
        start();
      }

      if (
        typeof res.addStudent === "string" &&
        res.addStudent.toLowerCase() === "go back"
      ) {
        start();
      }

      if (
        typeof res.addStaff === "string" &&
        res.addStaff.toLowerCase() === "go back"
      ) {
        start();
      }

      if (res.confirmDeleteStudent) {
        console.log(`Successfully removed ${res.removeStudent}`);
        start();
      }

      if (res.confirmDeleteStaff) {
        console.log(`Successfully removed ${res.removeStaff}`);
        start();
      }
    })
    .catch((err) => console.log(err));
}
