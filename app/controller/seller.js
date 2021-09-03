var sql = require("../../db");

exports.createCatalog = function(req, res){
	const params = req.body;
	const id = params.user_id;
	const product = params.product;
	let response_obj = {};

	sql.query(`select user_type from user where user_id = ${id}`, (err, result)=>{
		if(err) throw err;
		console.log(result[0].user_type);
		if(result[0].user_type != 'seller'){
			response_obj["message"] = "Only Seller can add catalog in the data base"
			res.status(200).send(response_obj);
		}else{
			sql.query(`insert into catalogs (user_id) value (?)`, [id], (err, result1)=>{
				if(err) throw err;
				console.log(result1);
			})
			sql.query(`select catalog_id from catalogs where user_id = (?)`, [id], (err, cato_id)=>{
				if(err);
				console.log("cato_id is : ",  cato_id.catalog_id);
				console.log("cato_id is : ",  cato_id);
				for(let i=0; i<product.length; i++){
					sql.query(`insert into products (catalog_id, name, price) values (?, ?, ?)`,[ cato_id[0].catalog_id, product[i].name, product[i].price ],(err, product)=>{
						if(err) throw err;
					})
				}
				response_obj["message"] = "Data added into catalog table and product table"
				res.status(200).send(response_obj);
			})
		}
	})
}

exports.getorders = function(req, res){
	const params = req.body;
	let response_obj = {};
	let response_arr = {};
	const user_id  = params.user_id;
	sql.query(`select user_type from user where user_id = (?)`,[user_id],(err, result)=>{
		if(err) throw err;
		if(result[0].user_type != 'seller'){
			response_obj["message"] = "You must be a seller to retrive seller's order related data"
			res.status(200).send(response_obj);
		}else{
			sql.query(`select * from user_order where seller_id = (?)`, [user_id],(err, result)=>{
				if(err) throw err;
				response_arr = result;
				response_obj["message"] = "we got your all data "
				response_obj["data"] = response_arr;
				res.status(200).send(response_obj);
			})	
		}
	})
}