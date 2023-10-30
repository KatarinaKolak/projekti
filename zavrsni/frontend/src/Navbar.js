import { useContext, useState, useEffect } from 'react';
import logo from './logo.svg';
import './style/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './CartContext';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {BrowserRouter as Router,
    Link,
    Routes,
    Route,
  } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';


const NavbarMenu = () => {
    const token = localStorage.getItem("token");
    const [cart, setCart] = useContext(Context);
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState("");
    
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
    }, [token, role]);

    return (
        <><div className="App">
            <div className="maincontainer">

                <div class="offcanvas-menu-overlay"></div>
                <div class="offcanvas-menu-wrapper">
                    <div class="offcanvas__close">+</div>
                    <ul class="offcanvas__widget">
                        <li><span class="icon_search search-switch"></span></li>
                        <li><a href="#"><span class="icon_heart_alt"></span>
                            <div class="tip">2</div>
                        </a></li>
                        <li><a href="#"><span class="icon_bag_alt"></span>
                            <div class="tip">2</div>
                        </a></li>
                    </ul>
                    <div class="offcanvas__logo">
                        <a href="#"><img src="assets/img/logo.png" alt="" /></a>
                    </div>
                    <div id="mobile-menu-wrap"></div>
                    { <div class="offcanvas__auth">
                        <a href="#">Login</a>
                        <a href="#">Register</a>
                    </div> }
                </div>


                <header class="header">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xl-3 col-lg-2">
                                <div class="header__logo">
                                    <a href="#"><img src="assets/img/logo.png" alt="" /></a>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-7">
                                <nav class="header__menu">
                                    <ul >
                                        <li class="active"><Nav.Link><Link  style={{textDecoration: 'none' }} to={"/" }>Home</Link></Nav.Link></li>
                                        {
                                            role === "user"? 
                                            (
                                                <><li><Nav.Link><Link  style={{textDecoration: 'none' }} to={"/products" }>Categories</Link></Nav.Link></li>
                                                <li><Nav.Link><Link  style={{textDecoration: 'none' }} to={"/updateUser/" + userId }>Profile</Link></Nav.Link></li>
                                                <li><Nav.Link><Link  style={{textDecoration: 'none' }} to={"/userShipping/" + userId}>Orders</Link></Nav.Link></li></>

                                            ): null
                                        }
                                        {
                                            role === "admin" ? 
                                            (
                                                <><li><a>NEW</a>
                                                        <div className='dropdown'>
                                                            <li><a href="/addCategory">Category</a></li>
                                                            <li><a href="/addProduct">Product</a></li>
                                                            <li><a href="/addBrand">Brand</a></li>
                                                            <li><a href="/register">User</a></li>
                                                            <li><a href="/discountCode">Code</a></li>
                                                        </div>
                                                    </li>
                                                    <li><a href="/orders">Orders</a></li>
                                                    <li><a href="/users">Users</a></li>
                                                    <li><a href="/products">Categories</a></li>
                                                    <li><a href="/statistic">Statistics</a></li>
                                                    <li><a href="/stock">Stock</a></li></>
                                            ): null
                                        }
                                         {
                                            token === null? 
                                            (
                                                <li><a href="/products">Categories</a></li>

                                            ): null
                                        }
                                    </ul>
                                </nav>
                            </div>
                            <div class="col-lg-3">
                                <div class="header__right">
                                    {/* <div class="header__right__auth">
                                        <a href="/login">Login</a>
                                        <a href="/register">Register</a>
                                        
                                    </div> */}
                                    <ul class="header__right__widget">
                                        { role === "user" ?( 
                                            <>
                                                <li><a href="#"><span class="icon_bag_alt"></span>
                                                    <Nav.Link><Link style={{ textDecoration: 'none' }} to={"/favourites/" + userId}>
                                                        <div class="tip"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                        </svg></div>
                                                    </Link></Nav.Link>
                                                </a></li><li><a href="#"><span class="icon_bag_alt"></span>
                                                    <Nav.Link><Link style={{ textDecoration: 'none' }} to={"/cart/" + userId}>
                                                        <div class="tip"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                        </svg></div>
                                                       
                                                    </Link></Nav.Link></a></li>
                                                    <li><a href="#"><span class="icon_bag_alt"></span><Nav.Link><Link style={{ textDecoration: 'none' }} to={"/logout" }>
                                                        <div class="tip"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                                            </svg></div>
                                                    </Link></Nav.Link>
                                                </a></li></>
                                           
                                        ) : role === "admin" ? (
                                            <li><a href="#"><span class="icon_bag_alt"></span><Nav.Link><Link style={{ textDecoration: 'none' }} to={"/logout" }>
                                                        <div class="tip"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                                            </svg></div>
                                                    </Link></Nav.Link>
                                                </a></li>
                                        ) : (
                                            <><li><a href="#"><span class="icon_bag_alt"></span><Nav.Link><Link style={{ textDecoration: 'none' }} to={"/login"}>
                                            <div class="tip">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                            </svg>  
                                            </div>
                                        </Link></Nav.Link></a></li>
                                        <li><a href="#"><span class="icon_bag_alt"></span><Nav.Link><Link style={{ textDecoration: 'none' }} to={"/register"}>
                                            <div class="tip">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                            </div>
                                        </Link></Nav.Link></a></li></>
                                        ) 
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="canvas__open">
                            <i class="fa fa-bars"></i>
                        </div>
                    </div>
                </header>
                {role === "user" ?
                    (<div className='cartDivNum'>
                        <span className="cartNum">{cart.length}</span>     
                    </div> ) : (<span></span>)   
                }         
            </div>
        </div><br /></>
    )
}
NavbarMenu.propTypes = {}

export default NavbarMenu;