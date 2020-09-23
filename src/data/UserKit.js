const ROOT_URL = "https://frebi.willandskill.eu/"
const API_URL = `${ROOT_URL}api/v1/`
const AUTH_URL = `${ROOT_URL}auth/`
const LOGIN_URL = `${ROOT_URL}api-token-auth/`
// `${ROOT_URL}api/v1/customers`
// `${ROOT_URL}auth/users/activate/`

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
