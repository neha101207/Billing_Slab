import { version } from "../../package.json";
import { Router } from "express";

export default ({ config, db }) => {
  let api = Router();


  // reading product detail
  api.get("/product_detail", (req, res) => {
    //find id in company table and return the company
    db.query("SELECT * from product_detail", (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"product":response.rows});
      }
    });


  });
  
  //reading data of given id
  api.get("/product_detail/:id", (req, res) => {
    //find id in company table and return the company
    db.query(`SELECT * from product_detail where id=${req.params.id}`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"product":response.rows});
      }
    });
  });

  
// Estimation of product
  api.get("/product_detail_estimate", (req, res) => {
   
    const { estimationItems } = req.body
    let { product_id } = estimationItems
    //parse estimationItem form body
    //loop through estimationItem and contruct array of product id
    let arr = []
    arr = estimationItems.map(el => {
      return el.product_id
    })
    console.log(arr, "est")
    //convert array of product id to strings superated by ,
    var string = arr.toString()
    console.log(string, "string")
    //pass the out of above stept to query
    var arry = []
    db.query(`select * from product_detail where product_id IN (${string})`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows, "hiii");
        response.rows.map((ee, index) => {
          
         for(let i=0;i<estimationItems.length ; i++){
          if (ee.product_id === estimationItems[i].product_id) {
            arry.push(estimationItems[index].qty*ee.price)
            console.log("hello")
          }
         }
          
        }
        )
        console.log(arry, "ttt")
        res.json({ "billing": arry })
      }
    })
  });


  //Inserting data
  api.post("/product_detail", (req, res) => {
    //take company from req and insert into company table
    console.log("body", req.body);
    const {id,product_id,price}=req.body;
    db.query(`insert into product_detail values(${product_id},${id},${price})`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"status":"successfull","product":response.rows});
      }
    });
  });

 //updating data

  api.put("/product_detail/:id", (req, res) => {
    
    console.log("body", req.body);
    const {product_id}=req.body;
    db.query(`update product_detail set product_id=${product_id} where id=${req.params.id}`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
                 res.json({"status":"successfull","billing":response.rows});
      }
    });
  });

// status true and false

  api.delete("/product_detail_delete/:id", (req, res) => {
    
    console.log("body", req.body);
    const {product_id}=req.body;
    db.query(`update product_detail set status=false where id=${req.params.id}`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
                 res.json({"status":"successfull","billing":response.rows});
      }
    });
  });


  
//permanent delete from database
  
  api.delete("/product_detail/:id", (req, res) => {
   
    console.log("body", req.body);
    
    db.query(`delete from product_detail  where id=${req.params.id}`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
                 res.json({"status":"successfull","billing":response.rows});
      }
    });
  });
  return api;
};