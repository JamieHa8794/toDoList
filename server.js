const {db, syncAndSeed, models: {List}} = require('./db/index')

const express = require('express');
const app = express();
const path = require('path')


app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json())



app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')))

app.get('/api/list', async (req, res, next)=>{
    const data = await List.findAll();
    res.send(data);
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