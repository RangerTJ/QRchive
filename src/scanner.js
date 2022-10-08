/* 
Origina/pre-modified source code from open source project at: https://www.sitepoint.com/create-qr-code-reader-mobile-website/
Original scanner library by ZXing, JavaScript Version ported by Lazar Laszlo

Date: 10/6/2022
Description:  Code for a web-based QR code scanner. WIP - Modified from original source code to redirect output from a simple text print
              to alsoarchive the printed information in a JSON file (including time stamp and description, if it is a legitimate web URL).
*/

const qrCode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const cancelBtnElement = document.getElementById("cancel-btn")

const archiveElement = document.getElementById("archive-btn")
const archiveTable = document.getElementById("archive-table")

const clickAboveElement = document.getElementById("click-to-scan")
const addBtnElement = document.getElementById("add-btn")
const addedToElement = document.getElementById("added-to")
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrCode.callback = res => {
  if (res) {
    outputData.innerText = res;
    // TO DO: Possibly alter way result string displays (show w/ description or auto-close or take to archive page or... open prompt, or...?)
    // TO DO: Run helper method to save URL information to archive JSON
    
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    archiveElement.hidden = false
    clickAboveElement.hidden = false;
    cancelBtnElement.hidden = true;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
    addBtnElement.hidden = false;
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      archiveElement.hidden = true;
      clickAboveElement.hidden = true;
      addedToElement.hidden = true;
      cancelBtnElement.hidden = false;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
  
  cancelBtnElement.onclick = () => {

    scanning = false;

    video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
    
    qrResult.hidden = false;
    archiveElement.hidden = false
    clickAboveElement.hidden = false;
    cancelBtnElement.hidden = true;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
    addBtnElement.hidden = true;
  }
};


archiveElement.onclick = () => {
  if (!archiveTable.hidden) {
    archiveTable.hidden = true
  } else {
    archiveTable.hidden = false
  }
}


addBtnElement.onclick = () => {
  console.log('hit');
  // Hope it works! Should save the code to local storage
  // alert(getTitle(outputData.innerText))  // Test for getTitle output
  saveCode(outputData.innerText);
  addedToElement.hidden = false
}


function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}


function scan() {
  try {
    qrCode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}


//Open source tool: https://allorigins.win/ 
//Pulls contents from remote HTML URL 
const getTitle = (url) => {
  return fetch(`https://api.allorigins.win/get?url=${url}`)
      .then((response) => {
          // checks whether response status code is not in 200-299 range 
          if (!response.ok) {
              throw new Error("Unsuccessful fetch operation. Please try again.");
          }
          return response.text();
      })
      .then((html) => {
          const doc = new DOMParser().parseFromString(html, "text/html");
          const title = doc.querySelectorAll('title')[0];
          // if there is no valid title, returns generic placeholder string
          if (!title) {
              let placeholderText = "Untitled webpage"
              return placeholderText
          }
          return title.innerText;
      });
};


// Helper method that takes a string (from the QR scanner results) and saves the URL, its description, and a timestamp entry to an 
// archive JSON that can be accessed later to view previously scanned QR codes. Saves JSON locally. 
function saveCode(scanResults)
{
    // Set up the qr_info object to be saved to a local file
    const scanText = String(scanResults);
    const desc = String(getTitle(scanResults));
    const timestampStr = test_date = new Date().toDateString();
    const qrInfo = {url: scanText, description: desc , time: timestampStr};
    let localData = localStorage.getItem('qrHistory');

    // Sets a blank array for local data, if there is no QR scan history JSON
    if (!localData) {
        localData = [];
    }

    // Parses the QR scan history JSON into a a logical array if the JSON already exists
    else {
        localData = JSON.parse(localData);
    }

    // Adds the QR info object to the history array and updates the JSON with the new array
    localData.push(qrInfo);
    localStorage.setItem('qrHistory', JSON.stringify(localData));

    // Testing - Uses alert to validate/monitor localStorage
    // const validation = localStorage.getItem('qrHistory');
    // alert(String(validation));
}
