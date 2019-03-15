var fs = require('fs');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});


var dsr = {

  departmentId: [],
  departments: [],
  employeeId: [],
  employeeName: [],
  salaries: [],
    
  loadDeptNames: function() {
    fs.readFile('departmentName.txt', 'utf8', function(err, data) {
      if (err) throw err;

      var deptDataClean = data.replace(/INSERT INTO `departments` VALUES /g, "");
      var deptDataArray = deptDataClean.split('\n');

      for (var i = 0; i < deptDataArray.length; i++) {
        // populate single-d arrays with DATA
        // departmentId.push(d001);
        this.departmentId.push(deptDataArray[i].slice(2, 6));
        this.departments.push(deptDataArray[i].slice(9, -3));

        // populate multi-d arrays with empty sub-arrays [] (NO DATA!!!)

        this.employeeId.push([]);
        this.employeeName.push([]);
        this.salaries.push([]);
      }
    });
  },

  loadDeptEmp: function() {
    fs.readFile('depNumber.txt', 'utf8', function(err, data) {
      if (err) throw err;
      var employeeDataClean = data.replace(/INSERT INTO `dept_emp` VALUES /g, "");

      var employeeDataArray = employeeDataClean.split('\n');
      for (var i = 0; i < employeeDataArray.length; i++) {
        // Pull current employees first
        if (employeeDataArray[i].slice(28, 32) == '9999') {
          this.employeeId[this.departmentId.indexOf(employeeDataArray[i].slice(8, 12))].push(employeeDataArray[i].slice(1, 6));
        }
      }
    });
  },

  loadEmp: function() {
    fs.readFile('empName.txt', 'utf8', function(err, data) {
      if (err) throw err;
      var empDataClean = data.replace(/INSERT INTO `employees` VALUES /g, ""); // Clean text file with unwanted header
      var empDataArray = empDataClean.split('\n'); // Split file into arrays
      // Loop [i] to iterate through the cleaned data files to find how many employees
      for (var i = 0; i < empDataArray.length; i++) {
        // Loop [j] to iterate through the employeeId array to map the employee's id number for if statement comparision
        for (var j = 0; j < this.employeeId.length; j++) {
          // Loop [k] to iterate through each employeeId array's elements to map out their id for if statememnt comparision
          for (var k = 0; k < this.employeeId[j].length; k++) {
            // Compare employeeId array's element to employee's id of current text file
            // If a match is found, slice the employee's name and push it into the employeeName array
            if (this.employeeId[j][k] == empDataArray[i].slice(1, 6)) {
              this.employeeName[j].push(empDataArray[i].slice(21, -16).replace(/'/g, '').replace(/,/g, ' '));
            }
          }
        }
      }
    });
  },

  loadSalaries: function() {
    // Salary arrays
    var salaryDataClean;
    var salaryDataArray;

    // Process 'load_salaries.txt' file
    fs.readFile('empSalary.txt', 'utf8', function(err, data) {
      if (err) throw err;

      salaryDataClean = data.replace(/INSERT INTO `salaries` VALUES /g, ''); // Clean text file with unwanted header
      salaryDataArray = salaryDataClean.split('\n'); // Split file into arrays
      // Loop [i] to iterate through the cleaned data files to find how many salaries
      for (var i = 0; i < salaryDataArray.length; i++) {
        // Compare salaries promotion date of current text file to find all current employees with a date of '9999'
        if (salaryDataArray[i].slice(27, 31) == '9999') {
          // If date found, loop through [j] to find the index map of array employeeId
          for (var j = 0; j < this.employeeId.length; j++) {
            // Loop [k] to search through each array's elements within employeeId
            for (var k = 0; k < this.employeeId[j].length; k++) {
              // If match is found in employeeID and current text file of employee id column
              if (this.employeeId[j][k] == salaryDataArray[i].slice(1, 6)) {
                // Slice the employee's last salary of the matching date of '9999' and push it into salaries array mapping as employeeID
                this.salaries[j].push(salaryDataArray[i].slice(7, 12));
              }
            }
          }
        }
      }
    });
  },

  printSalaryReport: function() {
    // Reporting: salaryReport shows each employee, grouped by dept and current salary. Each dept shows a total salary budget and a overall company salary budget
    // Declare variable to begin with zero
    var companySalaryTotal = 0;
    // Loop [i] to iterate through departmentId array
    for (var i = 0; i < this.departmentId.length; i++) {
      // Declare variable to begin with zero and keeping it within the loop to record each dept total
      // This will reset back to zero after each loop
      var deptSalaryTotal = 0;
      // Begin report by printing each dept id and departmet name from loop [i]
      console.log(this.departmentId[i] + '-' + this.departments[i] + ':');
      // Loop [j] to iterate through employeeId
      for (var j = 0; j < this.employeeId[i].length; j++) {
        // Print out each employee id, name, and salary...under each department from the [i] loop
        console.log('  ', this.employeeId[i][j], ' || Name: ' + this.employeeName[i][j] + ' || Salary: ' + this.formatter.format(this.salaries[i][j]));
        // After each loop, record each employee's salary to print out only per dept.
        deptSalaryTotal += parseInt(this.salaries[i][j]);
        // After each loop, record each employee's salary to print out the company's grand total
        companySalaryTotal += parseInt(this.salaries[i][j]);

      }
      console.log('--------------------------------------\nTotal Department Salary Budget: ' + this.deptSalaryTotal + '\n');
    }
    console.log('******************************************************\nSalary Budget for the entire company: ' + this.companySalaryTotal + '\n******************************************************\n');
  }
};

var displaySalaries = dsr.printSalaryReport();
console.log(displaySalaries);