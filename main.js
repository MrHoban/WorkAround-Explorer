import { getRoles, getCompanies } from './salaryData.js';
import {
  getAverageSalaryByRole,
  getAverageSalaryByCompany,
  getSalaryAtCompany,
  getIndustryAverageSalary
} from './workAroundModule.js';
import { formatNumber } from './modules/utilities.js';

// Initialize companies and roles
const companies = getCompanies();
const roles = getRoles();

// Chart instance variable (to update dynamically later)
let salaryChart;

// Create input buttons
renderInputButtons(companies, 'company');
renderInputButtons(roles, 'role');

// Function to render input buttons
function renderInputButtons(labels, groupName) {
  const container = document.createElement('section');
  container.setAttribute('id', `${groupName}Inputs`);

  let header = document.createElement('h3');
  header.innerText = `Select a ${groupName}`;
  container.appendChild(header);

  labels.forEach((label) => {
    let divElement = document.createElement('div');
    divElement.setAttribute('class', 'option');

    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'radio');
    inputElement.setAttribute('name', groupName);
    inputElement.setAttribute('value', label);
    divElement.appendChild(inputElement);

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', label);
    labelElement.innerText = label;
    divElement.appendChild(labelElement);

    inputElement.addEventListener('click', updateResults);
    container.appendChild(divElement);
  });

  document.querySelector('main').prepend(container);
}

function updateResults() {
  const company = document.querySelector("input[name='company']:checked")?.value;
  const role = document.querySelector("input[name='role']:checked")?.value;

  if (!company || !role) return;

  // Calculated data
  const salary = getSalaryAtCompany(role, company);
  const averageSalaryByRole = getAverageSalaryByRole(role);
  const averageSalaryByCompany = getAverageSalaryByCompany(company);
  const industryAverageSalary = getIndustryAverageSalary();

  // Update results display
  document.getElementById('salarySelected').innerText = `The salary for ${role}s at ${company} is \$${formatNumber(salary)}`;
  document.getElementById('salaryAverageByRole').innerText = `The industry average salary for ${role} positions is \$${formatNumber(averageSalaryByRole)}`;
  document.getElementById('salaryAverageByCompany').innerText = `The average salary at ${company} is \$${formatNumber(averageSalaryByCompany)}`;
  document.getElementById('salaryAverageIndustry').innerText = `The average salary in the Tech industry is \$${formatNumber(industryAverageSalary)}`;

  // Update the chart
  renderSalaryChart(role, company, salary, averageSalaryByRole, averageSalaryByCompany, industryAverageSalary);
}

// Function to render or update the chart
function renderSalaryChart(role, company, salary, roleAverage, companyAverage, industryAverage) {
  const ctx = document.getElementById('salaryChart').getContext('2d');

  if (salaryChart) {
    salaryChart.destroy(); // Destroy previous chart instance
  }

  salaryChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Salary at Company', 'Industry Average (Role)', 'Company Average', 'Industry Average (Overall)'],
      datasets: [{
        label: `Salary Comparison for ${role} at ${company}`,
        data: [salary, roleAverage, companyAverage, industryAverage],
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Salary in USD'
          }
        }
      }
    }
  });
}
