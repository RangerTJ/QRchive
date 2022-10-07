/* 
Date: 10/6/2022
Description:  Helper method that takes a string (from the QR scanner results) and saves the URL, its description, and a timestamp entry to an archive JSON that 
              can be accessed later to view previously scanned QR codes. Saves JSON locally. Calls helper method to get URL information.
*/

// TO-DO: Set up export of saveCode
// Set up import of getTitle from get_description.js so that the helper is functional

function saveCode(scanResults)
{
    // Set up the qr_info object to be saved to a local file
    const scanText = String(scanResults);
    // const desc = String(helper(scanResults));  // TO DO: NEED TO IMPORT HELPER OR JUST PUT IT IN HERE / THE OTHER FILE
    const desc = String(Placeholder);
    const timestampStr = String(Date(Date.now()));
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
}
