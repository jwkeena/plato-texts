const https = require('https');
const queryURL = "https://scaife.perseus.org/library/passage/urn:cts:greekLit:tlg0059.tlg001.perseus-grc1:2/text/";

// uglier, but no dependencies
https.get(queryURL, (resp) => {
    let data = '';

    // A chunk of data has been recieved
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received
    resp.on('end', () => {
        
        data = data.replace(/(\r\n|\n|\r)/gm,"");
        // data = data.replace(/(ΕΥΘ.|ΣΩ.)/gm, `\n`);
        console.log(data);

    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});