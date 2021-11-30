const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post(
  '/',
  [
    body('fullName').custom((value) => {
      let verifyName = value.split(' ');
      console.log(verifyName, verifyName.length);
      if (verifyName.length <= 1) {
        return Promise.reject('Colocar NOME COMPLETO!');
      } else {
        return true;
      }
    }),
    body('phoneNumber').isMobilePhone().isLength({ min: 11 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      let fullName = req.body.fullName;
      let phoneNumber = req.body.phoneNumber;
      res.send(`Sr(a) ${fullName}, em breve entraremos em contato pelo o numero ${phoneNumber} fornecido.
      `);
    }
  }
);

app.listen(3000, () => {
  console.log(`Server running!`);
});
