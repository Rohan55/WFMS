var loginController = require('./controllers/login');
var clientController = require('./controllers/client');
var reportController = require('./controllers/report');
var alertController = require('./controllers/alert');

module.exports = function (app, passport) {

    // Home
    app.get('/', function(req,res){ res.render("index"); });
    app.get(['/home','/logout'], ensureAuthenticated, function(req,res){ res.render("index"); });

    // Auth
    app.post('/api/register', loginController.register);
    app.get('/api/login', function(req,res){ res.render("index"); });
    app.post('/api/login', loginController.checkLogin);
    app.get('/api/loggedin',loginController.loggedin);
    app.post('/api/logout', loginController.logout);
    
    // Clint
    app.get('/api/getClient/:idperson', ensureAuthenticated, clientController.getClient);
    app.get('/api/listAllClients', ensureAuthenticated, clientController.listAllClients);
    app.put('/api/updateClient', ensureAuthenticated, clientController.updateClient);
    app.post('/api/createClient', ensureAuthenticated, clientController.createClient);
    app.delete('/api/deleteClient', ensureAuthenticated, clientController.deleteClient);
    
    
    //Rishabh
    app.post('/api/createReport', ensureAuthenticated, reportController.createReport);
    app.get('/api/reportPerBuilding/:idbuilding', ensureAuthenticated, reportController.reportPerBuilding);
    app.get('/api/reportPerClient/:idclient', ensureAuthenticated, reportController.reportPerClient);
    app.get('/api/reportPerDay/:date', ensureAuthenticated, reportController.reportPerDay);
    app.post('/api/createAlert', ensureAuthenticated, alertController.createAlert);
    app.get('/api/alertPerBuilding/:idbuilding', ensureAuthenticated, alertController.alertPerBuilding);
    app.get('/api/alertPerClient/:idclient', ensureAuthenticated, alertController.alertPerClient);
    app.get('/api/alertPerDay/:date', ensureAuthenticated, alertController.alertPerDay);

   
    //Elastick beanstalk healthcheck
    app.get('/health',function(req,res){ res.send(200); });
    
    //Auth Middleware
    function ensureAuthenticated(req, res, next) {
       // if (req.isAuthenticated()) 
    	{ 
            return next(); 
            //Rishabh Sanghvi
//        } else {
//            //res.redirect('/login');
//           res.status(401).json({message : "Unauthorized access !!"}); 
        }
    }
};
