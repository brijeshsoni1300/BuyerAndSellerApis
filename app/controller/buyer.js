var sql = require("../../db");


exports.listOfSellers = function(req, res){
	const params = req.body;
	let response_obj = {}
	sql.query(`select * from user where user_type = "seller"`,(err, result)=>{
		if(err) throw err;
		console.log(result);
		response_obj["response"] = result;
		res.status(200).send(response_obj);
	})
}


exports.getsellerCatalogs = function(req, res){
	const { seller_id } = req.params;
	console.log("seller_id ",seller_id);
	let response_obj = {};
	let response_arr = [];	
	sql.query(`select catalog_id from catalogs where user_id = (?)`, [seller_id], (err, catalog_id)=>{
		if(err) throw err;
		sql.query(`select product_id, name, price from products where catalog_id = (? )`,[catalog_id[0].catalog_id], (err, result)=>{
			if(err) throw err;
			response_arr = result;
			response_obj["message"] = "Here is your data"
			response_obj["data"] = response_arr;
			res.status(200).send(response_obj);
		})	
	})
	
}

exports.createOrder = function(req, res){
	const params = req.body;
	const response_obj = {}
	var {seller_id} = req.params;
	const orderList = params.orderList;
	const user_id = params.user_id;
		for(let i=0; i<orderList.length; i++){
			sql.query(`insert into user_order (product_id, user_id, seller_id) values (?, ?, ?)`,[orderList[i].product, user_id, parseInt(seller_id)],(err, result)=>{
				if(err) throw err;
				
			})
		}
		response_obj["message"] = "your order is placed"
		res.status(200).send(response_obj);

}