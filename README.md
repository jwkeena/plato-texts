# plato-texts
A promise-based node package for retrieving the Greek texts of Plato from the Scaife Viewer API (Perseus Project 5.0).

# Intalling
Using npm:
```javascript
npm i plato-texts
```

# How to Use
This tool exposes a single function, getPlatoText, which accepts two arguments, each of them strings: first, the dialogue name, which is required; second, the Stephanus number and section, which is optional. Because this function makes an API request, it is asynchronous.

# Example Usage
If the request for a text is successful, an object will be returned with at least three properties: "passageRequested", "URL", and the text. For instance:
```javascript
const platoTexts = require("plato-texts");
const dialogue = "euthyphro"
const stephanus = "2a"

platoTexts(dialogue, stephanus)
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))
```

Returns : 
```javascript
{ 
  passageRequested: 'Euthyphro 2a',
  URL: 'https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg001.perseus-grc1:2',
  '2a': 'ΕΥΘ. τί νεώτερον, ὦ Σώκρατες, γέγονεν, ὅτι σὺ τὰς ἐν Λυκείῳ καταλιπὼν διατριβὰς ἐνθάδε νῦν διατρίβεις περὶ τὴν τοῦ βασιλέως στοάν; οὐ γάρ που καὶ σοί γε δίκη τις οὖσα τυγχάνει πρὸς τὸν βασιλέα ὥσπερ ἐμοί.ΣΩ. οὔτοι δὴ Ἀθηναῖοί γε, ὦ Εὐθύφρων, δίκην αὐτὴν καλοῦσιν ἀλλὰ γραφήν. ' 
  }
```

# Book-based Dialogues
For works which are split into books, i.e. the Republic, Laws, and Letters, the correct book number and a period must be prefixed before the stephanus number passed into the main function. For instance, to access the beginning of book 7 of the Republic, passing "republic", "514a" will not work. On the other hand, this will work:

```javascript
const platoTexts = require("plato-texts");
const dialogue = "republic"
const stephanus = "7.514a"

platoTexts(dialogue, stephanus)
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))
```

Returns:
```javascript
{ 
  passageRequested: 'Republic 7.514a',
  URL: 'https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg030.perseus-grc2:7.514',
  '514a': 'μετὰ ταῦτα δή, εἶπον, ἀπείκασον τοιούτῳ πάθει τὴν ἡμετέραν φύσιν παιδείας τε πέρι καὶ ἀπαιδευσίας. ἰδὲ γὰρ ἀνθρώπους οἷον ἐν καταγείῳ οἰκήσει σπηλαιώδει, ἀναπεπταμένην πρὸς τὸ φῶς τὴν εἴσοδον ἐχούσῃ μακρὰν παρὰ πᾶν τὸ σπήλαιον, ἐν ταύτῃ ἐκ παίδων ὄντας ἐν δεσμοῖς καὶ τὰ σκέλη καὶ τοὺς αὐχένας, ὥστε μένειν τε αὐτοὺς εἴς τε τὸ' 
}
```

# Other Options: Stephanus Numbers
The Stephanus number may be exact (number plus letter, as in the above examples) or inexact (number only). For instance, passing "apology", "17" will return all texts in that number range (in this case, 17a, 17b, 17c, 17d):

