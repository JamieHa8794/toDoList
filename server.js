const {db, syncAndSeed, models: {List}} = require('./db/index')

const express = require('express');
const app = express();




app.get('/', (req, res, next)=>{
    const html = `
    <html>
        <head>
        </head>
        <body>
            <h1>Hello World</h1>
        </body>
    </html>
    `
    res.send(html)
})


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