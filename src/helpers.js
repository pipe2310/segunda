const hbs = require('hbs');
const fs = require ('fs');
listaCursos = [];
listaAspirantes= [];
listaMatriculas= [];
let cursos =[ {
Id: 101,
Nombre: 'Fundamentos de programacion en java',
Duracion: 60,
Valor: 200000

},
{

Id: 202,
Nombre: 'Fundamentos de programacion en C#',
Duracion: 50,
Valor: 250000
},

{

Id: 303,
Nombre: 'Fundamentos de programacion en C++',
Duracion: 40,
Valor: 275000

}];
/*const crear = (curso)=>{

}*/

///////////////////////////////////////////LISTAR LOS CURSOS//////////////////////////////////////////////////////////////
const listar = ()=>{
	try{
	listaCursos= require('../listado.json');//dos formas de llamar
	//listaEstudiantes= JSON.parse(fs.readFileSync(listado.json));// de manera asincronica es mejor utilizar este
	}catch(error){
		listaCursos=[];
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////LISTAR LOS ASPIRANTES//////////////////////////////////////////////////////////////
const listarAsp=()=>{
	try{
	listaAspirantes= require('../listado2.json');//dos formas de llamar
	//listaEstudiantes= JSON.parse(fs.readFileSync(listado.json));// de manera asincronica es mejor utilizar este
	}catch(error){
		listaAspirantes=[];
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////LISTAR LAS MATRICULAS//////////////////////////////////////////////////////////////
const listarMat=()=>{
	try{
	listaMatriculas= require('../listado3.json');//dos formas de llamar
	//listaEstudiantes= JSON.parse(fs.readFileSync(listado.json));// de manera asincronica es mejor utilizar este
	}catch(error){
		listaMatriculas=[];
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////GUARDAR LOS CURSOS//////////////////////////////////////////////////////////////
const guardar = ()=> {
		let datos = JSON.stringify(listaCursos);
		fs.writeFile('listado.json',datos,(err)=>{
			if(err) throw(err);
			console.log('Archivo creado con exito')
		})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////GUARDAR LOS ASPIRANTES//////////////////////////////////////////////////////////////
const guardarAsp = ()=> {
		let datos = JSON.stringify(listaAspirantes);
		fs.writeFile('listado2.json',datos,(err)=>{
			if(err) throw(err);
			console.log('Archivo creado con exito')
		})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////GUARDAR LAS MATRICULAS//////////////////////////////////////////////////////////////
const guardarMat = ()=> {
		let datos = JSON.stringify(listaMatriculas);
		fs.writeFile('listado3.json',datos,(err)=>{
			if(err) throw(err);
			console.log('Archivo creado con exito')
		})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mostrar =()=>{
	listar()
	console.log('Notas de los estudiantes')

	listaEstudiantes.forEach(estudiante=>{
		console.log(estudiante.nombre);
		console.log('notas')
		console.log(' matematicas '+ estudiante.matematicas)
		console.log(' ingles '+ estudiante.ingles)
		console.log(' programacion '+ estudiante.programacion + '\n')
	})

}

///////////////////////////////////////////CREAR LOS CURSOS//////////////////////////////////////////////////////////////
hbs.registerHelper('crear',(id,nombre,descripcion,valor,modalidad,intensidad, estado)=>{
	listar();
	let mesaje;
	let cur ={
		id: id,
		nombre: nombre,
		descripcion: descripcion,
		valor: valor,
		modalidad: modalidad,
		intensidad: intensidad,
		estado: estado
	};
	let duplicado = listaCursos.find(nom => nom.id==id)
	if(!duplicado){
	listaCursos.push(cur);
	console.log(listaCursos);
	guardar();
	mensaje='Guardado correctamente';
	}
	else{
		console.log('Ya existe otro curso con ese id');
		mensaje='Ya existe otro curso con ese id';
	}
	return mensaje;
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////CREAR LOS ASPIRANTES//////////////////////////////////////////////////////////////
hbs.registerHelper('crearasp',(id,nombre,correo,telefono)=>{
	listarAsp();
	let mensaje;
	let asp ={
		id: id,
		nombre: nombre,
		correo: correo,
		telefono: telefono,
	};
	let duplicado = listaAspirantes.find(nom => nom.id==id)
	if(!duplicado){
	listaAspirantes.push(asp);
	console.log(listaAspirantes);
	guardarAsp();
	mensaje= 'Se ha registrado satisfactoriamente';
	}
	else{
		console.log('Ya existe otro aspirante con ese id');
		mensaje='Ya se ha registrado previamente'
	}
	return mensaje;
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////CREAR LAS MATRICULAS//////////////////////////////////////////////////////////////
hbs.registerHelper('crearmat',(identificador,documento)=>{
	listarMat();
	listarAsp();
	listar()
	let mensaje;
	let sw=true;
	let mat ={
		identificador: identificador,
		documento: documento
	};
	let encontrado =listaCursos.find(id=>id.id==identificador)
	let encontradoo =listaAspirantes.find(id=>id.id==documento)
	if(encontrado && encontradoo){
	listaMatriculas.forEach(matricula=>{
		if (matricula.identificador==identificador&&matricula.documento==documento) {
			sw=false;
		}
	})
	if(sw==true){
	//console.log(duplicadoo)
	listaMatriculas.push(mat);
	console.log(listaMatriculas);
	guardarMat();
	mensaje='Se ha matriculado al curso'+identificador+'satisfactoriamente';
}	
	else{
		console.log('Ya existe otra matricula con ese id');
		mensaje='Ya se ha matriculado previamente a este curso'
	}

	}
	return mensaje
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS CURSOS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrar',()=>{
let string ;
var out = "";
		listar()
	console.log('Notas de los estudiantes')



	listaCursos.forEach(curso=>{
		//id: curso.id;
		console.log(curso.id);
		console.log(' nombre '+ curso.nombre)
		console.log(' descripcion '+ curso.descripcion)
		console.log(' valor '+ curso.valor+ '\n')

    out = out +"<tr>"+ "<td>" + curso.id + "</td>"+'\n'+"<td>" + curso.nombre + "</td>"+'\n'+"<td>" + curso.descripcion + "</td>"+'\n'+"<td>" + curso.valor + "</td>"+"<td>" + curso.modalidad + "</td>"	+"<td>" + curso.intensidad + "</td>"+"<td>" + curso.estado+ "</td>"+"<tr>";

		string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS CURSOS DISPONIBLES//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarcursosdisponibles',()=>{
let string ;
var out = "";
		listar()
	console.log('Notas de los estudiantes')



	listaCursos.forEach(curso=>{
		//id: curso.id;
		console.log(curso.id);
		console.log(' nombre '+ curso.nombre)
		console.log(' descripcion '+ curso.descripcion)
		console.log(' valor '+ curso.valor+ '\n')
if(curso.estado=='disponible'){
    out = out +"<tr>"+ "<td>" + curso.id + "</td>"+'\n'+"<td>" + curso.nombre + "</td>"+'\n'+"<td>" + curso.valor +"</std>" + "<tr>";
}
		//string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS CURSOS DISPONIBLES VER MAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarcursosdisponiblesvermas',(id)=>{
let string ;
var out='';
var no='No se encontro un curso con el identificador indicado';
var sw=false;
		listar()

	listaCursos.forEach(curso=>{
		//id: curso.id;
		console.log(curso.id);
		console.log(' nombre '+ curso.nombre)
		console.log(' descripcion '+ curso.descripcion)
		console.log(' valor '+ curso.valor+ '\n')
if(curso.id==id && curso.estado=='disponible' ){
	if(sw==false){
		out=out+'<tr> <th>Identificador del Curso</th> <th>Nombre</th> <th>Descripcion</th><th>Valor</th> <th>Modalidad</th> <th>Intensidad</th> </tr>';
		sw=true;
	}
    out = out +"<tr>"+ "<td>" + curso.id + "</td>"+'\n'+"<td>" + curso.nombre + "</td>"+'\n'+"<td>" + curso.descripcion + "</td>"+'\n'+"<td>" + curso.valor + "</td>"+"<td>" + curso.modalidad + "</td>"	+"<td>" + curso.intensidad + "</td>"+"<tr>";

}
		//string =string+' '+curso.id;

	})
	if(sw==true){
  return new hbs.SafeString(
    out 
  );
}
else{
return no
}
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS CURSOS DISPONIBLES VER MAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarcursosdisponiblesvermasno',()=>{
let string ;
var out = "";
		listar()
	console.log('Notas de los estudiantes')



	listaCursos.forEach(curso=>{
		//id: curso.id;
		console.log(curso.id);
		console.log(' nombre '+ curso.nombre)
		console.log(' descripcion '+ curso.descripcion)
		console.log(' valor '+ curso.valor+ '\n')
if(curso.estado=='disponible' ){
    out = out +"<tr>"+ "<td>" + curso.id + "</td>"+'\n'+"<td>" + curso.nombre + "</td>"+'\n'+"<td>" + curso.descripcion + "</td>"+'\n'+"<td>" + curso.valor + "</td>"+"<td>" + curso.modalidad + "</td>"	+"<td>" + curso.intensidad + "</td>"+"<tr>";
}
		//string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS ASPIRANTES//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarasp',()=>{
let string ;
var out = "";
		listarAsp()
	console.log('Notas de los estudiantes')



	listaAspirantes.forEach(aspirante=>{
		//id: curso.id;
		console.log(aspirante.id);
		console.log(' nombre '+ aspirante.nombre)
		console.log(' descripcion '+ aspirante.correo)
		console.log(' valor '+ aspirante.telefono+ '\n')

    out = out +"<tr>"+ "<td>" + aspirante.id + "</td>"+'\n'+"<td>" + aspirante.nombre + "<td>" + aspirante.correo +"</td>"+"<td>" + aspirante.telefono+"</td>" +"<tr>";



	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LAS MATRICULAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarmatcursos',()=>{
let string ;
var out = "";
		listarAsp()
		listarMat()
		listar()
	console.log('Notas de los estudiantes')



	listaMatriculas.forEach(mat=>{
		//id: curso.id;
		console.log(mat.identificador);
		console.log(mat.documento)

    out = out +"<tr>"+ "<td>" + mat.identificador + "</td>"+'\n'+"<td>" + mat.documento +"</td>"+"<tr>";

		//string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LAS MATRICULAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarmatcursosid',(identificador,documento)=>{
let string ;
var out = "";
		listarAsp()
		listarMat()
		listar()
	console.log('Notas de los estudiantes')



	listaMatriculas.forEach(mat=>{
		//id: curso.id;
		console.log(mat.identificador);
		console.log(mat.documento)
if(mat.identificador==identificador && mat.documento!=documento){
    out = out +"<tr>"+ "<td>" + mat.identificador + "</td>"+'\n'+"<td>" + mat.documento +"</td>"+"<tr>";
}
		//string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

hbs.registerHelper('listar',()=>{
		try{
	listaCursos= require('../listado.json');//dos formas de llamar
	//listaEstudiantes= JSON.parse(fs.readFileSync(listado.json));// de manera asincronica es mejor utilizar este
	}catch(error){
		listaCursos=[];
	}
})

hbs.registerHelper('actualizar',(id,estado)=>{

	listar()
	let encontrado = listaCursos.find(buscar => buscar.id== id)
	if(!encontrado){
console.log('Estudiante no existe')
	}
	else{
		encontrado.estado= estado;
		guardar()
	}

})


const actualizar=(id,nombre,descripcion,valor,modalidad,intensidad,estado)=>{
	listar()
	let encontrado = listaCursos.find(buscar => buscar.id== id)
	if(!encontrado){
console.log('Estudiante no existe')
	}
	else{
		encontrado[estado]= estado;
		guardar()
	}

}

hbs.registerHelper('eliminarr',(identificador,documento)=>{
listarMat()
let sw=false;
let sww=false;
listaMatriculass= [];
	listaMatriculas.forEach(mat=>{
		if(mat.identificador==identificador && mat.documento==documento){
			sw=true;
		}
	})
	if(sw==true){
	listaMatriculas.forEach(mat=>{
		if(mat.identificador==identificador && mat.documento!=documento){
			listaMatriculass.push(mat);
		}
	})
		listaMatriculas.forEach(mat=>{
		if(mat.identificador!=identificador){
			listaMatriculass.push(mat);
		}
	})

		listaMatriculas=listaMatriculass
		guardarMat()
		}
})

hbs.registerHelper('eliminar',(identificador,documento)=>{
listarMat()
var filter={
	identificador: identificador,
	documento: documento
};

nuevo= listaMatriculas.filter(function(item) {
  for (var key in filter) {
    if (item[key] === undefined || item[key] != filter[key])
      return false;
  }
  return true;
});
		listaMatriculas=nuevo
		guardarMat()
})






const eliminar=(non)=>{
	listar()
	let nuevo = listaEstudiantes.filter(mat=> mat.nombre!=non);
	if(nuevo.length==listaEstudiantes.length){
		console.log('ningun estudiante tiene el nombre indicado');
	}
	else{
		listaEstudiantes=nuevo
		guardar()

	}

}



hbs.registerHelper('verificar',(id,cedula,nombre)=>{
let mensaje;
		cursos.forEach(mat=>{
			console.log(mat.Id);
		if(mat.Id==id){
			mensaje= 'El estudiante' +nombre+' identificado con cedula de ciudadania'+cedula+'se matriculo satisfactoriamente en el curso '+id+' nombrado'+mat.Nombre+'con una duracion de '+mat.Durancion+' horas y un valor de '+mat.Valor;
			
		}
		else{
			mensaje='Identificador de curso no encontrado';
		}
	})
return mensaje;
})