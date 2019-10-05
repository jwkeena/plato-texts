const https = require('https');
const xmldoc = require("xmldoc");
const inquirer = require ("inquirer");

// Build url
const queryURL = "https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg030.perseus-grc2:1.327";
// Euthyphro test: https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg001.perseus-grc1:2
// Republic test: https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg030.perseus-grc2:1.327

// Temp object to store results of async call in
let textsRequested = {
    "dialogue": "",
    "texts": []
}

// async https request using module built-in to node
https.get(queryURL, (resp) => {
    let data = '';

    // A chunk of data has been recieved
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received
    resp.on('end', () => {
        const document = new xmldoc.XmlDocument(data); // to pretty print xmldoc parsing of data: console.log(document.toString({trimmed: true}));

        // cut out irrelevant parts of xml response
        let result = document.childNamed("reply").childNamed("passage").childNamed("TEI").childNamed("text").childNamed("body").childNamed("div");

        // check for book
        if (result.childWithAttribute("subtype").attr.subtype === "book") {
            console.log("book found"); // add two more layers deep to the xml tree
            result = document.childNamed("reply").childNamed("passage").childNamed("TEI").childNamed("text").childNamed("body").childNamed("div").childNamed("div").childNamed("div");
        } else if (result.childWithAttribute("subtype").attr.subtype === "section") {
            console.log("section found"); // add one more layer deep to the xml tree
            result = document.childNamed("reply").childNamed("passage").childNamed("TEI").childNamed("text").childNamed("body").childNamed("div").childNamed("div");
        } else {
            console.log("unknown organization", result.childWithAttribute("subtype").attr.subtype);
        }

        // collect all paragraphs
        const allParagraphs = result.childrenNamed("p");
        // console.log(allParagraphs.toString());

        // build object to push to higher scope temp object
        const newText = {
            stephanus: "",
            text: ""

        }

        for (let i=0; i < allParagraphs.length; i++) {
            // console.log(allParagraphs[i].toString());

            // check for speakers
            const textWithSpeaker = allParagraphs[i].childNamed("said");
            
            // if there is a speaker, log the speaker and check for milestone within "said" node
            if (textWithSpeaker) {
                // extract speaker
                let speaker = textWithSpeaker.attr.who;
                speaker = speaker.slice(1)
                console.log(speaker);
                
                // extract new stephanus milestone, if there is one
                const newSection = allParagraphs[i].childNamed("said").childWithAttribute("unit", "section")
                if (newSection) {
                    const stephanus = newSection.attr.n
                    console.log(stephanus)
                }
                
            } else {
                // since there is no speaker, check for milestones directly in the "p" node
                const newSection = allParagraphs[i].childWithAttribute("unit", "section");
                if (newSection) {
                    const stephanus = newSection.attr.n;
                    console.log(stephanus)
                } 

            }

            // if a new milestone is found, put what's been stored in higher scope
            // separate milestones in temporary object in higher scope

        }

    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});