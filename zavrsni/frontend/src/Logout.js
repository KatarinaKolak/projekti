import React, { useEffect } from "react";

const Logout = () =>{

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    window.location.href = '/login';
    return null;
    
};

export default Logout;