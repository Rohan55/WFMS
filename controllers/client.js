var dateutil = require('../util/dateutil'),
	moment = require('moment');

createClient = function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.idperson || !req.body.start_date || !req.body.end_date || !req.body.idclient){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		var formDate = moment(req.body.start_date,'DD-MM-YYYY').toDate();
		var toDate = moment(req.body.end_date,'DD-MM-YYYY').toDate();

		var queryParam = {
				idperson : req.body.idperson,
				start_date : formDate,
				end_date : toDate,
				idclient : req.body.idclient
		}

		mysql.queryDb("INSERT INTO client SET ?", queryParam, function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!");
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				res.status(200).json({ status : 200, message : "Client has been added Succesfully" });
			}
		});
	}
};

updateClientBillingInfo = function(req,res){
	if(!req.body.idclient){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		
		mysql.queryDb("select (abs(DATEDIFF(building.release_date,building.start_date)))*building.no_of_guards*10 AS Amount_Due, building.idbuilding, building.no_of_guards, building.start_date, building.buildingname, building.release_date from wfms.building inner join wfms.client on building.idclient = client.idclient where ?? = ? AND ?? = 'Active';",['building.idclient',req.body.idclient,'building.buildingstatus'],function(err,rows){

			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				res.status(200).json({ status : 200, message : "Value is coming",result:rows });
					
				
			}
		});
	}


};

updateClient = function(req,res){
	if(!req.body.idperson || !req.body.start_date || !req.body.end_date){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		var newParam ={
				start_date : moment(req.body.start_date,'DD-MM-YYYY').toDate(),
				end_date : moment(req.body.end_date,'DD-MM-YYYY').toDate()
		};
		console.log(start_date);
		//and ?? = ? and ?? = ?
		//'start_date',old.start_date,'end_date',old.end_date
		mysql.queryDb("UPDATE client SET ? WHERE ?? = ?", 
			[newParam,'idperson',req.body.idperson], 
			function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!" + err);
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				res.status(200).json({ status : 200, message : "Client has been updated Succesfully" });
			}
		});
	}
};

getClient=function(req,res){
	
	if(!req.params.idperson){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{ 
		mysql.queryDb('SELECT * FROM client WHERE ?',[{idperson:req.params.idperson}],function(err,rows){

			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				res.status(200).json({ status : 200, data : rows });
			}
		});
	}
};

deleteClient=function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.idperson){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		var idperson = req.body.idperson,
		idclient = req.body.idclient,
		start_date = req.body.start_date,
		end_date = req.body.end_date;

		mysql.queryDb('DELETE FROM client WHERE ?',[{idperson:idperson}],function(err,response){
			if (err) {
				console.log("Error while deleting client details !!!");
				console.log(err);
				res.status(500).json({ status : 500, message : "Error while deleting client details !!!" });
			} else {
				res.status(200).json({ status : 200, message : "Client details has been deleted Succesfully" });
			}
		});
	}
};

listAllClients=function(req,res){
	mysql.queryDb('SELECT * FROM client left join person on client.idperson = person.idperson',function(err,rows){
		if (err) {
			console.log("Error while listing all the client details !!!"  + err);
			res.status(500).json({ status : 500, message : "Error while listing client details !!!" });
		} else {
			res.status(200).json({ status : 200, data : rows});
		}
	});
};

exports.updateClientBillingInfo = updateClientBillingInfo;
exports.createClient = createClient;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;
exports.getClient = getClient;
exports.listAllClients = listAllClients;