import express from 'express'
import fs from 'fs'

const app = express();

const puerto = 8080;

var visitas = {ruta1: 0, ruta2:0};
var productos

app.get('/items', (req, res) => {
    visitas.ruta1 +=1;
    fs.readFile('./productos.txt','utf-8', (error, archivo) => {
        if (error) {
            console.log(error)
        } else {
            productos = JSON.stringify(archivo);
        }
        console.log(productos)
        res.send(`{
            <h2> Items: ${productos} </h2> 
        }`)
    })
})


app.get('/item-random', (req, res) => {
    visitas.ruta2 +=1;
    fs.readFile('./productos.txt', 'utf-8', (error, archivo) => {
        if (error) {
            console.log(error)
        } else {
            productos = JSON.parse(archivo);
        }

        let random = Math.floor(Math.random() * (1 - 3)) + 1;
        let producto = {
            item: productos[0].random
        }
        res.send(`{
            item: ${JSON.stringify(producto)}
        }`)
    })
})

app.get('/visitas', (req, res) => {
    res.send(visitas)
})

app.listen(puerto, (req, res) => {
    console.log(`Aplicación ejemplo, escuchando el puerto ${puerto}!`);
});