const fs = require("fs");
const csvParser = require("csv-parser");

async function readEmployees(filePath) {
  // return new Promise((resolve, reject) => {
  //   const employees = [];
  //   fs.createReadStream(filePath)
  //     .pipe(csvParser())
  //     .on("data", (row) => {
  //       employees.push(row);
  //     })
  //     .on("end", () => {
  //       resolve(employees);
  //     })
  //     .on("error", (error) => {
  //       reject(error);
  //     });
  // });

  //With error handling code Test

  return new Promise((resolve, reject) => {
   if (!fs.existsSync(filePath)) {
     return reject(new Error(`File not found: ${filePath}`));
   }

   const employees = [];
   fs.createReadStream(filePath)
     .pipe(csvParser())
     .on("data", (row) => {
       if (!row.Employee_Name || !row.Employee_EmailID) {
         console.warn("Skipping invalid row:", row);
         return;
       }
       employees.push(row);
     })
     .on("end", () => {
       if (employees.length < 2) {
         return reject(new Error("Not enough employees to assign Secret Santa!"));
       }
       resolve(employees);
     })
     .on("error", (error) => {
       reject(new Error(`Error reading CSV file: ${error.message}`));
     });
 });
}

readEmployees("./data/employees.csv")
  .then((employees) => console.log(employees))
  .catch((error) => console.error("Error reading file:", error));

module.exports = readEmployees;
