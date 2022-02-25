import React, { useState } from "react"
import "./styles.css"

export default function Button() {

	const [count, setCount] = useState(0);
	
	const increase = () =>{
		count >= 5 ? setCount(5) : setCount(count + 1)
	}

	const decrease = () =>{
		count <= 0 ? setCount(0) : setCount(count - 1)
	}

	return (
		<div className="flex-col-hstart-vstart">
			<button onClick={ increase } className="follow">
				<p className="txt-501 flex-hcenter">follow jane</p>
			</button>
			<button onClick= { decrease } className="message">
				<p className="txt-502 flex-hcenter">message</p>
			</button>
			<strong> { count } </strong>
		</div>

	)

}

