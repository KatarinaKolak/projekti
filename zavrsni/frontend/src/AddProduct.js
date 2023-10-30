import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const AddProduct = () => {
    let navigate = useNavigate();
    const [color, setColor] = useColor();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [usage, setUsage] = useState("");
    const [size, setSize] = useState("");
    const [on_stock, setOn_stock] = useState(false);
    const [discount, setDiscount] = useState("");
    const [details, setDetails] = useState("");
    const [shades, setShades] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState("");
    const [brand, setBrand] = useState("");
    const [brands, setBrands] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] =  useState("");
    
    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; 
    } else {
        const role= JSON.parse(localStorage.getItem("user")).role;
        if (role !== "admin"){
            window.location.href = '/'; 
        }
    }

    async function getData(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const categoryList = await fetch(`http://localhost:3001/product/categories`, options);
        const categoryJson = await categoryList.json();
        console.log(categoryJson);
        setCategories(categoryJson.categories);

        const brandList = await fetch(`http://localhost:3001/product/brands`, options);
        const brandJson = await brandList.json();
        console.log(brandJson);
        setBrands(brandJson.brands);
    }

    useEffect(() => {
        getData();
    }, [shades]);

    function addShade(){
        setShades([...shades, color["hex"]]);
    }

    function addFormData(e){
        e.preventDefault();

        if ((name === "")){
            setIsCorrect(false);
            setMessage("Required input field name is empty!");
            return;
        }

        let formatted = image.split("\\");
        
        fetch("http://localhost:3001/product/addProduct", {
            method: "POST",
            body: JSON.stringify({
                name:name,
                image:formatted[2],
                price:price,
                details:details,
                ingredients:ingredients,
                usage:usage,
                size:size,
                on_stock:on_stock,
                discount:discount,
                brand_id:brand,
                category_id:category
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
                console.log("Success!");
                navigate("/");
        })
        .catch((err)=>console.log(err));
    }

    return (
        <><br /><br /><div className="outer-product">
            <div className="add-product">
                <div className="add-body-product">
                    <header>New product</header><br />
                        <div className="name">
                            <input type="text" value={name} className="form-control" id="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} required /><br />
                        </div>
                        <div className="usage">
                            <input type="text" value={usage} className="form-control" id="usage" placeholder="Enter Usage" onChange={(e) => setUsage(e.target.value)} /><br />
                        </div>
                        <div className="details">
                            <textarea rows="4" cols="50" type="text" value={details} className="form-control" id="details" placeholder="Enter Details" onChange={(e) => setDetails(e.target.value)} /><br />
                        </div>
                        <div className="ingredients">
                            <textarea rows="4" cols="50" type="text" value={ingredients} className="form-control" id="ingredients" placeholder="Enter Ingredients" onChange={(e) => setIngredients(e.target.value)} /><br />
                        </div>
                        <div className="price2">
                            <input type="number" step="0.01" min="0" value={price} className="form-control" id="price" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} /><br />
                        </div>
                        <div className="size">
                            <input type="number" step="0.01" min="0" value={size} className="form-control" id="size" placeholder="Enter Size" onChange={(e) => setSize(e.target.value)} /><br />
                        </div>
                        <div className="discount">
                            <input type="number" min="0" value={discount} className="form-control" id="discount" placeholder="Enter Discount" onChange={(e) => setDiscount(e.target.value)} /><br />
                        </div>
                        <div className="on_stock">
                            <input type="number" min="0" value={on_stock} className="form-control" id="on_stock" placeholder="Enter Stock Number" onChange={(e) => setOn_stock(e.target.value)} /><br />
                        </div>
                        <label style={{ color: "#ff4dff" }}> Category:
                        <div className='custom-select'>
                            <select className="m-2" value={category} onChange={(e) => {setCategory(e.target.value)}} required>
                            <option>All</option>
                            { Object.keys(categories).map((item) => (
                                <option value={categories[item]._id}>{categories[item].type}</option>
                            ))}
                        
                            </select>
                        </div>
                        </label><br/><br/>
                        <label style={{ color: "#ff4dff" }}> Brand:
                        <div className='custom-select'>
                            <select className="m-2" value={brand} onChange={(e) => {setBrand(e.target.value)}} required>
                            <option>All</option>
                            { Object.keys(brands).map((item) => (
                                <option value={brands[item]._id}>{brands[item].name}</option>
                            ))}
                        
                            </select>
                        </div>
                        </label><br/><br/>
                        <div className="image">
                            <label style={{ color: "#ff4dff" }}>Choose image:</label><br />
                            <input accept="image/*" type="file" style={{ border: "none", color: "#ff4dff" }} value={image} className="form-control" id="image" placeholder="Enter Image" onChange={(e) => setImage(e.target.value)} /><br />
                        </div>
                        
                        <div className="add-btn">
                            <input type="submit" value="Save" onClick={(e) => { addFormData(e); } } /><br /><br />
                            {!isCorrect ? (<div class="alert alert-danger" role="alert">Error: {message}!</div>) : null}
                        </div>
                        
                </div>
            </div>
        </div></>
    )
}

export default AddProduct;