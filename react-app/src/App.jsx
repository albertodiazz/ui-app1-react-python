import React from 'react'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import PagPeriodo from './components/paginas/pagPeriodo'
import PagTemporalidad from './components/paginas/pagTemporalidad'
import { MyContextProvider } from "./components/context"
import PagRubros from "./components/paginas/pagRubros"
import PagHome from "./components/paginas/pagHome"
import PagIntro from "./components/paginas/pagIntro"
import PagStandBy from "./components/paginas/pagStandBy"
import PagFinal from "./components/paginas/pagFinal"


function App() {
	// TODO
	// [] Armar pag de rubros
	return (
		<BrowserRouter>
			<MyContextProvider>
				<div>
					<Routes>
						<Route path="pagTemporalidad" element={<PagTemporalidad/>} />
						<Route path="pagPeriodo" element={<PagPeriodo />} />
						<Route path="pagRubros" element={<PagRubros/>} />
						<Route path="pagStandby" element={<PagStandBy/>} />
						<Route path="pagIntro" element={<PagIntro/>} />
						<Route path="pagHome" element={<PagHome/>} />
						<Route path="pagFinal" element={<PagFinal/>} />
					</Routes>
				</div>
			</MyContextProvider>
		</BrowserRouter>
	)
}

export default App
