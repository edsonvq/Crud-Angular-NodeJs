const express = require('express');
const bodyParse = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const port = 3000;
const app = express();

var online = false;

//headers para o navegador
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    next();
});

//config do body-parse
//Para pegar os dados via POST
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());

//rotas
const rotas = express.Router();

app.use('/', rotas);

app.listen(port, function() {
  openConection();
});

console.log('API Funcionando.');

var conn = null;
function openConection(){
    //config da conex mysql
    conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    });
	
	console.log("Conectado ao mysql!");
	
    conn.query("ALTER TABLE `clientes` ADD COLUMN IF NOT EXISTS senha varchar(50);", function(error, results, fields){
        if(error)
            console.log(error);
        else
            //console.log(results);

        this.end();
        console.log("Operacao realizada!");
    });
}

//conexao com o banco mysql
function getConnection(query, res){


    //verificar se conectou o mysql
    conn.query(query, function(error, results, fields){
        if(error)
            res.json(error);
        else
            res.json(results);

        this.end();
        console.log("Operacao realizada!");
    });
}

//lista
rotas.get('/clientes', (req,res) => {
    getConnection("SELECT * FROM clientes", res);
});

//pesquisa
rotas.get('/clientes/:id', (req,res) => {
    let filtro = '';
    if (req.params.id) 
        filtro = ' WHERE id_cliente ='+parseInt(req.params.id);
    getConnection('SELECT * FROM clientes'+filtro, res);
});

//delete
rotas.get('/clientes/:id/delete', (req, res) =>{
    filtro = ' WHERE id_cliente ='+parseInt(req.params.id);
    getConnection(`DELETE FROM CLIENTES `+filtro, res);
});

//insert
rotas.post('/clientes/insert', (req, res) =>{
    const nome = req.body.nome;
    const dataniver = req.body.data;
    const email = req.body.email;
	const senha = req.body.senha;
	
	console.log(nome+', '+dataniver+', '+email+', '+senha);

    getConnection(`INSERT INTO CLIENTES (nome_cliente, data_niver, email, senha) 
    VALUES ('${nome}', '${dataniver}', '${email}', '${senha}')`, res);
});

//login
rotas.post('/cliente/login', (req, res) =>{
    const email = req.body.email;
	const senha = req.body.senha;
	//console.log(req.body);
	//console.log(email+', '+senha);
    conn.query('SELECT count(id_cliente) as total FROM clientes WHERE email ="'+email+'" AND senha = "'+senha+'"', function(error, results, fields){
        if(error){
			console.log(error);}
        else{
			console.log(results[0].total);
			
			if(results[0].total == 1){
				console.log('krl1');
				online = true;
				console.log('krl2');
				
				//res.redirect(301, 'http://localhost:3000/index');
				//res.writeHead(302, {
				 // 'Location': 'http://localhost:3000/'
				//});
				
	
				//res.writeHead(301,
				//  {Location: 'http://localhost:3000/'}
				//);
				console.log('krl3');
				
				var resp = {url:"http://localhost:4200/", msg:"success"};
				
				console.log(resp);
				res.json(resp);
			}else{
				var resp = {url:"", msg:"n"};
				res.json(resp);
			}
		}
        this.end();
    });
});

//update
rotas.post('/clientes/:id', (req, res) =>{

    const id = parseInt(req.params.id);

    const nome = req.body.nome;
    const dataniver = req.body.data;
    const email = req.body.email;

    getConnection(`UPDATE CLIENTES SET nome_cliente = '${nome}', data_niver = '${dataniver}', email = '${email}' WHERE id_cliente = ${id}`, res);
});

//load categirias
rotas.get('/categorias', (req,res) => {
    getConnection("SELECT * FROM categoriaprodutos", res);
});

//load produtos categorias
rotas.get('/categorias-products/:id', (req,res) => {
    let filtro = '';
    if (req.params.id) 
        filtro = ' WHERE id_categ_prod ='+parseInt(req.params.id);
    getConnection('SELECT * FROM produtos'+filtro, res);
});

//LOAD_PRODUCT
rotas.get('/product/:id', (req,res) => {
    let filtro = '';
    if (req.params.id) 
        filtro = ' WHERE id_prod ='+parseInt(req.params.id);
    getConnection('SELECT * FROM produtos'+filtro, res);
});