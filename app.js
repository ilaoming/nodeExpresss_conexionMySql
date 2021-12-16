const express = require('express')
const mysql = require('mysql')
const app = express();

app.set('view engine','ejs')

var pool = mysql.createPool({
    connectionLimit : 20,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'crud'
})

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'crud'
})

let prod_id = []
let prod_nom = []
let prod_desc = []
let fech_crea = []



app.get('/', function(req, res) {
    connection.query('SELECT * FROM tm_producto WHERE est = 1',function (error,filas,campos) {
        for (let i = 0; i < filas.length; i++) {
            prod_id[i] = filas[i].prod_id
            prod_nom[i] = filas[i].prod_nom
            prod_desc[i] = filas[i].prod_desc
            fech_crea[i] = filas[i].fech_crea
        }
        res.render('index',{prod_id : prod_id , prod_nom:prod_nom , prod_desc:prod_desc , fech_crea , fech_crea});
    })
    
  });


  app.get('/pool',function(req,res) {
    
    pool.getConnection(function (error,connection) { 
        const query = `SELECT * FROM tm_producto WHERE est = ${connection.escape(req.query.est)}`
        connection.query(query, function (error, filas, campos) {
          res.render('pool', { prod_nom : filas, prod_id : filas })
        })
        connection.release()
     });
    
  });

  app.listen(8080, function(){
    console.log("Servidor iniciado");
  });
  