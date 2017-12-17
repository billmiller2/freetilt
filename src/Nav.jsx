import * as React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
//import { EquityCalculator } from './equitycalculator'

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Free Tilt
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem>Equity Calculator</NavItem>
                </Nav>
            </Navbar>
        )
    }
}
