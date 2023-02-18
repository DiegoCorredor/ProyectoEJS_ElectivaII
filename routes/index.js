const route = require('express').Router()
'use strict'
const fs = require('fs')
const query = fs.readFileSync('./data.json')
const temp = JSON.parse(query)
var obj;

//Routes
route.get('/', (req, res) => {
    res.render('index', { title: "Home :: SGRC" })
})

route.get('/newEntry', (req, res) => {
    res.render('insert', { title: "Agregar reserva de auto :: SGRC" })
})

route.get('/searchEntry', (req, res) => {
    res.render('search', { title: "Buscar reserva de auto :: SGRC", 'temp': temp })
})

route.get('/editEntry', (req, res) => {
    res.render('edit', { title: "Editar reserva de auto :: SGRC", "temp": temp, "obj": obj })

})

route.get('/delEntry', (req, res) => {
    res.render('delete', { title: "Eliminar reserva de auto :: SGRC", "temp": temp })
})



//Insert data
route.post('/addBooking', (req, res) => {
    const { persons, car, dateBooking, dateDelivery, observations } = req.body
    const id = temp[temp.length - 1].id + 1;
    const data = {
        'id': id,
        'persons': persons,
        'car': car,
        'booking': dateBooking,
        'delivery': dateDelivery,
        'observations': observations
    }

    //validate the data
    let flag = true
    temp.forEach(temp => {
        if (dateBooking == temp["booking"] && car == temp["car"]) {
            flag = false
        }
    })

    if (flag == false) {
        console.log("Fecha y auto ocupado, seleccione otra")
    } else {

        //write the data
        temp.push(data)
        fs.writeFileSync('./data.json', JSON.stringify(temp, null, 2))

        //to home
        res.redirect('/')
    }
})


//Edit data
route.post('/editData',(req,res)=>{
    const {person} = req.body
    console.log(person)

    route.post('/saving',(req,res)=>{
        console.log('entre al segundo post que emocion')

        res.redirect('/')
    })


    
})
/*
route.post('/editData', (res, req) => {
    console.log(res)
    temp.forEach(t => {
        if (t.id == res.data) {
            obj = t
        }
    })


})*/

function editing(){
    alert("Hola mundo 2")
}

module.exports = route;
