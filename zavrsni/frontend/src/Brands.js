import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const Brand = () => {
    const [brands, setBrands] = useState([]);

    async function deleteBrand(brandId){
        const requestOptions = {
            method: 'DELETE'
          }
  
      fetch(`http://localhost:3001/product/deleteBrand/${brandId}`,requestOptions)
      .then((res) => res.json())
              .then((data) => {
                  if (data.success){
                    window.location.href = '/';
                  } else {
                      alert("Cannot delete brand!")
                  }
              })
    }

    useEffect(() => {
        async function getBrands(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
    
            const brandsList = await fetch("http://127.0.0.1:3001/product/brands", options);
            const brandsJson = await brandsList.json();
    
            setBrands(brandsJson.brands);
        }    

        getBrands();
      }, []);


    return(
        <div className='container justify-content-center'>
                
            { Object.keys(brands).map((item) => {
                return (
                    <div className="row">
                        <div className='col-3'><p class="p-1">{brands[item].name}</p> </div>
                        <div className='col-2'><p class="p-1">
                                <Link to={`/brandUpdate/${brands[item]._id}`}>
                                    <button className="crudBtn2" style={{color:"#03563d"}} text="Edit">
                                <AiFillEdit/></button></Link>
                              </p> </div>
                        <div className='col-1'><p class="p-1">
                        <button className="crudBtn2" style={{color:"#fc4c4c"}} onClick={() => deleteBrand(brands[item]._id)}><AiFillDelete/></button>
                        </p></div><br/>
                    </div>
                )
            })}
        </div>
    )
}

export default Brand;