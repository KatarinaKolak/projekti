import React, {useState, useEffect}  from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CategoryUpdate = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");

    async function getCategory(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const categoryList = await fetch(`http://localhost:3001/product/category/${params.id}`, options);
        
        const categoryJson = await categoryList.json();
        setCategory(categoryJson);
        setType(category.type);
    }

    useEffect(() => {
        getCategory();
    }, []);

    async function addFormData(e){
        e.preventDefault();
        const json = {
            "type": type
        }

        const requestOptions = {
            method: 'PUT',
            headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(json)
        };

        fetch(`http://localhost:3001/product/updateCategory/${params.id}`,requestOptions)
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
                <header style={{color:"#ff33ff", fontWeight:"bold", fontSize:35}}>Update category informations</header>
                <div className='form-data'>
                    <label for="name" style={{color:"#ff33ff", fontWeight:"bold"}}>Type: </label> 
                    <input type="text" defaultValue={category.type} id="type" onChange={(e) => setType(e.target.value)} /><br />
                </div>
                <div className='text-center'><input type="submit" className="updateButton" onClick={addFormData} value="Submit"/></div><br /><br />
                
                {!isCorrect ? (<div className="alert alert-danger" role="alert">Error: {message}!</div>) : null}
              </form>
          </div></>
    )
}

export default CategoryUpdate;