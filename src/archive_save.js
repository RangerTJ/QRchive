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
    const timestampStr = String(Date.now());
    const qrInfo = {url: scanText, description: desc , time: timestampStr};
    let localData = localStorage.getItem('qrHistory');

    // Sets an empty array to add our QR info object too if this is the first scan
    if (!localData) {
        localData = [];
    }

    // Parses the JSON QR scan history into a an actual array (vs. string)
    else {
        localData = JSON.parse(localData)
    }

    // Writes the QR info object to the history array object and updates the JSON
    localData.append(qrInfo);
    localStorage.setItem('qrHistory', JSON.stringify(localData));
}
