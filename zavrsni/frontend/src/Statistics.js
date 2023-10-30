import React, {useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import { Line } from 'react-chartjs-2';

const Statistic = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )
    let navigate = useNavigate();
    const [shippings, setShippings] = useState([]);
    const [shippingsPerWeek, setShippingsPerWeek] = useState([]);
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [filterProducts2, setFilterProducts2] = useState([]);
    const [mostSoldProducts, setMostSoldProducts] = useState([]);
    const [mostSoldProductsInDay, setMostSoldProductsInDay] = useState([]);
    const [shippingsPerDay, setShippingPerDay] = useState([]); 
    const [firstParam, setFirstParam] = useState(0);
    const [secondParam, setSecondParam] = useState(0);
    const [firstProfitParam, setFirstProfitParam] = useState(0);
    const [secondProfitParam, setSecondProfitParam] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    const [year, setYear] = useState(0);
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [monthArray, setMonthArray] = useState([]);
    const [trimester, setTrimester] = useState([]);
    const [totalPerYear, setTotalPerYear] = useState([]);
    const [users, setUsers] = useState([]);
    const [showProd, setShowProd] = useState(true);
    const [showProfit, setShowProfit] = useState(false);
    const [showCustomer, setShowCustomer] = useState(false);
    const [graphData, setGraphData] = useState({});
    const [globalOptions, setGlobalOptions] = useState({});
    const [graphData2, setGraphData2] = useState({});
    const [globalOptions2, setGlobalOptions2] = useState({});
    const [usersPerMonth, setUsersPerMonth] = useState([]);
    const [topMonthUsers, setTopMonthUsers] = useState([]);

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; 
    } else {
        const role= JSON.parse(localStorage.getItem("user")).role;
        if (role !== "admin"){
            window.location.href = '/'; 
        }
    }
    
    function sortFun(filterArray){  //silazno sortira proizvode
        const productCounts = {};
        filterArray.forEach(sale => {
              const productName = sale.name;
              productCounts[productName] = (productCounts[productName] || 0) + 1;
            });
  
            const sortedProducts = Object.entries(productCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([product, count]) => ({ product, count }));
        return sortedProducts.slice(0, 10);
    }

    function sortUserFun(usersArray){
        const soldCount = {};
        usersArray.forEach(sale => {
              const username = sale.name;
              soldCount[username] = (soldCount[username] || 0) + 1;  // po broju prodaja
            });
  
            const sortedProducts = Object.entries(soldCount)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([customer, count]) => ({ customer, count }));
        return sortedProducts.slice(0, 10); // top 10 usera
    }

    async function addFormData(user, discont){
            const json = {
                "name": user.name, 
                "surname": user.surname,
                "username": user.username,
                "email": user.email,
                "password": user.password,
                "role": user.userRole,
                "purchasesNum": user.purchasesNum,
                "discount": user.discount + discont
            }

            const requestOptions = {
                method: 'PUT',
                headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(json)
            };

            fetch(`http://localhost:3001/user/updateUser/${user._id}`,requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    //localStorage.removeItem("token");
                    //localStorage.removeItem("id");
                    if (JSON.parse(localStorage.getItem("role") === "user")){
                        localStorage.removeItem("token");
                        localStorage.removeItem("id");
                    }
                    navigate("/statistic");
                } else {
                    console.log("Incorrect data!")
                }
            })
      }

    function getTopUsers(){
        setUsersPerMonth(shippings.filter(sale => {
            const saleDate = new Date(sale.date);
            const currDate = new Date();  // vrati mjesec u rasponu 0 - 11
            //currMonth = currDate.getMonth() + 1
            if (saleDate.getMonth() === currDate.getMonth() && (saleDate.getFullYear() === currDate.getFullYear())){ // prosli mjesec
                return saleDate;
            } else if (saleDate.getMonth() === currDate.getMonth() && (saleDate.getFullYear() === currDate.getFullYear() - 1) && saleDate.getFullYear() === 12){ // prosli mjesec
                return saleDate;
            }
        }))

        var array = [];
        usersPerMonth.map((item) => {
            users.map((u) => {
                if (u._id === item.user_id){
                    array.push(u);
                }
            })
        })

        setTopMonthUsers(sortUserFun(array));
    }

    useEffect(() => {
        async function getProducts (){
            const productList = await fetch("http://127.0.0.1:3001/product/products");
            const productJson = await productList.json();
            
            setProducts(productJson.products);
        }

        async function getUsers(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
            const usersList = await fetch(`http://localhost:3001/user/users`, options);
            
            const usersJson = await usersList.json();
            setUsers(usersJson.users);
        }

        async function getShippings(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
            const shippingList = await fetch(`http://localhost:3001/product/shippings`, options);
            
            const shippingJson = await shippingList.json();
            setShippings(shippingJson.shippings);

            let sum = 0;
            const min1 = new Date(firstProfitParam);
            const max1 = new Date(secondProfitParam);

            shippings.map((item, index) => {
                const curr = new Date(item.date)
                if (secondProfitParam !== 0 && firstProfitParam !== 0){
                    if (curr >= min1 && curr <= max1){
                        sum += item.total_price;
                    }
                } else if (secondProfitParam === 0 && firstProfitParam !== 0){
                    if (curr >= min1){
                        sum += item.total_price;
                    }
                } else if (secondProfitParam !== 0 && firstProfitParam === 0){
                    if (curr <= max1){
                        sum += item.total_price;
                    }
                } else {
                    sum += item.total_price;
                    
                }
                
            })

           // statistika godine 
           let mArray = [], tArray = [], totalSum = 0, totalMonth = 0, totalTrim = 0, trimCounter = 0;
           const myYear = year > 0 ? Number(year) : Number(currYear);
           for (let i = 0; i < 12; i++){
                if (trimCounter % 3 === 0 && i > 1){
                    tArray.push(totalTrim.toFixed(2));
                    totalTrim = 0;
                }

                shippings.map((item, index) => {
                    let itemDate = new Date(item.date)
                    if (itemDate.getMonth() === i && itemDate.getFullYear() === myYear){  
                        totalMonth += item.total_price;
                        totalSum += item.total_price;  // godisnja zarada
                        totalTrim += item.total_price
                    }
                });

                trimCounter ++;
                mArray.push(totalMonth.toFixed(2));  // mjesecna zarada
                totalMonth = 0;
           }

           tArray.push(totalTrim.toFixed(2));

           setMonthArray(mArray);
           setTrimester(tArray);
           setTotalPerYear(totalSum.toFixed(2));

           setTotalProfit(sum.toFixed(2));

           const data = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            datasets: [{
                label: 'Earnings',
                data: monthArray,
                backgroundColor: '#ff66ff',
                borderColor: '#ff66ff',
                borderWidth: 1,
              },
            ],
          };

          const data2 = {
            labels: [1, 2, 3, 4],
            datasets: [{
                label: 'Trimester',
                data: trimester,
                backgroundColor: '#ff66ff',
                borderColor: '#ff66ff',
                borderWidth: 1,
              },
            ],
          };

           const options1 = {
            scales: {
              x: [{
                  type: 'category', 
                  labels: ['Earnings', 'Month'], 
                },
              ],
            },
          };

          const options2 = {
            scales: {
              x: [{
                  type: 'category', 
                  labels: ['Earnings', 'Trimester'], 
                },
              ],
            },
          };

          setGlobalOptions(options1);
          setGlobalOptions2(options2);
          
          setGraphData(data);
          setGraphData2(data2);
           

        setShippingsPerWeek(shippings.filter(sale => {
                const saleDate = new Date(sale.date);
                const min = new Date(firstParam);
                const max = new Date(secondParam);
                const currDate = new Date();
                if (firstParam != 0 && secondParam != 0){
                    if (min > currDate || max > currDate){
                        return;
                    } 

                    if (saleDate.getFullYear() >= min.getFullYear() && saleDate.getFullYear() <= max.getFullYear()){
                        if (saleDate.getMonth() === min.getMonth() && saleDate.getMonth() === max.getMonth()){
                            return min.getDate() <= saleDate.getDate() && saleDate.getDate() <= max.getDate();
                        } else if ((saleDate.getMonth() >= min.getMonth()) && (saleDate.getMonth() <= max.getMonth())){
                            return saleDate;
                        } else {
                            return;
                        }
                    }
                }
                   else if (firstParam != 0){
                    if (min > currDate){
                        return;
                    }
                    
                    if (saleDate.getFullYear() >= min.getFullYear()){
                        if (saleDate.getMonth() === min.getMonth()){
                            return min.getDate() <= saleDate.getDate();
                        } else if (saleDate.getMonth() > min.getMonth()){
                            return saleDate;
                        } else{
                            return ;
                        }
                    } else {
                        return;
                    }
                }
                    
                else if (secondParam != 0){
                    if (max > currDate){
                        return;
                    }
                    if (saleDate.getFullYear() <= max.getFullYear()){
                        if (saleDate.getMonth() === max.getMonth()){
                            return saleDate.getDate() <= max.getDate();
                        } else if (saleDate.getMonth() < max.getMonth()){
                            return saleDate;
                        } else{
                            return;
                        }
                    } else {
                        return;
                    }
                } else {
                    return saleDate;
                }
                   // return saleDate.getDay() >= min.getDay() && saleDate.getMonth() >= min.getMonth() && saleDate.getFullYear() >= min.getFullYear()
                //return saleDate;
                }));

            setShippingPerDay(shippings.filter(sale => {
                const saleDate = new Date(sale.date);
                const oneDayAgo = new Date();
                oneDayAgo.setDate(oneDayAgo.getDate() - 1);
                return saleDate >= oneDayAgo;
              })); 
            
            var array = [];
            var array2 = [];
              
            shippingsPerWeek.map((item) => {
                item.items.map((it) => {
                    products.map((prod) => {
                        if (prod._id === it){
                            array.push(prod);
                        }
                    })
                })
            })

            setFilterProducts(array);

            shippingsPerDay.map((item) => {
                item.items.map((it) => {
                    products.map((prod) => {
                        if (prod._id === it){
                            array2.push(prod);
                        }
                    })
                })
            })

            setFilterProducts2(array2);
  
          setMostSoldProducts(sortFun(filterProducts));
          setMostSoldProductsInDay(sortFun(filterProducts2));
        }
       
        getProducts();
        getShippings();
        getUsers();
        getTopUsers();
    }, [shippings, firstParam, secondParam, firstProfitParam, secondProfitParam, monthArray, year]);

    return (
        <>
        <br/>
            <button className="navBut" onClick={() => showProd === false ? setShowProd(true) : setShowProd(false)}>Popular products</button>
            <button className="navBut" onClick={() => showProfit === false ? setShowProfit(true) : setShowProfit(false)}>Earnings </button>
            <button className="navBut" onClick={() => showCustomer === false ? setShowCustomer(true) : setShowCustomer(false)}>Customers </button>
            {
                showProd === true ? <>
                    <div>
                        <input type="date" id="first" onChange={(e) => setFirstParam(e.target.value)} className="filterMin" />
                        <input type="date" id="second" onChange={(e) => setSecondParam(e.target.value)} className="filterMax"/>
                    </div>
                    {firstParam !== 0 && secondParam !== 0 ? 
                    <><h5 className="statsTitle" >  Sold Products from {firstParam} to {secondParam} </h5><br /></> 
                    : firstParam != 0 && secondParam === 0 ? 
                    <><h5 className="statsTitle" >  Sold Products from {firstParam} to today </h5><br /></>
                    : secondParam !== 0 && firstParam === 0 ? 
                        <><h5 className="statsTitle" >  Sold Products to {secondParam}</h5><br /></>
                    : <><h5 className="statsTitle" >  Sold Products</h5><br /></>
                    }
            
                    <div id="statsDiv" className="container justify-content-center">
                        <div className="row">
                            <div className='col-5'><p class="p-1"><b>PRODUCT NAME </b></p> </div>
                        <div className='col-3'><p class="p-1"><b>SALES</b></p> </div>
                    </div>

                    {mostSoldProducts.map(({ product, count }) => (
                        <div className="row" key={product}>
                            <div className='col-5'><p class="p-1">{product}  </p> </div>
                            <div className='col-3'><p class="p-1">{count}  </p> </div>
                        </div>
                    ))}
            </div>
                </> : <></>
            }

            {
                showProfit === true ? <>
                    <div>
                        <input type="date" id="first" onChange={(e) => setFirstProfitParam(e.target.value)} className="filterMin" />
                        <input type="date" id="second" onChange={(e) => setSecondProfitParam(e.target.value)} className="filterMax"/>
                        <input type="text" id="third" placeholder="Year" onChange={(e) => setYear(e.target.value)} className="filterYear"/>
                    </div>
                   
                    {firstProfitParam !== 0 && secondProfitParam !== 0 ? 
                        <><h5 className="statsTitle" >  Total earnings from {firstProfitParam} to {secondProfitParam} - {totalProfit}€</h5><br /></> 
                        : firstProfitParam !== 0 && secondParam === 0 ? 
                        <><h5 className="statsTitle">  Total earnings from {firstProfitParam} to today - {totalProfit}€ </h5><br /></>
                        : secondProfitParam !== 0 && firstParam === 0 ? 
                        <><h5 className="statsTitle">  Total earnings to {secondProfitParam} - {totalProfit}€</h5><br /></>
                        : <></>
                    } 

                    <h5 className="statsTitle" >  Total earnings in {year !== 0 ? year : currYear}. - {totalPerYear}€</h5><br />
                    <div>
                    <table id="mthTable" className="monthTable">
                            
                            <tr className="tableTitle">
                                <td className="titleM">Month</td>
                                <td className="titleM">Earnings</td>
                            </tr>
                            
                            
                            {monthArray.length > 0 ? monthArray.map((item, index) => {
                                
                                    return(<tr><td>{index + 1}.</td><td>{item}€</td></tr>)
                                
                            }) : <></>}
                        </table>
                        <div style={{ width: '500px', height: '400px' }} className="graph-container">
                            <Line data={graphData} options={globalOptions} />
                        </div>
                        <table id = "trimesterTable" className="monthTable">
                            <tr className="tableTitle">
                                <td className="titleM">Trimester</td>
                                <td className="titleM">Earnings</td>
                            </tr>
                            
                            
                            {trimester.length > 0 ? trimester.map((item, index) => {
                                
                                    return(<tr><td>{index + 1}.</td><td>{item}€</td></tr>)
                                
                            }) : <></>}
                        </table>

                        
                        <div style={{ width: '400px', height: '300px' }} className="graph-container2">
                            <Line data={graphData2} options={globalOptions2} />
                        </div>
                        
                    </div>
                    </>
                    :<></>
            }

            {showCustomer === true ? 
                <><br/><br/>
                    <div className='container justify-content-center'>
                <div className="row" >
                <div className='col-3'><p class="p-1" style={{color:"#ff66ff"}}><b>ID </b></p> </div>
                <div className='col-1'><p class="p-1" style={{color:"#ff66ff"}}><b>USER</b></p> </div>
              
                <div className='col-2'><p class="p-1" style={{color:"#ff66ff"}}><b>PURCHASES</b></p></div>
                <div className='col-1'><p class="p-1" style={{color:"#ff66ff"}}><b>DISCOUNT</b></p>
                </div>
                <div className='col-2'><p class="p-1" style={{color:"#ff66ff"}}><b>TOTAL DISCOUNT</b></p></div>
              </div><br/>
            <div className="row" style={{lineHeight:"50px"}}>
               
                {topMonthUsers.map(({customer, count}) => {
                    return Object.keys(users).map((u) =>{
                        if (customer === users[u].name){
                            return (
                                <div className="row" >
                                    <div className='col-3'><p class="p-1">{users[u]._id }</p> </div>
                                <div className='col-1'><p class="p-1">{users[u].name}</p> </div>
                                <div className='col-2'><p class="p-1">{count}</p></div>
                                <div className='col-1'><p class="p-1">{count * 10}%</p></div>  
                                <div className='col-2'><p class="p-1">{users[u].discount}%</p></div>
                                <div className='col-1'><p class="p-1"><button  onClick={()=>{addFormData(users[u], count * 10)}}  className="orderBtn">ADD</button></p></div>  
                           
                                    </div>)
                                    }
                                        })
                                    })}
                                </div>
                        </div>
                </> : <></>}
        </>
      );
};

export default Statistic;
