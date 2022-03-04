import React from 'react'
import PagPeriodo from './components/paginas/pagPeriodo'
import { MusicPlayerProvider  } from "./components/context";


function App() {
	// SetTemporalidad
	return (
		<MusicPlayerProvider>
			<div>
				<PagPeriodo />
			</div>
		</MusicPlayerProvider>
	)
}

export default App
