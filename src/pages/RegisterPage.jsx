import React, { useState } from "react"
import UserKit from "../data/UserKit"
import styled from "styled-components"

const RegisterForm = styled.form`
	display: flex;
	flex-direction: column;
`

const InputLabel = styled.label`
	display: flex;
	flex-direction: column;
	margin-bottom: 5px;
	width: 35vw;
	min-width: 200px;
`
export default function RegisterPage() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [organisationName, setOrganisationName] = useState("")
	const [organisationKind, setOrganisationKind] = useState("")
	const userKit = new UserKit()

	//RENDERA UT INPUTFÄLT FÖR REGISTRERING
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
				setFirstName(""),
				setLastName(""),
				setEmail(""),
				setPassword(""),
				setOrganisationName(""),
				setOrganisationKind("")
			)
			.then(
				alert(
					"Tack för din registrering! Du får strax ett bekräftelsemejl med en länk. Klicka på länken för att aktivera ditt konto."
				)
			)
	}

	return (
		<div>
			<h1>Registrera dig</h1>
			<RegisterForm>
				{renderInputFields(inputFieldsArray)}
				<button onClick={handleRegisterAccount}>Registrera dig</button>
			</RegisterForm>
		</div>
	)
}
