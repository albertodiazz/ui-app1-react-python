import React, { useState, useContext } from "react"
import ReactDOM from "react-dom";
import "./radioButtons.css"
import SetPeriodo from './setPeriodo'
import { MyContext  } from "../context";
import { Msg_MensualAnual, Msg_GetLasDates } from "../request/sendDatos"
import { Outlet, Link } from "react-router-dom"
import { useNavigate } from "react-router"


const SetTemporalidad = () => {

	const [change, setChange] = useState('')
	const [lastMes, setLastMes] = useState('')
	const [lastJahr, setLastJahr] = useState('')
	const [nextPage, setNextPage] = useState(false)
	const navigate = useNavigate()
	
	const handleChange = (e) => {
		setChange(e.target.value)		
		//-----------------------------------------------------
		Msg_GetLasDates(e.target.value).then(res => { setLastMes(res.lastMes), setLastJahr(res.lastYear) })   
		Msg_MensualAnual(e.target.value)
		//-----------------------------------------------------
		setState({ ...state, temporalidad: e.target.value, lastMonth: lastMes, lastYear: lastJahr  })
		setNextPage(true)
		// TODO:
		// [] Resolver Bug cuando cambiamos de pagina de pagPeriodo a temporalidad 
		//    Tengo que presionar dos veces los botones de mes o anualidad para que funcione el cambio
		// navigate("pagPeriodo")
	}

	const [state, setState] = useContext(MyContext);

	return (

		<div className="py">

			<form>
				<input type="radio" className="option-input radio"  value="mes" id="mes" onChange={handleChange} name="gender" />            
				<label htmlFor="mes">Mensual</label>

				<input type="radio" value="year" id="year" onChange={handleChange} name="gender"/>         
				<label htmlFor="year">Anual</label>
				<li>
					{nextPage && <Link to="/pagPeriodo">To</Link>}
				</li>
			</form>
		</div>
	) 


} 

export default SetTemporalidad
