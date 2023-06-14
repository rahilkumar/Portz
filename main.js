// Function to retrieve the API key from the text file
function getApiKey() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText.trim());
      } else {
        reject(new Error('Failed to fetch API key'));
      }
    };
    xhr.onerror = function () {
      reject(new Error('Failed to fetch API key'));
    };
    xhr.open('GET', 'api-key.txt');
    xhr.send();
  });
}

// Function to retrieve current stock prices
async function getCurrentPrice(symbol) {
  try {
    const apiKey = await getApiKey();
    const tdurl = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`;
    const response = await fetch(tdurl);
    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.log('Error:', error.message);
    throw error;
  }
}

// Get the necessary elements from the DOM
const stockForm = document.getElementById('stockForm');
const symbolInput = document.getElementById('symbolInput');
const resultDiv = document.getElementById('result');

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const symbol = symbolInput.value;

  try {
    const price = await getCurrentPrice(symbol);
    resultDiv.textContent = `Current Price for ${symbol}: $${price}`;
  } catch (error) {
    resultDiv.textContent = 'Error fetching stock price';
    console.log('Error:', error);
  }
}

// Event listener for input field
symbolInput.addEventListener('input', function () {
  this.value = this.value.toUpperCase();
});

// Add event listener to the form's submit event
stockForm.addEventListener('submit', handleFormSubmit);

// Get the necessary elements from the DOM
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const container = document.querySelector('.container');

// Event listener for theme toggle switch
themeToggle.addEventListener('change', function () {
  if (this.checked) {
    activateDarkTheme();
  } else {
    activateLightTheme();
  }
});

// Function to activate dark theme
function activateDarkTheme() {
  body.classList.add('dark-theme');
  container.classList.add('dark-theme');
}

// Function to activate light theme
function activateLightTheme() {
  body.classList.remove('dark-theme');
  container.classList.remove('dark-theme');
}
