import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const Category = () => {
    const [categories, setCategories] = useState([]);
   
    async function deleteCategory(categoryId){
        const requestOptions = {
            method: 'DELETE'
        }
  
        fetch(`http://localhost:3001/product/deleteCategory/${categoryId}`,requestOptions)
        .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    window.location.href = '/';
                } else {
                    alert("Cannot delete category!")
                }
        })
    }

    useEffect(() => {
        async function getCategories(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
    
            const categoriesList = await fetch("http://127.0.0.1:3001/product/categories", options);
            const categoriesJson = await categoriesList.json();
    
            setCategories(categoriesJson.categories);
        }    
        getCategories();
      }, []);

    return(
        <div className='container justify-content-center'>
            { Object.keys(categories).map((item) => {
                return (
                    <div className="row">
                        <div className='col-3'><p class="p-1">{categories[item].type}</p> </div>
                        <div className='col-2'><p class="p-1">
                                <Link to={`/categoryUpdate/${categories[item]._id}`}>
                                    <button className="crudBtn2" style={{color:"#03563d"}} text="Edit">
                                <AiFillEdit/></button></Link>
                              </p> </div>
                        <div className='col-1'><p class="p-1">
                        <button className="crudBtn2" style={{color:"#fc4c4c"}} onClick={() => deleteCategory(categories[item]._id)}><AiFillDelete/></button>
                        </p></div><br/>
                    </div>
                )
            })}
        </div>
    )
}

export default Category;