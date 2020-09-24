import React from "react"
import { Route, Switch } from "react-router-dom"
import { GlobalStyles } from "./styles/GlobalStyles"
import styled from "styled-components"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserHomePage from "./pages/UserHomePage"

const AppContainer = styled.div`
	padding: 2rem;
	background: #c0e3f0;
	display: flex;
	justify-content: center;
	height: 100%;
`

function App() {
	return (
		<div>
			<GlobalStyles />
			<AppContainer>
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
		</div>
	)
}

export default App
