// modules/utilities.js

// Function to format a number with commas and two decimal places
export const formatNumber = (number) => {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  