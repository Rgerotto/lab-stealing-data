const express = require("express")
const hbs = require("hbs")
const mongoose = require("mongoose")
const character = require('./model/character.js')
require('dotenv').config()
const mongo_uri = process.env.MONGO_URI

const app = express()

app.set('view engine', 'hbs')
app.set('views', __dirname, '/views')


app.get("/", (request, response) => {
    response.render("layout")
})

mongoose.connect(mongo_uri)
.then(() => console.log("connect to mongo"))
.catch((error) => console.log(error))

fetch("https://rickandmortyapi.com/api/character")
.then((data) => data.json())
.then((jsonData) => {
    //console.log(jsonData.results)
    const cleanedArray = [];
    jsonData.results.forEach((element) => {
        const {name, image} = element;
        //console.log(name);
        //console.log(image);
        const newObject = {name: name, imageUrl: image}
        cleanedArray.push(newObject)
    })
    return cleanedArray
})
.then((cleanedArray) => {
    return character.insertMany(cleanedArray)
})
.then((characters) => console.log("return characters: ", characters))
.catch((error) => {
    console.log(error);
})

app.listen(3000,() => console.log('seed is working'))
