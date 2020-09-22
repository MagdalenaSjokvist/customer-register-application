import React, { useState } from "react"
import { Route, Switch } from "react-router-dom"
import UserKit from "./data/UserKit"
import styled from "styled-components"

const InputLabel = styled.label`
	display: flex;
	flex-direction: column;
`

function App() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [organisationName, setOrganisationName] = useState("")
	const [organisationKind, setOrganisationKind] = useState("")

	const userKit = new UserKit()

	const renderInputFields = (inputFieldsArray) => {
		// console.log(inputFieldsArray)
		return inputFieldsArray.map((inputField, index) => {
			console.log(inputField[0])
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
		["Förnamn", "text", "placeholder", firstName, setFirstName],
		["Efternamn", "text", "placeholder", lastName, setLastName],
		["E-post", "email", "placeholder", email, setEmail],
		["Lösenord", "password", "placeholder", password, setPassword],
		[
			"Organisationsnamn",
			"text",
			"placeholder",
			organisationName,
			setOrganisationName,
		],
		[
			"Organisationstyp",
			"text",
			"placeholder",
			organisationKind,
			setOrganisationKind,
		],
	]

	function handleRegisterUser() {
		userKit.register(
			firstName,
			lastName,
			email,
			password,
			organisationName,
			organisationKind
		)
	}

	return (
		<div>
			<Switch>
				<Route path="/">
					<h1>Startsida</h1>
					<h3>Registrera ny användare</h3>
					{renderInputFields(inputFieldsArray)}
					<button onClick={handleRegisterUser}>Registrera dig</button>
				</Route>
			</Switch>
		</div>
	)
}

export default App
