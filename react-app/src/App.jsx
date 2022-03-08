import React from 'react'
import PagPeriodo from './components/paginas/pagPeriodo'
import { MyContextProvider } from "./components/context";


function App() {
	// SetTemporalidad
	return (
		<MyContextProvider>
			<div>
				<PagPeriodo />
			</div>
		</MyContextProvider>
	)
}

export default App
