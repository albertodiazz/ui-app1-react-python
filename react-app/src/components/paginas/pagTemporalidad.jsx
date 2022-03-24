import React, { useEffect, useContext, useState } from "react"
import SetTemporalidad from  '../fechas/setTemporalidad'
import '../styles/temporalidad.css'
import { useNavigate } from "react-router"
import { Msg_Niveles } from "../request/sendDatos"
import Cronometro from "../utilidad/cronometro"


const PagTemporalidad = () => {
	
	const navigate = useNavigate()
	const [boton, setBoton] = useState(true)

	useEffect(()=>{
		Msg_Niveles('temporalidad')
	},[])

	const handleEvents = () => { 
		console.log('next page')
		setBoton(false)
		// setTimeout(()=>{ 
			// navigate('/pagTemporalidad')

		// },500)
	}


	return (
		<div className="pagTemporalidad temporalidad">
			<SetTemporalidad />
			<Cronometro />
		</div>
	)
}

export default PagTemporalidad
