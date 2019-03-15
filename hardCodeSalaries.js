var dsr = {
    departmentId: ["d001", "d002", "d003", "d004", "d005", "d006", "d007", "d008", "d009"],
    departmentName: ["Marketing", "Financing", "Human Resources", "Production", "Development", "Quality Management", "Sales", "Research", "Customer Service"],
    employeeId: [
        [10017],
        [],
        [10005, 10013],
        [10003, 10004, 10018, 10020],
        [10001, 10006, 10012, 10014, 10022],
        [10009, 10010],
        [10002, 10016],
        [10007, 10019],
        []
    ],
    employeeName: [
        ["Christinel"],
        [],
        ['Kyoichi', 'Eberhardt'],
        ['Parto', 'Chirstian', 'Kazuhide', 'Mayuko'],
        ['Georgi', 'Anneke', 'Patricio', 'Berni', 'Shahaf'],
        ['Sumant', 'Duangkaew'],
        ['Bezalel', 'Kazuhito'],
        ['Tzvetan', 'Lillian'],
        []
    ],
    salaries: [
        [99651],
        [],
        [94692, 77935],
        [43311, 74057, 84672, 47017],
        [88958, 59755, 54423, 60598, 41348],
        [94409, 80324],
        [72527, 77935],
        [88070, 50032],
        []
    ],

    createReport: function() {
        var grandTotal = 0;
        for (var i = 0; i < this.departmentId.length; i++) {
            var subTotal = 0;
            console.log('');
            console.log(`Department ${this.departmentId[i]} - ${this.departmentName[i]}:`);

            for (var j = 0; j < this.employeeId[i].length; j++) {
                var totals = this.salaries[i][j];
                console.log(` ${j+1} Employee ID: ${this.employeeId[i][j]}, Name: ${this.employeeName[i][j]}, Salary: ${this.salaries[i][j]}`);
                subTotal += totals;
                grandTotal += totals;
            }
            console.log('----------------');
            console.log(' The Subtotal annual salaries for', this.departmentId[i], 'is:', subTotal);
        }
        console.log('');
        console.log('The Grand Total annual salaries for all departments is:', grandTotal);
    }
};

console.log(dsr.createReport());
