const https = require('https');
const xmldoc = require("xmldoc");

function getText() {
    // Build url from process.argv
    const userDialogue = process.argv[2].toLowerCase().trim();
    
    // Check for stephanus number and letter; if so, separate them
    let userStephanus = process.argv[3].toLowerCase().trim();
    let lastChar = userStephanus[userStephanus.length - 1];
    let userStephanusLetter;
    if (lastChar === "a" || lastChar === "b" || lastChar === "c" || lastChar === "d" || lastChar == "e") {
        userStephanus = userStephanus.slice(0, userStephanus.length -1)
        userStephanusLetter = lastChar;
    } else {
        if (isNaN(lastChar)) {
            console.log("Search only accepts a-e in final Stephanus position; canceling search.")
            return;
        }
    } 

    let perseusDialogueMarker = "tlg0"
    switch (userDialogue) {
        case "alcibiadesi":
        case "alcibiadesI":
        case "alcibiades1":
        case "alcibiadesi":
        case "alci":
        case "alcI":
        case "alc1":
        case "alci":
        case "alc.i":
        case "alc.I":
        case "alc.1":
        case "alc.i":
            perseusDialogueMarker += "13";
            break;

        case "alcibiadesii":
        case "alcibiadesII":
        case "alcibiades2":
        case "alcibiadesii":
        case "alcii":
        case "alcII":
        case "alc2":
        case "alcii":
        case "alc.ii":
        case "alc.II":
        case "alc.11":
        case "alc.ii":
            perseusDialogueMarker += "13";
            break;

        case "apology":
        case "apol.":
        case "apol":
        case "apo.":
        case "apo":
            perseusDialogueMarker += "02";
            break;

        case "charmides":
        case "charm":
        case "charm.":
        case "char.":
        case "char":
            perseusDialogueMarker += "18";
            break;

        case "clitophon":
        case "cleitophon":
        case "cleit":
        case "clit":
        case "cleit.":
        case "clit.":
            perseusDialogueMarker += "29";
            break;

        case "cratylus":
        case "crat.":
        case "crat":
            perseusDialogueMarker += "05";
            break;

        case "critias":
        case "criti.":
        case "criti":
            perseusDialogueMarker += "32";
            break;

        case "crito":
        case "crit.":
        case "crit":
            perseusDialogueMarker += "03";
            break;

        case "epinomis":
        case "epin.":
        case "epin":
        case "epi.":
        case "epi":
            perseusDialogueMarker += "35";
            break;
        
        case "euthydemus":
        case "euthyd.":
        case "euthyd":
            perseusDialogueMarker += "21";
            break;

        case "euthyphro":
        case "euthy.":
        case "euthy":
        case "euth.":
        case "euth":
            perseusDialogueMarker += "01";
            break;

        case "gorgias":
        case "gorg.":
        case "gorg":
            perseusDialogueMarker += "23";
            break;

        case "hipparchus":
        case "hipparch.":
        case "hipparch":
            perseusDialogueMarker += "15";
            break;

        case "greaterhippias":
        case "hipp.maj.":
        case "hipp.maj":
        case "hippmaj":
            perseusDialogueMarker += "25";
            break;

        case "lesserhippias":
        case "hipp.min.":
        case "hipp.min":
        case "hippmin":
            perseusDialogueMarker += "26";
            break;
        
        case "ion":
            perseusDialogueMarker += "27";
            break;
        
        case "laches":
        case "lach.":
        case "lach":
            perseusDialogueMarker += "19";
            break;
        
        case "laws":
        case "l":
            perseusDialogueMarker += "34";
            break;
        
        case "lysis":
        case "lys.":
        case "lys":
            perseusDialogueMarker += "20";
            break;
        
        case "menexenus":
        case "menex.":
        case "menex":
            perseusDialogueMarker += "28";
            break;
        
        case "meno":
        case "men.":
        case "men":
            perseusDialogueMarker += "24";
            break;
        
        case "minos":
        case "min.":
        case "min":
            perseusDialogueMarker += "33";
            break;
        
        case "parmenides":
        case "parm.":
        case "parm":
        case "par":
        case "par":
            perseusDialogueMarker += "09";
            break;
        
        case "phaedo":
        case "phae.":
        case "phae":
        case "pha.":
        case "pha":
            perseusDialogueMarker += "04";
            break;
        
        case "phaedrus":
        case "phaed.":
        case "phaed":
        case "":
            perseusDialogueMarker += "12";
            break;
        
        case "philebus":
        case "phileb.":
        case "phileb":
        case "phile.":
        case "phile":
            perseusDialogueMarker += "10";
            break;
        
        case "protagoras":
        case "prot.":
        case "prot":
            perseusDialogueMarker += "22";
            break;
        
        case "republic":
        case "rep.":
        case "rep":
        case "r":
            perseusDialogueMarker += "30";
            break;
        
        case "rivallovers":
        case "rivals":
        case "riv":
        case "lovers":
            perseusDialogueMarker += "16";
            break;
        
        case "letters":
        case "letter":
            perseusDialogueMarker += "36";
            break;
        
        case "sophist":
        case "soph.":
        case "soph":
            perseusDialogueMarker += "07";
            break;
        
        case "statesman":
        case "stat.":
        case "stat":
        case "politicus":
        case "polit.":
        case "polit":
            perseusDialogueMarker += "08";
            break;
        
        case "symposium":
        case "symp.":
        case "symp":
        case "sym.":
        case "sym":
            perseusDialogueMarker += "11";
            break;
        
        case "theaetetus":
        case "theaet.":
        case "theaet":
        case "theae.":
        case "theae":
        case "thea.":
        case "thea":
        case "the.":
        case "the":
            perseusDialogueMarker += "06";
            break;
        
        case "theages":
        case "theag.":
        case "theag":
            perseusDialogueMarker += "17";
            break;
        
        case "timaeus":
        case "tim.":
        case "tim":
            perseusDialogueMarker += "31";
            break;
        default: 
            console.log("dialogue not recognized; canceling request");
            return;
    }

    // Adding dialogue chosen to search url
    let queryURL = "https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059." + perseusDialogueMarker;

    // For some reason the Euthyphro, dialogue tlg001, is in the perseus-grc1 route, not perseus-grc2
    if (perseusDialogueMarker === "tlg001") {
        queryURL += ".perseus-grc1:";
    } else {
        queryURL += ".perseus-grc2:";
    }

    // Adding stephanus chosen to url
    queryURL += userStephanus;
    console.log(queryURL)

    // async https request using module built-in to node
    https.get(queryURL, (resp) => {
        // Temp object to store results of async call in
        let textsFound = [];
        let currentStephanus;
        let typeOfResult;
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
                // add two more layers deep to the xml tree
                typeOfResult = "book"
                result = document.childNamed("reply").childNamed("passage").childNamed("TEI").childNamed("text").childNamed("body").childNamed("div").childNamed("div").childNamed("div");
            } else if (result.childWithAttribute("subtype").attr.subtype === "section") {
                // add one more layer deep to the xml tree
                typeOfResult = "section"
                result = document.childNamed("reply").childNamed("passage").childNamed("TEI").childNamed("text").childNamed("body").childNamed("div").childNamed("div");
            } else {
                console.log("unknown organization found", result.childWithAttribute("subtype").attr.subtype);
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
                        label = textWithSpeaker.childNamed("label").val
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
                            }
                        }
    
                        // if it's a text node, capture the text
                        if (allChildren[j].text) {
                            let newText;
                            // concatenate label to text, if there is a label
                            if (label) {
                                newText = label.trim() + " " + allChildren[j].text.trim();
                            } else {
                                newText = allChildren[j].text.trim();
                            }

                            // strip out line breaks 
                            newText = newText.replace(/(\r\n|\n|\r)/gm,"");

                            // concatenate text to what's already in textsFound; otherwise, create new key value pair
                            if (textsFound[currentStephanus]) {
                                textsFound[currentStephanus] += newText.trim() + " ";
                            } else {
                                textsFound[currentStephanus] = newText.trim();
                            }
                        }
                    }
    
                } else {
                    // since there is no speaker, check for milestones directly in the "p" node
                    // but since there could be multiple milestones in the same "p" node, we have to put all the children in an array first, and capture the texts and stephanus numbers as they come
                    const allChildren = allParagraphs[i].children;
                    for (let j = 0; j < allChildren.length; j++) {
                        
                        // if it's an element node, and that node contains a new section, capture the stephanus number and letter
                        if (allChildren[j].attr) {
                            if (allChildren[j].attr.unit === "section") {
                                const stephanus = allChildren[j].attr.n;
                                currentStephanus = stephanus;
                            }
                        }
    
                        // if it's a text node, capture the text
                        if (allChildren[j].text) {
                            let newText;
                            newText = allChildren[j].text.trim();
                            // concatenate text to what's already in textsFound; otherwise, create new key value pair
                            if (textsFound[currentStephanus]) {
                                textsFound[currentStephanus] += newText.trim();
                            } else {
                                textsFound[currentStephanus] = newText.trim();
                            }
                        }
                    }
                }
            }

            // Depending on the type of search input, either give a single section or a whole section
            if (userStephanusLetter && typeOfResult === "book") {
                // Removes book number and period from search, to access in temp object
                if (!isNaN(userStephanus.charAt(1))) {
                    userStephanus = userStephanus.slice(3) // Cuts out both digits if it's book 10, 11, or 12
                } else {
                    userStephanus = userStephanus.slice(2)
                }
                
                console.log("Passage requested: " + userDialogue + " " + userStephanus + userStephanusLetter)
                console.log(textsFound[userStephanus + userStephanusLetter])
            } else if (userStephanusLetter) {
                console.log("Passage requested: " + userDialogue + " " + userStephanus + userStephanusLetter)
                console.log(textsFound[userStephanus + userStephanusLetter])
            } else {
                // return entire stephanus number
                console.log(textsFound);
            }
        });
    
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
} 

getText();