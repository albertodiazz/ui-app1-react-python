import React, { useEffect, useContext, useState } from "react"
import ReactDOM from "react-dom";
import SetPeriodo from  '../fechas/setPeriodo'
import SetTemporalidad from  '../fechas/setTemporalidad'
import BtnCalcular from  '../fechas/btnCalcular'
import { MyContext  } from "../context";
import { Msg_Temporalidad } from "../request/sendDatos" 

const PagPeriodo = (props) => {
	// [x] seter comportamiento anual, tiene temporalidades de Enero a Diciembre 
	//    existe la exepcion del 2022 que solo tiene hasta el mes entrante hay que
	//    recordar que eso cambia con el tiempo
	// [x] las flechas del seteo mensual desaparecen
	//
	//    NOTA: Ya estoy recibiendo la respuesta de python en el boton de request que hice 
	
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
	const [modeToGetData, setToGetData] = useState(true) 
	const [hiddenUpYear, setHiddenUpYear] = useState(false)
	const [hiddenDownYear, setHiddenDownYear] = useState(true)

	const [mesDinamico, setMesDinamico] = useState('Diciembre')

	// ------------------------------------------------------------------------------------------
	const [lastMes, setLastMes] = useState( () => { Msg_Temporalidad().then(res => { setLastMes(res.lastMes) }) } ) 
	const [lastYear, setLastYear] = useState( () => { Msg_Temporalidad().then(res => { setLastYear(res.lastYear) }) } ) 
	const prevLastMes = lastMes
	const prevLastYear = lastYear 
	// ------------------------------------------------------------------------------------------

	// para acceder a las variables recuerda ocupar state.temporalidad	
	const [state, setState] = useContext(MyContext);

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
		// OJO aqui estamos agarrando el ultimo dato del yeari seteado en su csv
		var jahrActual = lastYear 
		countJahr >= jahrActual ? setCount(jahrActual) : setCount(countJahr + 1)
		countJahr >= jahrActual - 1 ? setHiddenUpYear(true) : setHiddenUpYear(false)
		countJahr >= jahrActual - 1 ? setMesDinamico(lastMes) : setMesDinamico('Diciembre') 
	}

	const decreaseYear = (_inicio_) =>{
		setHiddenUpYear(false)
		setMesDinamico('Diciembre')
		countJahr <= _inicio_ ? setCount(_inicio_) : setCount(countJahr - 1)
		countJahr <= _inicio_ + 1 ? setHiddenDownYear(true) : setHiddenDownYear(false)
	}
	
	useEffect(() => {    
		state.temporalidad == 'year' ? setToGetData(true) : setToGetData(false)
	});

	return (
		<div className="Temporalidades">
			<SetTemporalidad />
			<div className="boton-Mes" >
				{ (!hiddenUp && state.temporalidad == 'mes') && <button onClick={ increaseMeses } className="arrow up"> </button> } 
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
						? <SetPeriodo setPeriodo={'Mes'} mode= {modeToGetData} lastMes= { mesDinamico } meses={ meses[countMeses + 1] } /> 
						: <SetPeriodo setPeriodo={'Mes'}  mode= {modeToGetData} lastMes= { mesDinamico } meses={ meses[0] } />
				}
					</div>
					<div className="cambio-automatico-Year">
						{modeToGetData
								? <SetPeriodo className='year' setPeriodo={'Ano'} years={ countJahr } />
								: <SetPeriodo className='year' setPeriodo={'Ano'} years={ countJahr } />
						}
							</div>
							<div className='btn-Calcular pagPeriodo'>
								<BtnCalcular />
						</div>

						</div>

	)

}

export default PagPeriodo
