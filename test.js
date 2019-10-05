const https = require('https');
const queryURL = "https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg001.perseus-grc1:2";
const xml2js = require('xml2js');
const util = require('util');
const node_xml_stream = require('node-xml-stream');
const parser = new node_xml_stream();
const fs = require('fs');

// const fetch = require("node-fetch");
// const xpath = require('xpath')
// , dom = require('xmldom').DOMParser;

// cleaner, but uses fetch dependency
// fetch(queryURL)
//     .then(
//         response => response.text() // .json(), etc.
//         // same as function(response) {return response.text();}
//     ).then(
//         html => console.log(html)
//     );

// uglier, but no dependencies
https.get(queryURL, (resp) => {
    let data = '';

    // A chunk of data has been recieved
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received
    resp.on('end', () => {
        // data is the xml response
        console.log(data);

    // xml converted to js object. This works, but is hard to navigate
        // xml2js.parseStringPromise(data /*, options */).then(function (result) {
        //     console.log(util.inspect(result, false, null))
        //     console.log('Done');
        // })
        // .catch(function (err) {
        //     console.log(err.message)
        // });

    // xml-stream to capture text as it comes in
        // temporary variables to construct final object
        let text = {
            'paragraph': []
        };
        let words, speaker, milestone, attr, t_name;

        // callback contains the name of the node and any attributes associated
        parser.on('opentag', function (name, attrs) {
            if (name === 'p') {
                attr = attrs;
            }
            t_name = name;
        });

        // callback contains the name of the node.
        parser.on('closetag', function (name) {
            if (name === 'p') {
                text['paragraph'].push({
                    "words": words,
                    // "speaker": team,
                    // "milestone": attr.year
                });
            }
        });

        // callback contains the text within the node.
        parser.on('text', function (text) {
            if (t_name === 'said') {
                words = text;
            }
            console.log(text)
        });

        // callback to do something after stream has finished
        parser.on('finish', function () {
            console.log(text);
        });

        let stream = fs.createReadStream(data);
        stream.pipe(parser);

    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});