import React, { useEffect, useContext, useState } from "react"
import SetTemporalidad from  '../fechas/setTemporalidad'
import '../styles/temporalidad.css'
import { useNavigate } from "react-router"



const PagTemporalidad = () => {
	
	const navigate = useNavigate()
	const [boton, setBoton] = useState(true)

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
		</div>
	)
}

export default PagTemporalidad
