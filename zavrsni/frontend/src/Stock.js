import React, {useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Stock = () => {
    let navigate = useNavigate();
    const [shippings, setShippings] = useState([]);
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [shippingPerMonth, setShippingPerMonth] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [soldProducts, setSoldProducts] = useState([]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; 
    } else {
        const role= JSON.parse(localStorage.getItem("user")).role;
        if (role !== "admin"){
            window.location.href = '/'; 
        }
    }
    
    function sortFun(filterArray){
        const productCounts = {};
        filterArray.forEach(sale => {
              const productName = sale.name;
              productCounts[productName] = (productCounts[productName] || 0) + 1;
            });
  
            const sortedProducts = Object.entries(productCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([product, count]) => ({ product, count }));
        return sortedProducts;
    }

    function addFormData(product, quantities){
        const json = {
            "name":product.name,
            "image":product.image,
            "price":product.price,
            "details":product.details,
            "ingredients":product.ingredients,
            "usage":product.usage,
            "size":product.size,
            "on_stock": product.on_stock + quantities,
            "discount":product.discount,
            "brand_id":product.brand_id,
            "category_id":product.category_id
        }

        const requestOptions = {
            method: 'PUT',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        fetch(`http://localhost:3001/product/updateProduct/${product._id}`,requestOptions)
        .then((res) => res.json())
        .then((data) => {
            if (data.success){
                navigate("/stock");
            } else {
                console.log("Incorrect data!")
            }
        })
      }

    useEffect(() => {
        async function getProducts (){
            const productList = await fetch("http://127.0.0.1:3001/product/products");
            const productJson = await productList.json();
            
            setProducts(productJson.products);
        }

        async function getShippings(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
            const shippingList = await fetch(`http://localhost:3001/product/shippings`, options);
            
            const shippingJson = await shippingList.json();
            setShippings(shippingJson.shippings);

            setShippingPerMonth(shippings.filter(sale => {
                const saleDate = new Date(sale.date);
                return saleDate.getMonth() === currentMonth + 1 && saleDate.getFullYear() === currentYear - 1;  // mjesec isti godina prosla
            })); 
            
            var array = [];
              
            shippingPerMonth.map((item) => {
                item.items.map((it) => {
                    products.map((prod) => {
                        if (prod._id === it){
                            array.push(prod);
                        }
                    })
                })
            })

            setFilterProducts(array);
  
            setSoldProducts(sortFun(filterProducts));
        }
       
        getProducts();
        getShippings();
    }, [shippings, shippingPerMonth]);

    return (
       <div className='container justify-content-center'><br/>
         <h2 className="lackTitle"><b>The lack of products on stock</b></h2><br/>
        <div className="row" >
                <div className='col-3'><p class="p-1" ><b>LACK </b></p> </div>
                <div className='col-3'><p class="p-1" ><b>ID</b></p> </div>
              
                <div className='col-2'><p class="p-1"><b>NAME</b></p></div>
                <div className='col-2'><p class="p-1" ><b>MESSAGE</b></p>
                </div>
              </div>
            <div className="row" style={{lineHeight:"50px"}}>
               
                {soldProducts.map(({product, count}) => {
                    return Object.keys(products).map((p) =>{
                        if ((product === products[p].name) && (products[p].on_stock <= (count )) && ((count - products[p].on_stock) >= 1)){
                            return (
                                <div className="row" >
                                <div className='col-3'><p class="p-1">{count - products[p].on_stock }</p> </div>
                                <div className='col-3'><p class="p-1">{products[p]._id}</p> </div>
                                <div className='col-2'><p class="p-1">{products[p].name}</p></div>
                                <div className='col-2'><p class="p-1">Order</p></div>  
                                <div className='col-1'><p class="p-1"><button  onClick={()=>{addFormData(products[p], count - products[p].on_stock)}}  className="orderBtn">Order</button></p></div>  
                           
                            </div>)
                        }
                    })
                })}
            </div>
       </div>
      );
};

export default Stock;
