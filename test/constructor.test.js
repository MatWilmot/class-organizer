const Student = require("../util/Student");
const Staff = require("../util/Staff");

const student = new Student("Mathew Wilmot");
const staff = new Staff("Thomas Smith", "Tutor");

// ---------- STUDENT TESTS ----------

describe("Student Object", () => {
  describe("Create New Student", () => {
    it("Should create a new student object with their name set to the constructor argument", () => {
      const newStudent = new Student("Mathew Wilmot");

      expect(newStudent.Name).toBe("Mathew Wilmot");
    });
  });

  describe("getName()", () => {
    it("Should return the name of the student", () => {
      expect(student.getName()).toBe("Mathew Wilmot");
    });
  });

  describe("addHomework()", () => {
    it("Should add an object to the homework array with title and grade set per the constructor argument", () => {
      student.addHomework("Responsive Portfolio", "A+");
      expect(student.Homework).toEqual([
        {
          Homework: "Responsive Portfolio",
          Grade: "A+",
        },
      ]);
    });
  });

  describe("getHomework()", () => {
    it("Should return the homework array", () => {
      // don't need to add anything to homework array since last test already added to it
      expect(student.getHomework()).toEqual([
        {
          Homework: "Responsive Portfolio",
          Grade: "A+",
        },
      ]);
    });
  });
});

// ---------- STAFF TESTS ----------

describe("New Staff", () => {
  describe("Create New Staff", () => {
    it("Should create a new staff object with their name and title set to the constructor's arguments", () => {
      const newStaff = new Staff("Mathew Wilmot", "TA");

      expect(newStaff.name).toBe("Mathew Wilmot");
      expect(newStaff.title).toBe("TA");
    });
  });

  describe("getName()", () => {
    it("Should return the name of the staff member", () => {
      expect(staff.getName()).toBe("Thomas Smith");
    });
  });

  describe("getTitle()", () => {
    it("Should return the title of the staff member", () => {
      expect(staff.getTitle()).toBe("Tutor");
    });
  });
});
