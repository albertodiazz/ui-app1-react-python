import React, { useEffect, useContext, useState } from "react"
import "./stylePeriodo.css"
import { MyContext  } from "../context";


export default function SetPeriodo(props) {
	// [x] El ultimo mes cuando es anual tiene que actualizarse en base al CSV
	//    - Obtener la respuesta de python
	// [x] Necesito comunicacion con python

	return (
		<div>
			{!props.mode && <strong>{ props.setPeriodo == 'Mes' ? props.meses : props.years }</strong>}
			{props.mode && <strong>{ props.lastMes }</strong>}
		</div>

	)

}
