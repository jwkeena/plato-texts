# plato-texts
A node package for retrieving the texts of Plato from the Scaife Viewer API.

# How to Use
This tool exposes a single function, getPlatoText, which accepts two arguments: first, the dialogue name, which is required; second, the Stephanus number, which is optional.  

# Example Usage
```javascript
const platoTexts = require("plato-texts");

console.log(platoTexts("apology", "17a"))
```




