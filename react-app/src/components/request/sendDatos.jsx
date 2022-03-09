import React from "react"


export async function Msg_Temporalidad(){
	var getLastDates= {
		'getLastDates': 'run'
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
	return res

}

export async function Msg_Busqueda(){
	// TODO
	// [] setear logica de cuando usamos mes y year
	// Hay dos momentos cuando enviamos mes y year, 
	// o cuando solo enviamos year
	var busqueda = {
		'nameRubro': 'rubro1',
		'mes': 'Feb',
		'year': '2000'
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

