const express = require("express");
const app = express();
const cors = require('cors');
const request = require('./requestKnex')
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.static("appweb"));

app.post("/login", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    let loginInfo = {
        "username": req.body.username,
        "password": req.body.password
    }

    let data = await request.connectionCheck(loginInfo);
    
    if(data.length!=0){
        return res.status(200).json({'success': true})
    } else {
        return res.status(500).json({'succes' : false})
    }
    
})

app.post("/ippeInfo", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

});

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});