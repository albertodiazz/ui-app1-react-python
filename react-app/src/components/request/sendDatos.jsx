import React from "react"


export async function Msg_GetLasDates(_type_){
	var getLastDates= {
		'getLastDates': _type_
	}	


	const responnse = await fetch('http://localhost:5000/get_last', {  // Enter your IP address here
		method: 'POST', 
		headers: {
			'Host': 'localhost:5000',
			'Origin': 'localhost:3000',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors', 
		body: JSON.stringify(getLastDates) // body data type must match "Content-Type" header
	})

	const res = await responnse.json()
	console.log(res)
	return res

}

export async function Msg_RangoFechas(_mes_, _year_){
	var busqueda = {
		'mes': _mes_,
		'year': _year_
	}

	const responnse = await fetch('http://localhost:5000/fechas', {  // Enter your IP address here
		method: 'POST', 
		headers: {
			'Host': 'localhost:5000',
			'Origin': 'localhost:3000',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors', 
		body: JSON.stringify(busqueda) // body data type must match "Content-Type" header
	})

	const res = await responnse.json()
	console.log(res)
	return res

}
export async function Msg_MensualAnual(_temporalidad_){
	var msg = {
		'temporalidad': _temporalidad_
	}

	const responnse = await fetch('http://localhost:5000/mensualAnual', {  // Enter your IP address here
		method: 'POST', 
		headers: {
			'Host': 'localhost:5000',
			'Origin': 'localhost:3000',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors', 
		body: JSON.stringify(msg) // body data type must match "Content-Type" header
	})

	const res = await responnse.json()
	console.log(res)
	return res

}
export async function Msg_Rubros(_msg_){
	var msg = {
		'nameRubros': _msg_ 
	}

	const responnse = await fetch('http://localhost:5000/busqueda', {  // Enter your IP address here
		method: 'POST', 
		headers: {
			'Host': 'localhost:5000',
			'Origin': 'localhost:3000',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors', 
		body: JSON.stringify(msg) // body data type must match "Content-Type" header
	})

	const res = await responnse.json()
	console.log(res)
	return res

}
export async function Msg_Momentos(_msg_){
	var msg = {
		'momentosEspeciales': _msg_ 
	}

	const responnse = await fetch('http://localhost:5000/momentos', {  // Enter your IP address here
		method: 'POST', 
		headers: {
			'Host': 'localhost:5000',
			'Origin': 'localhost:3000',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors', 
		body: JSON.stringify(msg) // body data type must match "Content-Type" header
	})

	const res = await responnse.json()
	console.log(res)
	return res

}