```javascript
{ 
  passageRequested: 'Apology 17',
  URL: 'https://scaife-cts.perseus.org/api/cts?request=GetPassage&urn=urn:cts:greekLit:tlg0059.tlg002.perseus-grc2:17',
  '17a': 'ὅτι μὲν ὑμεῖς, ὦ ἄνδρες Ἀθηναῖοι, πεπόνθατε ὑπὸ τῶν ἐμῶν κατηγόρων, οὐκ οἶδα· ἐγὼ δʼ οὖν καὶ αὐτὸς ὑπʼ αὐτῶν ὀλίγου ἐμαυτοῦ ἐπελαθόμην, οὕτω πιθανῶς ἔλεγον. καίτοι ἀληθές γε ὡς ἔπος εἰπεῖν οὐδὲν εἰρήκασιν. μάλιστα δὲ αὐτῶν ἓν ἐθαύμασα τῶν πολλῶν ὧν ἐψεύσαντο, τοῦτο ἐν ᾧ ἔλεγον ὡς χρῆν ὑμᾶς εὐλαβεῖσθαι μὴ ὑπʼ ἐμοῦ ἐξαπατηθῆτε',
  '17b': 'ὡς δεινοῦ ὄντος λέγειν. τὸ γὰρ μὴ αἰσχυνθῆναι ὅτι αὐτίκα ὑπʼ ἐμοῦ ἐξελεγχθήσονται ἔργῳ, ἐπειδὰν μηδʼ ὁπωστιοῦν φαίνωμαι δεινὸς λέγειν, τοῦτό μοι ἔδοξεν αὐτῶν ἀναισχυντότατον εἶναι, εἰ μὴ ἄρα δεινὸν καλοῦσιν οὗτοι λέγειν τὸν τἀληθῆ λέγοντα· εἰ μὲν γὰρ τοῦτο λέγουσιν, ὁμολογοίην ἂν ἔγωγε οὐ κατὰ τούτους εἶναι ῥήτωρ. οὗτοι μὲν οὖν, ὥσπερ ἐγὼ λέγω, ἤ τι ἢ οὐδὲν ἀληθὲς εἰρήκασιν, ὑμεῖς δέ μου ἀκούσεσθε πᾶσαν τὴν ἀλήθειαν—οὐ μέντοι μὰ Δία, ὦ ἄνδρες Ἀθηναῖοι, κεκαλλιεπημένους γε λόγους, ὥσπερ οἱ τούτων,',
  '17c': 'ῥήμασί τε καὶ ὀνόμασιν οὐδὲ κεκοσμημένους, ἀλλʼ ἀκούσεσθε εἰκῇ λεγόμενα τοῖς ἐπιτυχοῦσιν ὀνόμασιν—πιστεύω γὰρ δίκαια εἶναι ἃ λέγω—καὶ μηδεὶς ὑμῶν προσδοκησάτω ἄλλως· οὐδὲ γὰρ ἂν δήπου πρέποι, ὦ ἄνδρες, τῇδε τῇ ἡλικίᾳ ὥσπερ μειρακίῳ πλάττοντι λόγους εἰς ὑμᾶς εἰσιέναι. καὶ μέντοι καὶ πάνυ, ὦ ἄνδρες Ἀθηναῖοι, τοῦτο ὑμῶν δέομαι καὶ παρίεμαι· ἐὰν διὰ τῶν αὐτῶν λόγων ἀκούητέ μου ἀπολογουμένου διʼ ὧνπερ εἴωθα λέγειν καὶ ἐν ἀγορᾷ ἐπὶ τῶν τραπεζῶν, ἵνα ὑμῶν πολλοὶ ἀκηκόασι, καὶ ἄλλοθι, μήτε',
  '17d':'θαυμάζειν μήτε θορυβεῖν τούτου ἕνεκα. ἔχει γὰρ οὑτωσί. νῦν ἐγὼ πρῶτον ἐπὶ δικαστήριον ἀναβέβηκα, ἔτη γεγονὼς ἑβδομήκοντα· ἀτεχνῶς οὖν ξένως ἔχω τῆς ἐνθάδε λέξεως.' 
}
```

# Other Options: Dialogues
All dialogues may be abbreviated when passed. For example, the following are all equivalent expressions "apology", "apol.", "apol", "apo." "apo".

Simply passing in the dialogue name as a single argument, without any Stephanus number, will return the possible range of Stephanus numbers as a string. For example, 
```javascript
console.log(platoTexts("symposium"));
```
Returns: 
```javascript
"Symposium: 172a-223d (possible search range)"
```
Likewise, typing in the dialogue name followed by "range" in the second argument will return the same result.

Running the "all" command as the only argument returns an array of all dialogues and their possible Stephanus ranges.
```javascript
console.log(platoTexts("all"));
```
Returns:

```javascript
[ 'Alcibiades I: 103a-135e',
  'Alcibiades II: 138a-151c',
  'Apology: 17a-42a',
  'Charmides: 153a-176d',
  'Clitophon: 406a-410e',
  'Cratylus: 383a-440e',
  'Critias: 106a-121c',
  'Crito: 43a-54e',
  'Epinomis: 973a-992e',
  'Euthydemus: 271a-307c',
  'Euthyphro: 2a-16a',
  'Gorgias: 447a-527e',
  'Hipparchus: 225a-232c',
  'Hippias Major: 281a-304e',
  'Hippias Minor: 363a-376c',
  'Ion: 530a-542b',
  'Laches: 178a-201c',
  'Laws: 1.624a-650b',
  'Lysis: 203a-223b',
  'Menexenus: 234a-249e',
  'Meno: 70a-100b',
  'Minos: 313a-321d',
  'Parmenides: 126a-166c',
  'Phaedo: 57a-118a',
  'Phaedrus: 227a-279c',
  'Philebus: 11a-67b',
  'Protagoras: 309a-362a',
  'Republic: 327a-621d',
  'Rival Lovers: 132a-139a',
  'Seventh Letter: 7.323d-7.352a',
  'Sophist: 216a-268d',
  'Statesman: 257a-311c',
  'Symposium: 172a-223d',
  'Theaetetus: 142a-210d',
  'Theages: 121a-131a',
  'Timaeus: 17a-92c' ]
```
