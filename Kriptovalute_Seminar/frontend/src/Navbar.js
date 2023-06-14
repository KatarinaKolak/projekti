import React, { useContext, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {BrowserRouter as Router,
    Link,
    Routes,
    Route,
  } from "react-router-dom";

const NavbarMenu = () => {
    return (
        <div>
            <Navbar bg="#e6f5ff" expand="lg">
                  <Container className="container-fluid">
                  <Nav.Link><Link className="text-light" style={{textDecoration: 'none'}} to="/">Home</Link></Nav.Link>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                      <Nav.Link><Link className="text-light" style={{textDecoration: 'none'}} to="/blockchain">Blockchain</Link></Nav.Link>
                        
                     </Nav>
                        </Navbar.Collapse>
                            </Container>
                            </Navbar>
                            
                   <br/>
        </div>
    )
}
NavbarMenu.propTypes = {}

export default NavbarMenu;