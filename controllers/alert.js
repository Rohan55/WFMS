var dateutil = require('../util/dateutil'),
	moment = require('moment');

createAlert = function(req,res){
	console.log(JSON.stringify(req.body));
	console.log("This Api will be adding the alert");
	console.log(req.params.idbuilding);
	if(!req.params.idbuilding){
		res.status(400).json({status : 400, message : "Bad Request"});
	} else {
		mysql.queryDb('SELECT wfms.alertinfo.severity, wfms.alertinfo.date, wfms.alertinfo.idalertInfo FROM wfms.alertinfo where ?? = ?;',['idbuilding',req.params.idbuilding],function(err,resultAlert){
			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				res.status(200).json({ status : 200, resultAlert:resultAlert });
			}
		});
	}
	
	
}

alertPerBuilding = function(req,res){
	console.log(JSON.stringify(req.body));
	console.log("This Api will be for fetching alerts according to buildings");
	console.log(req.params.idbuilding);
	if(!req.params.idbuilding){
		res.status(400).json({status : 400, message : "Bad Request"});
	} else {
		mysql.queryDb('SELECT wfms.alertinfo.severity, wfms.alertinfo.date, wfms.alertinfo.idalertInfo FROM wfms.alertinfo where ?? = ?;',['idbuilding',req.params.idbuilding],function(err,resultAlert){
			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				res.status(200).json({ status : 200, resultAlert:resultAlert });
			}
		});
	}
}


alertPerClient = function(req,res){
	console.log(JSON.stringify(req.body));
	console.log("This Api will be for fetching alerts according to clients");
	console.log(req.params.idclient);
	if(!req.params.idclient){
		res.status(400).json({status : 400, message : "Bad Request"});
	} else {
		mysql.queryDb('SELECT * FROM wfms.alertinfo left outer join wfms.building on ?? = ?? where ?? = ?;',['wfms.building.idbuilding','wfms.alertinfo.idbuilding','idclient',req.params.idclient],function(err,resultAlert){

			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				res.status(200).json({ status : 200, message : "Report for Alert", resultAlert:resultAlert});
			}
		});
	}
}

alertPerDay = function(req,res){
	
	console.log("This Api is for creating report based on date");
	if(!req.params.date){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		var date = String(req.params.date);
		var fromDate = date + " 00:00:00";
		console
		var untilDate = String(req.params.date);
		untilDate = untilDate + " 23:59:59";
		
		mysql.queryDb("SELECT * FROM wfms.alertinfo where ?? LIKE '"+date+"%'",['date'], function(err, resultAlert) {
			if (err) {
				console.log("Error while perfoming query !!!");
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				
				res.status(200).json({ status : 200, message : "Report for Patrol", resultAlert:resultAlert});
			}
		});
	}
	
}


exports.alertPerDay = alertPerDay;
exports.alertPerClient = alertPerClient;
exports.alertPerBuilding = alertPerBuilding
exports.createAlert = createAlert;
