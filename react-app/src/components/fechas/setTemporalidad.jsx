import React, { useState, useContext, useEffect } from "react"
import ReactDOM from "react-dom";
import SetPeriodo from './setPeriodo'
import { MyContext  } from "../context";
import { Msg_MensualAnual, Msg_GetLasDates } from "../request/sendDatos"
import { Outlet, Link } from "react-router-dom"
import { useNavigate } from "react-router"
import '../styles/temporalidad.css'


const SetTemporalidad = () => {
	
	const [change, setChange] = useState('')
	const [lastMes, setLastMes] = useState('')
	const [lastJahr, setLastJahr] = useState('')
	const navigate = useNavigate()
	
	const [boton, setBoton] = useState(true)
	const [botonAnual, setBotonAnual] = useState(true)

	const handleChange = (arg) => {
		arg == "mes"? setBoton(false): setBotonAnual(false)

		setChange(arg)		
		//-----------------------------------------------------
		Msg_GetLasDates(arg).then(res => { setLastMes(res.lastMes), setLastJahr(res.lastYear) })   
		Msg_MensualAnual(arg)
		//-----------------------------------------------------
		setState({ ...state, temporalidad: arg, lastMonth: lastMes, lastYear: lastJahr  })
	}


	useEffect( () => {    
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
						{boton
								?<div className='botonContinuarMensual normal1' id="mes" onClick={()=>handleChange("mes")} name="gender" />            
								:<div className='botonContinuarMensual activo1' id='mes' name='gender'/>            
						}
						{botonAnual
								?<div className='botonContinuarAnual normalAnual' id="year" onClick={()=>handleChange("year")} name="gender" />            
								:<div className='botonContinuarAnual activoAnual' id='year' name='gender'/>            
						}
					</form>
				</div>
	) 


} 

export default SetTemporalidad
