import React from "react"
import { Route, Switch } from "react-router-dom"
import { GlobalStyles } from "./styles/GlobalStyles"
import styled from "styled-components"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserHomePage from "./pages/UserHomePage"

const AppContainer = styled.div`
	padding: 2rem;
	background: rgba(109, 170, 205);
	height: 100vh;
	display: flex;
	justify-content: center;
	min-height: 800px;
`

function App() {
	return (
		<AppContainer>
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
		</AppContainer>
	)
}

export default App
