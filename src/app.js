const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
require('./helpers');

const directoriopublico = path.join(__dirname, '../public')
const directoiopartial= path.join(__dirname, '../partials')
app.use(express.static(directoriopublico));
hbs.registerPartials(directoiopartial);
app.use(bodyParser.urlencoded({extended:false}));


app.set('view engine','hbs');

app.get('/',(req,res)=>{
	res.render('index',{
		estudiante: 'Felipe'
	});
});

app.get('/aspirante',(req,res)=>{
	res.render('aspirante',{
		
	});
});

app.get('/matricula',(req,res)=>{
	res.render('matricula',{
		
	});
});

app.get('/ensayo',(req,res)=>{
	res.render('ensayo',{
		
	});
});

app.get('/usuario',(req,res)=>{
	res.render('usuario',{
		
	});
});
app.get('/actualizarcurso',(req,res)=>{
	res.render('actualizarcurso',{
		
	});
});
app.post('/calculos',(req,res)=>{
	console.log(req.query);
	res.render('calculos',{
		estudiante: req.body.nombre,
		id: parseInt(req.body.id),
		descripcion: req.body.descripcion,
		valor: parseInt(req.body.valor),
		modalidad: req.body.modalidad,
		intensidad: req.body.intensidad,
		estado: 'disponible'
	});
});

app.post('/calculos2',(req,res)=>{
	console.log(req.query);
	res.render('calculos2',{
		id: parseInt(req.body.id),
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono: req.body.telefono,

	});
});

app.post('/calculos3',(req,res)=>{
	console.log(req.query);
	res.render('calculos3',{
		identificador: parseInt(req.body.identificador),
		documento: parseInt(req.body.documento)
	});
});

app.post('/calculos4',(req,res)=>{
	console.log(req.query);
	res.render('calculos4',{
		id: parseInt(req.body.id),
		estado: req.body.estado
	});
});

app.post('/calculos5',(req,res)=>{
	console.log(req.query);
	res.render('calculos5',{
		id: parseInt(req.body.id)
	});
});

app.post('/calculos6',(req,res)=>{
	console.log(req.query);
	res.render('calculos6',{
		identificador: parseInt(req.body.identificador),
		documento: parseInt(req.body.documento)
	});
});

app.post('/calculos7',(req,res)=>{
	console.log(req.query);
	res.render('calculos7',{
		id: parseInt(req.body.id),
		cedula: parseInt(req.body.cedula),
		nombre: req.body.nombre
	});
});

app.get('*',(req,res)=>{
	res.render('error',{
		estudiante: 'error'
	})
})

app.listen(3000,()=>{
console.log('escuchando en el puerto 3000')

});