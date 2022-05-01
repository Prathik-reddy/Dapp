import './App.css';
import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import {loadContract} from "./utils/loadContract"

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract : null,
  });

  const [accounts, setaccounts] = useState(null);
  const [balance, setbalance] = useState(null);
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract("funder",provider);
      if (provider) {
        console.log('Ethereum successfully detected!');
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        })
        provider.request({method:"eth_requestAccounts"});
      } else {
        console.error("Please install MetaMask!");
      }

    }
    loadProvider();
    // console.log(web3Api.web3);
  }, [])

  useEffect(() => {
    const loadBalance = async()=> {
      const {contract,web3} = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setbalance(web3.utils.fromWei(balance,"ether"));
      console.log(balance);

    }
    web3Api.contract && loadBalance();
  }, [web3Api]);


  useEffect(() => {
    const getAcc = async () => {
      const acc = await web3Api.web3.eth.getAccounts();
      setaccounts(acc[0]);
    }
    web3Api.web3 && getAcc();

  }, [web3Api.web3])

  return (
    <>
      <div className="card text-center">
        <div className="card-header">Funding</div>
        <div className="card-body">
          <h5 className="card-title">Balance: {balance?balance:"no"} ETH </h5>
          <p className="card-text">
            Account : {accounts ? accounts : "Not connected"}
          </p>
          {/* <button
            type="button"
            className="btn btn-success"
            onClick={async () => {
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              console.log(accounts);
            }}
          >
            Connect to metamask
          </button> */}
          &nbsp;
          <button type="button" className="btn btn-success ">
            Transfer
          </button>
          &nbsp;
          <button type="button" className="btn btn-primary ">
            Withdraw
          </button>
        </div>
        <div className="card-footer text-muted ">Prathik Reddy</div>
      </div>
    </>
  );
}

export default App;
