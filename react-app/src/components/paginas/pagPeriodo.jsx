import React, { useContext } from "react"
import ReactDOM from "react-dom";
import "../fechas/styles.css"
import SetPeriodo from  '../fechas/setPeriodo'


const PagPeriodo = (props) => {
	/*
	 * En esta pagina tenemos:
	 * 2.- Establece un periodo  
	 * * */

	return (
		<div className="Temporalidades">
			<div className="boton-Mes" >
				<SetPeriodo setPeriodo={'Mes'} setVisibilityClick={ 'On' } />
				<strong> </strong>
			</div>
			<div className="boton-Year">
				<SetPeriodo className='year' setPeriodo={'Ano'} setVisibilityClick={ 'On' } />
			</div>

			<div className="cambio-automatico-Mes" >
				<SetPeriodo setPeriodo={'Mes'} setVisibilityClick={ 'Off' } setMode={ 'Slave' } />
			</div>
			<div className="cambio-automatico-Year">
				<SetPeriodo className='year' setPeriodo={'Ano'} setVisibilityClick={ 'Off' } setMode={ 'Slave' }/>
			</div>

		</div>

	)

}

export default PagPeriodo
