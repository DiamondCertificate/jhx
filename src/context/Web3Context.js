import { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import DiamondContract from '../contracts/Diamond.json';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          DiamondContract.abi,
          signer
        );
        
        setProvider(provider);
        setContract(contract);
        setAccount(accounts[0]);
      }
    };

    init();
  }, []);

  return (
    <Web3Context.Provider value={{ provider, contract, account }}>
      {children}
    </Web3Context.Provider>
  );
};