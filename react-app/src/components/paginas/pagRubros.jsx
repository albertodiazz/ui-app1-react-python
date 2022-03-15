import React, { useEffect, useContext, useState } from "react"
import BtnRubro from '../rubros/btnRubro' 
import BtnDinamico from '../rubros/btnDinamico' 


const PagRubros = () =>{
	// Los rubros son dinamicos en total hay 12
	// [x] Enviar el rubro seleccionado para que lo reciba Touch
	// [x] Generar los rubros de forma dinamica o al menos repetirlos en 12
	return(
		<div className='pagRubros'>
			<BtnRubro />
			<BtnDinamico />
		</div>
	)
}


export default PagRubros
