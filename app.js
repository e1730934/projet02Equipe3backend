const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
// const db = require("./database/requete.js");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('admin'));

app.listen(PORT, () => {
  console.log(`Mon application roule sur http://localhost:${PORT}`);
});
