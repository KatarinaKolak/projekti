import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Explorer = () => {
    const [search, setSearch] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [difficulty, setDifficulty] = useState([]);
    const [blockchainInfo, setBlockchainInfo] = useState([]);
    const [mempool, setMempool] = useState([]);
    const [blockHash, setBlockHash] = useState("");

    function onChangeSearch(e) {
        setSearch(e.target.value);
    }
    

    async function getBlock(search){
        const blockInfo = await fetch(`http://127.0.0.1:4444/api/getBlockHash/${search}`);
        const blockJson = await blockInfo.json();
        console.log("INFO", blockInfo);
        setTransactions(blockJson);
        
    }

    async function getDifficulty(){
        const difficultyInfo = await fetch("http://127.0.0.1:4444/api/getdifficulty");
        const difficultyJson = await difficultyInfo.json();
        console.log("Difficulty", difficultyJson);
        setDifficulty(difficultyJson.result);
    }

    async function getBlockchainInfo(){
        const blockchain = await fetch("http://127.0.0.1:4444/api/getblockchaininfo/");
        const blockchainJson = await blockchain.json();
        console.log("Blockchain: ", blockchainJson);
        setBlockchainInfo(blockchainJson.result);
    }

    async function getMempool(){
        const mempoolInfo = await fetch("http://127.0.0.1:4444/api/getrawmempool/");
        const mempoolJson = await mempoolInfo.json();
        console.log("Mempool: ", mempoolJson);
        setMempool(mempoolJson.result.slice(0, 10));
    }

    useEffect(() => {
        getDifficulty();
      }, []);

    useEffect(() => {
        getBlockchainInfo();
    }, []);
    
    useEffect(() => {
        getMempool();
    }, []);

    return(
        <div className="container">

            <form class="example" onSubmit={(e) => {getBlock(e);}}>
                <div className="form-group col-md-6 form-check-inline" style={{color:"#e6f5ff"}}>
                    <input
                        type="text"
                        value={search} className="form-control" 
                        placeholder="Search block height, hash or txid"
                        onChange={onChangeSearch}
                        onBlur={onChangeSearch}
                    ></input>

        {
            !isNaN(parseInt(search)) && !(/[a-zA-Z]/).test(search) ? 
            (<div>
                <Link to={`/block/${search}`}><button id="search" type="submit" className="btn btn-primary" style={{color:"blue"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></button></Link><br/><br/></div>
            ) : search.startsWith('00000000') ? 
            (
                <div>
                    <Link to={`/blockByHash/${search}`}><button id="search" type="submit" style={{color:"blue"}} className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></button></Link><br/><br/></div>
            ) :  search.length === 64 ? 
            (
              <div>
                    <Link to={`/tx/${search}`}><button type="submit" id="search" style={{color:"blue"}} className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></button></Link><br/><br/></div>
            ) : (<p><button type="submit"  id="search" className="btn btn-primary" style={{color:"blue"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg></button></p>)
        }
                
            </div>
            </form><br/>

            <table className="table table-bordered" style={{fontSize:20}}>
                <thead >
                    <tr>
                    <th>CHAIN</th>
                    <th>DIFFICULTY</th>
                    <th>BLOCKS</th>
                    <th>MEDIANTIME</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{blockchainInfo.chain}</td>
                    <td>{difficulty}</td>
                    <td>{blockchainInfo.blocks}</td>
                    <td>{blockchainInfo.mediantime}</td>
                    </tr>
                    
                </tbody>
            </table>

            <br/><br/><br/>
            <table className="table table-bordered" >
                <thead >
                    <tr>
                    <th>Mempool transactions</th>
                    </tr>
                </thead>
                <tbody>
                <tr style={{fontSize:17}}>
                    {
                            Object.keys(mempool).map((it) =>{
                                
                                return(
                                    <Link to={`/tx/${mempool[it]}`} style={{ textDecoration: 'none' }}>
                                        <td>{mempool[it]}</td> 
                                    </Link>
                                )
                                
                            })
                        }
                    </tr>
                   
                    
                </tbody>
            </table>
            
            <br/>
            
            
        </div>
    );
}

export default Explorer;