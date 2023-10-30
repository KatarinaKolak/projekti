import React, {useState, useEffect}  from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
    let navigate = useNavigate();
    const params = useParams();
    const userID = localStorage.getItem("_id");
    const role=JSON.parse(localStorage.getItem("user")).role;
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [password, setPassword] = useState("");
    const [purchasesNum, setPurchasesNum] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [user, setUser] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");

    async function getUser(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const userList = await fetch(`http://localhost:3001/user/user/${params.id}`, options);
        
        const userJson = await userList.json();
        console.log("USER", userJson);
        setUser(userJson);
        setUserRole(user.role);
        setName(user.name);
        setSurname(user.surname);
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
        setDiscount(user.discount);
        setPurchasesNum(user.purchasesNum);
    }

    useEffect(() => {
        getUser();
        
    }, []);

    async function addFormData(e){
        e.preventDefault();

            const json = {
                "name": name, 
                "surname": surname,
                "username": username,
                "email": email,
                "password": password,
                "role": userRole,
                "purchasesNum": purchasesNum,
                "discount": discount
            }

            const requestOptions = {
                method: 'PUT',
                headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(json)
            };

            fetch(`http://localhost:3001/user/updateUser/${params.id}`,requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    //localStorage.removeItem("token");
                    //localStorage.removeItem("id");
                    if (JSON.parse(localStorage.getItem("role") === "user")){
                        localStorage.removeItem("token");
                        localStorage.removeItem("id");
                    }
                    navigate("/");
                } else {
                    console.log("Incorrect data!")
                }
            })
      }
        
  
      return (
        <><br /><div className='main'>
              <form>
                <header style={{color:"#ff33ff", fontWeight:"bold", fontSize:35}}>Update your profile</header>
                <div className='form-data'>
                    <label for="name" style={{color:"#ff33ff", fontWeight:"bold"}}>Name: </label> 
                    <input type="text" defaultValue={user.name} id="name" onChange={(e) => setName(e.target.value)} /><br />
                </div>
                <div className='form-data'>
                    <label for="surname" style={{color:"#ff33ff", fontWeight:"bold"}}>Surname: </label>
                    <input type="text" defaultValue={user.surname} id="surname" onChange={(e) => setSurname(e.target.value)} /><br />
                </div>
                <div className='form-data'>
                    <label for="username" style={{color:"#ff33ff", fontWeight:"bold"}}>Username: </label>
                    <input type="text" defaultValue={user.username} id="username" onChange={(e) => setUsername(e.target.value)} /><br />
                </div>
                <div className='form-data'>
                  <label for="email" style={{color:"#ff33ff", fontWeight:"bold"}}>Email: </label>
                  <input type="text" defaultValue={user.email} id="email" onChange={(e) => setEmail(e.target.value)} /><br />
                </div>
                {role === "admin" ? (
                    <>
                        <div className='form-data'>
                            <label for="purchasesNum" style={{color:"#ff33ff", fontWeight:"bold"}}>PurchasesNum: </label>
                            <input type="number" defaultValue={user.purchasesNum} id="purchasesNum" onChange={(e) => setPurchasesNum(e.target.value)} /><br />
                        </div>
                        <div className='form-data'>
                            <label for="discount" style={{color:"#ff33ff", fontWeight:"bold"}}>Discount: </label>
                            <input type="number" defaultValue={user.discount} id="discont" onChange={(e) => setDiscount(e.target.value)} /><br />
                        </div>
                    </>
                ) : (<span></span>)

                }
                
                <div className='form-data'>
                  <label for="password" style={{color:"#ff33ff", fontWeight:"bold"}}>Password: </label>
                  <input type="password" id="password" placeholder="Type new password" onChange={(e) => setPassword(e.target.value)} /><br />
                </div>
                  <div className='text-center'><input type="submit" className="updateButton" onClick={addFormData} value="Submit"/></div><br /><br />
                  {!isCorrect ? (<div className="alert alert-danger" role="alert">Error: {message}!</div>) : null}

              </form>
          </div></>
    )
}

export default UpdateUser;