const Sequelize = require('sequelize');
const {UUID, UUIDV4, STRING} = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/todolist');


const List = db.define('list', {
    id: {
        type: UUID,
        primaryKey: true, 
        defaultValue: UUIDV4,
    }, 
    item: {
        type: STRING,
        allowNull: false
    },
    date:{
        type: STRING,
    }
}) 


const baseList = ['apple', 'bananas', 'carrots']
const today = new Date().toDateString();

const syncAndSeed = async () =>{
    try{
        await db.sync({force: true})
        await Promise.all(baseList.map(itemName=>{
            List.create({
                item: itemName,
                date: today
            })
        }))
        console.log('connected to db')
    }
    catch(err){
        console.log(err)
    }

}

module.exports = {
    db,
    syncAndSeed,
    models:{
        List
    }
}