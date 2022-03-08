import React, { useState, useContext, createContext } from 'react'


const MyContext = React.createContext([{}, () => {}]);


const MyContextProvider = (props) => {

	const [state, setState] = useState({})
	// temporlidad : string [mes, year]

	return (
		<MyContext.Provider value={[state, setState]}>
			{props.children}
		</MyContext.Provider>

	);

}

export { MyContext, MyContextProvider  };


