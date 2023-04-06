const {db, syncAndSeed, models: {List}} = require('./db/index')

const express = require('express');
const app = express();
const path = require('path')


app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json())



app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')))

app.get('/api/lists', async (req, res, next)=>{
    try{
        const data = await List.findAll();
        res.send(data);
    }
    catch(err){
        res.send(err)
    }
})

app.post('/api/lists', async (req, res, next)=>{
    try{
        const item = req.body.newItem
        const pageDate = req.body.pageDate
        console.log(item, pageDate)
        res.status(201).send(await List.create({
            item: item,
            date: pageDate,
        }));
    }
    catch(err){
        res.send(err)
    }
})

app.delete('/api/lists/:id', async (req, res, next)=>{
    try{
        const listItem = await List.findByPk(req.params.id)
        await listItem.destroy();
        res.sendStatus(204);
    }
    catch(err){
        next(err)
    }
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