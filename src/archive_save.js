/* 
Date: 10/6/2022
Description:  Helper method that takes a string (from the QR scanner results) and saves the URL, its description, and a timestamp entry to an archive JSON that 
              can be accessed later to view previously scanned QR codes. Saves JSON locally. Calls helper method to get URL information.
*/

function save_code(scan_results)
{
    // Set up the qr_info object to be saved to a local file
    var scanText = String(scan_results);
    // var desc = String(helper(scan_results));  // TO DO: NEED TO IMPORT HELPER OR JUST PUT IT IN HERE / THE OTHER FILE
    var desc = String(Placeholder);
    var timestampStr = String(Date.now());
    var qrInfo = {url: scanText, description: desc , time: timestampStr};
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


// Test Archive
const test_url = www.google.com;
save_code(test_url)
