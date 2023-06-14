const express = require("express");
const router = express.Router();
var request = require("request");
const cors = require("cors");
const Client = require('bitcoin-core');
const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const HOST = process.env.RPC_HOST;
const PORT = process.env.RPC_PORT;

const client = new Client({ 
  host: HOST, 
  username: USER, 
  password: PASS, 
  port: PORT 
});

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


app.use(express.json())

app.use(cors({origin: "*", credentials: true}));

//client.getBlockchainInfo().then((help) => console.log(help));

const headers = {
  "content-type": "text/plain;"
};

router.get("/getbestblockhash", cors(), (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getbestblockhash","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@${HOST}:8332/`,
      method: "POST",
      headers: headers,
      body: dataString
    };

    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });



  router.get("/getdifficulty", cors(), (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getdifficulty","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@${HOST}:8332/`,
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });

  router.get("/getblockchaininfo", cors(), (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockchaininfo","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@${HOST}:8332/`,
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });

  router.get("/getrawmempool", cors(), (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawmempool","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@${HOST}:8332/`,
      method: "POST",
      headers: headers,
      body: dataString
    };

    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });

  router.get("/getblock/:hash", cors(), (req, res) => {

    client.getBlock(req.params.hash).then((err, block) =>{
      if (err){
        res.send(err);
      } else {
         res.send(block);
      }
    })
  });


  router.get("/getrawtransaction/:txid", cors(), (req, res) => {
    
    client.getRawTransaction(req.params.txid, true).then((transaction) => {
      console.log("TX: ", transaction);
     res.send(transaction)
    }
    );
  });


router.get('/getValue/:txId', cors(), async (req, res) => {
  const result = await countValue(req.params.txId);
  return res.json(result);
})

router.get('/getInputValue/:txId', cors(), async (req, res) => {
  const result = await countInput(req.params.txId);
  return res.json(result);
})

async function getInValue(txid){
  var infoInner = await client.getRawTransaction(txid, true);
  return infoInner.vout[0].value;
}
async function countInput(txId) {
  var info = await client.getRawTransaction(txId, true);
  var vinArray = [];
  var jsonArray = {};

  info.vin.map((item, index) => {
    if (!item.coinbase){
      vinArray.push([item.txid, item.vout]);
    }
  })

  var i = 0;
  while (i < vinArray.length){
    var info_inner = await client.getRawTransaction(vinArray[i][0], true);
    var index = vinArray[i][1]

    var j = 0;
    while (j < info_inner.vout.length){
      if (j === index){
        jsonArray[vinArray[i][0]] = info_inner.vout[j].value;
      }
      j++;
    }
    
    i++;
  }

  return jsonArray;
}


async function getInValue(txid){
  var infoInner = await client.getRawTransaction(txid, true);
  return infoInner.vout[0].value;
}
async function countInputValue(txId) {
  var info = await client.getRawTransaction(txId, true);
  var vinArray = [];
  var vinSum = 0;
  var finalArray = [];

  info.vin.map((item, index) => {
        if (!item.coinbase){
          vinArray.push(item.txid);
        }
      })
    

  vinArray.map((item, index) => {

    getInValue(item).then((err, value) =>
    console.log("INER: ", value)
    )
    
    
  })

  /*if (!info.vin[0].coinbase){
    var infoInner = await client.getRawTransaction(info.vin[0].txid, true)

      if (vinArray.length > 0){
        vinArray.map((item, index) => {
          console.log("Item: ", infoInner.vout[item].value)
            finalArray.push(infoInner.vout[item].value);
        })
      }
  }
  */

  console.log("ARRAY: ", finalArray);
  return  finalArray;
}

async function countValue(txId) {
  var info = await client.getRawTransaction(txId, true);
  var vinArray = [];
  var vinSum = 0;


  info.vin.map((item, index) => {
        if (!item.coinbase){
          vinArray.push(item.vout);
        }
      })
    

  if (!info.vin[0].coinbase){
    var infoInner = await client.getRawTransaction(info.vin[0].txid, true)
    console.log("Info inner: ", info);
      if (vinArray.length > 0){
        vinArray.map((item, index) => {
            vinSum += infoInner.vout[item].value;
        })
      }
  }
  
  return  vinSum;
}

router.get('/getSpent/:txId', cors(), async (req, res) => {
  const result = await spentValue(req.params.txId);
  return res.json(result);
})


async function spentValue(txId) {
  var info = await client.getRawTransaction(txId, true);
  var vOut = [];
  var voutSum = 0;


  info.vout.map((item, index) => {
      voutSum += item.value;
    })
  
  return  voutSum;
}


router.get('/getFee/:txId', cors(), async (req, res) => {
  const vinSum = await countValue(req.params.txId);
  const voutSum = await spentValue(req.params.txId);
  const result = vinSum - voutSum;
  if (result > 0)
    return res.json(result);
  return res.json(0)
})

async function coutTransactionFee(txId) {
  var info = await client.getRawTransaction(txId, true);
  var vinArray = [];
  var vinSum = 0;
  var voutSum = 0;

  info.vout.map((item, index) => {
    voutSum += item.value;
  })

  info.vin.map((item, index) => {
    if (!item.coinbase){
      vinArray.push(item.vout);
    }
  })

  
  console.log("INFO VIN: ", info)
  var infoInner = await client.getRawTransaction(info.vin[0].txid, true)

  vinArray.map((item, index) => {
      vinSum += infoInner.vout[item].value;
  })
  
  return  vinSum - voutSum;
}

  
  router.get("/getblockhash/:index", cors(), (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockhash","params":[${
      parseInt(req.params.index)
    }]}`;
    var options = {
        url: `http://${USER}:${PASS}@${HOST}:8332/`,
        method: "POST",
        headers: headers,
        body: dataString
      };
  
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });

  router.get("/getblockstats/:index", cors(), (req, res) => {
    client.getBlockStats(req.params.index).then((err, block) =>{
      if (err){
        res.send(err);
      } else {
         res.send(block);
      }
    })

  });

  router.get("/getblockchaininfo", cors(), (req, res) => {

    client.getBlockchainInfo().then((err, info) =>{
      if (err){
        res.send(err);
      } else {
         res.send(info);
      }
    })
  });

  

  router.get("/decoderawtransaction/:hex", cors(), (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"decoderawtransaction","params":["${
      req.params.hex
    }", true]}`;
    var options = {
        url: `http://${USER}:${PASS}@${HOST}:8332/`,
        method: "POST",
        headers: headers,
        body: dataString
      };
  
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });

module.exports = router;