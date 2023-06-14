import Reacr, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const AddProducer = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] =  useState("");

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
            method: 'POST',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        fetch('http://localhost:5000/api/addProducer',requestOptions)
        .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    navigate("/producers");
                } else {
                    setMessage("Incorrect data!")
                }
            })
    }
    return (
        <div className='container'>
            <form>
                <input type="text" value = {name} className="form-control" id="name" placeholder="Enter Producer Name" onChange={(e) => setName(e.target.value)} required /><br/>
                <input type="number" value = {year} className="form-control" id="year" placeholder="Enter Producer Year" onChange={(e) => setYear(e.target.value)} required /><br/>  
                <input type="text" value = {country} className="form-control" id="country" placeholder="Enter Producer Country" onChange={(e) => setCountry(e.target.value)} required /><br/>        
                <textarea type="text" value = {description} className="form-control" id="description" placeholder="Enter Producer Description" onChange={(e) => setDescription(e.target.value)} required /><br/>
                <input type="text" value = {logo} className="form-control" id="logo" placeholder="Enter Producer Logo Url" onChange={(e) => setLogo(e.target.value)} required /><br/>

                <div className="text-center"><button type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default AddProducer;