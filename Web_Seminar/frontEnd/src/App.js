import React, { useState } from "react";
import { render } from "react-dom";
import Chocolate from "./Chocolate";
import Producer from "./Producer";
import Home from "./Home";
import Detail from "./Detail";
import AddChocolate from "./AddChocolate";
import AddProducer from "./AddProducer";
import Context from "./CartContext";
import Cart from "./Cart";
import EditChocolate from "./EditChocolate";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditProducer from "./EditProducer";
import {BrowserRouter as Router,
  Link,
  Routes,
  Route,
} from "react-router-dom";
import NavbarMenu from "./Navbar";
import FavContext from "./FavContext";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import Favs from "./Favs";
import CurrentUser from "./CurrentUser";
import ProducerDetails from "./ProducerDetails";
import Users from "./Users";

const App = () => {
  const cart = useState([]);
  const favs = useState([]);
  const currentUser = useState("");
  return (
    <div>
      <Context.Provider value={cart} >
        <FavContext.Provider value={favs}>
          <CurrentUser.Provider value={currentUser}>
        <Router>
          <NavbarMenu />
          <Routes>
            <Route path="/details/:id" element={<Detail />} />
            <Route path="/users/" element={<Users />} />
            <Route path="/" element={<Home />} />
            <Route path="/chocolate" element={<Chocolate />} />
            <Route path="/producers" element={<Producer />} />
            <Route path="/addChocolate" element={<AddChocolate />} />
            <Route path="/addProducer" element={<AddProducer />} />
            <Route path="/editChocolate/:id" element={<EditChocolate />} />
            <Route path="/editProducer/:id" element={<EditProducer />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/favs/:id" element={<Favs />} />
            <Route path="/producerDetails/:id" element={<ProducerDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
        </CurrentUser.Provider>
        </FavContext.Provider>
      </Context.Provider>
    </div>
  );
};
render(<App />, document.getElementById("root"));
