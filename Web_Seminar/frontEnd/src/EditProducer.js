import Reacr, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const EditProducer = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");
    const [producer, setProducer] = useState("");

    async function getProduct(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const producerList = await fetch(`http://localhost:5000/api/producers/${params.id}`, options);
        const producerJson = await producerList.json();
        setProducer(producerJson);
    
        setName(producer.name);
        setYear(producer.year);
        setCountry(producer.country);
        setDescription(producer.description);
        setLogo(producer.logo);
    }

    useEffect(() => {
        getProduct();
    }, []);

    async function addFormData(e){
        e.preventDefault();
        if ((name === "") || (year === "") || (country == "") || (description === "") || (logo === "")){
            setIsCorrect(false);
            setMessage("Required input is empty!");
            return;
        }

        if (parseInt(year) < 0){
            setIsCorrect(false);
            setMessage("Enter correct year!");
            return;
        }

        const json = {
            "name": name,
            "year": year,
            "country": country,
            "description": description,
            "logo": logo
        }
        const requestOptions = {
            method: 'PUT',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        fetch(`http://localhost:5000/api/editProducer/${params.id}`,requestOptions)
        .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    navigate("/producers");
                } else {
                    console.log("Incorrect data!");
                }
            })
    }
    return (
        <div className='container'>
            <form>
               <label for="name">Name: </label> <input type="text" defaultValue = {producer.name} className="form-control" id="name" onChange={(e) => setName(e.target.value)} /><br/>
               <label for="name">Year: </label><input type="text" defaultValue = {producer.year} className="form-control" id="year" onChange={(e) => setYear(e.target.value)} /><br/>  
               <label for="name">Country: </label><input type="text" defaultValue = {producer.country} className="form-control" id="country"  onChange={(e) => setCountry(e.target.value)} /><br/>        
               <label for="name">Description: </label><textarea type="text" defaultValue = {producer.description} className="form-control" id="description"  onChange={(e) => setDescription(e.target.value)} /><br/>
               <label for="name">Logo: </label><input type="text" defaultValue = {producer.logo} className="form-control" id="logo"  onChange={(e) => setLogo(e.target.value)} /><br/>

                <div className='text-center'><button type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default EditProducer;