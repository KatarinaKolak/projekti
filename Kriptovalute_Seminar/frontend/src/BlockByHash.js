import React, {useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

const BlockDetails = () => {
    const params = useParams();
    const [info, setInfo] = useState("");
    const [stats, setStats] = useState("");
    const [blockdetails, setBlockDetails] = useState("");
    const [date, setDate] = useState("");

    const targetDiv = document.getElementById("third");
    const btn = document.getElementById("toggle");

    const tDiv = document.getElementById("txDiv");
    const txBtn = document.getElementById("txBtn");

    console.log("PARAMS: ", params.id);

    async function getBlock(){
        const info = await fetch(`http://localhost:4444/api/getblock/${params.id}`);
        const infoJson = await info.json();
        setBlockDetails(infoJson);
        var dateN = moment.unix(blockdetails.time).format("DD/MM/YYYY hh:mm:ss");
        setDate(dateN);
        console.log("BLOCK2: ", infoJson)

        const statistics = await fetch(`http://localhost:4444/api/getblockstats/${params.id}`);
        const statsJson = await statistics.json();
        setStats(statsJson);
        console.log("STATS: ", statsJson);
    }

    function hide(){
        if (targetDiv.style.display !== "none") {
            targetDiv.style.display = "none";
          } else {
            targetDiv.style.display = "block";
          }
    }

    function hideTx(){
        if (tDiv.style.display !== "none") {
            tDiv.style.display = "none";
          } else {
            tDiv.style.display = "block";
          }
    }

    useEffect(() => {
        getBlock();
      }, [params.id, date]);

    return(
        <div className="container justify-content-start">
            <p className="justify-content-start">Block {blockdetails.height}</p>
            <p>{params.id}</p>
             <button className="btn btn-outline-info" id="toggle" onClick={hide}>More details</button>
             <button className="btn btn-outline-info" id="txBtn" onClick={hideTx}>Transactions</button>
            <div className="txDetails">
           
                <table className="table table-bordered">
                    <th ></th>
                    <tr>
                    <th>HEIGHT</th>
                        <td > {blockdetails.height}</td>
                    </tr>
                    <tr>
                        <th>STATUS</th>
                        {blockdetails.length === 0 ? '' : <td> {blockdetails.confirmations}</td>}
                    </tr>
                    <tr>
                        <th>TIMESTAMP</th>
                        <td> {date}</td>
                    </tr>
                    <tr>
                        <th>SIZE</th>
                        {blockdetails.length === 0 ? '' : <td> {blockdetails.size}</td>}
                    </tr>
                    <tr>
                        <th>WEIGHT</th>
                        {blockdetails.length === 0 ? '' : <td> {blockdetails.weight}</td>}
                    </tr>
                    <tr>
                        <th >DIFFICULTY</th>
                        <td>{blockdetails.difficulty}</td>
                    </tr>
                    <tr>
                        <th>NONCE</th>
                        <td>{blockdetails.nonce}</td>
                    </tr>
                    
                </table>
                    
            </div>

            <br/><br/>
            <div id="third">
            <div className="txDetails">
                    {blockdetails.length == 0 ? '' : 
                        (<table className="table table-bordered">
                                <th ></th>
                                <tr>
                                <th>MEDIANFEE</th>
                                    <td> {stats.medianfee}</td>
                                </tr>
                                <tr>
                                    <th>TOTALFEE</th>
                                    {stats.length === 0 ? '' : <td> {stats.totalfee}</td>}
                                </tr>
                                <tr>
                                    <th>INPUTS</th>
                                    <td> {stats.ins}</td>
                                </tr>
                                <tr>
                                    <th>OUTPUTS</th>
                                    <td>{stats.outs}</td>
                                </tr>
                                <tr>
                                    <th >TRANSACTIONS</th>
                                    <td>{stats.txs}</td>
                                </tr>
                                <tr>
                                    <th>MAXFEE</th>
                                    <td>{stats.maxfee}</td>
                                </tr>
                                <tr>
                                    <th >MINFEE</th>
                                    <td>{stats.minfee}</td>
                                </tr>
                                {blockdetails.length == 0 ? '' : (
                                    <><tr>
                                    <th>NEXT BLOCK</th>
                                    <td><Link to={`/blockByHash/${blockdetails.nextblockhash}`} style={{ color:"white", textDecoration: 'none' }}>{blockdetails.nextblockhash}</Link></td>
                                </tr><tr>
                                        <th >PREVIOUS BLOCK</th>
                                        <td><Link to={`/blockByHash/${blockdetails.previousblockhash}`} style={{ color:"white", textDecoration: 'none' }}>{blockdetails.previousblockhash}</Link></td>
                                    </tr><tr>
                                        <th >MERKLE ROOT</th>
                                        <td><Link to={`/blockByHash/${blockdetails.merkleroot}`} style={{ color:"white", textDecoration: 'none' }}>{blockdetails.merkleroot}</Link></td>
                                    </tr></>
                                )}
                            </table>
                        )
                    
                    }
                    </div>
            </div><br/>
            <div id="txDiv">
            {blockdetails.length == 0 ? '' : 
            ( 
           
            <table>
              
                    <th >Block transactions</th>
                    <tr style={{fontSize:17}}>
                    
                    {
                            blockdetails.tx.map((it) =>{
                                return(<Link to={`/tx/${it}`}  style={{ color:"black", textDecoration: 'none' }}><td>{it}</td></Link>)
                            })
                        }
                    
                </tr>
            </table>
            
            )}
            </div>
        </div>
    )
}

export default BlockDetails;
