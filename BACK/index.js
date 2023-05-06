require('dotenv').config();

const express = require('express');
const router = require('./app/routers');
const cors = require('cors');

const taskDatamapper = require('./app/datamappers/taskDatamapper')




const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});



