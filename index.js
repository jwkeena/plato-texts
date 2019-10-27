const https = require('https');
const xmldoc = require("xmldoc");

function getPlatoText(userDialogue, userStephanus) {
    
    return new Promise((resolve, reject) => {
        let lastChar = "";
        if(userStephanus) {
            lastChar = userStephanus[userStephanus.length - 1];
        } else {
            userStephanus = "NONE"
        }
    
        let userStephanusLetter = "";
        let stephanusRange = "";
        let dialogueName = "";
    
        // Check for stephanus number and letter, if there are any; if so, separate them
        if (lastChar !== "") {
            if (lastChar === "a" || lastChar === "b" || lastChar === "c" || lastChar === "d" || lastChar == "e") {
                userStephanus = userStephanus.slice(0, userStephanus.length - 1);
                userStephanusLetter = lastChar;
            } else {
                if (isNaN(lastChar) && userStephanus !== "NONE") {
                    return resolve("Search only accepts a-e in final Stephanus position; canceling search.");
                }
            }
        }
    
        let perseusDialogueMarker = "tlg0"
        switch (userDialogue) {
            case "all":
                const allStephanusRanges = ["Alcibiades I: 103a-135e", "Alcibiades II: 138a-151c", "Apology: 17a-42a", "Charmides: 153a-176d", "Clitophon: 406a-410e", "Cratylus: 383a-440e", "Critias: 106a-121c", "Crito: 43a-54e", "Epinomis: 973a-992e", "Euthydemus: 271a-307c", "Euthyphro: 2a-16a", "Gorgias: 447a-527e", "Hipparchus: 225a-232c", "Hippias Major: 281a-304e", "Hippias Minor: 363a-376c", "Ion: 530a-542b", "Laches: 178a-201c", "Laws: 1.624a-650b", "Lysis: 203a-223b", "Menexenus: 234a-249e", "Meno: 70a-100b", "Minos: 313a-321d", "Parmenides: 126a-166c", "Phaedo: 57a-118a", "Phaedrus: 227a-279c", "Philebus: 11a-67b", "Protagoras: 309a-362a", "Republic: 327a-621d", "Rival Lovers: 132a-139a", "Seventh Letter: 7.323d-7.352a", "Sophist: 216a-268d", "Statesman: 257a-311c", "Symposium: 172a-223d", "Theaetetus: 142a-210d", "Theages: 121a-131a", "Timaeus: 17a-92c"]
                return resolve(allStephanusRanges);
    
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
                stephanusRange = "Alcibiades I: 103a-135e";
                dialogueName = "Alcibiades I";
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
                stephanusRange = "Alcibiades II: 138a-151c";
                dialogueName = "Alcibiades II";
                break;
    
            case "apology":
            case "apol.":
            case "apol":
            case "apo.":
            case "apo":
                perseusDialogueMarker += "02";
                stephanusRange = "Apology: 17a-42a";
                dialogueName = "Apology";
                break;
    
            case "charmides":
            case "charm":
            case "charm.":
            case "char.":
            case "char":
                perseusDialogueMarker += "18";
                stephanusRange = "Charmides: 153a-176d";
                dialogueName = "Charmides";
                break;
    
            case "clitophon":
            case "cleitophon":
            case "cleit":
            case "clit":
            case "cleit.":
            case "clit.":
                perseusDialogueMarker += "29";
                stephanusRange = "Clitophon: 406a-410e";
                dialogueName = "Clitophon";
                break;
    
            case "cratylus":
            case "crat.":
            case "crat":
                perseusDialogueMarker += "05";
                stephanusRange = "Cratylus: 383a-440e";
                dialogueName = "Cratylus";
                break;
    
            case "critias":
            case "criti.":
            case "criti":
                perseusDialogueMarker += "32";
                stephanusRange = "Critias: 106a-121c";
                dialogueName = "Critias";
                break;
    
            case "crito":
            case "crit.":
            case "crit":
                perseusDialogueMarker += "03";
                stephanusRange = "Crito: 43a-54e";
                dialogueName = "Crito";
                break;
    
            case "epinomis":
            case "epin.":
            case "epin":
            case "epi.":
            case "epi":
                perseusDialogueMarker += "35";
                stephanusRange = "Epinomis: 973a-992e";
                dialogueName = "Epinomis";
                break;
    
            case "euthydemus":
            case "euthyd.":
            case "euthyd":
                perseusDialogueMarker += "21";
                stephanusRange = "Euthydemus: 271a-307c";
                dialogueName = "Euthydemus";
                break;
    
            case "euthyphro":
            case "euthy.":
            case "euthy":
            case "euth.":
            case "euth":
                perseusDialogueMarker += "01";
                stephanusRange = "Euthyphro: 2a-16a";
                dialogueName = "Euthyphro";
                break;
    
            case "gorgias":
            case "gorg.":
            case "gorg":
                perseusDialogueMarker += "23";
                stephanusRange = "Gorgias: 447a-527e";
                dialogueName = "Gorgias";
                break;
    
            case "hipparchus":
            case "hipparch.":
            case "hipparch":
                perseusDialogueMarker += "15";
                stephanusRange = "Hipparchus: 225a-232c";
                dialogueName = "Hipparchus";
                break;
    
            case "greaterhippias":
            case "hipp.maj.":
            case "hipp.maj":
            case "hippmaj":
                perseusDialogueMarker += "25";
                stephanusRange = "Hippias Major: 281a-304e";
                dialogueName = "Hippias Major";
                break;
    
            case "lesserhippias":
            case "hipp.min.":
            case "hipp.min":
            case "hippmin":
                perseusDialogueMarker += "26";
                stephanusRange = "Hippias Minor: 363a-376c";
                dialogueName = "Hippias Minor";
                break;
    
            case "ion":
                perseusDialogueMarker += "27";
                stephanusRange = "Ion: 530a-542b";
                dialogueName = "Ion";
                break;
    
            case "laches":
            case "lach.":
            case "lach":
                perseusDialogueMarker += "19";
                stephanusRange = "Laches: 178a-201c";
                dialogueName = "Laches";
                break;
    
            case "laws":
            case "l":
                perseusDialogueMarker += "34";
                stephanusRange = "Laws: 1.624a-650b";
                dialogueName = "Laws";
                break;
    
            case "lysis":
            case "lys.":
            case "lys":
                perseusDialogueMarker += "20";
                stephanusRange = "Lysis: 203a-223b";
                dialogueName = "Lysis";
                break;
    
            case "menexenus":
            case "menex.":
            case "menex":
                perseusDialogueMarker += "28";
                stephanusRange = "Menexenus: 234a-249e";
                dialogueName = "Menexenus";
                break;
    
            case "meno":
            case "men.":
            case "men":
                perseusDialogueMarker += "24";
                stephanusRange = "Meno: 70a-100b";
                dialogueName = "Meno";
                break;
    
            case "minos":
            case "min.":
            case "min":
                perseusDialogueMarker += "33";
                stephanusRange = "Minos: 313a-321d";
                dialogueName = "Minos";
                break;
    
            case "parmenides":
            case "parm.":
            case "parm":
            case "par":
            case "par":
                perseusDialogueMarker += "09";
                stephanusRange = "Parmenides: 126a-166c";
                dialogueName = "Parmenides";
                break;
    
            case "phaedo":
            case "phae.":
            case "phae":
            case "pha.":
            case "pha":
                perseusDialogueMarker += "04";
                stephanusRange = "Phaedo: 57a-118a";
                dialogueName = "Phaedo";
                break;
    
            case "phaedrus":
            case "phaed.":
            case "phaed":
            case "Phaedrus: 227a-279c":
                perseusDialogueMarker += "12";
                stephanusRange = "Phaedrus: 227a-279c";
                dialogueName = "Phaedrus";
                break;
    
            case "philebus":
            case "phileb.":
            case "phileb":
            case "phile.":
            case "phile":
                perseusDialogueMarker += "10";
                stephanusRange = "Philebus: 11a-67b";
                dialogueName = "Philebus";
                break;
    
            case "protagoras":
            case "prot.":
            case "prot":
                perseusDialogueMarker += "22";
                stephanusRange = "Protagoras: 309a-362a";
                dialogueName = "Protagoras";
                break;
    
            case "republic":
            case "rep.":
            case "rep":
            case "r":
                perseusDialogueMarker += "30";
                stephanusRange = "Republic: 327a-621d";
                dialogueName = "Republic";
                break;
    
            case "rivallovers":
            case "rivals":
            case "riv":
            case "lovers":
            case "erastes":
                perseusDialogueMarker += "16";
                stephanusRange = "Rival Lovers: 132a-139a";
                dialogueName = "Rival Lovers";
                break;
    
            case "letters":
            case "letter":
                perseusDialogueMarker += "36";
                stephanusRange = "Seventh Letter: 7.323d-7.352a";
                dialogueName = "Letters";
                break;
    
            case "sophist":
            case "soph.":
            case "soph":
                perseusDialogueMarker += "07";
                stephanusRange = "Sophist: 216a-268d";
                dialogueName = "Sophist";
                break;
    
            case "statesman":
            case "stat.":
            case "stat":
            case "politicus":
            case "polit.":
            case "polit":
                perseusDialogueMarker += "08";
                stephanusRange = "Statesman: 257a-311c";
                dialogueName = "Statesman";
                break;
    
            case "symposium":
            case "symp.":
            case "symp":
            case "sym.":
            case "sym":
                perseusDialogueMarker += "11";
                stephanusRange = "Symposium: 172a-223d";
                dialogueName = "Symposium";
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
                stephanusRange = "Theaetetus: 142a-210d";
                dialogueName = "Theaetetus";
                break;
    
            case "theages":
            case "theag.":
            case "theag":
                perseusDialogueMarker += "17";
                stephanusRange = "Theages: 121a-131a";
                dialogueName = "Theages";
                break;
    
            case "timaeus":
            case "tim.":
            case "tim":
                perseusDialogueMarker += "31";
                stephanusRange = "Timaeus: 17a-92c";
                dialogueName = "Timaeus";
                break;
            default:
                return resolve("Dialogue not recognized; canceling request.");
        }
    
        // Display dialogue range of references if the user doesn't request a specific passage
        if (userStephanus === "NONE" || userStephanus === "rang" || userStephanus === undefined) {
            return resolve(stephanusRange + " (possible search range)");
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
    
        // https request using module built-in to node
        https.get(queryURL, (resp) => {
    
            // Temp object to store results of async call in
            let textsFound = {};
            textsFound["passageRequested"] = dialogueName + " " + userStephanus;
            textsFound["URL"] = queryURL;
            let currentStephanus = "";
            let typeOfResult = "";
            let data = '';
    
            // A chunk of data has been recieved
            resp.on('data', (chunk) => {
                data += chunk;
            });
    
            // The whole response has been received
            resp.on('end', () => {
                const document = new xmldoc.XmlDocument(data); // to pretty print xmldoc parsing of data: console.log(document.toString({trimmed: true}));

                if (document === undefined || document.childNamed("reply") === undefined || document.childNamed("reply").childNamed("passage") === undefined)
                    return resolve ("Text not found. Check dialogue spelling, stephanus number range, or prefix book before stephanus argument.")

                // cut directly to the relevant parts of xml response
                let result = document.childNamed("reply").childNamed("passage").childNamed("TEI").childNamed("text").childNamed("body").childNamed("div");
    
                if (result === undefined) {
                    return resolve ("Text not found. Check dialogue spelling, stephanus number range, or prefix book before stephanus argument.")

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
                    return resolve ("unknown organization found", result.childWithAttribute("subtype").attr.subtype);
                }
    
                // extract info (text, speakers, stephanus numbers) from each paragraph
                const allParagraphs = result.childrenNamed("p");
                for (let i = 0; i < allParagraphs.length; i++) {
    
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
    
                        // Extract new stephanus milestone, if there are any
                        // But since there could be multiple milestones in the same "said" node, we have to put all the children of the "said" node in an array first, and capture the texts and stephanus numbers as they come
                        const allChildren = allParagraphs[i].childNamed("said").children;
                        for (let j = 0; j < allChildren.length; j++) {
    
                            // If it's an element node, and that node contains a new section, capture the stephanus number and letter
                            if (allChildren[j].attr) {
                                if (allChildren[j].attr.unit === "section") {
                                    const stephanus = allChildren[j].attr.n;
                                    currentStephanus = stephanus;
                                }
    
                                // Check if there's a q node, check for new section and text
                                if (allChildren[j].name === "q"){
    
                                    // First create an array of all the nested children
                                    const allNestedChildren = allChildren[j].children
    
                                    for (let k = 0; k < allNestedChildren.length; k++) {
                                        
                                        // Capture the milestone if there is one inside the q section
                                        if (allNestedChildren[k].attr) {
                                            if (allNestedChildren[k].attr.unit === "section") {
                                                const stephanus = allNestedChildren[k].attr.n;
                                                currentStephanus = stephanus;
                                            }
                                        }
    
                                        // If it's a text node, capture the text (REFACTOR AS FUNCTION, THIS CODE IS REPEATED THREE TIMES)
                                        if (allNestedChildren[k].text) {
                                            let newText;
    
                                            // Don't do labels, since a label has already been added when the person began speaking
                                            newText = allNestedChildren[k].text.trim();
    
                                            // strip out line breaks 
                                            newText = newText.replace(/(\r\n|\n|\r)/gm, "");
    
                                            // concatenate text to what's already in textsFound; otherwise, create new key value pair
                                            if (textsFound[currentStephanus]) {
                                                textsFound[currentStephanus] += newText.trim() + " ";
                                            } else {
                                                if (currentStephanus === undefined) {
                                                    // Removes book number and period from search
                                                    if (userStephanus.charAt(2) === ".") {
                                                        userStephanus = userStephanus.slice(3) // Cuts out both digits and period if it's book 10, 11, or 12
                                                    } else if (userStephanus.length > 1 && typeOfResult === "book") { // Doesn't touch single numbers, e.g. in Euthyphro
                                                        userStephanus = userStephanus.slice(2)
                                                    }
    
                                                    // Calculate what the previous stephanus number is, immediately prior to user search
                                                    currentStephanus = ((parseInt(userStephanus) - 1)) + "e";
                                                    textsFound[currentStephanus] = newText.trim();
                                                } else {
                                                    textsFound[currentStephanus] = newText.trim();
                                                }
                                            }
                                        }
                                    }
                                }
                            }
    
                            // If it's a text node, capture the text
                            if (allChildren[j].text) {
                                
                                let newText;
                                // Concatenate label to text, if there is a label
                                if (label) {
                                    newText = label.trim() + " " + allChildren[j].text.trim();
                                } else {
                                    newText = allChildren[j].text.trim();
                                }
    
                                // strip out line breaks 
                                newText = newText.replace(/(\r\n|\n|\r)/gm, "");
    
                                // concatenate text to what's already in textsFound; otherwise, create new key value pair
                                if (textsFound[currentStephanus]) {
                                    textsFound[currentStephanus] += newText.trim() + " ";
                                } else {
                                    if (currentStephanus === undefined) {
                                        // Removes book number and period from search
                                        if ((userStephanus.charAt(1) === ".") || (userStephanus.charAt(2)) === ".") {
                                            userStephanus = userStephanus.slice(3) // Cuts out both digits if it's book 10, 11, or 12
                                        } else if (userStephanus.length > 1 && typeOfResult === "book") { // Doesn't touch single numbers, e.g. in Euthyphro
                                            userStephanus = userStephanus.slice(2)
                                        }
    
                                        // Calculate what the previous stephanus number is, immediately prior to user search
                                        currentStephanus = ((parseInt(userStephanus) - 1)) + "e";
                                        textsFound[currentStephanus] = newText.trim();
                                    } else {
                                        textsFound[currentStephanus] = newText.trim();
                                    }
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
                                    if (currentStephanus === undefined) {
                                        // Removes book number and period from search
                                        if ((userStephanus.charAt(1) === ".") || (userStephanus.charAt(2)) === ".") {
                                            userStephanus = userStephanus.slice(3) // Cuts out both digits if it's book 10, 11, or 12
                                        } else if (userStephanus.length > 1) { // Doesn't touch single numbers, e.g. in Euthyphro
                                            userStephanus = userStephanus.slice(2)
                                        }
    
                                        // Calculate what the previous stephanus number is, immediately prior to user search
                                        currentStephanus = ((parseInt(userStephanus) - 1)) + "e";
                                        textsFound[currentStephanus] = newText.trim();
                                    } else {
                                        textsFound[currentStephanus] = newText.trim();
                                    }
                                }
                            }
                        }
                    }
                }
    
                let singleTextFound = {};
                // Depending on the type of search input, either give a single section or a whole section
                if (userStephanusLetter && typeOfResult === "book") {
                    singleTextFound["passageRequested"] = dialogueName + " " + userStephanus + userStephanusLetter;
                    singleTextFound["URL"] = queryURL;
    
                    // Removes book number and period from userStephanus
                    if (userStephanus.charAt(2) === ".") { // Remove three characters if it's a double digit book
                        userStephanus = userStephanus.slice(3)
                    } else if (userStephanus.charAt(1) === ".") {
                        userStephanus = userStephanus.slice(2) // Remove only two characters if it's a single digit book
                    }
            
                    singleTextFound[userStephanus + userStephanusLetter] = textsFound[userStephanus + userStephanusLetter];
                    // console.log(singleTextFound);
                    return resolve(singleTextFound);
    
                } else if (userStephanusLetter) {
                    singleTextFound["passageRequested"] = dialogueName + " " + userStephanus + userStephanusLetter;
                    singleTextFound["URL"] = queryURL;
                    singleTextFound[userStephanus + userStephanusLetter] = textsFound[userStephanus + userStephanusLetter];
                    // console.log(singleTextFound);
                    return resolve(singleTextFound);
                    
                } else {
                    // return entire stephanus number
                    // console.log(textsFound);
                    return resolve(textsFound);
                }
            });
    
        }).on("error", (err) => {
            reject (err);
        });
    })

}

// For testing
// let userStephanus = "";
// const userDialogue = process.argv[2].toLowerCase().trim();
// if (process.argv[3]) {
//     userStephanus = process.argv[3].toLowerCase().trim();
// } else {
//     userStephanus = "NONE";
// }
// getPlatoText(userDialogue, userStephanus);

module.exports = getPlatoText;