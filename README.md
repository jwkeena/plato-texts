# plato-texts
A node package for retrieving the texts of Plato from the Scaife Viewer API.

# Intalling
Using npm:
```javascript
npm i plato-texts
```

# How to Use
This tool exposes a single function, getPlatoText, which accepts two arguments, each of them strings: first, the dialogue name, which is required; second, the Stephanus number and section, which is optional.  

# Example Usage
```javascript
const platoTexts = require("plato-texts");

console.log(platoTexts("apology", "17a"))
```
Returns: 
  * ὅτι μὲν ὑμεῖς, ὦ ἄνδρες Ἀθηναῖοι, πεπόνθατε ὑπὸ τῶν ἐμῶν κατηγόρων, οὐκ οἶδα· ἐγὼ δʼ οὖν καὶ αὐτὸς ὑπʼ αὐτῶν ὀλίγου ἐμαυτοῦ ἐπελαθόμην, οὕτω πιθανῶς ἔλεγον. καίτοι ἀληθές γε ὡς ἔπος εἰπεῖν οὐδὲν εἰρήκασιν. μάλιστα δὲ αὐτῶν ἓν ἐθαύμασα τῶν πολλῶν ὧν ἐψεύσαντο, τοῦτο ἐν ᾧ ἔλεγον ὡς χρῆν ὑμᾶς εὐλαβεῖσθαι μὴ ὑπʼ ἐμοῦ ἐξαπατηθῆτε
  * Passage requested: Apology 17a at https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg002.perseus-grc2:17


# Other Options: Stephanus Numbers
The Stephanus number may be exact (number plus letter) or inexact (number only). Running platoTexts("apology", "17") will return all texts in that number range, not the text from the more exact sections 17a, 17b, 17c, 17d, or 17e.

# Other Options: Dialogues
Simply typing in the dialogue name, without any Stephanus number, will return the possible range of Stephanus numbers. For example, 
```javascript
console.log(platoTexts("apology"));
```
Returns: 
  * "Apology: 17a-42a (possible search range)"

Likewise, typing in the dialogue name followed by "range" in the second argument will return the possible range of Stephanus numbers. For example, 
```javascript
console.log(platoTexts("apology," "range"));
```
Returns:
  * "Apology: 17a-42a (possible search range)"

All dialogues may be abbreviated. For example, the following are all equivalent expressions:
```javascript
console.log(platoTexts("apology", "17a"));
console.log(platoTexts("apol.", "17a"));
console.log(platoTexts("apol", "17a"));
console.log(platoTexts("apo.", "17a"));
console.log(platoTexts("apo", "17a"));
```

Running the "all" command as the only argument returns an array of all dialogues and their possible Stephanus ranges.
```javascript
console.log(platoTexts("all"));
```
Returns:
  * "Alcibiades I: 103a-135e", 
  * "Alcibiades II: 138a-151c", 
  * "Apology: 17a-42a", 
  * "Charmides: 153a-176d", 
  * "Clitophon: 406a-410e",
  * "Cratylus: 383a-440e",
  * "Critias: 106a-121c",
  * "Crito: 43a-54e",
  * "Epinomis: 973a-992e",
  * "Euthydemus: 271a-307c",
  * "Euthyphro: 2a-16a",
  * "Gorgias: 447a-527e",
  * "Hipparchus: 225a-232c",
  * "Hippias Major: 281a-304e",
  * "Hippias Minor: 363a-376c",
  * "Ion: 530a-542b",
  * "Laches: 178a-201c",
  * "Laws: 1.624a-650b",
  * "Lysis: 203a-223b",
  * "Menexenus: 234a-249e",
  * "Meno: 70a-100b",
  * "Minos: 313a-321d",
  * "Parmenides: 126a-166c",
  * "Phaedo: 57a-118a",
  * "Phaedrus: 227a-279c",
  * "Philebus: 11a-67b",
  * "Protagoras: 309a-362a",
  * "Republic: 327a-621d",
  * "Rival Lovers: 132a-139a",
  * "Seventh Letter: 7.323d-7.352a",
  * "Sophist: 216a-268d",
  * "Statesman: 257a-311c",
  * "Symposium: 172a-223d",
  * "Theaetetus: 142a-210d",
  * "Theages: 121a-131a",
  * "Timaeus: 17a-92c"
