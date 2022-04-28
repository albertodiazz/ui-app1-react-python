import React, { useEffect, useContext, useState } from "react"
import ReactDOM from "react-dom";
import SetPeriodo from  '../fechas/setPeriodo'
import SetTemporalidad from  '../fechas/setTemporalidad'
import BtnCalcular from  '../fechas/btnCalcular'
import { MyContext  } from "../context";
import '../styles/periodo.css'
import { Msg_Niveles, Msg_GetLasDates } from "../request/sendDatos"
import Cronometro from "../utilidad/cronometro"


const PagPeriodo = (props) => {
	// [x] Logica de mensual, al llegar el year actual necesitamos poner un seguro en los meses
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

	const [mesDinamico, setMesDinamico] = useState('Enero')
	const [yearDinamico, setYearDinamico] = useState(countJahr)
	


	const [state, setState] = useContext(MyContext);
	// const [btnCalcular, setBtnCalcular] = useState(true);
	const executeOneTime = () =>{
		state.temporalidad == 'mes' ? setHiddenUp(true) : setHiddenUp(false) 
	}

	const increaseMeses = () =>{
		setHiddenDown(false)
		var jahrActual = state.lastYear 
		// Obtenemos el index donde se encuentra nuestro lasMonth
		var getIndex = meses.findIndex(res => res === state.lastMonth)
		// Este dos lo pongo para que reaccione rapido y mande al carajo
		// la flecha de arriba
		if (countJahr >= jahrActual && countMeses >= getIndex - 2){ 
			setCountMeses(getIndex - 1)
			setHiddenUp(true) 
		}else{

			countMeses >= meses.length - 1 ? setCountMeses(meses.length - 1) : setCountMeses(countMeses + 1)
			countMeses >= meses.length - 2 ? setHiddenUp(true) : setHiddenUp(false)
		}
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
		var jahrActual = state.lastYear 
		countJahr >= jahrActual ? setCount(jahrActual) : setCount(countJahr + 1)
		countJahr >= jahrActual - 1 ? setHiddenUpYear(true) : setHiddenUpYear(false)
		countJahr >= jahrActual - 1 ? setMesDinamico(state.lastMonth) : setMesDinamico('Enero') 
	}

	const decreaseYear = (_inicio_) =>{
		setHiddenUpYear(false)
		setMesDinamico('Diciembre')
		countJahr <= _inicio_ ? setCount(_inicio_) : setCount(countJahr - 1)
		countJahr <= _inicio_ + 1 ? setHiddenDownYear(true) : setHiddenDownYear(false)
	}
	
	
	const [mesDinamic, setMesDinamic] = useState('')	
	const [yearDinamic, setYearDinamic] = useState('')	

	useEffect(() => {    
		console.log(mesDinamic)
		state.temporalidad == 'year' ? setToGetData(true) : setToGetData(false)	
		var jahrActual = state.lastYear 
		var getIndex = meses.findIndex(res => res === state.lastMonth)
		// BUG
		// Posible bug que puede ser generado en los meses de Diciembre ya que al llegar
		// a ese punto podria aparecer la fecha cuando cambiemos el year
		if (countJahr != jahrActual && countMeses == getIndex - 1){
			setHiddenUp(false)
		}else if (countJahr == jahrActual && countMeses > getIndex - 1){
			setCountMeses(getIndex - 1)
			setMesReset(true)
			setHiddenUp(true)
		}
		if (!mesRestart){
			console.log('Restart')
			setYearDinamico(countJahr + 1)
		}else{
			setYearDinamico(countJahr)
		}
		// state.temporalidad == 'mes' ? setHiddenUp(true) : setHiddenUp(false) 
		if(modeToGetData)
		{
		mesRestart ? setMesDinamic(meses[countMeses ]) : setMesDinamic(meses[0])
		}else
		{
		mesRestart ? setMesDinamic(meses[countMeses + 1]) : setMesDinamic(meses[0])
		}
		modeToGetData ? setYearDinamic(countJahr) : setYearDinamic(yearDinamico)
		// console.log(mesDinamic, yearDinamic)
	});

	useEffect(() => {    
		setState({ ...state, resetCron: 0 })
	}, [countJahr, countMeses]);

	useEffect(() => {    
		Msg_Niveles('periodo') 
	}, []);
	// BUG
	// [] Al momento de llegar al ultimo year en temporalidad mensual las flechas mensuales se comportan raro


	return (
		<div className="Temporalidades periodo">
			<div className="boton-arrowsUp" >
				{ (state.temporalidad == 'mes') && <button onClick={ increaseMeses } className="arrow up" style={{opacity: !hiddenUp?1:0}}> </button> } 
			</div>
			<div className="boton-arrowsUpYear" >
				{ <button onClick={ increaseYear } className="arrow up" style={{opacity: !hiddenUpYear?1:0}}> </button> } 
			</div>
			<div className="boton-arrowsDown" >
				{ <button onClick= { decreaseMeses } className="arrow down" style={{opacity: !hiddenDown?1:0}}></button> } 
				{ <button onClick= { () => decreaseYear(inicioDatos) } className="arrow down" style={{opacity: !hiddenDownYear?1:0}}></button> } 
			</div>
			<div className="periodo-Fechas" >
				<div className="periodo-InteractivoMes" >
				<SetPeriodo setPeriodo={'Mes'} meses={ meses[countMeses] } />
			</div>
				<div className="periodo-InteractivoYear" >
				<SetPeriodo className='year' years={ countJahr } />
			</div>
				<div className="periodo-NoInteractivoMes" >
				{mesRestart
						? <SetPeriodo setPeriodo={'Mes'} mode= {modeToGetData} lastMes= { mesDinamico } meses={ meses[countMeses + 1] } /> 
						: <SetPeriodo setPeriodo={'Mes'}  mode= {modeToGetData} lastMes= { mesDinamico } meses={ meses[0] } />
				}
							</div>
				<div className="periodo-NoInteractivoYear" >

						{modeToGetData
								? <SetPeriodo className='year' setPeriodo={'Ano'} years={ countJahr + 1} />
								: <SetPeriodo className='year' setPeriodo={'Ano'} years={ yearDinamico } />
						}
							</div>
							</div>
						{modeToGetData
								? <BtnCalcular mes={ meses[countMeses] } year={ countJahr } mesDin = { mesDinamic } yearDin = { yearDinamic + 1 } />
								: <BtnCalcular mes={ meses[countMeses] } year={ countJahr } mesDin = { mesDinamic } yearDin = { yearDinamic } />
						}
								<Cronometro/> 
						</div>

	)

}

export default PagPeriodo
