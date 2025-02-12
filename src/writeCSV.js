const fs = require("fs");
const fastCsv = require("fast-csv");

function writeAssignments(filePath, data) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    fastCsv
      .write(data, { headers: true })
      .pipe(ws)
      .on("finish", resolve)
      .on("error", reject);
  });
}

module.exports = writeAssignments;