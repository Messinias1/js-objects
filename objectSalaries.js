var fs = require('fs');

var dsr = {
    departmentId: [],
    departmentName: [],

    employeeId: [],
    employeeName: [],
    salaries: [],

    depNames: function() {
        var contents = fs.readFileSync('departmentName.txt', 'utf8'); //function(err, data) {
        // if (err) throw err;

        var deptDataClean = contents.replace(/INSERT INTO `departments` VALUES /g, "");
        var deptDataArray = deptDataClean.split('\n');
        deptDataArray.shift();

        for (var i = 0; i < deptDataArray.length; i++) {
            this.departmentId.push(deptDataArray[i].slice(2, 6));
            this.departmentName.push(deptDataArray[i].slice(9, -3));

            this.employeeId.push([]);
            this.employeeName.push([]);
            this.salaries.push([]);
        }
    },

    depNum: function() {
        var contents = fs.readFileSync('depNumber.txt', 'utf8'); //, function(err, data) {
        //if (err) throw err;
        var employeeDataClean = contents.replace(/INSERT INTO `dept_emp` VALUES /g, '');
        var employeeDataArray = employeeDataClean.split('\n');

        for (var i = 0; i < employeeDataArray.length; i++) {
            if (employeeDataArray[i].slice(28, 32) == '9999') {
                this.employeeId[this.departmentId.indexOf(employeeDataArray[i].slice(8, 12))].push(employeeDataArray[i].slice(1, 6));
            }
        }
    },
    salary: function() {
        var contents = fs.readFileSync('empSalary.txt', 'utf8'); //, function(err, data) {
        //if (err) throw err;

        var salaryDataClean = contents.replace(/INSERT INTO `salaries` VALUES /g, '');
        var salaryDataArray = salaryDataClean.split('\n');

        for (var i = 0; i < salaryDataArray.length; i++) {
            if (salaryDataArray[i].slice(27, 31) == '9999') {
                for (var j = 0; j < this.employeeId.length; j++) {
                    for (var k = 0; k < this.employeeId[j].length; k++) {
                        if (this.employeeId[j][k] == salaryDataArray[i].slice(1, 6)) {

                            this.salaries[j].push(salaryDataArray[i].slice(7, 12));
                        }
                    }
                }
            }
        }

    },
    empName: function() {
        var contents = fs.readFileSync('empName.txt', 'utf8'); //, function(err, data) {
        //if (err) throw err;

        var empDataClean = contents.replace(/INSERT INTO `employees` VALUES /g, '');
        var empDataArray = empDataClean.split('\n');

        for (var i = 0; i < empDataArray.length; i++) {
            if (empDataArray[i].slice(1, 6) !== '10008', '10011', '10015') {
                for (var j = 0; j < this.employeeId.length; j++) {
                    for (var k = 0; k < this.employeeId[j].length; k++) {
                        if (this.employeeId[j][k] == empDataArray[i].slice(1, 6)) {

                            this.employeeName[j].push(empDataArray[i].slice(21, -16).replace(/\',\'/g, ' '));
                        }
                    }
                }
            }
        }

    },
    createReport: function() {
        var grandTotal = 0;
        for (var i = 0; i < this.departmentId.length; i++) {
            var subTotal = 0;
            console.log('');
            console.log(`Department ${this.departmentId[i]} - ${this.departmentName[i]}:`);

            for (var j = 0; j < this.employeeId[i].length; j++) {
                var totals = parseInt(this.salaries[i][j]);
                console.log(` ${j+1} Employee ID: ${this.employeeId[i][j]}, Name: ${this.employeeName[i][j]}, Salary: ${parseInt(this.salaries[i][j])}`);
                subTotal += totals;
                grandTotal += totals;
            }
            console.log('-------------------------------------------------------------------------');
            console.log(' The Subtotal annual salaries for', this.departmentId[i], 'is:', subTotal);
        }
        console.log('');
        console.log('The Grand Total annual salaries for all departments is:', grandTotal);
    }
};
dsr.depNames();
dsr.depNum();
dsr.salary();
dsr.empName();
dsr.createReport();
console.log(dsr);

/*depNum: function() {
        fs.readFileSync('depNumber.txt', 'utf8', function(err, data) {
            if (err) throw err;
            var employeeDataClean = data.replace(/INSERT INTO `dept_emp` VALUES /g, '');
            var employeeDataArray = employeeDataClean.split('\n');

            for (var i = 0; i < employeeDataArray.length; i++) {
                if (employeeDataArray[i].slice(28, 32) == '9999') {
                    this.employeeId[this.departmentId.indexOf(employeeDataArray[i].slice(8, 12))].push(employeeDataArray[i].slice(1, 6));
                }
            }
            console.log(this.employeeId);
        });
    },

    salary: function() {
        fs.readFileSync('empSalary.txt', 'utf8', function(err, data) {
            if (err) throw err;

            var salaryDataClean = data.replace(/INSERT INTO `salaries` VALUES /g, '');
            var salaryDataArray = salaryDataClean.split('\n');

            for (var i = 0; i < salaryDataArray.length; i++) {
                if (salaryDataArray[i].slice(27, 31) == '9999') {
                    for (var j = 0; j < this.employeeId.length; j++) {
                        for (var k = 0; k < this.employeeId[j].length; k++) {
                            if (this.employeeId[j][k] == salaryDataArray[i].slice(1, 6)) {

                                this.salaries[j].push(salaryDataArray[i].slice(7, 12));
                            }
                        }
                    }
                }
            }
            console.log(this.salaries);
        });
    },

    empName: function() {
        fs.readFileSync('empName.txt', 'utf8', function(err, data) {
            if (err) throw err;

            var empDataClean = data.replace(/INSERT INTO `employees` VALUES /g, '');
            var empDataArray = empDataClean.split('\n');

            for (var i = 0; i < empDataArray.length; i++) {
                if (empDataArray[i].slice(1, 6) !== '10008', '10011', '10015') {
                    for (var j = 0; j < this.employeeId.length; j++) {
                        for (var k = 0; k < this.employeeId[j].length; k++) {
                            if (this.employeeId[j][k] == empDataArray[i].slice(1, 6)) {

                                this.employeeName[j].push(empDataArray[i].slice(21, -16).replace(/\',\'/g, ' '));
                            }
                        }
                    }
                }
            }
            console.log(this.employeeName);
        });
    },

    createReport: function() {
        var grandTotal = 0;
        for (var i = 0; i < this.departmentId.length; i++) {
            var subTotal = 0;
            console.log('');
            console.log(`Department ${this.departmentId[i]} - ${this.departmentName[i]}:`);

            for (var j = 0; j < this.employeeId[i].length; j++) {
                var totals = parseInt(this.salaries[i][j]);
                console.log(` ${j+1} Employee ID: ${this.employeeId[i][j]}, Name: ${this.employeeName[i][j]}, Salary: ${parseInt(this.salaries[i][j])}`);
                subTotal += totals;
                grandTotal += totals;
            }
            console.log('-------------------------------------------------------------------------');
            console.log(' The Subtotal annual salaries for', this.departmentId[i], 'is:', subTotal);
        }
        console.log('');
        console.log('The Grand Total annual salaries for all departments is:', grandTotal);
    },
};

console.log(this.departmentId);
//console.log(this.createReport()); */
