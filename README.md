# Secret-Santa-Game

# Project Overview

The **Secret Santa Game** is a Node.js-based application that randomly assigns each participant a Secret Santa while ensuring that no one is assigned to themselves. The program reads employee details from a CSV file, shuffles them, and generates unique assignments. It also checks past assignments to avoid repeating the same pairings.

# Tech Stack

- **Node.js**
- **JavaScript**
- **Jest** (for testing)
- **CSV Parser** (for reading employee data)

# Project Structure

Secret-Santa-Game/
│── data/
│   ├── employees.csv              # Employee details
│   ├── previous_assignments.csv   # Past assignments (if available)
│
│── src/
│   ├── readCSV.js                 # Reads data from CSV
│   ├── assignSanta.js             # Core logic for assigning Secret Santa
│
│── tests/
│   ├── assignSanta.test.js        # Test cases
│
│── package.json
│── README.md

# Installation & Setup
# 1. Clone the Repository

git clone https://github.com/yourusername/Secret-Santa-Game.git
cd Secret-Santa-Game

# 2. Install Dependencies

npm install

# 3. Run the Secret Santa Assignment

node src/assignSanta.js

# 4. Run Tests

npm test

# Features

=> Reads employee data from a CSV file.  
=> Ensures unique Secret Santa assignments.  
=> Prevents self-assignment.  
=> Avoids repeat assignments from the previous year.  
=> Includes Jest tests to verify the assignment logic.  

# Example Employee Data (`employees.csv`)

Employee_Name,Employee_EmailID
Hamish Murray,hamish.murray@acme.com
Layla Graham,layla.graham@acme.com
Matthew King,matthew.king@acme.com

# Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes.
4. Push to your branch.
5. Create a Pull Request.

# Contact
For any queries, reach out at **sakeerthana272000@gmail.com**.
