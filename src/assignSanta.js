const fs = require("fs");
const readEmployees = require("./readCSV");
const writeAssignments = require("./writeCSV");
const isTestEnv = process.env.NODE_ENV === "test";

//Function to shuffle an array
const shuffleArray = (array) => {
 for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]]; //Swapping the elements
 }
 return array;
}

//Here Function to assign Secret Santa pairs
const assignSecretSanta = async (employeeFile, previousYearFile = null) => {
 try {
  //Here to  read employees from CSV
  const employees = await readEmployees(employeeFile);
  if (employees.length < 2) throw new Error("Not enough employees!");

  //Here to read previous year assignments if provided
  let previousAssignments = [];
  if (previousYearFile && fs.existsSync(previousYearFile)) {
   previousAssignments = await readEmployees(previousYearFile);
  }

  let shuffled = [...employees];
  let validAssignment = false;

  while (!validAssignment) {
   shuffleArray(shuffled);
   validAssignment = true;

   for (let i = 0; i < employees.length; i++) {
    if (employees[i].Employee_EmailID === shuffled[i].Employee_EmailID) {
     validAssignment = false;
     console.warn("Self-assignment detected, reshuffling...");
     break;
    }

    //Checking the previous year
    const previousPair = previousAssignments.find(
     (pair) => pair.Employee_EmailID === employees[i].Employee_EmailID
    );
    if (previousPair && previousPair.Secret_Child_EmailID === shuffled[i].Employee_EmailID) {
     validAssignment = false;
     console.warn("Previous assignment conflict, reshuffling...");
     break;
    }
   }
  }

  //To prevent duplicate email
  const employeeEmails = new Set();
  for (let employee of employees) {
   if (employeeEmails.has(employee.Employee_EmailID)) {
    throw new Error(`Duplicate email found: ${employee.Employee_EmailID}`);
   }
   employeeEmails.add(employee.Employee_EmailID);
  }


  //Now Create assignment list
  const assignments = employees.map((employee, index) => ({
   Employee_Name: employee.Employee_Name,
   Employee_EmailID: employee.Employee_EmailID,
   Secret_Child_Name: shuffled[index].Employee_Name,
   Secret_Child_EmailID: shuffled[index].Employee_EmailID,
  }));

  return assignments;
 } catch (error) {
  console.error("Error message :", error.message);
 }
}

// assignSecretSanta("./data/employees.csv", "./data/previous_assignments.csv").then((pairs) =>
// console.log("result => ",pairs)
// );
assignSecretSanta("./data/employees.csv", "./data/previous_assignments.csv")
 .then((pairs) => {
  if (pairs) {
   return writeAssignments("./data/output.csv", pairs);
  }
 })
 .then(() => { if (!isTestEnv) console.log("Secret Santa assignments saved successfully!") })
 .catch((error) => console.error("Error:", error));

module.exports = assignSecretSanta;
