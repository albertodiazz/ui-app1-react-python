import React, { useContext, useState } from "react"
import "./styles.css"
import { GET_MES } from '../context'

export default function SetPeriodo(props) {

	return (
		<div className="flex-col-hstart-vstart">
			<strong>{ props.setPeriodo == 'Mes' ? props.meses : props.years }</strong>
		</div>

	)

}
