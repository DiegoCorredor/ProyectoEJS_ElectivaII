const route = require('express').Router()

fetch('http://localhost:3000/data.json')
    .then((response) => response.json())
    .then((json) => console.log(json));

route.get('/', (req, res) => {
    res.render('index', { title: "Home :: SGRC" })
})

//Routes

route.get('/newEntry', (req, res) => {
    res.render('insert', { title: "Agregar reserva de auto" })
})

route.get('/searchEntry', (req, res) => {
    res.render('search', { title: "Buscar reserva de auto" })
})

route.get('/editEntry', (req, res) => {
    res.render('edit', { title: "Editar reserva de auto" })
})

route.get('/delEntry', (req, res) => {
    res.render('delete', { title: "Eliminar reserva de auto" })
})

//Show data

route.post('/', (req, res) => {
    const { persons, car, dateBooking, dateDelivery, observations } = req.body

    json.push({
        "persons": persons,
        "car": car,
        "booking": dateBooking,
        "delivery": dateDelivery,
        "observations": observations
    })

    console.log(`${persons} ${car} ${dateBooking} ${dateDelivery} ${observations}`)
    console.log("debieron ingresar")

    res.redirect('/')
})
module.exports = route;
