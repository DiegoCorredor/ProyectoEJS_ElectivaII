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
    res.render('edit', { title: "Editar reserva de auto :: SGRC", "temp":temp,"obj":obj})

})

route.get('/delEntry', (req, res) => {
    res.render('delete', { title: "Eliminar reserva de auto :: SGRC","temp":temp })
})

route.post('/juanita',(res,req)=>{
    console.log(res)
    temp.forEach(t=>{
        if(t.id==res.data){
            obj=t
        }
    })
    

})

//Insert data
route.post('/', (req, res) => {
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
            console.log("Fecha y auto ocupado, seleccione otra")
            flag = false
        }else{
            console.log("No repetido")
        }
    })


    if (flag == false) {
        console.log("Fecha y auto ocupado, seleccione otra")
    } else {
        console.log(temp.length)

        //write the data
        temp.push(data)
        fs.writeFileSync('./data.json', JSON.stringify(temp, null, 2))

        //to home
        res.redirect('/')
    }



})
module.exports = route;
