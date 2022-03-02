import React, { useState } from "react"
import "./styles.css"

export default function SetPeriodo(props) {
	/*
	 * Cuand presionamos el boton calcular este nos envia la data para 
	 * obtener los resultados
	 *--------------------------------------
	[ARG]:
	     [_config_ : str] [Podemos ocupar los siguientes argumentos: 
				     'Mes' : 'para obtener los meses'
				     'Ano' : 'para obtener los anos'] 
			     [Default. 'Meses']
	 *--------------------------------------
	 [RETURN]:
	       [datos : str] [nos regresa los meses abreviados tipo Ene
			      o los anos convertidos a string]
			      */
	const inicioDatos=1969;

	const meses = [
		'Enero', 
		'Febrero', 
		'Marzo', 
		'Abril', 
		'Mayo', 
		'Junio', 
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Novimbre',
		'Diciembre'
	]
	/*
	Aqui es donde seteamos el inicio de jahr en base al documentos de excel
	que nos fue proporicionado por el Mide el documento es Base_INPC_1969_2021_completa_1
	1.- El jahr lo estamos agarrando de forma dinamica
	*/	

	const [countJahr, setCount] = useState(inicioDatos);	
	// Aqui decidimos en que me empezamos
	const [countMeses, setCountMeses] = useState(0)

	const increase = () =>{

		var fechaActual = new Date()
		var jahrActual = fechaActual.getFullYear()

		countJahr >= jahrActual ? setCount(jahrActual) : setCount(countJahr + 1)
		countMeses >= meses.length - 1 ? setCountMeses(meses.length - 1) : setCountMeses(countMeses + 1)
	}

	const decrease = (_inicio_) =>{
		countJahr <= _inicio_ ? setCount(_inicio_) : setCount(countJahr - 1)
		countMeses <= 0 ? setCountMeses(0) : setCountMeses(countMeses - 1)
	}

	// var llamada1 = decrease()
	

	return (
		<div className="flex-col-hstart-vstart">
			<button onClick={ increase } className="arrow up">
			</button>
			<strong>{ props.setPeriodo == 'Mes' ? meses[countMeses] : countJahr }</strong>
			<button onClick= { () => decrease(inicioDatos) } className="arrow down">
			</button>
		</div>

	)

}

