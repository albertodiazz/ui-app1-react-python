import React, { useState, useContext } from "react"
import ReactDOM from "react-dom";
import "./radioButtons.css"
import SetPeriodo from './setPeriodo'
import { MyContext  } from "../context";


const SetTemporalidad = () => {

	// TODO:
	// [x] Generar botones que seten la busqueda a mensual y anual
	// [x] Pasar las variables a pagPeriodo.jsx
	// [] Estilos

	const [change, setChange] = useState('')
	
	const handleChange = (e) => {
		setChange(e.target.value)
		setState({ ...state, temporalidad: e.target.value  })
	}

	const [state, setState] = useContext(MyContext);

	return (

		<div className="py">

			<form>
				<input type="radio" className="option-input radio"  value="mes" id="mes" onChange={handleChange} name="gender" />            
				<label htmlFor="mes">Mensual</label>

				<input type="radio" value="year" id="year" onChange={handleChange} name="gender"/>         
				<label htmlFor="year">Anual</label>
			</form>
		</div>
	) 


} 

export default SetTemporalidad
