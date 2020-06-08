const inquirer = require("inquirer");
const Student = require("./util/Student");
const Staff = require("./util/Staff");
const fs = require("fs");

let file;
let stuObjArray;
let stuNameArray = [];

function getArray() {
  file = fs.readFileSync("./studentArray.json");
  stuObjArray = JSON.parse(file);
  stuObjArray.forEach((element) => {
    stuNameArray.push(element.Name);
  });
}

getArray();
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
        choices: [...stuNameArray, "Go Back"],
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
        choices: [...stuNameArray, "Go Back"],
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
        choices: [...stuNameArray, "Go Back"],
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
        choices: ["Go Back"],
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
      // ---------- 'GO BACK' ----------

      if (
        res.seeClass === "Go Back" ||
        res.removeStudent === "Go Back" ||
        res.addGrade === "Go Back" ||
        res.removeStaff === "Go Back"
      ) {
        start();
      }

      // ---------- ADD STUDENT ----------

      if (
        typeof res.addStudent === "string" &&
        res.addStudent.toLowerCase() === "go back"
      ) {
        start();
      } else if (
        typeof res.addStudent === "string" &&
        res.addStudent.toLowerCase() != "go back"
      ) {
        let toAdd = new Student(res.addStudent);
        stuNameArray.push(res.addStudent);
        stuObjArray.push(toAdd);
        displayArrays();
        saveArray();
        start();
      }

      // ---------- REMOVE STUDENT ----------

      if (res.confirmDeleteStudent) {
        spliceArrays(res.removeStudent);
        saveArray();
        start();
      }
    })
    .catch((err) => console.log(err));
}

function displayArrays() {
  console.log(stuObjArray);
  console.log(stuNameArray);
}

function saveArray() {
  fs.writeFile("studentArray.json", JSON.stringify(stuObjArray), function (
    err
  ) {
    if (err) {
      throw err;
    }
  });
}

function spliceArrays(name) {
  stuObjArray.forEach((element, index) => {
    if (element.Name === name) {
      console.log("Removing", name, "from index", index);
      stuObjArray.splice(index, 1);
      stuNameArray.splice(index, 1);
    }
  });
}
