import React, { useContext, useEffect, useState } from 'react'
import { Msg_Momentos, Msg_Subyacente, Msg_Rubros} from '../request/sendDatos' 
import '../styles/rubros.css'
import popUp from '../../assets/07_Pop_Up.png'
import { useNavigate } from "react-router"
import { MyContext  } from "../context";


const BtnDinamico = () =>{

	const navigate = useNavigate()

	const botones= [
		{text: 'Explorar otro periodo', estilo: 'btnperiodo', estiloActivo: 'btnperiodoActivo'},
		{text: 'salir', estilo: 'salir', estiloActivo: 'salirActivo'},
		{text: 'Mostrar inflación subyacente', estilo: 'subyacente', estiloActivo: 'subyacenteActivo'}
	]
 
	const botonesSub= [
		{estilo: 'btnSub1', estiloActivo: 'btnSub1Activo', msg: 'seccion1'},
		{estilo: 'btnSub2', estiloActivo: 'btnSub2Activo', msg: 'seccion2'},
		{estilo: 'btnSub3', estiloActivo: 'btnSub3Activo', msg: 'seccion3'},
		{estilo: 'btnSub4', estiloActivo: 'btnSub4Activo', msg: 'seccion4'}
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
				Msg_Rubros('')
			}, 200)
		}
		else if (_index_ == 1){
			setTimeout(() =>{
				navigate('/pagFinal')
				Msg_Rubros('')
			}, 200)
		}
	}

	const handleSub = (_index_, _msg_) =>{	
		setMsgSub(_msg_)
		setStyleSub(botonesSub[_index_].estilo)
	}

	const closePopup = () =>{	
		setStyleClose(false)
		setTimeout(() =>{
			setClose(true)
			setStyle('')
			setStyleSub('')
			Msg_Momentos('Nada') 
		}, 200)
		setTimeout(() =>{
			setClose(true)
			setStyle('')
			setStyleSub('')
			Msg_Subyacente('Nada') 
		}, 100)
	
	}

	useEffect(()=>{
		!close ? Msg_Subyacente(msgSub) : Msg_Subyacente('0')  
		
	}, [msgSub, msg])

	const [state, setState] = useContext(MyContext);
	useEffect(() => {    
		setState({ ...state, resetCron: 0 })
	},[msgSub, msg, close]);


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
							<div className={ boton.estilo == btnStyleSub ? boton.estiloActivo : boton.estilo } key={ index } onClick={ ()=> handleSub(`${ index }`, boton.msg) }/>
						) )}
					</div>
				</div>
				}
			</div>
	)
}


export default BtnDinamico
