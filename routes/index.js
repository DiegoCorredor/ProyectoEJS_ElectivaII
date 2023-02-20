const route = require('express').Router()
'use strict'
const fs = require('fs')
const query = fs.readFileSync('./data.json')
const temp = JSON.parse(query)
var obj="";

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
route.get('/editEntry/', (req, res) => {
    /*try{
        let id = req.params.id
        let { persons, car, dateBooking, dateDelivery, observations } = req.body
        temp.forEach(t=>{
            if(t.id==id){
                t.persons=persons
                t.car=car
                t.booking=dateBooking
                t.delivery=dateDelivery
                t.observations=observations
                console.log("actualizado")
                alert("actualizado")
            }
        })
    }
    catch{
        res.status(400).send("No se pudo actualizar la reservacion")
    }
    */res.render('edit', { title: "Editar reserva de auto :: SGRC", "temp": temp, "obj": obj })

})

route.post('editById/:id',(res,req)=>{
        
    res.render('/', { title: "Holi de nuevo", "temp": temp, "obj": obj })
})
route.get('/delEntry', (req, res) => {
    res.render('delete', { title: "Eliminar reserva de auto :: SGRC", "temp": temp })
})


route.get('/getBoking/:id',(req,res)=>{
    let id=findBoking(req.params.id)

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
    if (flag != false) {
        //write the data
        temp.push(data)
        fs.writeFileSync('./data.json', JSON.stringify(temp, null, 2))
        //to home
        res.redirect('/')
    }
})

//Edit data
route.post('/editData/:id',async (req,res)=>{

    await console.log(req.body)
     
        const { id,persons, car, dateBooking, dateDelivery, observations } = req.body
        console.log("ante de entrar, persona: "+persons)
        await temp.forEach(t=>{
            if(t.id==id){
                t.persons=persons
                t.car=car
                t.booking=dateBooking
                t.delivery=dateDelivery
                t.observations=observations
                console.log("actualizado")
                console.log(car)
                console.log(t.persons)
            }
        })
        fs.writeFileSync('./data.json', JSON.stringify(temp, null, 2))
        res.redirect('/')
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

function findBoking(id){
    var obj = null;
    temp.forEach(t=>{
        if(t.id==id){
            obj=t
        }
    })
    return obj
}


module.exports = route,temp;
