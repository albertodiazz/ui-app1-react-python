import React from 'react'
import { Msg_Busqueda } from "../request/sendDatos" 


export default function BtnCalcular(props){

	// TODO: 
	// [] Generar boton y enviar con sendDatos('msg': 'res') los datos
	// [] Pasar variables de rango de busqueda
	return(
		<div className='btn-Calcular'>
			<button onClick={ Msg_Busqueda }>Calcular</button>
		</div>
	)
}
