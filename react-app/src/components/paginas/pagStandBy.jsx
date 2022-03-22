import React from 'react'
import '../styles/standby.css'
import standbyVideo from '../../assets/videos/Standby.webm'
import { useNavigate } from "react-router"
import { Msg_Niveles } from "../request/sendDatos"


const PagStandBy = () => { 
	
	const navigate = useNavigate()
	Msg_Niveles('standby') 

	const handleEvents = () => { 
		console.log('next page')
		navigate('/pagIntro')
	}

	return ( 
		<div className='pagStandBy standby' onClick={ handleEvents }> 
			<video id='video1' className="video1" autoPlay loop>
				<source src={ standbyVideo } type='video/webm'></source>
			</video>
		</div>
	)
}

export default PagStandBy
