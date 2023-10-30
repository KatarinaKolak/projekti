import React, {useState, useEffect}  from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const ProductUpdate = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [details, setDetails] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [usage, setUsage] = useState("");
    const [size, setSize] = useState("");
    const [onStock, setOnStock] = useState("");
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState("");
    const [brand, setBrand] = useState("");
    const [brands, setBrands] = useState("");
    const [product, setProduct] = useState("");
    const [currentShade, setCurrentShade] = useState([]);
    const [color, setColor] = useColor();
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");

    
    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; 
    } else {
        const role= JSON.parse(localStorage.getItem("user")).role;
        if (role !== "admin"){
            window.location.href = '/'; 
        }
    }

    function getFloat(value) {
        return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
    }

    async function getProduct(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const productList = await fetch(`http://localhost:3001/product/product/${params.id}`, options);
        
        const productJson = await productList.json();
        setProduct(productJson);
    
        setName(product.name);
        setImage(productJson.image);
        setPrice(getFloat(productJson.price));
        setDetails(product.details);
        setIngredients(product.ingredients);
        setUsage(product.usage);
        setSize(getFloat(productJson.size));
        setOnStock(product.on_stock);
        setDiscount(product.discount);
        setCategory(product.category_id);
        setBrand(product.brand_id);
        setCurrentShade(productJson.shades);
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

    function checkImage(image){
        if (image !== ""){
            if (image.indexOf("\\") !== -1){
                image = image.split("\\");
                return image[2];
            }
        }
        return image;
    }

    function addShade(){
        setCurrentShade([...currentShade, color["hex"]]);
    }

    function addFormData(e){
        e.preventDefault();

        const json = {
            "name":name,
            "image":checkImage(image),
            "price":price,
            "details":details,
            "ingredients":ingredients,
            "usage":usage,
            "size":size,
            "on_stock":onStock,
            "discount":discount,
            "brand_id":brand,
            "category_id":category
        }

        const requestOptions = {
            method: 'PUT',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        fetch(`http://localhost:3001/product/updateProduct/${params.id}`,requestOptions)
        .then((res) => res.json())
        .then((data) => {
            if (data.success){
                navigate("/");
            } else {
                console.log("Incorrect data!")
            }
        })
      }

    useEffect(() => {
        getProduct();
        getData();
    }, []);

    
      return (
        <><br /><br />
        <div className="outer-product">
            <div className="add-product">
                <div className="add-body-product">
                        <header>Update product</header><br />
                        <div className='form-data'>
                            <label for="name" style={{color:"#ff33ff", fontWeight:"bold"}}>Name: </label> 
                            <input type="text" defaultValue={product.name} id="name" onChange={(e) => setName(e.target.value)} /><br />
                        </div>
                        <div className='form-data'>
                            <label for="usage" style={{color:"#ff33ff", fontWeight:"bold"}}>Usage: </label> 
                            <input type="text" defaultValue={product.usage} id="name" onChange={(e) => setUsage(e.target.value)} /><br />
                        </div>
                        <div className='form-data'>
                            <label for="details" style={{color:"#ff33ff", fontWeight:"bold"}}>Details: </label> 
                            <textarea rows="4" cols="30" type="text" defaultValue={product.details} id="name" onChange={(e) => setDetails(e.target.value)} /><br />
                        </div>
                        <div className='form-data'>
                            <label for="ingredients" style={{color:"#ff33ff", fontWeight:"bold"}}>Ingredients: </label> 
                            <textarea rows="4" cols="30" type="text" defaultValue={product.ingredients} id="name" onChange={(e) => setIngredients(e.target.value)} /><br />
                        </div>
                        <div className='form-data'>
                            <label for="price" style={{color:"#ff33ff", fontWeight:"bold"}}>Price: </label> 
                            <input type="number" step="0.01" defaultValue={price} id="name" onChange={(e) => setPrice(e.target.value)} /><br />
                        </div>
                        <div className='form-data'>
                            <label for="size" style={{color:"#ff33ff", fontWeight:"bold"}}>Size: </label> 
                            <input type="number" step="0.01" defaultValue={size} id="name" onChange={(e) => setSize(e.target.value)} /><br />
                        </div>
                        <div className='form-data'>
                            <label for="discount" style={{color:"#ff33ff", fontWeight:"bold"}}>Discount: </label> 
                            <input type="number" step="0.01" defaultValue={product.discount} id="name" onChange={(e) => setDiscount(e.target.value)} /><br />
                        </div>
                        <div className='form-data'>
                            <label for="onStock" style={{color:"#ff33ff", fontWeight:"bold"}}>On stock: </label> 
                            <input type="number" step="0.01" defaultValue={product.on_stock} id="name" onChange={(e) => setOnStock(e.target.value)} /><br />
                        </div>
                        <div className="form-data">
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
                        </div>
                        <div className="form-data">
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
                        </div>
                        <div className="form-data">
                            <label style={{ color: "#ff4dff" }}>Choose image:</label><br />
                            <input accept="image/*" type="file" style={{ border: "none", color: "#ff4dff" }}  className="form-control" id="image" placeholder="Enter Image" onChange={(e) => setImage(e.target.value)} /><br />
                        </div>
                        
                        <div className='text-center'><input type="submit" className="updateButton" onClick={(e)=>{addFormData(e)}} value="Submit"/></div><br /><br />
                        {!isCorrect ? (<div className="alert alert-danger" role="alert">Error: {message}!</div>) : null}

                </div>
            </div>
        </div></>
      )
}

export default ProductUpdate;