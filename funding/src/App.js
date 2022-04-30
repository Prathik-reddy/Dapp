import logo from './logo.svg';
import './App.css';
import React, {useEffect } from 'react';

function App() {

  useEffect(() => {
    const loadProvider = async()=>{
      console.log(window.web);
      console.log(window.ethereum);
    }
    loadProvider();
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
          <button
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
          </button>
          &nbsp;
          <button type="button" className="btn btn-success ">
            Transfer
          </button>
          &nbsp;
          <button type="button" className="btn btn-primary ">
            Withdraw
          </button>
        </div>
        <div className="card-footer text-muted">Code Eater</div>
      </div>
    </>
  );
}

export default App;
