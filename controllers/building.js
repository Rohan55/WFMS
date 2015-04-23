var dateutil = require('../util/dateutil'),
	moment = require('moment');

createBuilding = function(req,res){
	console.log("in create building");
	console.log(req.body.idclient);
	console.log(JSON.stringify(req.body));
	if(!req.body.idclient){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		var releaseDate = moment(req.body.release_date,'DD-MM-YYYY').toDate();
		
		var queryParam = {
				release_date : releaseDate,
				idclient : req.body.idclient,
				address : req.body.address,
				service_fees : req.body.service_fees,
				checkpoint : req.body.checkpoint
		}

		mysql.queryDb("INSERT INTO building SET ?", queryParam, function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!");
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				res.status(200).json({ status : 200, message : "building has been added Succesfully" });
			}
		});
	}
};


editBuilding = function(req,res){
	if(!req.params.buildingid){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		var newParam ={
				release_date : moment(req.body.release_date,'DD-MM-YYYY').toDate(),
				address : req.body.address,
				service_fees : req.body.service_fees,
				checkpoint : req.body.checkpoint
				};
		//and ?? = ? and ?? = ?
		//'start_date',old.start_date,'end_date',old.end_date
		mysql.queryDb("UPDATE building SET ? WHERE ?? = ?", 
			[newParam,'idbuilding',req.params.buildingid], 
			function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!" + err);
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				res.status(200).json({ status : 200, message : "building has been updated Succesfully" });
			}
		});
	}
};


deleteBuilding=function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.params.buildingid){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		var buildingid = req.params.buildingid;
		
		mysql.queryDb('DELETE FROM building WHERE ?',[{idbuilding:buildingid}],function(err,response){
			if (err) {
				console.log("Error while deleting building details !!!");
				console.log(err);
				res.status(500).json({ status : 500, message : "Error while deleting building details !!!" });
			} else {
				res.status(200).json({ status : 200, message : "building details has been deleted Succesfully" });
			}
		});
	}
};

exports.createBuilding = createBuilding;
exports.editBuilding = editBuilding;
exports.deleteBuilding = deleteBuilding;
