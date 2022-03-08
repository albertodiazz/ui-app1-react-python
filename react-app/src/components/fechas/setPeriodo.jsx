import React, { useEffect, useContext, useState } from "react"
import "./styles.css"
import { MyContext  } from "../context";


export default function SetPeriodo(props) {
	// TODO
	// [] El ultimo mes cuando es anual tiene que actualizarse en base al CSV
	//    - Obtener la respuesta de python
	// [x] Necesito comunicacion con python
	
	const [state, setState] = useContext(MyContext);
	const getLastMoth = 'Diciembre'

	useEffect(() =>{
	})

	return (
		<div className="flex-col-hstart-vstart">
			{!props.mode && <strong>{ props.setPeriodo == 'Mes' ? props.meses : props.years }</strong>}
			{props.mode && <strong>{ getLastMoth }</strong>}
		</div>

	)

}
