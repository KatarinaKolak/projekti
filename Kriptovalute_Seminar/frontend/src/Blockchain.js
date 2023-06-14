import React, {useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

const Blockchain = () => {
    const params = useParams();
    const [info, setInfo] = useState("");
    const [date, setDate] = useState("");

    async function getInfo(){
        
        const info = await fetch("http://localhost:4444/api/getblockchaininfo");
        const infoJson = await info.json();
        setInfo(infoJson.result);
        var dateN = moment.unix(info.mediantime).format("DD/MM/YYYY hh:mm:ss");
        setDate(dateN);
        console.log("Info: ", (infoJson.result))

    }

    useEffect(() => {
        getInfo();
      }, []);

    return(
        <div className="container justify-content-center">
            <h3>Blockchain</h3><br/>
            <table className="table table-bordered">
                
                <tbody>
                <tr>
                    <th >CHAIN</th>
                    <td>{info.chain}</td>
                    </tr>
                    <tr>
                        <th >BLOCK</th>
                        <td >{info.blocks}</td>
                    </tr>
                    <tr>
                    <th>HEADERS</th>
                    <td>{info.headers}</td>
                    </tr>
                    <tr>
                    <th>DIFFICULTY</th>
                    <td>{info.difficulty}</td>
                    </tr>
                    <tr>
                    <th>MEDIANTIME</th>
                    <td>{info.mediantime}</td>
                    </tr>
                    <tr>
                    <th>BESTBLOCK</th>
                    <td>{info.bestblockhash}</td>
                    </tr>
                </tbody>
            </table>
            <br/><br/><br/><br/><br/><br/>

            
        </div>
    )
}

export default Blockchain;
