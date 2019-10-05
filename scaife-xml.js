const https = require('https');
const xmldoc = require("xmldoc");
const inquirer = require ("inquirer");

// Build url
const queryURL = "https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg030.perseus-grc2:1.327";
// Euthyphro test: https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg001.perseus-grc1:2
// Republic test: https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg030.perseus-grc2:1.327

// Temp object to store results of async call in
let textsFound = [];
let currentStephanus = "";
let currentSpeaker = "";

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

        // cut directly to the relevant parts of xml response
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

        // extract info (text, speakers, stephanus numbers) from each paragraph
        const allParagraphs = result.childrenNamed("p");
        for (let i=0; i < allParagraphs.length; i++) {
            
            // check for speakers
            const textWithSpeaker = allParagraphs[i].childNamed("said");
            // if there is a speaker, log the speaker and check for milestone within "said" node
            if (textWithSpeaker) {
                // extract speaker
                let speaker = textWithSpeaker.attr.who;
                speaker = speaker.slice(1)
                // extract label for speaker, if there is one; attach this to the text found
                let label;
                if (textWithSpeaker.childNamed("label")) {
                    label = textWithSpeaker.childNamed("label")
                    console.log(label);
                };

                // extract new stephanus milestone, if there are any
                // but since there could be multiple milestones in the same "said" node, we have to put all the children in an array first, and capture the texts and stephanus numbers as they come
                const allChildren = allParagraphs[i].childNamed("said").children;
                for (let j = 0; j < allChildren.length; j++) {
                    
                    // if it's an element node, and that node contains a new section, capture the stephanus number and letter
                    if (allChildren[j].attr) {
                        if (allChildren[j].attr.unit === "section") {
                            const stephanus = allChildren[j].attr.n;
                            currentStephanus = stephanus;
                            console.log("currentStephanus", currentStephanus)
                        }
                    }

                    // if it's a text node, capture the text
                    if (allChildren[j].text) {
                        console.log(allChildren[j].text)
                        let newText;
                        // concatenate label to text, if there is a label
                        if (label) {
                            newText = label + allChildren[j].text
                        } else {
                            newText = allChildren[j].text;
                        }
                        textsFound[currentStephanus] = textsFound[currentStephanus] + newText
                    }
                }

            } else {
                // since there is no speaker, check for milestones directly in the "p" node
                // but since there could be multiple milestones in the same "p" node, we have to put all the children in an array first, and capture the texts and stephanus numbers as they come
                const allChildren = allParagraphs[i].children;
                console.log(allChildren);
                
                const newSection = allParagraphs[i].childWithAttribute("unit", "section");
                if (newSection) {
                    const stephanus = newSection.attr.n;
                    console.log(stephanus)
                } 

                // then store all information found in higher scope
                const newText = allParagraphs[i].val;
                console.log(newText)
            }

            console.log(textsFound)

        }

    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});