var loginController = require('./controllers/login');
var clientController = require('./controllers/client');
var adminController = require('./controllers/admin');

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
    
    // Client
    app.get('/api/getClient/:idperson', ensureAuthenticated, clientController.getClient);
    app.get('/api/listAllClients', ensureAuthenticated, clientController.listAllClients);
    app.put('/api/updateClient', ensureAuthenticated, clientController.updateClient);
    app.post('/api/createClient', ensureAuthenticated, clientController.createClient);
    app.delete('/api/deleteClient', ensureAuthenticated, clientController.deleteClient);
    
    // Admin
    app.post('/api/createAlert' ,adminController.createAlert);
    app.post('/api/publishAlert',adminController.publishAlert);
    app.get('/api/alertByBuilding',adminController.alertByBuilding);
   
    //Elastick beanstalk healthcheck
    app.get('/health',function(req,res){ res.send(200); });
    
    //Auth Middleware
    
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { 
            return next(); 
        } else {
            //res.redirect('/login');

          

           res.status(401).json({message : "Unauthorized access !!"}); 

        }
    }
};
