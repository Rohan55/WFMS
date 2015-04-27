var dateutil = require('../util/dateutil'),
	moment = require('moment');
var crypto = require('crypto');



createGuard = function(req,res){

	if(!req.body.email ||!req.body.password || !req.body.start_date || !req.body.end_date || !req.body.weekly_working_set || !req.body.bgstatus){
		res.status(400).json({status : 400, message : "Bad Request"});
	}
	else
		{
    console.log("create guard inside");
    var pwu = req.body.password;
    var un = req.body.email;
    var fn = req.body.fname;
    var ln = req.body.lname;
    var usertype = req.body.usertype;
    var address = req.body.address;
    var city = req.body.city;
    var zipcode = req.body.zipcode;
    var phonenumber = req.body.phonenumber;
     
    var new_salt = Math.round((new Date().valueOf() * Math.random())) + '';
    var pw = crypto.createHmac('sha1', new_salt).update(pwu).digest('hex');
    var created = dateutil.now();
    
    var data={
        email:un,
        password_hash:pw,
        status:true,
        type:usertype,
        created_date:created,
        last_login:created,
        password_salt:new_salt
    };

    mysql.queryDb('insert into login set ?',data,function(err,result){
      if(err) {
        console.log(err);
            res.status(500).json({ status : 500, message : "Please try again later" });
      } else {
            
        var idperson = result.insertId;

        mysql.queryDb('insert into person set ?',{idperson: idperson,fname : fn,
                  lname : ln,
                  email : un,
                  address: address,
                  city:city,
                  zipcode:zipcode,
                  phonenumber:phonenumber
                  },
        function(err,result){
          if(err) {
            res.status(500).json({ status : 500, message : "Please try again later" });
          } else {
        	  		var queryParam = {
      				idperson :	idperson,
      				start_date : req.body.start_date,
      				end_date : req.body.end_date,
      				weekly_working_set : req.body.weekly_working_set,
      				bgstatus: req.body.bgstatus
        	  		}

      		mysql.queryDb("INSERT INTO guard SET ?", queryParam, function(err, response) {
      			if (err) {
      				console.log("Error while perfoming query !!!");
      				res.status(500).json({ status : 500, message : "Please try again later" });
      			} else {
      				console.log("success so far");
      				res.status(200).json({ status : 200, message : "Guard has been added Succesfully" });
      			}
      		});
        	  
          }
        });
      }
    });
		}
};



updateGuard = function(req,res){
	if(!req.params.idguard || !req.body.start_date || !req.body.end_date){
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
			} 
			else
				{
				var newParam ={
						
						fname : req.body.fname,
						lname: req.body.lname,
						address: req.body.address,
						city: req.body.city,
						zipcode: req.body.zipcode,
						email: req.body.email,
						phonenumber: req.body.phonenumber,
					};
			
				
				mysql.queryDb("UPDATE person SET ? WHERE ?? = ?", 
					[newParam,'idperson',req.body.idperson], 
					function(err, response) {
					if (err) {
						console.log("Error while perfoming query !!!" + err);
						res.status(500).json({ status : 500, message : "Please try again later" });
					} 
				else {
				
					res.status(200).json({ status : 200, message : "Guard has been added Succesfully" });
					
			}
			});
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
		
		idguard = req.params.idguard
		
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
	
	if(!req.params.idguard){
		res.status(400).json({ status : 400, message : "Bad Request" });
	}else{ 
		
		idguard = req.params.idguard,
		mysql.queryDb('SELECT * FROM guard WHERE ?',[{idguard:idguard}],function(err,rows){

			if (err) {
				res.status(500).json({ status : 500, message : "Error while retrieving data" });
			} else {
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



	

exports.createGuard = createGuard;
exports.updateGuard=updateGuard;
exports.listAllGuards=listAllGuards;
exports.deleteGuard=deleteGuard;
exports.getGuard = getGuard;
exports.searchGuard=searchGuard


