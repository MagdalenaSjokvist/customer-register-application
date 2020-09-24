const ROOT_URL = "https://frebi.willandskill.eu/"
const API_URL = `${ROOT_URL}api/v1/`
const AUTH_URL = `${ROOT_URL}auth/`
const LOGIN_URL = `${ROOT_URL}api-token-auth/`
// `${ROOT_URL}api/v1/customers`
// `${ROOT_URL}auth/users/activate/`
//  //om du vill ha en specifik customer så kan du använda ID:et
//som API:et skapar som :id och hämta aktuella med `${ROOT_URL}api/v1/customers/${id}/`
// `${ROOT_URL}api/v1/customers/${id}/`

export default class {
	async registerAccount(
		firstName,
		lastName,
		email,
		password,
		organisationName,
		organisationKind
	) {
		const url = `${AUTH_URL}users/`
		const payload = {
			firstName,
			lastName,
			email,
			password,
			organisationName,
			organisationKind,
		}
		return fetch(url, {
			method: "POST",
			headers: this.getPublicHeaders(),
			body: JSON.stringify(payload),
		})
	}

	async activateAccount(uid, token) {
		const url = `${ROOT_URL}auth/users/activate/`
		const payload = {
			uid,
			token,
		}
		return fetch(url, {
			method: "POST",
			headers: this.getPublicHeaders(),
			body: JSON.stringify(payload),
		})
	}

	async login(email, password) {
		const url = `${ROOT_URL}api-token-auth/`
		const payload = {
			email,
			password,
		}
		return fetch(url, {
			method: "POST",
			headers: this.getPublicHeaders(),
			body: JSON.stringify(payload),
		})
	}

	async getCustomerList() {
		const url = `${API_URL}customers`
		return fetch(url, {
			headers: this.getPrivateHeaders(),
		})
	}

	// async createCustomer() {
	// 	const url = `${API_URL}customers`
	// 	const payload = {
	// 		name: "Skåne AB",
	// 		organisationNr: "555111-1111",
	// 		vatNr: "SE3000040000",
	// 		reference: "Rushe Berisha",
	// 		paymentTerm: "30",
	// 		website: "https://www.google.se/",
	// 		email: "bolaget@mail.se",
	// 		phoneNumber: "0700123456",
	// 	}
	// 	return fetch(url, {
	// 		method: "POST",
	// 		headers: this.getPrivateHeaders(),
	// 		body: JSON.stringify(payload),
	// 	})
	// }

	async createCustomer(
		name,
		organisationNr,
		vatNr,
		reference,
		paymentTerm,
		website,
		email,
		phoneNumber
	) {
		const url = `${API_URL}customers`
		const payload = {
			name,
			organisationNr,
			vatNr,
			reference,
			paymentTerm,
			website,
			email,
			phoneNumber,
		}
		return fetch(url, {
			method: "POST",
			headers: this.getPrivateHeaders(),
			body: JSON.stringify(payload),
		})
	}

	setToken(token) {
		localStorage.setItem("USER_TOKEN", token)
	}

	getToken() {
		return localStorage.getItem("USER_TOKEN")
	}

	// async addCustomer() {
	//   const url = `${ROOT_URL}api/v1/customers`
	//   const payload = {
	//     name: Katarina Svensson,
	//     adress: [{
	//       {organisation: 1}
	//     }]
	//   }
	// }

	//Genom att skriva ut header (Content-Type) med en funktion minskar risken att vi skriver fel (om vi skriver fler det gånger)
	getPublicHeaders() {
		return {
			"Content-Type": "application/json",
		}
	}

	getPrivateHeaders() {
		return {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.getToken()}`,
		}
	}
}
