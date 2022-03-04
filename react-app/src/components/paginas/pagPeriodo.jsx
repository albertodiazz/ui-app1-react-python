import React, { useContext, useState } from "react"
import ReactDOM from "react-dom";
import "../fechas/styles.css"
import SetPeriodo from  '../fechas/setPeriodo'
import SetTemporalidad from  '../fechas/setTemporalidad'
import { MusicPlayerContext  } from "../context";


const PagPeriodo = (props) => {
	// TODO:
	// [] seter comportamiento anual, tiene temporalidades de Enero a Diciembre
	// [] las flechas del seteo mensual desaparecen
	// [] y existe la exepcion del 2022 que solo tiene hasta el mes entrante hay que
	//    recordar que eso cambia con el tiempo
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
	const [countMeses, setCountMeses] = useState(0)
	const [hiddenUp, setHiddenUp] = useState(false)
	const [hiddenDown, setHiddenDown] = useState(true)
	const [mesRestart, setMesReset] = useState(true) 
	const [hiddenUpYear, setHiddenUpYear] = useState(false)
	const [hiddenDownYear, setHiddenDownYear] = useState(true)

	const increaseMeses = () =>{
		setHiddenDown(false)
		countMeses >= meses.length - 1 ? setCountMeses(meses.length - 1) : setCountMeses(countMeses + 1)
		countMeses >= meses.length - 2 ? setHiddenUp(true) : setHiddenUp(false)
		countMeses + 1 > meses.length - 2 ? setMesReset(false) : setMesReset(true)
	}

	const decreaseMeses = () =>{
		setMesReset(true)
		setHiddenUp(false)
		countMeses <= 0 ? setCountMeses(0) : setCountMeses(countMeses - 1)
		countMeses <= 1 ? setHiddenDown(true) : setHiddenDown(false)
	}
	const increaseYear = () =>{
		setHiddenDownYear(false)
		var fechaActual = new Date()
		var jahrActual = fechaActual.getFullYear()
		countJahr >= jahrActual ? setCount(jahrActual) : setCount(countJahr + 1)
		countJahr >= jahrActual - 2 ? setHiddenUpYear(true) : setHiddenUpYear(false)
	}

	const decreaseYear = (_inicio_) =>{
		setHiddenUpYear(false)
		countJahr <= _inicio_ ? setCount(_inicio_) : setCount(countJahr - 1)
		countJahr <= _inicio_ + 1 ? setHiddenDownYear(true) : setHiddenDownYear(false)
	}

	// TODO 
	// [] solucionar este desmadre de los contexto, por el momento ya pase de context jsx 
	//    Ya lo tengo seteado en setTemporalidad igual que el state de la linea +10
	// ESTUDIA ESTE DOCUMENTO:
	// -----------------------------------
	// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react
	//------------------------------------
	
	const [state, setState] = useContext(MusicPlayerContext);

	return (
		<div className="Temporalidades">
			<button onClick={() => setState(state => ({ ...state, name: 'Contexto B'  }))}>
				{state.name}
			</button>
			<strong> {state.name} </strong> 

				<SetTemporalidad />
				<div className="boton-Mes" >
					{ !hiddenUp && <button onClick={ increaseMeses } className="arrow up"> </button> } 
					<SetPeriodo setPeriodo={'Mes'} meses={ meses[countMeses] } />
					{ !hiddenDown && <button onClick= { decreaseMeses } className="arrow down"></button> } 
				</div>
				<div className="boton-Year">
					{ !hiddenUpYear && <button onClick={ increaseYear } className="arrow up"> </button> } 
					<SetPeriodo className='year' years={ countJahr } />
					{ !hiddenDownYear && <button onClick= { () => decreaseYear(inicioDatos) } className="arrow down"></button> } 
				</div>

				<div className="cambio-automatico-Mes" >
					{mesRestart
							? <SetPeriodo setPeriodo={'Mes'} meses={ meses[countMeses + 1] } /> 
							: <SetPeriodo setPeriodo={'Mes'} meses={ meses[0] } />
					}
						</div>
						<div className="cambio-automatico-Year">
							<SetPeriodo className='year' setPeriodo={'Ano'} years={ countJahr + 1 } />
						</div>

					</div>

	)

}

export default PagPeriodo
