import React, {useState, useEffect, useRef}  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const AddChocolate = () => {
    let navigate = useNavigate();
    const [types, setTypes] = useState([]);
    const [producers, setProducers] = useState([]);
    const [producer, setProducer] = useState("");
    const [type, setType] = useState("");
    const [name, setName] =  useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [color, setColor] = useState("");
    const [cacao, setCacao] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");

    async function getProduct(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const producerList = await fetch(`http://localhost:5000/api/producers`, options);
        const producerJson = await producerList.json();
        console.log(producerJson);
        setProducers(producerJson.producers);

        const typeList = await fetch(`http://localhost:5000/api/types`, options);
        const typeJson = await typeList.json();
        console.log(typeJson);
        setTypes(typeJson.types);
    }

    useEffect(() => {
        getProduct();
    }, []);

    async function addFormData(e){
        e.preventDefault();
        if ((name === "") || (price === "") || (image == "") || (color === "") || (cacao === "") || (type === "") || (producer === "")){
            setIsCorrect(false);
            setMessage("Required input is empty!");
            return;
        }

        if (parseFloat(price) <= 0.0){
            setIsCorrect(false);
            setMessage("Incorrect price value!");
            return;
        }
            const json = {
                "name": name, 
                "price": price,
                "image": image,
                "color": color,
                "cacao": cacao,
                "type": type,
                "producer_id": producer
            }

            const requestOptions = {
                method: 'POST',
                headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(json)
            };


            fetch('http://localhost:5000/api/addChocolate',requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    navigate("/");
                } else {
                    setMessage("Incorrect data!")
                }
            })
      }
        
  
    return (
        <div className="container">
            <form>
                <input type="text" value = {name} className="form-control" id="productname" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} required /><br/>
                <input type="number" step="0.01" value = {price} className="form-control" id="productprice" placeholder="Enter Product Price" onChange={(e) => setPrice(e.target.value)} required /><br/>
                <input type="text" value = {image} className="form-control" id="productimage" placeholder="Enter Product Image Url" onChange={(e) => setImage(e.target.value)} required /><br></br>
                <input type="text" value = {cacao} className="form-control" id="productcacao" placeholder="Enter Cacao Percentige" onChange={(e) => setCacao(e.target.value)} required /><br/>
                <input type="text" value = {color} className="form-control" id="productcolor" placeholder="Enter Product Color" onChange={(e) => setColor(e.target.value)} required /><br />
                
                <label >  Type:  
                
                <select className="m-2" value={type} onChange={(e) => {setType(e.target.value); console.log("T",{type});
                }} required>
                <option>All</option>
                { Object.keys(types).map((item) => (
                    <option value={types[item]._id}>{types[item].name}</option>
                ))}
                </select>
                </label><br/>

                <label> Producer:
                    <select className="m-2" value={producer} onChange={(e) => {setProducer(e.target.value); console.log("P",{producer})}} required>
                    <option>All</option>
                    { Object.keys(producers).map((item) => (
                        <option value={producers[item]._id}>{producers[item].name}</option>
                    ))}
                   
                    </select>
                    
                </label><br/><br/>
                <div className="text-center"><button type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default AddChocolate;