var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var http = require('http');

var app = express();

const route = require('./routes/routes');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/candidateDb');

// on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error',(err)=>{
    if(err){
       console.log('Error data base connection' + err); 
    }
});

//port no ::
const hostname = 'http://ec2-54-208-93-112.compute-1.amazonaws.com/';
const port = 80;

//adding middleware
app.use(cors());
app.use(bodyparser.json());


// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', route);

//listening to port
app.listen(port, () => {
    console.log('Server started at port:' + port);
});


