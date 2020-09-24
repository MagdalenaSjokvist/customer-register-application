import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import UserKit from "../data/UserKit"
import styled from "styled-components"

const InputLabel = styled.label`
	display: flex;
	flex-direction: column;
	margin-bottom: 5px;
	max-width: 700px;
`
export default function LoginPage() {
	const history = useHistory()
	const urlParameters = new URLSearchParams(history.location.search) // Use URL Search Params to parse the query parameters from the url
	const [uid, setUid] = useState(urlParameters.get("uid"))
	const [token, setToken] = useState(urlParameters.get("token"))
	// const uid = params.get("uid")
	// const token = params.get("token")

	const [loginEmail, setLoginEmail] = useState("")
	const [loginPassword, setLoginPassword] = useState("")

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

	return (
		<div>
			{/* Om uid och token finns - rendera ut första diven, annars rendera ut den andra diven */}
			{uid && token ? (
				<div>
					<h1>Aktivera ditt konto</h1>
					<p>
						Klicka på knappen nedan för att aktivera ditt konto och logga in.
					</p>
					<button onClick={handleActivateAccount}>Aktivera ditt konto</button>
				</div>
			) : (
				<div>
					<h1>Logga in</h1>
					<InputLabel>
						E-post
						<input
							type="email"
							placeholder="Ex. info@mail.se"
							value={loginEmail}
							onChange={(e) => setLoginEmail(e.target.value)}
						/>
					</InputLabel>
					<InputLabel>
						Lösenord
						<input
							type="password"
							placeholder="Lösenord"
							value={loginPassword}
							onChange={(e) => setLoginPassword(e.target.value)}
						/>
					</InputLabel>
					<button onClick={handleLogin}>Logga in</button>
				</div>
			)}
		</div>
	)
}
