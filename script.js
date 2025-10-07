const apiEndpoint = "https://api.frankfurter.app/latest";
const currencyList = [
    "USD", "EUR", "INR", "GBP", "JPY", "CAD", "SGD", "AUD", "CNY", "NZD", "CHF"
];

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

// Populate currency lists
currencyList.forEach(code => {
    let opt1 = document.createElement("option");
    opt1.value = code;
    opt1.textContent = code;
    fromCurrency.appendChild(opt1);

    let opt2 = document.createElement("option");
    opt2.value = code;
    opt2.textContent = code;
    toCurrency.appendChild(opt2);
});
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Conversion logic
convertBtn.addEventListener("click", () => {
    let amt = parseFloat(amount.value);
    let from = fromCurrency.value;
    let to = toCurrency.value;

    result.textContent = "";
    if (isNaN(amt) || amt <= 0) {
        result.textContent = "Enter a valid amount";
        return;
    }
    if (from === to) {
        result.textContent = `${amt} ${from} = ${amt} ${to}`;
        return;
    }

    result.textContent = "Converting...";
    // Frankfurter uses 'from' and 'to'
    fetch(`${apiEndpoint}?amount=${amt}&from=${from}&to=${to}`)
        .then(res => res.json())
        .then(data => {
            let converted = data.rates[to];
            result.textContent = `${amt} ${from} = ${converted} ${to}`;
        }).catch(() => {
            result.textContent = "Error fetching conversion rate.";
        });
});
