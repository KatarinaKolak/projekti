import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const ProducerDetails = () => {
    const params = useParams();
    const [producer, setProducer] = useState("");

    async function getProducer(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const producerList = await fetch(`http://localhost:5000/api/producers/${params.id}`, options);
        const producerJson = await producerList.json();
        
        setProducer(producerJson);
    }

    useEffect(() => {
        getProducer();
    }, []);

    return (
        <div className='container justify-content-center'>
             <div className="row border rounded rounded">
             
            <div className="col-5 m-5 p-4 ">
                <p><b>Producer: </b>{producer.name}</p><br/>
                <p><b>Year: </b>{producer.year}</p><br/>
                <p><b>Country: </b>{producer.country}</p><br/>
                <p><b>Description: </b>{producer.description}</p><br/><br/>
            </div>
            <div className="col-4 m-4 p-4">
                <img src={producer.logo} width={220} height={240}/><br/><br/><br/>
            </div>
            </div>
        </div>
    )
}

export default ProducerDetails;