
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(CurrencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = CurrencyCode;
        newOption.value = CurrencyCode;

        if(select.name === "from" && CurrencyCode === "USD"){
            newOption.selected = "selected";
        }
        else if (select.name === "to" && CurrencyCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => { // evt(this will trigger the function) automatically passed in. evt.target refers to the element that triggered the event 
        updateFlag(evt.target); // this refers to the element that triggered the event
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let CurrencyCode = element.value; // this refers to the element that triggered the event
    let CountryCode = countryList[CurrencyCode];
    let newSrc = `https://flagsapi.com/${CountryCode}/flat/64.png`; // this refers to the element that triggered the event
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", (evt) => {    
    evt.preventDefault(); // prevent the form from submitting
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})

