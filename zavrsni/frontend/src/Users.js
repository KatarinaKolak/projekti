import React, {useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 7;

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; 
    } else {
        const role= JSON.parse(localStorage.getItem("user")).role;
        if (role !== "admin"){
            window.location.href = '/'; 
        }
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = users.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    
    useEffect(() => {
        async function getUsers(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
            const usersList = await fetch(`http://localhost:3001/user/users`, options);
            
            const usersJson = await usersList.json();
            setUsers(usersJson.users);
            setTotalPages(Math.ceil(users.length / itemsPerPage));
        }

        
        getUsers();
    }, [users, startIndex, endIndex, subset]);

    return (
        <div className="container justify-content-center">
            <div className="row" >
                <div className='col-3'><p class="p-1" style={{color:"#ff66ff"}}><b>NAME </b></p> </div>
                <div className='col-2'><p class="p-1" style={{color:"#ff66ff"}}><b>SURNAME</b></p> </div>
              
                <div className='col-1'><p class="p-1" style={{color:"#ff66ff"}}><b>EDIT</b></p></div>
                <div className='col-1'><p class="p-1" style={{color:"#ff66ff"}}><b>DELETE</b></p>
                </div>
              </div>
              
            {subset ? subset.map((item) => (
            (item.role !== "admin") ? 
                (
                    <div className="row" key={item._id}>
                <div className='col-3'><p class="p-1">{item.name}  </p> </div>
              <div className='col-2'><p class="p-1">{item.surname}  </p> </div>
              <div className='col-1'><p class="p-1">
                <Link to={`/updateUser/${item._id}`} className="text-decoration-none"><button className="crudBtn" text="Edit">
                  
                <AiFillEdit/></button></Link></p></div>
              <div className='col-1'><p class="p-1"><button  className="crudBtn" text="Delete" onClick={()=>{
                    const url=`http://localhost:3001/user/${item._id}`;
                    fetch(url, {method: 'DELETE' }).then(() => {
                      window.location.reload();
                    })

                }}>
                    <AiFillDelete/></button></p></div>  
            </div>
                ):<></>
        )):""}<br/><br/>
        <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                forcePage={currentPage - 1} // Obratite pažnju na ovu liniju za postavljanje trenutne stranice
                containerClassName={'horizontal-pagination'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default Users;