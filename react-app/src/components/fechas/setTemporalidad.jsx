import React, { useState, useContext, useEffect } from "react"
import ReactDOM from "react-dom";
import SetPeriodo from './setPeriodo'
import { MyContext  } from "../context";
import { Msg_MensualAnual, Msg_GetLasDates } from "../request/sendDatos"
import { Outlet, Link } from "react-router-dom"
import { useNavigate } from "react-router"


const SetTemporalidad = () => {

	const [change, setChange] = useState('')
	const [lastMes, setLastMes] = useState('')
	const [lastJahr, setLastJahr] = useState('')
	const navigate = useNavigate()
	
	const handleChange = (e) => {
		setChange(e.target.value)		
		//-----------------------------------------------------
		Msg_GetLasDates(e.target.value).then(res => { setLastMes(res.lastMes), setLastJahr(res.lastYear) })   
		Msg_MensualAnual(e.target.value)
		//-----------------------------------------------------
		setState({ ...state, temporalidad: e.target.value, lastMonth: lastMes, lastYear: lastJahr  })
	}

	useEffect( () => {    
		// [x] Al presionar en cualquier parte de la pantalla esto se activa, hay que arreglar eso	
		//    el problema de esto esta en los estilos o algo asi
		if(lastJahr){
			console.log('Msg recibido')
			setState({ ...state, lastMonth: lastMes, lastYear: lastJahr}) 
			navigate("/pagPeriodo")
		}
	})

	const [state, setState] = useContext(MyContext);

	return (

		<div className="BtnRadiosTemporalidad">

			<form>
				<input type="radio" value="mes" id="mes" onChange={handleChange} name="gender" />            
				<label htmlFor="mes">Mensual</label>

				<input type="radio" value="year" id="year" onChange={handleChange} name="gender"/>         
				<label htmlFor="year">Anual</label>
			</form>
		</div>
	) 


} 

export default SetTemporalidad
