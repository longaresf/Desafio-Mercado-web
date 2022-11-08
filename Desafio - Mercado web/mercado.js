const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require('path');

const puerto = process.env.Puerto || 3000;
const servidor = process.env.Servidor || 'localhost';

app.listen(puerto, () => {
    console.info(`Servidor disponible en http://${servidor}:${puerto}`);
    });

    app.engine("handlebars", exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, './views/mainLayout'),
        partialsDir: path.join(__dirname, './views/componentes'),
        helpers:{
            bienvenida: function(){
                return `Bienvenid@ a nuestro Mini Market “Come Sano, Come Fresco Spa”`
            }
        }
    }));

    app.set("view engine", "handlebars");

    app.use(express.static(__dirname + '/public'));

    app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
    app.use("/BootstrapJS", express.static(__dirname + "/node_modules/bootstrap/dist/js/bootstrap.js"));
    app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));

    app.get("/", function (req, res) {
        res.render("dashboard", { productos: ['banana', 'cebollas', 'pimenton', 'lechuga', 'tomate', 'papas']
            });
        });
