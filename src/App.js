import React, { useState } from "react"
import { Route, Switch } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserHomePage from "./pages/UserHomePage"
import { GlobalStyles } from "./styles/GlobalStyles"

function App() {
	return (
		<div>
			<GlobalStyles />
			<Switch>
				<Route path="/home">
					<UserHomePage />
				</Route>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/">
					<RegisterPage />
				</Route>
			</Switch>
		</div>
	)
}

export default App
