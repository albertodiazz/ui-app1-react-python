import React, { useEffect, useState } from 'react'
import { Msg_Rubros } from '../request/sendDatos' 
import '../styles/rubros.css'
import vr1 from '../../assets/videos/Standby.webm'


const BtnRubro = () =>{
	const rubros = [
		{ text: 'rubro1', estilo: 'btnRubro1', estiloActivo: 'btnRubro1Activo' },
		{ text: 'rubro2', estilo: 'btnRubro2', estiloActivo: 'btnRubro2Activo' },
		{ text: 'rubro3', estilo: 'btnRubro3', estiloActivo: 'btnRubro3Activo' },
		{ text: 'rubro4', estilo: 'btnRubro4', estiloActivo: 'btnRubro4Activo' },
		{ text: 'rubro5', estilo: 'btnRubro5', estiloActivo: 'btnRubro5Activo' },
		{ text: 'rubro6', estilo: 'btnRubro6', estiloActivo: 'btnRubro6Activo' },
		{ text: 'rubro7', estilo: 'btnRubro7', estiloActivo: 'btnRubro7Activo' },
		{ text: 'rubro8', estilo: 'btnRubro8', estiloActivo: 'btnRubro8Activo' },
		{ text: 'rubro9', estilo: 'btnRubro9', estiloActivo: 'btnRubro9Activo' },
		{ text: 'rubro10', estilo: 'btnRubro10', estiloActivo: 'btnRubro10Activo' },
		{ text: 'rubro11', estilo: 'btnRubro11', estiloActivo: 'btnRubro11Activo' },
		{ text: 'rubro12', estilo: 'btnRubro12', estiloActivo: 'btnRubro12Activo' },
	]

	const [msg, setMsg] = useState('') 
	const [btnStyle, setStyle] = useState('') 
	
	const handleBotones = (_index_, textMsg) =>{	
		setMsg(textMsg)
		setStyle(rubros[_index_].estilo)
	}
	
	useEffect(()=>{
		if(msg){
			console.log(msg)
			Msg_Rubros(msg)
		}
	})
	// TODO
	// [] preguntarle a misa como meteria estos videos para no tener que espera a cinthia

	return( 

		<div className='btnRubros'>
			{ rubros.map((rubro, index)=>(
				<div className='rubrosArray' key={ rubro.text }> 
					<div className={ rubro.estilo == btnStyle ? rubro.estiloActivo : rubro.estilo } onClick={ ()=> handleBotones(`${index}`, rubro.text) } /> 
				</div>

			) )}
			</div>
	)
}


export default BtnRubro
