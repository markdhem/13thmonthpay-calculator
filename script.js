

let MONTHS = [];
for (var i = 0; i < 12; i++) {
  var d = new Date((i + 1) + '/1');
  MONTHS.push(d.toLocaleDateString(undefined, {month: 'long'}));
}

function initializeTable() {
    const tableBody = document.querySelector('#salaryTable tbody');
    tableBody.innerHTML = ''; 

    MONTHS.forEach((month, index) => {
        const row = tableBody.insertRow();
        const monthCell = row.insertCell();
        monthCell.textContent = month;
        const salaryCell = row.insertCell();
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'salary-input';
        input.id = `salary-${index}`; 
        input.value = '0'; 
        input.min = '0';
        input.placeholder = '0.00';

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculate13thMonthPay();
            }
        });

        salaryCell.appendChild(input);
    });
}

function quickFillTable() {
    const quickFillInput = document.getElementById('quickFillSalary');
    let fillValue = parseFloat(quickFillInput.value);

    if (isNaN(fillValue) || fillValue < 0) {
        alert("Please enter a valid positive salary amount for the Quick Fill.");
        quickFillInput.value = '';
        return;
    }

    fillValue = fillValue.toFixed(2);

    MONTHS.forEach((month, index) => {
        const input = document.getElementById(`salary-${index}`);
        if (input) {
            input.value = fillValue;
        }
    });

    calculate13thMonthPay();
}

function calculate13thMonthPay() {
    let totalBasicSalaryEarned = 0;
    const resultElement = document.getElementById('result');
    const totalEarnedElement = document.getElementById('totalSalaryEarned');

    MONTHS.forEach((month, index) => {
        const input = document.getElementById(`salary-${index}`);
      const salary = parseFloat(input.value) || 0;
        totalBasicSalaryEarned += salary;
    });
    const denominator = 12;
    const thirteenthMonthPay = totalBasicSalaryEarned / denominator;

    if (totalBasicSalaryEarned <= 0) {
        resultElement.textContent = "Total salary earned must be greater than zero.";
        resultElement.style.color = 'red';
        totalEarnedElement.textContent = "Total Basic Salary Earned: PHP 0.00";
        return;
    }

    const formattedTotalEarned = totalBasicSalaryEarned.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
    });

    const formatted13thPay = thirteenthMonthPay.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
    });

    totalEarnedElement.textContent = `Total Basic Salary Earned: ${formattedTotalEarned}`;
    resultElement.textContent = formatted13thPay;
    resultElement.style.color = '#007bff';
}


document.addEventListener('DOMContentLoaded', initializeTable);