import React from "react"
import { Route, Switch } from "react-router-dom"
import UserKit from "./data/UserKit"

function App() {
	const userKit = new UserKit()

	function handleRegisterUser() {
		userKit.register(
			"Magdalena",
			"Sjökvist",
			"magdalena.sjokvist+123@gmail.com",
			"test123456",
			"test AB",
			"0"
		)
	}

	return (
		<div>
			<Switch>
				<Route path="/">
					<h1>Startsida</h1>
					<h3>Registrera ny användare</h3>
					<button onClick={handleRegisterUser}>Registrera dig</button>
				</Route>
			</Switch>
		</div>
	)
}

export default App
