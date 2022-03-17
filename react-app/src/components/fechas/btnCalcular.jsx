import React, { useEffect, useState } from 'react'
import { Msg_RangoFechas } from "../request/sendDatos" 
import '../styles/periodo.css'
import { useNavigate } from "react-router"

export default function BtnCalcular(props){
	// Lo que hace este boton es mandar a llamar la data de todos lor rubors y 
	// almacenarla en un objeto para su cosumo en lo que sigue de la aplicacion
	const [btnCalcular, setBtnCalcular] = useState(true);
	const navigate = useNavigate()
	
	useEffect (() => { 
		Msg_RangoFechas(props.mes.slice(0, 3), props.year)
	}, [btnCalcular])

	const handleEvents =()=>{
		setBtnCalcular(false)
		setTimeout(()=>{ 
			navigate('/pagRubros')

		},200)
	}

	return(
		<div className={!btnCalcular?'calcularActivo':'calcularNormal'} onClick={ handleEvents }/>
	)

}
