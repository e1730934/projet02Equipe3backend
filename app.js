const express = require('express');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const personnesRouter = require('./routes/personnes');
const connexionRouter = require('./routes/connexion');
const ippesRouter = require('./routes/ippes');
const crimesRouter = require('./routes/crimes');
const conditionsRouter = require('./routes/conditions');
const objetsRouter = require('./routes/objets');
const armesRouter = require('./routes/armes');
const valeursRouter = require('./routes/valeurs');

app.use(cors());
app.use(express.json());

app.use('/personnes', personnesRouter);
app.use('/connexion', connexionRouter);
app.use('/ippes', ippesRouter);
app.use('/crimes', crimesRouter);
app.use('/conditions', conditionsRouter);
app.use('/objets', objetsRouter);
app.use('/armes', armesRouter);
app.use('/valeurs', valeursRouter);

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
