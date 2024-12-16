// Import named functions and default export from salaryData.js
import { getDataByRole, getDataByCompany } from './salaryData.js';
import salaryData from './salaryData.js';

// Function to calculate average salary by role
export const getAverageSalaryByRole = (role) => {
  const roleData = getDataByRole(role);
  const salariesOfRole = roleData.map((obj) => obj.salary);
  return calculateAverage(salariesOfRole);
};

// Function to calculate average salary by company
export const getAverageSalaryByCompany = (company) => {
  const companyData = getDataByCompany(company);
  const salariesAtCompany = companyData.map((obj) => obj.salary);
  return calculateAverage(salariesAtCompany);
};

// Function to get the specific salary for a role at a company
export const getSalaryAtCompany = (role, company) => {
  const companyData = getDataByCompany(company);
  const roleAtCompany = companyData.find((obj) => obj.role === role);
  return roleAtCompany ? roleAtCompany.salary : 0;
};

// Function to calculate the industry average salary
export const getIndustryAverageSalary = () => {
  const allSalaries = salaryData.map((obj) => obj.salary);
  return calculateAverage(allSalaries);
};

// Helper function: Calculates average
function calculateAverage(arrayOfNumbers) {
  if (arrayOfNumbers.length === 0) return 0;
  const total = arrayOfNumbers.reduce((sum, number) => sum + number, 0);
  return (total / arrayOfNumbers.length).toFixed(2);
}
