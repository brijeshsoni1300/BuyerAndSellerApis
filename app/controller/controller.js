var sql = require("../../db");


exports.register =  function(req, res){
	const params = req.body;
	const typeofuser = params.user_type;
	const name = params.name;
	const email = params.email;
	let response_obj = {}
	if(!typeofuser && typeofuser !== "seller" && typeofuser != "buyer"){
		response_obj["message"] = "You must provid user type as seller or buyer"
		res.status(200).send(response_obj);
	}else if(!name){
		response_obj["message"] = "you must provide name of user"
		res.status(200).send(response_obj);
	}else if(!email){
		response_obj["message"] = "you must provide email of user"
		res.status(200).send(response_obj);
	}else{
		sql.query(`Insert into user (email, name, user_type) values(?, ?, ?)`,[email, name, typeofuser],(err, result)=>{
			if(err) throw err;
			response_obj["message"] = "Data inserted succeffuly"
			res.status(200).send(response_obj);
		})
	}
}
