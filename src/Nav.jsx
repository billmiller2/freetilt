import * as React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>Free Tilt</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem
                        componentClass={Link}
                        href='/equitycalculator'
                        to='/equitycalculator'>
                        Equity Calculator
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}
