import React, { useState, useEffect } from 'react'
import '../styles/intro.css'
import standbyVideo from '../../assets/videos/Standby_Home.webm'
import { useNavigate } from "react-router"
import { Msg_Niveles } from "../request/sendDatos"
import Cronometro from "../utilidad/cronometro"


const PagIntro = () => { 

	const navigate = useNavigate()
	const [boton, setBoton] = useState(true)

	useEffect(()=>{
		Msg_Niveles('intro') 
	},[])

	const handleEvents = () => { 
		console.log('next page')
		setBoton(false)
		setTimeout(()=>{ 
			navigate('/pagHome')

		},200)
	}


	return ( 
		<div className='pagIntro intro'>
			{boton
					?<div className='botonContinuar normal' onClick={ handleEvents }></div>
					:<div className='botonContinuar activo' onClick={ handleEvents }></div>
			}
			<Cronometro />

				</div>
	)
}

export default PagIntro
