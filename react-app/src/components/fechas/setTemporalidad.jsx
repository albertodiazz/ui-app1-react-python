import React, { useState, useContext } from "react"
import ReactDOM from "react-dom";
import "./radioButtons.css"
import SetPeriodo from './setPeriodo'
import { MusicPlayerContext  } from "../context";


const SetTemporalidad = () => {

	// TODO:
	// [] Generar botones que seten la busqueda a mensual y anual
	// [] Pasar las variables a pagPeriodo.jsx

	const [change, setChange] = useState('')
	
	const handleChange = (e) => {
		setChange(e.target.value)
	}

	const [state, setState] = useContext(MusicPlayerContext);

	return (

		<div className="py">
			<button onClick={() => setState(state => ({ ...state, name: 'Contexto A'  }))}>
				{state.name}
			</button>

			<form>
				<input type="radio" className="option-input radio"  value="male" id="male" onChange={handleChange} name="gender" />            
				<label htmlFor="male">Mensual</label>

				<input type="radio" value="female" id="female" onChange={handleChange} name="gender"/>         
				<label htmlFor="female">Anual</label>
			</form>
		</div>
	) 


} 

export default SetTemporalidad
