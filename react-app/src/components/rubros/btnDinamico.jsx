import React, { useEffect, useState } from 'react'
import { Msg_Momentos, Msg_Subyacente } from '../request/sendDatos' 
import '../styles/rubros.css'
import popUp from '../../assets/07_Pop_Up.png'
import { useNavigate } from "react-router"


const BtnDinamico = () =>{

	const navigate = useNavigate()

	const botones= [
		{text: 'Explorar otro periodo', estilo: 'btnperiodo', estiloActivo: 'btnperiodoActivo'},
		{text: 'salir', estilo: 'salir', estiloActivo: 'salirActivo'},
		{text: 'Mostrar inflación subyacente', estilo: 'subyacente', estiloActivo: 'subyacenteActivo'}
	]
 
	const botonesSub= [
		{estilo: 'btnSub1', estiloActivo: 'btnSub1Activo'},
		{estilo: 'btnSub2', estiloActivo: 'btnSub2Activo'},
		{estilo: 'btnSub3', estiloActivo: 'btnSub3Activo'},
		{estilo: 'btnSub4', estiloActivo: 'btnSub4Activo'}
	]

	const [msg, setMsg] = useState('') 
	const [btnStyle, setStyle] = useState('') 

	const [msgSub, setMsgSub] = useState('') 
	const [btnStyleSub, setStyleSub] = useState('') 

	const [close, setClose] = useState(true)
	const [styleClose, setStyleClose] = useState(true)

	const handleBotones = (_index_) =>{	
		_index_ == 0 ? setMsg('temporalidad')  
		: _index_ == 2 ? Msg_Momentos('subyacente') 
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

	const handleSub = (_index_) =>{	
		let indexSum = parseInt(_index_) + 1
		setMsgSub(indexSum.toString())
		setStyleSub(botonesSub[_index_].estilo)
	}

	const closePopup = () =>{	
		setStyleClose(false)
		setTimeout(() =>{
			setClose(true)
			setStyle('')
			setStyleSub('')
			Msg_Momentos('') 
		}, 200)
		setTimeout(() =>{
			setClose(true)
			setStyle('')
			setStyleSub('')
			Msg_Subyacente('0') 
		}, 20)
	
	}

	useEffect(()=>{
		// console.log(msg)
		!close ? Msg_Subyacente(msgSub) : Msg_Subyacente('0')  
		
	}, [msgSub, msg])

	return( 
		<div className='btnDinamico'>
			{ botones.map((boton, index) =>(
				<div className={ boton.estilo == btnStyle ? boton.estiloActivo : boton.estilo } key={ boton.text } onClick={ ()=> handleBotones(`${ index }`) }>
				</div>
			) )}
				{!close && <div className='PopUp' > 
					<img className='imagePop' src={ popUp }/>
					<div className={ styleClose? 'btnClose': 'btnCloseActivo'}  onClick={ closePopup } />
					<div className='btnSubyacentes' >
						{botonesSub.map((boton, index) => (
							<div className={ boton.estilo == btnStyleSub ? boton.estiloActivo : boton.estilo } key={ index } onClick={ ()=> handleSub(`${ index }`) }/>
						) )}
					</div>
				</div>
				}
			</div>
	)
}


export default BtnDinamico
