import React from 'react'
import { Msg_RangoFechas } from "../request/sendDatos" 


export default function BtnCalcular(props){
	// Lo que hace este boton es mandar a llamar la data de todos lor rubors y 
	// almacenarla en un objeto para su cosumo en lo que sigue de la aplicacion
	return(
		<div className='btn-Calcular'>
			<button onClick={ () => Msg_RangoFechas(props.mes.slice(0, 3), props.year) }>Calcular</button>
		</div>
	)
}
