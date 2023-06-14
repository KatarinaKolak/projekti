import React, {useState, useEffect, useRef}  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditChocolate = () => {
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
    const params = useParams();
    const [product, setProduct] = useState("");
    const [currP, setCurrP] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");
    const [currT, setCurrT] = useState("");

    async function getProduct(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        
        const productList = await fetch(`http://localhost:5000/api/chocolates/${params.id}`, options);
        const productJson = await productList.json();

        setProduct(productJson);

        const producerList = await fetch(`http://localhost:5000/api/producers`, options);
        const producerJson = await producerList.json();

        setProducers(producerJson.producers);
        console.log("PROD", producerJson.producers)
        const typeList = await fetch(`http://localhost:5000/api/types`, options);
        const typeJson = await typeList.json();

        setTypes(typeJson.types);

        setName(product.name);
        setPrice(product.price);
        setCacao(product.cacao);
        setColor(product.color);
        setImage(product.image);
        setType(product.type);
        setProducer(product.producer_id);
    }

    useEffect(() => {
        getProduct();
        Object.keys(producers).map((item) => {
            if (producers[item]._id === product.producer_id){
                setCurrP(producers[item].name);
            }
        })

        Object.keys(types).map((item) => {
            if (types[item]._id === product.type){
                setCurrT(types[item].name);
            }
        })
    }, []);

    async function addFormData(e)
      {
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
                method: 'PUT',
                headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(json)
            };

            fetch(`http://localhost:5000/api/updateChocolate/${params.id}`,requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    navigate("/");
                } else {
                    console.log("Incorrect data!")
                }
            })
      }
        
  
    return (
        <div className="container">
            <form>
            <label for="name">Name: </label><input type="text" defaultValue = {product.name}  className="form-control" id="productname"  onChange={(e) => setName(e.target.value)} /><br/>
            <label for="name">Price: </label><input type="text" defaultValue = {product.price} className="form-control" id="productprice" onChange={(e) => setPrice(e.target.value)} /><br/>
            <label for="name">Image url: </label><input type="text" defaultValue = {product.image} className="form-control" id="productimage" onChange={(e) => setImage(e.target.value)} /><br></br>
            <label for="name">Cacao: </label><input type="text" defaultValue = {product.cacao} className="form-control" id="productcacao" onChange={(e) => setCacao(e.target.value)} /><br/>
            <label for="name">Color: </label><input type="text" defaultValue = {product.color} className="form-control" id="productcolor"  onChange={(e) => setColor(e.target.value)} /><br />
                
                <label> Type:
                <select className="m-2"  value={type} onChange={(e) => {setType(e.target.value); console.log("T",{type});
                }} >
                <option>{currT}</option>
                { Object.keys(types).map((item) => (
                    <option value={types[item]._id}>{types[item].name}</option>
                ))}
                </select>
                </label><br/><br/>

                <label> Producer:
                    <select className="m-2" value={producer} onChange={(e) => {setProducer(e.target.value); console.log("P",{producer})}}>
                    <option>{currP}</option>
                    { Object.keys(producers).map((item) => (
                        <option value={producers[item]._id}>{producers[item].name}</option>
                    ))}
                   
                    </select>
                    
                </label><br/><br/>
               <div className="text-center"> <button  type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default EditChocolate;