import React, {useState, useEffect}  from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BrandUpdate = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [brand, setBrand] = useState("");
    const [details, setDetails] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");

    async function getBrand(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const brandList = await fetch(`http://localhost:3001/product/brand/${params.id}`, options);
        
        const brandJson = await brandList.json();
        setBrand(brandJson);
        setName(brandJson.name);
        setImage(brandJson.image);
        setAddress(brandJson.address);
        setDetails(brandJson.details);
    }

    useEffect(() => {
        getBrand();
    }, []);

    function checkImage(image){
        if (image !== ""){
            if (image.indexOf("\\") !== -1){
                image = image.split("\\");
                return image[2];
            }
        }
        return image;
    }

    async function addFormData(e)
      {
        e.preventDefault();
    
            const json = {
                "name": name, 
                "image": checkImage(image),
                "address": address,
                "details": details
            }

            const requestOptions = {
                method: 'PUT',
                headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(json)
            };

            fetch(`http://localhost:3001/product/updateBrand/${params.id}`,requestOptions)
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
        <><br /><div className='main'>
              <form>
                <header style={{color:"#ff33ff", fontWeight:"bold", fontSize:35}}>Update brand informations</header>
                <div className='form-data'>
                    <label for="name" style={{color:"#ff33ff", fontWeight:"bold"}}>Name: </label> 
                    <input type="text" defaultValue={brand.name} id="name" onChange={(e) => setName(e.target.value)} /><br />
                </div>
                <div className="form-data">
                    <input type="file" style={{border:"none", color: "#ff4dff"}} defaultValue = {brand.image} className="form-control" id="imageBrand" placeholder="Enter Image" onChange={(e) => setImage(e.target.value)} /><br/>
                </div>
                <div className='form-data'>
                    <label for="username" style={{color:"#ff33ff", fontWeight:"bold"}}>Address: </label>
                    <input type="text" defaultValue={brand.address} id="address" onChange={(e) => setAddress(e.target.value)} /><br />
                </div>
                <div className="form-data">
                    <textarea  rows="4" cols="5" type="text" defaultValue={brand.details} className="form-control" id="details" placeholder="Enter Details" onChange={(e) => setDetails(e.target.value)} /><br/>
                </div>
                  <div className='text-center'><input type="submit" className="updateButton" onClick={addFormData} value="Submit"/></div><br /><br />
                  {!isCorrect ? (<div className="alert alert-danger" role="alert">Error: {message}!</div>) : null}
              </form>
          </div></>
    )
}

export default BrandUpdate;