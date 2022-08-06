
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
        <div className="grid grid-rows-3 min-w-[130vw] h-[100vh]">
          {/* <div className="grid grid-cols-3 bg-white text-center justify-center"></div> */}

          <div className=" my-36 p-4 justify-center flex flex-wrap-row gap-16 mb-10">
            {/* {notaries.map((i,sub)=>notaries.map((sub, z)=>{<div>}))}
             */}
            {notaries.map(function (sub) {
              return (
                <Card
                  arb={sub[1]}
                  party1={sub[2]}
                  party2={sub[3]}
                  ipfs={sub[0]}
                  isSignParty1={sub[4]}
                  isSignParty2={sub[5]}
                  sigparty1={sub[6]}
                  sigparty2={sub[7]}
                  timeStampNotaryCreation={sub[8]}
                  part1SignTimeStampNotaryCreation={sub[9]}
                  part2SignTimeStampNotaryCreation={sub[10]}

                  isExpired={sub[11]} 
                />
              );
            })}
          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;

