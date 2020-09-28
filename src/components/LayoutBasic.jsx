import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
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
	padding: 1.5rem;
	/* justify-content: space-between;
	align-items: center; */
	background: #3b628c;
	height: 100px;
	color: white;
	font-size: 12px;
	margin-bottom: 4vh;
`
const NavLinks = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 1rem;
`

const NavUser = styled.div`
	text-align: right;
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
	height: 180px;
	padding: 1rem;
	margin-top: 10vh;
	background: #3b628c;
	color: white;
	font-size: 12px;
`
const SocialMediaSymbol = styled.a`
	font-size: 24px;
	padding: 1rem 0.3rem;
`
const Logo = styled.p`
	font-size: 40px;
`
export default function LayoutBasic({ children }) {
	const { activeUser, setActiveUser } = useContext(UserContext)
	const userKit = new UserKit()

	function fetchActiveUser() {
		userKit
			.getActiveUser()
			.then((response) => response.json())
			.then((data) => setActiveUser(data))
	}

	useEffect(() => {
		fetchActiveUser()
	}, [])

	return (
		<AppWrapper>
			<NavBar>
				<NavLinks>
					<p>Logo</p>
					<div>
						<Link to="/">Hem </Link>
						<Link to="/login">Logga in</Link>
					</div>
				</NavLinks>
				<NavUser>
					<p>Inloggad som {activeUser.email}</p>
				</NavUser>
			</NavBar>
			<MainWrapper>{children}</MainWrapper>
			<Footer>
				<Logo>
					<i className="fa fa-bug"></i>
				</Logo>
				<p>Mina företag AB</p>
				<p>
					<i className="fa fa-map-marker"> </i> Klippgatan 8A, Solna
				</p>

				<p>
					<SocialMediaSymbol href="mailto:magdalena.sjokvist@gmail.com">
						<i className="fa fa-envelope-o"></i>
					</SocialMediaSymbol>
					<SocialMediaSymbol href="https://www.linkedin.com/in/magdalenasjokvist/">
						<i className="fa fa-linkedin-square"></i>
					</SocialMediaSymbol>
					<SocialMediaSymbol href="https://www.linkedin.com/in/magdalenasjokvist/">
						<i className="fa fa-facebook"></i>
					</SocialMediaSymbol>
				</p>
			</Footer>
		</AppWrapper>
	)
}
