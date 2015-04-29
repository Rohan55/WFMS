var dateutil = require('../util/dateutil'),
	moment = require('moment');


createGuard = function(req,res){
	
	console.log(JSON.stringify(req.body));
	
	if(!req.body.idperson || !req.body.start_date || !req.body.end_date || !req.body.weekly_working_set || !req.body.bgstatus){
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		var formDate = moment(req.body.start_date,'DD-MM-YYYY').toDate();
		var toDate = moment(req.body.end_date,'DD-MM-YYYY').toDate();

		var queryParam = {
				
				idguard : req.body.idguard,
				idperson : req.body.idperson,
				start_date : formDate,
				end_date : toDate,
				weekly_working_set : req.body.weekly_working_set,
				bgstatus: req.body.bgstatus
		}

		mysql.queryDb("INSERT INTO guard SET ?", queryParam, function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!");
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				res.status(200).json({ status : 200, message : "Guard has been added Succesfully" });
			}
		});
	}
};


updateGuard = function(req,res){
	if(!req.body.idperson || !req.body.start_date || !req.body.end_date){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		var newParam ={
			
				weekly_working_set : req.body.weekly_working_set,
				bgstatus: req.body.bgstatus,
				start_date :moment(req.body.start_date,'DD-MM-YYYY').toDate(), 
				end_date : moment(req.body.end_date,'DD-MM-YYYY').toDate()
		};
		
		console.log(req.params.idguard);
		
		mysql.queryDb("UPDATE guard SET ? WHERE ?? = ?", 
			[newParam,'idguard',req.params.idguard], 
			function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!" + err);
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				res.status(200).json({ status : 200, message : "Guard has been updated Succesfully" });
			}
		});
	}
};



listAllGuards=function(req,res){
	mysql.queryDb('select * from guard left join person on guard.idperson = person.idperson',function(err,rows){
		if (err) {
			console.log("Error while listing all the guard details !!!"  + err);
			res.status(500).json({ status : 500, message : "Error while listing guard details !!!" });
		} else {
			res.status(200).json({ status : 200, data : rows});
		}
	});
};


deleteGuard=function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.params.idguard){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		
		idguard = req.params.idguard;
		
		mysql.queryDb('DELETE FROM guard WHERE ?',[{idguard:idguard}],function(err,response){
			if (err) {
				console.log("Error while deleting guard details !!!");
				console.log(err);
				res.status(500).json({ status : 500, message : "Error while deleting guard details !!!" });
			} else {
				res.status(200).json({ status : 200, message : "Guard details has been deleted Succesfully" });
			}
		});
	}
};


getGuard=function(req,res){
	
	if(!req.params.idperson){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{ 
		
		idperson = req.params.idperson,
		mysql.queryDb('SELECT * FROM guard g JOIN person p on ?? = ?? where ?? =? ;',['g.idperson','p.idperson','p.idperson',req.params.idperson ],function(err,rows){
        
			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
				console.log(rows);
				res.status(200).json({ status : 200, data : rows });
			}
		});
	}
};


//Will use filter in angular on these names returned

searchGuard=function(req,res){
	mysql.queryDb('select concat(?? , " " , ??) as name, ?? from person left outer join login on ?? = ?? where login.type= "Guard"',['person.fname','person.lname','person.email','person.idperson','login.idperson','Guard'],function(err,rows){
		if (err) {
			console.log("Error while listing all the guard details !!!"  + err);
			res.status(500).json({ status : 500, message : "Error while listing guard details !!!" });
		} else {
			res.status(200).json({ status : 200, data : rows});
		}
	});
};


listAllGuards=function(req,res){
	mysql.queryDb('select * from guard left join person on guard.idperson = person.idperson',function(err,rows){
		if (err) {
			console.log("Error while listing all the guard details !!!"  + err);
			res.status(500).json({ status : 500, message : "Error while listing guard details !!!" });
		} else {
			res.status(200).json({ status : 200, data : rows});
		}
	});
};
addPatrolRecord = function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.date || !req.body.description || !req.body.idguard || !req.body.idbuilding || !req.body.idreport){
		
		res.status(400).json({status : 400, message : "Bad Request"});
	}else{
		
		var queryParam = {
				
			
					
				date    : req.body.date,
				description : req.body.description,
				idguard   : req.body.idguard,
				idbuilding : req.body.idgaurd,
				idreport : req.body.idreport
				
				
		}

		mysql.queryDb("INSERT INTO patrol SET ?", queryParam, function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!");
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				res.status(200).json({ status : 200, message : "Patrol record has been added Succesfully" });
			}
		});
	}
};
	
getGuardSchedule=function(req,res){
	
	
		
		idguard = req.params.idguard;
	mysql.queryDb('select b.buildingname,b.idbuilding,g.from, g.to, b.address from gaurdbuildingschedule g JOIN building b on g.idbuilding=b.idbuilding where ?',[{idguard:idguard}],function(err,rows){
		if (err) {
			console.log("Error while fetchung Guard Schedule!!!"  + err);
			res.status(500).json({ status : 500, message : "Error while listing guard schedule !!!" });
		} else {
			res.status(200).json({ status : 200, data : rows});
		}
	});
	
};

editGuard = function(req,res){
	if(!req.body.fname || !req.body.lname || !req.body.email || !req.body.phonenumber || !req.body.email){
		console.log(req.body.fname);
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{
		
		
		mysql.queryDb("UPDATE guard SET ? WHERE ?? = ?", 
			['idperson',req.body.idperson], 
			function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!" + err);
				res.status(500).json({ status : 500, message : "Please try again later" });
			} else {
				res.status(200).json({ status : 200, message : "Guard has been updated Succesfully" });
			}
		});
	}
};

exports.createGuard = createGuard;
exports.updateGuard=updateGuard;
exports.listAllGuards=listAllGuards;
exports.deleteGuard=deleteGuard;
exports.getGuard = getGuard;
exports.searchGuard=searchGuard;
exports.addPatrolRecord=addPatrolRecord;
exports.getGuardSchedule=getGuardSchedule;
exports.editGuard=editGuard;
