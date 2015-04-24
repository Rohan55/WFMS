var guardDetails = require('express').Router(),
	mysql = require('./models/mysql');


/**
 * Get All Guard Details
 */
guardDetails.get('/',function(req,res){
	mysql.query("select * from guard g JOIN person p on g.idperson=p.idperson;",function(err,response){
		if(err){
			res.status(500).json({status:500,message : "Error while retrieving data"});
		}else{
			res.status(200).json({status:200,data : response});
		}
	});
});

module.exports = (function(){
	return guardDetails;
})();