import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router"
import '../styles/final.css'
import { Msg_Niveles } from "../request/sendDatos"
import Cronometro from "../utilidad/cronometro"


const PagFinal = () => { 
	const navigate = useNavigate()
	const [botonAbandonar, setAbandonar] = useState(true)
	const [botonPeriodo, setPeriodo] = useState(true)

	const handleEvents = (_which_) => { 
		_which_ == 'periodo' ? setPeriodo(false) : setPeriodo(true)  
		_which_ == 'abandonar' ? setAbandonar(false) : setAbandonar(true)  
		
			}
	useEffect(()=>{
		Msg_Niveles('final') 
	},[])
	useEffect(()=>{
		const evento = setTimeout(()=>{
			if (botonPeriodo == false){
				navigate('/pagTemporalidad')
			}
			if (botonAbandonar == false){
				navigate('/pagStandby')
			}

		},200)

	}, [botonAbandonar, botonPeriodo])
	return ( 
		<div className='final'>
			<div className={ botonPeriodo ?'btnPeriodo': 'btnPeriodoActivo'} onClick={ ()=>{ handleEvents('periodo') }}></div>
			<div className={ botonAbandonar ?'btnAbandonar': 'btnAbandonarActivo'} onClick={ ()=>{ handleEvents('abandonar') }}></div>
			<Cronometro />
				</div>
	)
}

export default PagFinal
