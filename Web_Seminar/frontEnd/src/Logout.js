import React, { useEffect } from "react";
import { Redirect } from "@reach/router";

export default Logout = () =>{

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    window.location.href = '/login';
    return null;
    
};