import React, { useState } from "react"
import UserKit from "../data/UserKit"

export default function UserHomePage() {
	const [customerList, setCustomerList] = useState("")

	//Skapa ny instans av klassen UserKit
	const userKit = new UserKit()

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
	)
}
