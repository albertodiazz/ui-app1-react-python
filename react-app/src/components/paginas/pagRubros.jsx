import React, { useEffect, useContext, useState } from "react"
import BtnRubro from '../rubros/btnRubro' 
import BtnDinamico from '../rubros/btnDinamico' 
import '../styles/rubros.css'
import { useNavigate } from "react-router"


const PagRubros = () =>{
	// TODO
	// [] Terminar esta parte

	const navigate = useNavigate()
	const [styleHome, setStyleHome] = useState(true)
	
	const handleBotones = (_index_) =>{	
		setStyleHome(false)
		setTimeout(()=>{ 
			navigate('/pagHome')
		}, 200)

	}

		return(
			<div className='pagRubros rubros'>
			<BtnRubro />
			<BtnDinamico />
			<div className={ styleHome? 'btnHome': 'btnHomeActivo'} onClick={ handleBotones }/>
		</div>
	)
}


export default PagRubros
