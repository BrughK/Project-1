let dropList = document.querySelectorAll("form select");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let getButton = document.querySelector("form button");
let getCurrency = document.querySelector("exchange-rate");
var APIKey = "d66d2ede002583e676b55c4e";
var todaysDate = moment().format("MMMM Do, YYYY");
let conversions = [];
let conList = document.getElementById('history');
let historyBtn = document.getElementById('history');
const country_list = {
    "AED" : "AE",
    "AFN" : "AF",
    "XCD" : "AG",
    "ALL" : "AL",
    "AMD" : "AM",
    "AOA" : "AO",
    "ARS" : "AR",
    "AUD" : "AU",
    "AZN" : "AZ",
    "BAM" : "BA",
    "BBD" : "BB",
    "BDT" : "BD",
    "BGN" : "BG",
    "BHD" : "BH",
    "BIF" : "BI",
    "BMD" : "BM",
    "BND" : "BN",
    "BOB" : "BO",
    "BRL" : "BR",
    "BSD" : "BS",
    "NOK" : "BV",
    "BWP" : "BW",
    "BZD" : "BZ",
    "CAD" : "CA",
    "CDF" : "CD",
    "XAF" : "CF",
    "CHF" : "CH",
    "CLP" : "CL",
    "CNY" : "CN",
    "COP" : "CO",
    "CRC" : "CR",
    "CUP" : "CU",
    "CVE" : "CV",
    "CZK" : "CZ",
    "DJF" : "DJ",
    "DKK" : "DK",
    "DOP" : "DO",
    "DZD" : "DZ",
    "EGP" : "EG",
    "ETB" : "ET",
    "EUR" : "FR",
    "FJD" : "FJ",
    "FKP" : "FK",
    "GBP" : "GB",
    "GEL" : "GE",
    "GGP" : "GG",
    "GHS" : "GH",
    "GIP" : "GI",
    "GMD" : "GM",
    "GNF" : "GN",
    "GTQ" : "GT",
    "GYD" : "GY",
    "HKD" : "HK",
    "HNL" : "HN",
    "HRK" : "HR",
    "HTG" : "HT",
    "HUF" : "HU",
    "IDR" : "ID",
    "ILS" : "IL",
    "INR" : "IN",
    "IQD" : "IQ",
    "IRR" : "IR",
    "ISK" : "IS",
    "JMD" : "JM",
    "JOD" : "JO",
    "JPY" : "JP",
    "KES" : "KE",
    "KGS" : "KG",
    "KHR" : "KH",
    "KMF" : "KM",
    "KRW" : "KR",
    "KWD" : "KW",
    "KYD" : "KY",
    "KZT" : "KZ",
    "LAK" : "LA",
    "LBP" : "LB",
    "LKR" : "LK",
    "LRD" : "LR",
    "LSL" : "LS",
    "LYD" : "LY",
    "MAD" : "MA",
    "MDL" : "MD",
    "MGA" : "MG",
    "MKD" : "MK",
    "MMK" : "MM",
    "MNT" : "MN",
    "MOP" : "MO",
    "MTL" : "MT",
    "MUR" : "MU",
    "MVR" : "MV",
    "MWK" : "MW",
    "MXN" : "MX",
    "MYR" : "MY",
    "MZN" : "MZ",
    "NAD" : "NA",
    "XPF" : "NC",
    "NGN" : "NG",
    "NIO" : "NI",
    "NPR" : "NP",
    "NZD" : "NZ",
    "OMR" : "OM",
    "PAB" : "PA",
    "PEN" : "PE",
    "PGK" : "PG",
    "PHP" : "PH",
    "PKR" : "PK",
    "PLN" : "PL",
    "PYG" : "PY",
    "QAR" : "QA",
    "RON" : "RO",
    "RSD" : "RS",
    "RUB" : "RU",
    "RWF" : "RW",
    "SAR" : "SA",
    "SBD" : "SB",
    "SCR" : "SC",
    "SDG" : "SD",
    "SEK" : "SE",
    "SGD" : "SG",
    "SLL" : "SL",
    "SOS" : "SO",
    "SRD" : "SR",
    "SYP" : "SY",
    "SZL" : "SZ",
    "THB" : "TH",
    "TJS" : "TJ",
    "TMT" : "TM",
    "TND" : "TN",
    "TOP" : "TO",
    "TRY" : "TR",
    "TTD" : "TT",
    "TWD" : "TW",
    "TZS" : "TZ",
    "UAH" : "UA",
    "UGX" : "UG",
    "USD" : "US",
    "UYU" : "UY",
    "UZS" : "UZ",
    "VND" : "VN",
    "VUV" : "VU",
    "YER" : "YE",
    "ZAR" : "ZA"
}

// Setting the date at the top
var dateElement = document.getElementById("current-date");
dateElement.textContent = todaysDate;

// Country currency codes
for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list){
        // Setting the default selections
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if (i == 1) {
            selected = currency_code == "CAD" ? "selected" : "";
        }
        // Creating an option tag with currency code as text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // Insert the options tag inside a select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    // Change flag when country is changed
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}
// Pull country flags from website
function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

// loads storage after 5 seconds
window.addEventListener("load", ()=>{
    setTimeout(getStorage(),5000);
});

// Event listener runs exchange function on button click
getButton.addEventListener("click", e =>{
    // Prevent the form from submitting by default
    e.preventDefault();
    getExchangeRate();
});

// Insert Country Flags
let exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getStorage() {
    conversions = JSON.parse(localStorage.getItem('ConverisonList'));
    if (conList !== null) {
        for (i=0; i < conversions.length; i++) {
            // Keeps last 5 conversions
            if (conversions.length > 5) {
                conversions.shift()
            }
            var label = document.createElement('label');
            label.setAttribute('class', 'label')
            var txt = document.createTextNode(conversions[i].out);
            label.appendChild(txt);
            historyBtn.appendChild(label);
        }
    }
}

// Grab exchange rate
function getExchangeRate(){
    // Clear the list and print new at end
    conList.innerHTML = ''

    let amount = document.querySelector("form input");
    let exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    // If user enters nothing or zero make value 1 
    if (amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    
    exchangeRateTxt.innerText = "Calculating Rate...";
    let url = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExRate = (amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    // Adding inputs to local storage
    let conversion = {
        out: exchangeRateTxt.innerText
    }
    conversions.push(conversion);
    localStorage.setItem('ConverisonList', JSON.stringify(conversions));
    // Loop that creates lables for as many elements in the obj
    for (i=0; i < conversions.length; i++) {
        // Keeps last 5 conversions
        if (conversions.length > 5) {
            conversions.shift()
        }
        var label = document.createElement('label');
        label.setAttribute('class', 'label')
        var txt = document.createTextNode(conversions[i].out);
        label.appendChild(txt);
        historyBtn.appendChild(label);
    }
    // Catch for any errors
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });
}