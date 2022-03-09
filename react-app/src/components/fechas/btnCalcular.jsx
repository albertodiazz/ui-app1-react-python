import React from 'react'
import { Msg_Busqueda } from "../request/sendDatos" 


export default function BtnCalcular(props){
	// Lo que hace este boton es mandar a llamar la data de todos lor rubors y 
	// almacenarla en un objeto para su cosumo en lo que sigue de la aplicacion
	// TODO: 
	// [] Generar boton y enviar con sendDatos('msg': 'res') los datos
	// [] Pasar variables de rango de busqueda
	return(
		<div className='btn-Calcular'>
			<button onClick={ Msg_Busqueda }>Calcular</button>
		</div>
	)
}
