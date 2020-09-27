import React, { useEffect, useState } from "react"
import UserKit from "../data/UserKit"
import styled from "styled-components"
import { Link, useHistory } from "react-router-dom"

const CustomerDetailContainer = styled.div`
	background: white;
	padding: 1.5rem;
	margin: 2rem 0;
	border-radius: 5px;
	width: 50vw;
	min-width: 350px;
	padding: 2rem 3rem;
`

const CustomerDetailTable = styled.table`
	margin-left: 10px;
`
export default function CustomerDetailPage(props) {
	const customerId = props.match.params.id
	const [customerDetails, setCustomerDetails] = useState("")
	const history = useHistory()
	const params = new URLSearchParams(history.location.search)

	const userKit = new UserKit()

	function handleGetCustomerDetails() {
		userKit
			.fetchCustomerDetails(customerId)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setCustomerDetails(data)
			})
	}

	useEffect(() => {
		handleGetCustomerDetails()
	}, [])

	function handleDeleteCustomer() {
		userKit
			.deleteCustomer(customerId)
			.then(history.push("/home"))
			.then(userKit.getCustomerList())
	}

	return (
		<div>
			<h1>Kunddetaljer </h1>
			<CustomerDetailContainer>
				<h3>{customerDetails.name}</h3>
				<table>
					<tbody>
						<tr>
							<td>Organisationsnr: </td>
							<td>{customerDetails.organisationNr}</td>
						</tr>
						<tr>
							<td>VAT-nr:</td>
							<td>{customerDetails.vatNr}</td>
						</tr>
						<tr>
							<td>Referens:</td>
							<td>{customerDetails.reference}</td>
						</tr>
						<tr>
							<td>Betalningsvillkor:</td>
							<td>{customerDetails.paymentTerm} dagar</td>
						</tr>
						<tr>
							<td>Webb:</td>
							<td>{customerDetails.website}</td>
						</tr>
						<tr>
							<td>Telefon:</td>
							<td>{customerDetails.phoneNumber}</td>
						</tr>
					</tbody>
				</table>
				<Link to="/home">
					<button>
						<i className="fa fa-angle-double-left"></i> Tillbaka
					</button>
				</Link>
				<button onClick={handleDeleteCustomer}>
					Radera kund <i className="fa fa-trash-o"></i>
				</button>
			</CustomerDetailContainer>
		</div>
	)
}
