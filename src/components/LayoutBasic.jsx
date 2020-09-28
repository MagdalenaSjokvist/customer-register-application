import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import UserKit from "../data/UserKit"
import styled from "styled-components"

const AppWrapper = styled.div`
	background: #c0e3f0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
`
const NavBar = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 2rem;
	background: #3b628c;
	height: 90px;
	color: white;
`
const NavLoggedIn = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
`
const NavLoggedOut = styled(NavLoggedIn)``

const NavLink = styled.li`
	display: inline-block;
	list-style: none;
	font-size: 16px;
	font-weight: bold;
	padding-left: 1rem;
`
const ActiveUser = styled.p`
	text-align: right;
	font-size: 10px;
	margin-bottom: 0.3rem;
`
const MainWrapper = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3rem;
`
const Footer = styled.footer`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 160px;
	padding: 1rem;
	margin-top: 10vh;
	background: #3b628c;
	color: white;
	font-size: 14px;
`
const SocialMediaWrapper = styled.div`
	margin-top: 0.5rem;
`
const SocialMediaLink = styled.a`
	font-size: 24px;
	padding: 0.4rem;
`
const Logo = styled.p`
	font-size: 14px;
`

export default function LayoutBasic({ children }) {
	const { activeUser, setActiveUser } = useContext(UserContext)
	const userKit = new UserKit()
	const token = userKit.getToken()
	const history = useHistory()

	function fetchActiveUser() {
		userKit
			.getActiveUser()
			.then((response) => response.json())
			.then((data) => setActiveUser(data))
	}

	useEffect(() => {
		fetchActiveUser()
	}, [])

	function handleLogOut() {
		userKit.deleteToken()
		history.push("/")
		window.location.reload()
	}

	return (
		<AppWrapper>
			<NavBar>
				{token && <ActiveUser>Inloggad som: {activeUser.email}</ActiveUser>}
				{!token ? (
					<NavLoggedOut>
						<Logo>My business AB</Logo>
						<ul>
							<NavLink>
								<Link to="/">HEM</Link>
							</NavLink>
							<NavLink>
								<Link to="/login">LOGGA IN</Link>
							</NavLink>
						</ul>
					</NavLoggedOut>
				) : (
					<NavLoggedIn>
						<Logo>My business AB</Logo>
						<ul>
							<NavLink>
								<Link to="/home">MINA KUNDER</Link>
							</NavLink>
							<NavLink>
								<Link to="/" onClick={handleLogOut}>
									LOGGA UT
								</Link>
							</NavLink>
						</ul>
					</NavLoggedIn>
				)}
			</NavBar>
			<MainWrapper>{children}</MainWrapper>
			<Footer>
				<Logo>My business AB</Logo>
				<p>
					<i className="fa fa-map-marker"></i> Klippgatan 8A, Solna
				</p>

				<SocialMediaWrapper>
					<SocialMediaLink href="mailto:magdalena.sjokvist@gmail.com">
						<i className="fa fa-envelope-o"></i>
					</SocialMediaLink>
					<SocialMediaLink href="https://www.linkedin.com/in/magdalenasjokvist/">
						<i className="fa fa-linkedin-square"></i>
					</SocialMediaLink>
					<SocialMediaLink href="https://www.linkedin.com/in/magdalenasjokvist/">
						<i className="fa fa-facebook"></i>
					</SocialMediaLink>
				</SocialMediaWrapper>
			</Footer>
		</AppWrapper>
	)
}
