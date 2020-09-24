import React, { useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import UserKit from "./data/UserKit"
import styled from "styled-components"

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
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [organisationName, setOrganisationName] = useState("")
	const [organisationKind, setOrganisationKind] = useState("")
	const [confirmationMessage, setConfirmationMessage] = useState("")
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

	const renderInputFields = (inputFieldsArray) => {
		// console.log(inputFieldsArray)
		return inputFieldsArray.map((inputField, index) => {
			return (
				<InputLabel key={index}>
					{inputField[0]}
					<input
						type={inputField[1]}
						placeholder={inputField[2]}
						value={inputField[3]}
						onChange={(event) => {
							inputField[4](event.target.value)
						}}
					/>
				</InputLabel>
			)
		})
	}

	const inputFieldsArray = [
		["Förnamn", "text", "", firstName, setFirstName],
		["Efternamn", "text", "", lastName, setLastName],
		["E-post", "email", "Ex. info@mail.se", email, setEmail],
		["Lösenord", "password", "Minst 8 tecken", password, setPassword],
		["Organisationsnamn", "text", "", organisationName, setOrganisationName],
		[
			"Organisationstyp",
			"text",
			"Välj 0, 1 eller 2",
			organisationKind,
			setOrganisationKind,
		],
	]

	//REGISTRERA KONTO
	function handleRegisterAccount() {
		userKit
			.registerAccount(
				firstName,
				lastName,
				email,
				password,
				organisationName,
				organisationKind
			)
			.then(
				setConfirmationMessage(
					"Tack för din registrering! Du får strax ett mejl till din registrerade e-postadress. Klicka på länken i mejlet för att aktivera ditt konto."
				)
			)
			.then(
				setFirstName(""),
				setLastName(""),
				setEmail(""),
				setPassword(""),
				setOrganisationName(""),
				setOrganisationKind("")
			)
		// .then(history.push("/login"))
	}

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
					<h1>Registrera dig</h1>
					<p>{confirmationMessage}</p>
					{renderInputFields(inputFieldsArray)}
					<button onClick={handleRegisterAccount}>Registrera dig</button>
				</Route>
			</Switch>
		</div>
	)
}

export default App
