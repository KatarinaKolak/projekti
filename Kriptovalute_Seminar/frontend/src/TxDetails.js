import React, {useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

const TxDetails = () => {
    const params = useParams();
    const [info, setInfo] = useState("");
    const [txFee, setTxFee] = useState("");
    const [value, setValue] = useState([]);
    const [spent, setSpent] = useState("");
    const [blockHeight, setBlockHeight] = useState("");
    const [txDate, setTxDate] = useState("");
    const [inputTx, setInputTx] = useState([]);
    const [fee, setFee] = useState(0);
    const [ins, setIns] = useState(0);
    const [outs, SetOuts] = useState(0);

    console.log("PARAMS: ", params.id);

    async function getTransaction(){
        
        const transaction = await fetch(`http://localhost:4444/api/getrawtransaction/${params.id}`);
        const transactionJson = await transaction.json();
        setInfo(transactionJson);
        console.log("TRANS: ", transactionJson.txid)

        const inputValue = await fetch(`http://localhost:4444/api/getInputValue/${params.id}`);
        const inputJson = await inputValue.json();
        setInputTx(inputJson);
        console.log("INPUT TX: ", inputJson);

    }

    async function getBlockHeight(){
        if (info.blockhash.length === 64){
            const height = await fetch(`http://localhost:4444/api/getblock/${info.blockhash}`);
            const heightJson = await height.json();
            console.log("HE: ", heightJson);
            setBlockHeight(heightJson);
            var dateN = moment.unix(blockHeight.time).format("DD/MM/YYYY hh:mm:ss");
            setTxDate(dateN);
        }
    }

    async function countInputSum(){
        var ins = 0;
        var outs = 0;
        setIns(0);SetOuts(0);
        if (inputTx.length !== ""){
            Object.entries(inputTx).map(([key, values]) =>{
                ins += values;
                console.log("SUM2: ", ins);
            })
        }

        if (info.length != 0){
            info.vout.map((item, index) => {
                outs += item.value;
            })
        }
        if (ins - outs > 0)
            setFee(ins-outs);
        setIns(ins);
        SetOuts(outs);
        console.log("OUTS: ", outs, " ins: ", ins);
        return ins - outs;
    }

    useEffect(() => {
        getTransaction();
        countInputSum();
      }, [params.id, ins, outs, info.txid]);

      useEffect(() => {
        getBlockHeight();
        countInputSum();
      }, [info, ins, outs]);

    return(
        <div className="container justify-content-center">
            <div className="txDetails">
                <table className="table table-bordered">
                    <th>TRANSACTION DETAILS</th>
                    <tr>
                        <th>TXID</th>
                        <td> {info.txid}</td>
                    </tr>
                   <tr>
                        <th>STATUS</th>
                        {info.confirmations > 0 ? <td> {info.confirmations} Confirmations</td> : <td>Unconfirmed</td>}
                   </tr>
                   <tr>
                        <th>INCLUDED IN BLOCK</th>
                        { info.blockhash ? <td> {info.blockhash}</td> : <td> Not added</td>}
                   </tr>
                   {blockHeight ? <tr><th>BLOCK HEIGHT</th><td>{blockHeight.height}</td></tr> : ""}
                   {txDate ? <tr><th>BLOCK TIMESTAMP</th><td>{txDate}</td></tr> : ""}
                   <tr>
                        <th>FEE</th>
                        <td> {fee} BTC</td>
                   </tr>
                   <tr>
                        <th>SIZE</th>
                        <td> {info.size}</td>
                   </tr>
                   <tr>
                        <th>VIRTUAL SIZE</th>
                        <td> {info.vsize}</td>
                   </tr>
                   <tr>
                        <th>WEIGHT</th>
                        <td> {info.weight}</td>
                   </tr>
                   <tr>
                        <th>VERSION</th>
                        <td> {info.version}</td>
                   </tr>
                   <tr>
                        <th>LOCK TIME</th>
                        <td> {info.locktime}</td>
                   </tr>
                </table>
            </div>
            <br/>
        <div className="main" >
            <div className="innerDetails">
                <table className="table table-bordered">
                    <th> INPUT TRANSACTIONS</th>
                   
                    {inputTx != "" ? Object.entries(inputTx).map(([key, value]) => 
                        ( <tr style={{ color:"white", textDecoration: 'none' }}>
                            <th><Link to={`/tx/${key}`} style={{ color:"white", textDecoration: 'none' }}>{key}</Link></th>
                            <td> {value} BTC</td></tr>)
                    ): ""}<br/>
                    <tr><th></th> <td>{ins} BTC</td></tr>
                </table>
            </div>
            <div className="innerDetails">
                <table className="table table-bordered">
                    <th>OUTPUT TRANSACTIONS</th>
                   

                    {info.length === 0 ? "" : info.vout.map((item, index) => (
                        item.value === 0 ? <tr><th>OP_RETURN</th> <td>{item.value} BTC</td></tr> : <tr><th>{item.scriptPubKey.addresses}</th> <td>{item.value} BTC</td></tr>
                    ))}
                    <th></th> <td>{outs} BTC</td>
                </table>
            </div>
            </div>
        </div>
    )
}

export default TxDetails;
