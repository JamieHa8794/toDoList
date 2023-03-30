const {db, syncAndSeed, models: {List}} = require('./db/index')

const express = require('express');
const app = express();
const path = require('path')


app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')))


const init = async () =>{
    try{
        await syncAndSeed();
        const port = process.env.PORT || 8080;
        app.listen(port, ()=>{
            console.log(`listening on port ${port}`)
        })
    }
    catch(err){
        console.log(err);
    }
}

init();