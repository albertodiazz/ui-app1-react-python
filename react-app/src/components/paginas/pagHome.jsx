import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router"
import standbyVideo from '../../assets/videos/Standby_Home.webm'
import '../styles/home.css'
import { Msg_Niveles } from "../request/sendDatos"
import Cronometro from "../utilidad/cronometro"


const PagHome = () => { 

	const navigate = useNavigate()
	const [boton, setBoton] = useState(true)

	useEffect(()=>{
		Msg_Niveles('home') 
	},[])

	const handleEvents = () => { 
		console.log('next page')
		setBoton(false)
		setTimeout(()=>{ 
			navigate('/pagTemporalidad')

		},200)
	}

	return ( 
		<div className='pagHome home'>
			<video id='video1' className="video1" autoPlay loop>
				<source src={ standbyVideo } type='video/webm'></source>
			</video>
			{boton
					?<div className='botonContinuar normal' onClick={ handleEvents }></div>
					:<div className='botonContinuar activo' onClick={ handleEvents }></div>
			}
			<Cronometro />
				</div>
	)
}

export default PagHome
