import React from "react";
import Card from "../Components/Card";
import {
  background,
  Box,
  Heading,
  Avatar,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import FileUpload from "../Components/FileUpload";
import Navbar from "../Components/Navbar";
import { useMetamask } from "./api/components/context/metamsk.context";
import { useState } from "react";
import { abi as ABI } from "../Constants/abi";
import { ethers } from "ethers";

const dashboard = () => {
  const {
    isWalletConnected,
    walletAddress,
    chain,
    currentWallet,
    connectMetamask,
    provider,
  } = useMetamask();
  React.useEffect(() => {
    connectMetamask();
  }, []);

  const [contract, setContract] = useState(undefined);
  const [signer, setSigner] = useState(null);
  const [notaries, setNotaries] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (walletAddress) {
        const signer = provider?.getSigner();
        let marketplace;
        console.log(chain.toString());
        if (signer) {
          if (chain?.toString() == "42") {
            marketplace = new ethers.Contract(
              "0x598354734EfE24005e00a9c44dc7d04266546E32",
              ABI,
              signer
            );
            const notaries = [];
            const userAssociatedNotaryIds = await marketplace.getUserIds(
              walletAddress
            );
            console.log(userAssociatedNotaryIds);
            for (let i = 0; i < userAssociatedNotaryIds.length; i++) {
              const id = userAssociatedNotaryIds[i].toString();
              const notary = await marketplace.notaries(id);
              notaries.push(notary);
            }
            console.log("Notaries: " + JSON.stringify(notaries));
            setNotaries(notaries);
          }
        }
        setContract(marketplace);
        setSigner(signer);
      }
    };
    fetchData();
  }, [walletAddress, provider]);

  // console.log(notaries[0];
  console.log("provider", provider);
  return (
    <> 
    {/* <Card key={key} party1Add={i[1]} party2Add={i[2] } ipfs={i[0]} party1Sign={i[4]} party2Sign={5}  /> */}
      <Navbar />

      <div>
        <div className="grid grid-rows-3 w-[100vw] h-[100vh]">
          <div className="grid grid-cols-3 bg-white h-1/4 text-center justify-center"></div>

          <div className=" m-8 p-4 justify-between flex flex-wrap-row">
           {/* {notaries.map((i,sub)=>notaries.map((sub, z)=>{<div>}))}
            */}
            {notaries.map(function(sub) {
  
    return <Card add={sub[1]}  add1={sub[2]} ipfs={sub[0]}/>
    
    
    })
  
  }
            
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
