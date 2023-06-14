import React, { useContext, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {BrowserRouter as Router,
    Link,
    Routes,
    Route,
  } from "react-router-dom";
import Context from './CartContext';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

const NavbarMenu = () => {
    const [cart, setCart] = useContext(Context);
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState();
    function getCurrent(){
        const myuser = JSON.parse(localStorage.getItem("user"));
        if (myuser){
            setUserName(myuser.name);
            setRole(myuser.role);
            setUserId(myuser.id);
        }
    }

    useEffect(() =>{
        getCurrent();
    });

    return (
        <div>
            <Navbar bg="light" expand="lg">
                  <Container className="container-fluid">
                  <Nav.Link><Link className="text-dark" style={{textDecoration: 'none'}} to="/"><i className='fa fa'>Home</i></Link></Nav.Link>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                      <Nav.Link><Link className="text-dark" style={{textDecoration: 'none'}} to="/producers"><i className='fa fa'>Producers</i></Link></Nav.Link>
                        { role == "admin" ? 
                        (
                            <Container className='container-fluid'>
                            <Nav.Link><Link className="text-dark" style={{textDecoration: 'none'}} to="/addChocolate"><i className='fa fa'>Add chocolate</i></Link></Nav.Link>
                      <Nav.Link><Link className="text-dark" style={{textDecoration: 'none'}} to="/addProducer"><i className='fa fa'>Add producer</i></Link></Nav.Link>
                      </Container>) : null}
                      </Nav>
                     {
                       role === "user" ?
                       ( <Nav className="ms-auto">
                           <Nav.Link><button className='btn btn-light' onClick={()=>setCart([])}>
                        <i className='fa fa'>Check-out</i></button></Nav.Link>
                        <Nav.Link><Link  style={{textDecoration: 'none' }} to={"/cart/" + userId}>
                        <button className='btn btn-light'><i className="fa fa-shopping-cart"></i></button></Link></Nav.Link>
                        <Nav.Link><Link  style={{textDecoration: 'none' }} to={"/favs/" + userId}>
                        <button className='btn btn-light'><i className="fa fa-heart"></i></button></Link></Nav.Link>
                        <Nav.Link><Link style={{textDecoration: 'none'}} to="/logout"><button className='btn btn-light'><i className='fa fa-sign-out'></i></button></Link></Nav.Link>
                        </Nav>
                       ) : role == "admin" ? (
                           <Nav>
                        <Nav.Link><Link style={{textDecoration: 'none'}} to="/logout"><button className='btn btn-light'><i className='fa fa-sign-out'></i></button></Link></Nav.Link>

                      </Nav>
                    ): (
                    <Nav className="ms-auto">
                        <Nav.Link><Link style={{textDecoration: 'none'}} to="/login"><button className='btn btn-light'><i className='fa fa-sign-in'></i></button></Link></Nav.Link>
                      <Nav.Link><Link style={{textDecoration: 'none'}} to="/register"><button className='btn btn-light'><i className='fa fa-user-plus'></i></button></Link></Nav.Link>
                    </Nav>
                    )}
                        </Navbar.Collapse>
                            </Container>
                            </Navbar>
                   <br/><br/>
        </div>
    )
}
NavbarMenu.propTypes = {}

export default NavbarMenu;