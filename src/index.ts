import express from 'express'
import bodyparser from 'body-parser';

const app = express()

app.use(bodyparser.json())

app.listen(7000,() =>{
    console.log('app started...');
    
})
