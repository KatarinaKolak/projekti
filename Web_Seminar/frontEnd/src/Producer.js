import React, {useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Producer = () => {
    let navigate = useNavigate();
    const [producers, setProducers] = useState([]);
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }
    
    async function getProducers(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const producerList = await fetch("http://127.0.0.1:5000/api/producers", options);
        const producerJson = await producerList.json();

        console.log("Producers", producerJson.producers);
        setProducers(producerJson.producers);
    }

    function getCurrent(){
        const myuser = JSON.parse(localStorage.getItem("user"));
        if (myuser){
            setRole(myuser.role);
        }
    }

    useEffect(() => {
        getProducers();
        getCurrent();
    }, []);

    async function deleteProducer(id){
        const requestOptions = {
            method: 'DELETE'
          }
  
      fetch(`http://localhost:5000/api/deleteProducer/${id}`,requestOptions)
      .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    window.location.href = '/producers';
                } else {
                    setIsCorrect(false);
                    setMessage("Cannot delete, category contains products!")
                }
            })
    }
  
    return (
        <div className="container justify-content-center">
            <div className="row">
            { Object.keys(producers).map((item) => (
                <div className="col-4 p-5">
                <p className='text-center text-uppercase text-primary'><b>{producers[item].name}</b></p><br/>
                <div className='text-center'><img src={producers[item].logo} width={150} height={150}/></div><br/><br/>
                {/*<span><b>Year:</b>{producers[item].year}</span><br/>
                <span><b>Country:</b>{producers[item].country}</span><br/>
                <span><b>Description:</b>{producers[item].description}</span><br/><br/>*/}

                { role === "admin" ? (
                    <div className='text-center'>
                    <Link to={`/editProducer/${producers[item]._id}`}>
                    <button className="btn btn-primary btn-sm m-1"><i class="fa fa-edit"></i></button></Link>
                    <button className="btn btn-danger btn-sm m-1" onClick={()=> deleteProducer(producers[item]._id)}><i class="fa fa-trash"></i></button><br/>
                    { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
                    <br/><br/>
                    </div>
                ): (
                    <Link to={`/producerDetails/${producers[item]._id}`}>
                <div className='text-center'><button className="btn btn-light m-1">Details</button></div></Link>
                )}
             </div>

            ))}
            </div>
        </div>
    )
}

export default Producer;