import React from "react"
import ReactDOM from "react-dom";
import SetPeriodo from '../fechas/setPeriodo'


export default function PagPeriodo(){
	/*
	 * En esta pagina tenemos:
	 * 1.- Seleccion de Temporalidad : [setPeriodo : str] ['Mes', 'Ano']
	 * 2.- Establece un periodo : [get_Mes, get_Ano : str]
		* * */

	return (
		<div className="Botones-Temporalidad">
			<SetPeriodo setPeriodo={'Mes'} />
		</div>

	)

}
