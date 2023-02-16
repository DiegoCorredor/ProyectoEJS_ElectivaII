const route = require('express').Router()
'use strict'
const fs = require('fs')
const query = fs.readFileSync('./data.json')
const temp = JSON.parse(query)

//Routes
route.get('/', (req, res) => {
    res.render('index', { title: "Home :: SGRC" })
})

route.get('/newEntry', (req, res) => {
    res.render('insert', { title: "Agregar reserva de auto" })
})

route.get('/searchEntry', (req, res) => {
    res.render('search', { title: "Buscar reserva de auto",'temp':temp})
})

route.get('/editEntry', (req, res) => {
    res.render('edit', { title: "Editar reserva de auto" })
})

route.get('/delEntry', (req, res) => {
    res.render('delete', { title: "Eliminar reserva de auto" })
})

//Insert data
route.post('/', (req, res) => {
    const { persons, car, dateBooking, dateDelivery, observations } = req.body
    const id = temp[temp.length - 1].id+1;

    const data = {
        'id': id,
        'persons': persons,
        'car': car,
        'booking': dateBooking,
        'delivery': dateDelivery,
        'observations': observations
    }
    
    //validate the data

    console.log(temp.length) 

    //write the data
    temp.push(data)
    fs.writeFileSync('./data.json', JSON.stringify(temp,null,2))

    //to home
    res.redirect('/')
})
module.exports = route;
