import React, { useEffect, useState, useContext} from "react"
import { MyContext  } from "../context";
import { useNavigate } from "react-router"


const Cronometro = () => {
	
	const setupSeconds = 5000 
	const [state, setState] = useContext(MyContext);
	const [counter, setCounter] = useState(setupSeconds);
	const navigate = useNavigate()
	
	useEffect(()=>{
		if (state.resetCron == 0){ 
			setCounter(setupSeconds)
		}
	}, [state]);

	useEffect(()=>{
		const timer =
			counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
			counter == 0 ? navigate('/pagStandby') : 'El cronomtro esta en ejecucion' 
			// console.log(counter)	
		return () => clearInterval(timer);
	}, [counter]);

	return (<div></div>)
}


export default Cronometro
