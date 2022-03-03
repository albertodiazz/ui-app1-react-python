import React, { useState } from "react"

export default function SendDatos(msg) {

	var jsonData = {
		'mesA': '',
		'yearA': '',
		'mesB': '',
		'yearB': ''
	}	



	// Send data to the backend via POST
	fetch('http://localhost:5000/fechas', {  // Enter your IP address here
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
}

