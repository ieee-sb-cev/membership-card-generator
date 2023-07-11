# IEEE SB CEV - Membership Card Generator 

Version : 1.0.0

For generating the badge for now,
you need to be installed with [NodeJS](https://nodejs.org/en) in your system.

To download the dependencies, use the command in command line.

```javascript
npm install // This will install necessary dependencies to run.
```

---

Better to create a branch for yourself, before changing anything in the code.

To Create a Branch, use terminal / command line,

```javascript
git branch <branch-name> // git branch hafis-cp
git checkout <branch-name> // git checkout hafis-cp
```

---

Later on, for generate a badge for your convenience, you need to do some steps. Open **app.js** file for making the changes.

```javascript
// Change the text1 ~ Full Name
// Change the text2 ~ IEEE Number

const text1 = "Hafis CP";
const text2 = "96472297";

// You can find text1 & text2 in app.js file.
```

---

After changing the values, run the JS File.

```ruby
node app.js
```

The output file will be generated on the folder **final-outs**.

---

Link to the Figma File for the [Template Design](https://www.figma.com/file/ZyyVqOrNODGtHL26OQQ7zI/IEEE-Membership-Card-Generator?type=design&node-id=0%3A1&mode=design&t=pEXv2FevVCZMCN1F-1)

---

Future **Updations Required** :
- CSV file data used for auto-generating the cards.
- personal photograph will be embedded
- QR Code for data validation.

Make sure your contribution and do the PR. Happy to collaborate.

---

**Template File**

![Template](/template/template.png)

---

**Generated Sample File**

![Sample Generated](/final-outs/HafisCP.png)

---

# Thank You.