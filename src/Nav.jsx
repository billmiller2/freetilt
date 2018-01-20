import * as React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import freetilt from './images/freetilt.jpg'

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar componentClass="navbar-light">
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src={freetilt} alt="freetilt" />
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                </Nav>
            </Navbar>
        )
    }
}
