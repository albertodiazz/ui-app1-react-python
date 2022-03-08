import React from "react"


export async function Msg_json(){
	// TODO
	// [] Seter los mensaje ha mandar a la api	
	//
	//
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


export default function SendDatos() {

	var jsonData = {
		'mesA': '',
		'yearA': '',
		'mesB': '',
		'yearB': ''
	}
	var getLastDates= {
		'getLastDates': 'run'
	}	



	// Send data to the backend via POST
}

