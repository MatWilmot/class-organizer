class Student {
  constructor(name) {
    this.Name = name;
    this.Homework = [];
  }

  getName() {
    return this.Name;
  }

  addHomework(title, grade) {
    this.Homework.push({
      Homework: title,
      Grade: grade,
    });
  }

  getHomework() {
    return this.Homework;
  }
}

module.exports = Student;
