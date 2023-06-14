import React, {useState, useEffect, useContext } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const myuser = JSON.parse(localStorage.getItem("user"));
    if (myuser.role !== "admin"){
        window.location.href = '/login'; 
    }

    async function getUsers(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const usersList = await fetch("http://127.0.0.1:5000/user/allUsers", options);

        const usersJson = await usersList.json();

        setUsers(usersJson.users);

        setUsers(users.filter(function(element){
            return element.role !== "admin";
          }))
    }

    useEffect(() => {
        getUsers();
    })
    return (
        <div>
            {Object.keys(users).map((item) =>
                (<h4> {users[item].name } </h4>)
            )}

        </div>
    )
}

export default Users;