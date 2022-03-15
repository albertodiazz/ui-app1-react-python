import React from 'react'
import { Msg_Rubros } from '../request/sendDatos' 


const BtnRubro = () =>{
	const rubros = ['rubro1','rubro2','rubro3','rubro4','rubro5','rubro6','rubro7','rubro8','rubro9','rubro10','rubro11','rubro12']

	return( 
		<div className='btnRubros'>
			{ rubros.map(rubro =>(
				<div key={ rubro }> 
					<button onClick={ ()=> Msg_Rubros(`${rubro}`) }> { rubro } </button>
				</div>

			) )}
			</div>
	)
}


export default BtnRubro
