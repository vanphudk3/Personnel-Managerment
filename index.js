require('dotenv').config();
var express = require('express');
var bodyparser = require('body-parser');
  
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Địa chỉ Angular server
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization,x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

var connection = require('./config');
var routeRole = require('./routes/role.route');
var routeUser = require('./routes/user.route');
var routeGroup = require('./routes/group.route');
var routeDepartment = require('./routes/department.route');
var routeShift = require('./routes/works/shift.route');
var routeWorkTime = require('./routes/works/work_time.route');
var routeWorkSchedule = require('./routes/works/work_schedule.route');
var routeOverTime = require('./routes/works/over_time.route');
var routeBreakTime = require('./routes/works/break_time.route');
var routeBreakTimeLog = require('./routes/works/break_time_log.route');
app.use('/role',routeRole);
app.use('/user',routeUser);
app.use('/group',routeGroup);
app.use('/department',routeDepartment);
app.use('/shift',routeShift);
app.use('/work_time',routeWorkTime);
app.use('/work_schedule',routeWorkSchedule);
app.use('/overtime',routeOverTime);
app.use('/break_time',routeBreakTime);
app.use('/break_time_log',routeBreakTimeLog);
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Server listening on port ' + server.address().port);
});
module.exports = app;
