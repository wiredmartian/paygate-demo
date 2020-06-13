const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

/*const whiteList = ['http://localhost:4200'];
const corsOptions = {
  origin: (origin, callback) => {
    let isWhitelisted = whiteList.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
}*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/payment-result', (req, res) => {
  console.log(req.body);
  return res.redirect("http://localhost:4200");
});
app.post('/payment-result', (req, res) => {
  console.log(req.body);
  const {
    PAY_REQUEST_ID,
    TRANSACTION_STATUS,
    CHECKSUM
  } = req.body;
  return res.redirect("http://localhost:4200?PAY_REQUEST_ID=" + PAY_REQUEST_ID + "&TRANSACTION_STATUS=" + TRANSACTION_STATUS + "&CHECKSUM=" + CHECKSUM);
});

app.listen(4000, () => {
  console.info('server running at port 4000');
});
