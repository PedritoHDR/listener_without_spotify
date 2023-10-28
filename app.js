const express = require('express');
const exphbs = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 8080;
const serverUrl = `http://localhost:${port}`;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/assets/public'));
app.use(cors())
app.use(cookieParser());
app.use(
    expressFileUpload({
        limits: 5000000,
        abortOnLimit: true,
        responseOnLimit: 'El tamaño de la imagen supera el límite permitido'
    })
);
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: "main",
        layoutsDir: `${__dirname}/views/mainLayout`,
        partialsDir: `${__dirname}/views/components`,
    })
);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, console.log(`SERVER RUNNING ON ${serverUrl}`));