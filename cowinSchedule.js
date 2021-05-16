// This script will alert you whenever some slot opens up on the given date within the given pincodes
// Change the pincodes to your needs as per your city
// Change the dateArr to add your convinent set of dates

// For further update do checkout http://twitter.com/debarko/

// Steps to use
// 1. Update Config
// 2. Login to https://selfregistration.cowin.gov.in/
// 3. Rigt Click on the website
// 4. Click on Inspect
// 5. Open the Console Tab on your Inspect window
// 6. Copy paste the contents of this entire file - cowin_schedule_v2.js
// 7. Press Enter
// It will run every 10 seconds and check for availability of slots.

// Config
// ------

var pincodes = ["122001", "122505", "122051", "122101", "122004", "122006", "122506", "122413", "122102", "122003", "122504", "123401", "123035", "123302"];
var dateArr = ["17-05-2021"];
var trialCounter = 1;

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

async function fetchByPincode() {
    console.log("Check: ", trialCounter++);
    
    for (i=0;i < pincodes.length; i++) {
      for (j=0; j < dateArr.length; j++) {
        url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode="+pincodes[i]+"&date="+dateArr[j];
        await sleepNow(1000);
        a = httpGet(url);
        try {
          a = JSON.parse(a)
        } catch(e) {
          continue;
        }
        for (c in a.centers) {
        for (s in a.centers[c].sessions) {
              if (a.centers[c].sessions[s].min_age_limit < 45 && a.centers[c].sessions[s].available_capacity > 0) {
                console.log("Trying Booking for", a.centers[c].pincode, a.centers[c].name, a.centers[c].sessions[s].available_capacity);
                var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
                audio.play();
              }
          }
        }
      }
    }
    await sleepNow(10000);
    fetchByPincode();
}

console.log('Script Initialising');
fetchByPincode();
