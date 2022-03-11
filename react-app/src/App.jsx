import React from 'react'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import PagPeriodo from './components/paginas/pagPeriodo'
import PagTemporalidad from './components/paginas/pagTemporalidad'
import { MyContextProvider } from "./components/context";


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
					</Routes>
				</div>
			</MyContextProvider>
		</BrowserRouter>
	)
}

export default App
