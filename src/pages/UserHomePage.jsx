import React, { useContext, useEffect, useState } from "react"
import UserKit from "../data/UserKit"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

const CreateCustomerForm = styled.div`
	display: flex;
	flex-direction: column;
`
const InputLabel = styled.label`
	display: flex;
	flex-direction: column;
	margin-bottom: 5px;
	max-width: 700px;
`
const CustomersContainer = styled.div`
	background: white;
	padding: 1.5rem;
	margin: 2rem 0;
	border-radius: 5px;
`

const CustomerButton = styled.button`
	width: 100%;
`

export default function UserHomePage() {
	const { activeUser } = useContext(UserContext)
	const [customerList, setCustomerList] = useState("")

	//State variables for creating new customer
	const [name, setName] = useState("")
	const [organisationNr, setOrganisationNr] = useState("")
	const [vatNr, setVatNr] = useState("")
	const [reference, setReference] = useState("")
	const [paymentTerm, setPaymentTerm] = useState("")
	const [website, setWebsite] = useState("")
	const [email, setEmail] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	// const [confirmationMessage, setConfirmationMessage] = useState("")

	//Skapa ny instans av klassen UserKit
	const userKit = new UserKit()

	//RENDERA UT INPUTFÄLT FÖR ATT SKAPA NY KUND
	const inputFieldsArray = [
		["Namn", "text", "", name, setName],
		[
			"Organisationsnummer",
			"text",
			"XXXXXX-XXXX",
			organisationNr,
			setOrganisationNr,
		],
		["VAT-nummer", "text", "Ex: SE1234567890", vatNr, setVatNr],
		["Referens", "text", "", reference, setReference],
		[
			"Betalningsvillkor",
			"text",
			"Ange antal dagar",
			paymentTerm,
			setPaymentTerm,
		],
		["Webb", "text", "", website, setWebsite],
		["E-post", "email", "", email, setEmail],
		["Telefon", "text", "", phoneNumber, setPhoneNumber],
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

	//SE BEFINTLIGA KUNDER
	function handleGetCustomerList() {
		userKit
			.getCustomerList()
			.then((res) => res.json())
			.then((data) => {
				setCustomerList(data.results)
			})
	}

	useEffect(() => {
		handleGetCustomerList()
	}, [])

	//SKAPA NY KUND
	function handleCreateCustomer() {
		userKit
			.createCustomer(
				name,
				organisationNr,
				vatNr,
				reference,
				paymentTerm,
				website,
				email,
				phoneNumber
			)
			.then(handleGetCustomerList())
			.then(
				setName(""),
				setOrganisationNr(""),
				setVatNr(""),
				setReference(""),
				setPaymentTerm(""),
				setWebsite(""),
				setEmail(""),
				setPhoneNumber("")
			)
			.then(window.location.reload())
	}

	return (
		<div>
			<h2>
				Välkommen {activeUser.firstName} {activeUser.lastName}
			</h2>
			<CustomersContainer>
				<h3>Mina kunder</h3>
				<table>
					<thead>
						<tr>
							<th>Namn</th>
							<th>Org.nr</th>
							<th>Referens</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{customerList &&
							customerList.map((customerItem, index) => {
								return (
									<tr key={index}>
										<td>{customerItem.name}</td>
										<td>{customerItem.organisationNr}</td>
										<td>{customerItem.reference}</td>
										<td>
											<Link to={`/customer/${customerItem.id}`}>
												<CustomerButton>
													{/* <i className="fa fa-info-circle"></i> Läs mer */}
													Mer info <i className="fa fa-angle-double-right"></i>
												</CustomerButton>
											</Link>
										</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</CustomersContainer>
			<CreateCustomerForm>
				<h3>Lägg till en ny kund</h3>
				{renderInputFields(inputFieldsArray)}
				<button onClick={handleCreateCustomer}>Lägg till</button>
			</CreateCustomerForm>
		</div>
	)
}
