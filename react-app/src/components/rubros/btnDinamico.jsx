import React, { useEffect, useState } from 'react'
import { Msg_Momentos } from '../request/sendDatos' 
import '../styles/rubros.css'
import popUp from '../../assets/07_Pop_Up.png'
import { useNavigate } from "react-router"


const BtnDinamico = () =>{
	// TODO	
	// Es un boton que comparte diferentes modos y son los siguientes
	// [] Explora otro periodo : nos regresemaos al nivel de Temporalidad donde seleccionamos mensual o anual 
	// [] Inflacion actual : nos vamos al nivel final y mostramos la inflacion actual en touch y ui
	// [] Inflacion subyacente : popup de que es la inflacion subyacente, blureamos todo el fondo
	// [] Terminar el tema de los estilos en array

	const navigate = useNavigate()

	const botones= [
		{text: 'Explorar otro periodo', estilo: 'btnperiodo', estiloActivo: 'btnperiodoActivo'},
		{text: 'salir', estilo: 'salir', estiloActivo: 'salirActivo'},
		{text: 'Mostrar inflación subyacente', estilo: 'subyacente', estiloActivo: 'subyacenteActivo'}
	]
 

	const [msg, setMsg] = useState('') 
	const [btnStyle, setStyle] = useState('') 

	const [close, setClose] = useState(true)
	const [styleClose, setStyleClose] = useState(true)

	const handleBotones = (_index_) =>{	
		_index_ == 0 ? setMsg('temporalidad')  
		: _index_ == 2 ? setMsg('subyacente') 
		: setMsg(msg)
		setStyle(botones[_index_].estilo)
		// Aqui no le pongo un setTimeOut por que tal vez en la pantall Touch
		// me genere problemas ya que estara abriendo una ventana de segundos
		// para que presionen otro boton
		if (_index_ == 2){
			setClose(false)
			setStyleClose(true)
		}
		else if (_index_ == 0){
			setTimeout(() =>{
				navigate('/pagTemporalidad')
			}, 200)
		}
		else if (_index_ == 1){
			setTimeout(() =>{
				navigate('/pagFinal')
			}, 200)
		}
	}

	const closePopup = () =>{	
		setStyleClose(false)
		setTimeout(() =>{
			setClose(true)
			setStyle('')
		}, 200)
	}

	useEffect(()=>{
		// console.log(msg)
		Msg_Momentos(msg)
	})

	return( 
		<div className='btnDinamico'>
			{ botones.map((boton, index) =>(
				<div className={ boton.estilo == btnStyle ? boton.estiloActivo : boton.estilo } key={ boton.text } onClick={ ()=> handleBotones(`${ index }`) }>
				</div>
			) )}
				{!close && <div className='PopUp' > 
					<img className='imagePop' src={ popUp }/>
					<div className={ styleClose? 'btnClose': 'btnCloseActivo'}  onClick={ closePopup } />
					</div>}
				</div>
	)
}


export default BtnDinamico
