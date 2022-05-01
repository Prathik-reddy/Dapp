import './App.css';
import React, { useState, useEffect } from 'react';
import Web3 from "web3";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      let provider = null;
      if (window.ethereum) {
        provider = window.ethereum;
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (e) {
          console.log(e);
        }
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else if (!process.env.production) {
        provider = new Web3.providers.HttpProvider("http://localhost:7545");
      }
      setWeb3Api({
        web3: new Web3(provider),
        provider,
      })

    }
    loadProvider();
    console.log(web3Api.web3);
  }, [])

  return (
    <>
      <div className="card text-center">
        <div className="card-header">Funding</div>
        <div className="card-body">
          <h5 className="card-title">Balance: 20 ETH </h5>
          <p className="card-text">
            Account : 0x389A79cdE6664c82A03B7Bd3E5b078D873f04A15
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
