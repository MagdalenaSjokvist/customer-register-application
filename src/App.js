import React, { useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import UserKit from "./data/UserKit"
import styled from "styled-components"
import RegisterPage from "./pages/RegisterPage"

const InputLabel = styled.label`
	display: flex;
	flex-direction: column;
`
// const appContainer = styled.main`
// 	box-sizing: border-box;
// 	margin: 0 auto;
// 	background-color: #6daacd;
// `

function App() {
	const history = useHistory()
	const urlParameters = new URLSearchParams(history.location.search) // Use URL Search Params to parse the query parameters from the url
	const [uid, setUid] = useState(urlParameters.get("uid"))
	const [token, setToken] = useState(urlParameters.get("token"))
	// const uid = params.get("uid")
	// const token = params.get("token")

	const [loginEmail, setLoginEmail] = useState("")
	const [loginPassword, setLoginPassword] = useState("")

	const [customerList, setCustomerList] = useState("")

	//Skapa ny instans av klassen UserKit
	const userKit = new UserKit()

	//AKTIVERA KONTO
	function handleActivateAccount() {
		userKit.activateAccount(uid, token).then(() => {
			setUid(null)
			setToken(null)
			history.push("/login") //Så snart activateUser är klar - skicka användaren till /login
		})
	}

	//LOGGA IN
	function handleLogin() {
		userKit
			.login(loginEmail, loginPassword)
			.then((res) => res.json())
			.then((data) => {
				userKit.setToken(data.token)
				// console.log(loginEmail, loginPassword)
				// console.log(data)
				history.push("/home")
			})
	}
	//SE BEFINTLIGA KUNDER
	function handleGetCustomerList() {
		userKit
			.getCustomerList()
			.then((res) => res.json())
			.then((data) => {
				setCustomerList(data.results)
			})
	}

	//SKAPA NY KUND
	function handleCreateCustomer() {
		userKit
			.createCustomer()
			.then((res) => res.json())
			.then((data) => {
				console.log(data.email)
				handleGetCustomerList()
			})
	}

	return (
		<div>
			<Switch>
				<Route path="/home">
					<div>
						<h2>Välkommen Namn Namnsson</h2>
						<div>
							<h4>Mina kunder</h4>
							<button onClick={handleGetCustomerList}>Hämta kunder</button>
							<ul>
								<li>Test</li>
								{customerList &&
									customerList.map((customerItem, index) => {
										return <li key={index}>{customerItem.name}</li>
									})}
							</ul>
						</div>
						<div>
							<h4>Lägg till en ny kund</h4>

							<button onClick={handleCreateCustomer}>Lägg till</button>
						</div>
					</div>
				</Route>
				<Route path="/login">
					<div>
						{/* Om uid och token finns - rendera ut första diven, annars rendera ut den andra diven */}
						{uid && token ? (
							<div>
								<h1>Aktivera ditt konto</h1>
								<p>
									Klicka på knappen nedan för att aktivera ditt konto och logga
									in.
								</p>
								<button onClick={handleActivateAccount}>
									Aktivera ditt konto
								</button>
							</div>
						) : (
							<div>
								<h1>Logga in</h1>
								<input
									type="email"
									placeholder="Ex. info@mail.se"
									value={loginEmail}
									onChange={(e) => setLoginEmail(e.target.value)}
								/>
								<input
									type="password"
									placeholder="Lösenord"
									value={loginPassword}
									onChange={(e) => setLoginPassword(e.target.value)}
								/>
								<button onClick={handleLogin}>Logga in</button>
							</div>
						)}
					</div>
				</Route>
				<Route path="/">
					<RegisterPage />
				</Route>
			</Switch>
		</div>
	)
}

export default App
