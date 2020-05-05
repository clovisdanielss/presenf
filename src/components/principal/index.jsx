import React, { Component } from 'react';
import './index.css';
import logo from '../../public/logo.svg'
import CustomRouter from '../roteador'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


class Main extends Component {

	render() {
		return (
			<div className="body-container">
				<Router>
					<nav className="header">
						<Link to="/">
							<img className="logo" src={logo}/>
							<h3>PresEnf</h3>
						</Link>
					</nav>
					<hr className="separator"/>
					<CustomRouter />
				</Router>
			</div>
		);
	}
}

export default Main;