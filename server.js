const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const reportRouter = require('./routes/report')
const authRouter = require('./routes/auth')
const PORT = process.env.PORT || 3500;
const connectDB = require('./db/connectDB')




// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});;

app.use(express.static(path.resolve(__dirname, "./complaint-request/build")));
app.use(reportRouter)
app.use(authRouter)
app.use( (req, res, next)=> {
    if (req.headers['x-forwarded-proto'] === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
  });

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "./complaint-request/build/index.html" ))
})


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

//app.use(errorHandler);
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ message, data })
})





const start = async() => {
    try {
        await connectDB(
            'mongodb+srv://tunde:tunde2022@cluster0.g6odvz2.mongodb.net/?retryWrites=true&w=majority'
        )

        app.listen(
            PORT,
            console.log(`server is running on PORT : ${PORT}`)
        )
    } catch (err) {
        console.log(err)
    }
}
start()