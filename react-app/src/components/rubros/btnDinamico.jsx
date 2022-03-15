import React, { useEffect, useState } from 'react'
import { Msg_Momentos } from '../request/sendDatos' 


const BtnDinamico = () =>{
	// TODO	
	// Es un boton que comparte diferentes modos y son los siguientes
	// [] Explora otro periodo : nos regresemaos al nivel de Temporalidad donde seleccionamos mensual o anual 
	// [] Inflacion actual : nos vamos al nivel final y mostramos la inflacion actual en touch y ui
	// [] Inflacion subyacente : popup de que es la inflacion subyacente, blureamos todo el fondo


	const botones= ['Explorar otro periodo',
		'Mostrar inflación actual',
		'Mostrar inflación subyacente']

	const [msg, setMsg] = useState('') 

	const handleBotones = (_index_) =>{	
		_index_ == 1 ? setMsg('actual')  
		: _index_ == 2 ? setMsg('subyacente') 
		: setMsg(msg)
	}

	useEffect(()=>{
		// console.log(msg)
		Msg_Momentos(msg)
	})
	
	return( 
		<div className='btnDinamico'>
			{ botones.map((boton, index) =>(
				<div key={ boton }>
					<button onClick={ ()=> handleBotones(`${ index }`) }> { boton } </button>
				</div>
			) )}
			</div>
	)
}


export default BtnDinamico
