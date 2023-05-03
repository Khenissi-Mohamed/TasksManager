require('dotenv').config();

const express = require('express');
const router = require('./app/routers');




const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});



    