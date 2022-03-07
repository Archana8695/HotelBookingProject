let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "ebdb5ca7a5mshd16d3721db820b9p1d3088jsn9d0acd5c4717";



let PayButtonStatus = e => {
    let refToLogin = document.getElementsByClassName('btn btn-light btn-sm')[0];

    let usernameValue = localStorage.getItem('username');
    let passwordValue = localStorage.getItem('password');
    let RefToButton = document.getElementsByClassName('btn btn-danger')[0];

    if (usernameValue == 'admin' && passwordValue == 'admin' ) {
        RefToButton.disabled= false;
    }
}

PayButtonStatus();

let DoPay = () => {
    alert('Hi your booking is successful !!');
};

let fetchAPI = () => {
    let xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let result = JSON.parse(this.responseText).data[0];
  
            document.getElementById("hotel-image").src = result.photo.images.medium.url;
            document.getElementById("hotel-name").innerText = result.name;
            document.getElementById("hotel-rank").innerHTML = "<b>" + result.ranking + "</b>";
            document.getElementById("hotel-address").innerText = result.address;
  
        }
    });
  
    xhr.open("GET", API_URL + "hotels/get-details?lang=en_US&location_id=" + urlParams.get('id'));
    xhr.setRequestHeader("x-rapidapi-host", travelAdvisorHost);
    xhr.setRequestHeader("x-rapidapi-key", travelAdvisorKey);
  
    xhr.send();
  }
  
  fetchAPI();
  
  // set customer and payment details
  function setCustomerAndPaymentDetails() {
    const name = urlParams.get("name");
    const adults = urlParams.get("adults");
  
    const stringFromDate = urlParams.get("fromDate");
    const stringToDate = urlParams.get("toDate");
    // const stringTotal = urlParams.get("total");
  
    const fromDateArr = stringFromDate.split("-");
    const toDateArr = stringToDate.split("-");
  
    const fromDate = new Date(stringFromDate);
    const toDate = new Date(stringToDate);
  
    const noOfDays =
      (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
  
    const total = 1000 * noOfDays * parseInt(adults);
  
    // get ref to the html elements
  
    const refToName = document.getElementById("name");
    const refToAdults = document.getElementById("adults");
    const refToFromDate = document.getElementById("fromDate");
    const refToToDate = document.getElementById("toDate");
    const refToTerrifBreakdown = document.getElementById("teriff");
    const refToTotalAmount = document.getElementById("total");
  
    // set the values for html references
    refToName.innerText = name;
    refToAdults.innerText = adults;
    refToFromDate.innerText = `${fromDateArr[2]}/${fromDateArr[1]}/${fromDateArr[0]}`;
    refToToDate.innerText = `${toDateArr[2]}/${toDateArr[1]}/${toDateArr[0]}`;
    refToTerrifBreakdown.innerText = `Rs.1000 x ${adults} Adults x ${noOfDays} Nights`;
    refToTotalAmount.innerText = `Rs.${total}`;
  }
  
  
  setCustomerAndPaymentDetails();
  getAndSetHotelDetails();
