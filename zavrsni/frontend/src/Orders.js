import React, {useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';

const Orders = () => {
    const [orders, setOrders] = useState([]);
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

    async function deleteShipp(id){
        const requestOptions = {
            method: 'DELETE'
          }
  
      fetch(`http://localhost:3001/product/deleteShipp/${id}`,requestOptions)
      .then((res) => res.json())
              .then((data) => {
                  if (data.success){
                    window.location.href = '/';
                  } else {
                      alert("Cannot delete!")
                  }
              })
    }

    function getFloat(value) {
        return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = orders.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    useEffect(() => {
        async function getShipping(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
            
            const shippingList = await fetch(`http://localhost:3001/product/shippings`, options);
            
            const shippingJson = await shippingList.json();
            setOrders(shippingJson.shippings);
            setTotalPages(Math.ceil(orders.length / itemsPerPage));
        }

        getShipping();
    }, [orders, startIndex, endIndex, subset]);

    return (
        <div className="container justify-content-center">
            <div className="row" >
            <div className='col-3'><p class="p-1" style={{color:"#ff66ff"}}><b>ID </b></p> </div>
              <div className='col-2'><p class="p-1" style={{color:"#ff66ff"}}><b>STATUS</b></p> </div>
              <div className='col-1'><p class="p-1" style={{color:"#ff66ff"}}><b>EDIT</b></p></div>
              <div className='col-1'><p class="p-1" style={{color:"#ff66ff"}}><b>DELETE</b></p>
              </div>
              
              </div>
              
            {subset ? subset.map((item) => (
            
                <div className="row" key={item._id}>
                    <div className='col-3'><p class="p-1">{item._id}  </p> </div>
                <div className='col-2'><p class="p-1">{item.status}  </p> </div>
                <div className='col-1'><p class="p-1">
                    <Link to={`/updateShipping/${item._id}`} className="text-decoration-none"><button className="crudBtn" text="Edit">
                    
                    <AiFillEdit/></button></Link></p></div> 
                <div className='col-1'><p class="p-1"><button  className="crudBtn" text="Delete" onClick={()=>{
                        const url=`http://localhost:3001/product/deleteShipp/${item._id}`;
                        fetch(url, {method: 'DELETE' }).then(() => {
                        window.location.reload();
                        })

                    }}>
                        <AiFillDelete/></button></p></div> 
                </div>
          
            )):""}<br/><br/>
            <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                forcePage={currentPage - 1} 
                containerClassName={'horizontal-pagination'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default Orders;