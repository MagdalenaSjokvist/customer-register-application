import React, { useState } from "react"
import styled from "styled-components"
import { Route, Switch } from "react-router-dom"
import { UserContext } from "./contexts/UserContext"
import { GlobalStyles } from "./styles/GlobalStyles"
import LayoutBasic from "./components/LayoutBasic"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserHomePage from "./pages/UserHomePage"
import CustomerDetailPage from "./pages/CustomerDetailPage"

const AppContainer = styled.div`
	padding: 2rem;
	background: #c0e3f0;
	display: flex;
	justify-content: center;
	height: 100%;
`

function App() {
	const [activeUser, setActiveUser] = useState("")

	return (
		<div>
			<GlobalStyles />
			<UserContext.Provider value={{ activeUser, setActiveUser }}>
				<LayoutBasic>
					<Switch>
						<Route
							path="/customer/:id"
							render={(props) => <CustomerDetailPage {...props} />}
						></Route>

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
				</LayoutBasic>
			</UserContext.Provider>
		</div>
	)
}

export default App
