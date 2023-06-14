import React, {useContext, useState, useEffect} from 'react';
import Chocolate from './Chocolate';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './CartContext';
import FavContext from './FavContext';

const Home = () => {
    const [chocolates, setChocolates] = useState([]);
    const [types, setTypes] = useState([]);
    const [producers, setProducers] = useState([]);
    const [choco, setChoco] = useState([]);
    const [cart, setCart] = useContext(Context);
    const [favs, setFavs] = useContext(FavContext);

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }

    async function getChocolates(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const chocolateList = await fetch("http://127.0.0.1:5000/api/chocolate", options);

        const chocolateJson = await chocolateList.json();

        //console.log("Chocolates", chocolateJson.chocolates);
        setChocolates(chocolateJson.chocolates);
        console.log("MO", chocolateJson);
      
    }

    async function getTypes(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const typeList = await fetch("http://127.0.0.1:5000/api/types", options);
        const typeJson = await typeList.json();

        setTypes(typeJson.types);
    }


    async function getChoco(id){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const chocoList = await fetch(`/chocolatesByProducer/${producers[item]._id}`, options);
        const chocoJson = await chocoList.json();
        console.log("CHOCOS", chocoJson);
        setChoco(chocoJson);
    }

    function sortASC(){
        const sortAscProducers = [...producers];
        
        let data = sortAscProducers.sort(function(a, b){ b.name - a.name});
        console.log("Sort", data);
        setProducers(data);

    }
    async function getProducers(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        
        const producerList = await fetch("http://127.0.0.1:5000/api/producers", options);
        const producerJson = await producerList.json();

        setProducers(producerJson.producers);
        
    }

    useEffect(() => {
        getChocolates();
      }, []);
    

    useEffect(() => {
        getTypes();
    }, []);

    useEffect(() => {
        getProducers();
    }, []);


    return(
        <div className='container justify-content-center'>
            
            
                { Object.keys(producers).map((item) => {
                return (
                    <div className="row">
                        <h3 className='text-center text-uppercase text-primary'>{producers[item].name}</h3><br/><br/>
                        {
                            Object.keys(chocolates).map((it) =>{
                                if (chocolates[it].producer_id === producers[item]._id){
                                    return(
                                        <Chocolate id = { chocolates[it]._id } image = { chocolates[it].image } name = { chocolates[it].name } price = { chocolates[it].price }  cacao = { chocolates[it].cacao } color = { chocolates[it].color } type = { chocolates[it].type } />
                                    
                                    )
                                }
                            })
                        }
                    </div>
                )
                
                })}
        </div>
    )

}

export default Home;