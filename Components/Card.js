import React, { useState } from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useDisclosure } from "@chakra-ui/react";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack,
  SimpleGrid,
  useColorModeValue,
  Heading,
  EmailIcon,
  Center,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useMetamask } from "../pages/api/components/context/metamsk.context";
import { ethers } from "ethers";
import { abi as ABI } from "../Constants/abi";

function Card({
  notaryid,
  arb,
  party1,
  party2,
  ipfs,
  isSignParty1,
  isSignParty2,
  sigparty1,
  sigparty2,
  timeStampNotaryCreation,
  part1SignTimeStampNotaryCreation,
  part2SignTimeStampNotaryCreation,

  isExpired,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [contract, setContract] = useState(undefined);
  const [signer, setSigner] = useState(null);
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

  const signENotary = async () => {
    console.log(walletAddress);
    const signMessage = await signer.signMessage(arb, party1, party2, ipfs);
    console.log("signMessage", signMessage);
    const txReceipt = await (
      await contract.signAndUpdateNotary(notaryid, signMessage)
    ).wait();
    console.log("tx", txReceipt.status);
    console.log("txReceipt", txReceipt);
    if (txReceipt.status === 1) {
      console.log("Its done");
    }
  };
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
          }
        }
        setContract(marketplace);
        setSigner(signer);
      }
    };
    fetchData();
  }, [walletAddress, provider]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              src={`https://gateway.pinata.cloud/ipfs/${ipfs}`}
              height={750}
              width={400}
              sandbox
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div class="max-w-md h-200 rounded overflow-hidden shadow-lg mx-8  bg-gradient-to-tr from-stone-200 via-purple-100 to-gray-100">
        <div className=" flex justify-center mt-4 p-2">
          <iframe
            src={`https://gateway.pinata.cloud/ipfs/${ipfs}`}
            height={250}
            width={400}
            sandbox
          ></iframe>
        </div>

        <div class="px-6 py-4 self-center">
          <Button onClick={onOpen} className="mx-4 my-8">
            Open document
          </Button>
          <div class="font-bold text-xl mb-2"> E-NOTARY DETAILS</div>
          <p class="text-gray-700 text-base">details</p>
          <div className="grid grid-cols-2 content-center items-center  mt-4  ml-6 text-lg">
            <div className="p-2 font-bold">
              Party 1
              <div className="p-1">
                address:
                {`0x${party1.slice(2, 5)}...${party1.slice(
                  party1.length - 4,
                  party1.length
                )}`}
              </div>
              <div className="py-2">
                <div>
                  Is Signed?{" "}
                  {isSignParty1 ? (
                    <CheckIcon color="green.500" w={8} h={8} />
                  ) : (
                    <CloseIcon color="red.500" w={6} h={6} />
                  )}
                </div>
              </div>
              <div className="py-2">
                signed At:{" "}
                {isSignParty1
                  ? moment
                      .unix(part1SignTimeStampNotaryCreation.toString())
                      .format("DD/MM/YYYY , h:mm:ss a")
                  : "Null"}
              </div>
              <div>signature: {sigparty1.toString()}</div>
            </div>
            <div className="py-2 font-bold">
              party2
              <div className="p-1">
                address:{" "}
                {`0x${party2.slice(2, 5)}...${party2.slice(
                  party2.length - 4,
                  party2.length
                )}`}
              </div>
              <div>
                Is Signed?{" "}
                {isSignParty2 ? (
                  <CheckIcon color="green.500" w={8} h={8} />
                ) : (
                  <CloseIcon color="red.500" w={6} h={6} />
                )}
              </div>
              <div>
                signed at={" "}
                {isSignParty2
                  ? moment
                      .unix(part2SignTimeStampNotaryCreation.toString())
                      .format("DD/MM/YYYY , h:mm:ss a")
                  : "0"}
              </div>
              <div>
                signature:{" "}
                {`0x${sigparty2.toString().slice(2, 5)}...${sigparty2
                  .toString()
                  .slice(party2.length - 4, party2.length)}`}
              </div>
            </div>
          </div>
          <Center>
            Notary: address:{" "}
            {`0x${arb.slice(2, 5)}...${arb.slice(arb.length - 4, arb.length)}`}
          </Center>
          <Center>
            E-Notary Creation Timestamp:{" "}
            {moment
              .unix(timeStampNotaryCreation.toString())
              .format("DD/MM/YYYY , h:mm:ss a")}
          </Center>
          <Center my={4}>
            {console.log(walletAddress, party1)}
            {walletAddress.toLocaleUpperCase() == party1.toLocaleUpperCase() &&
            !isSignParty1 ? (
              <button
                class="text-center text-black font-bold rounded py-2 w-6/12 focus:outline-none bg-blue-400 border-2 border-indigo-400"
                onClick={signENotary}
              >
                Sign E-Notary
              </button>
            ) : null}
            {walletAddress.toLocaleUpperCase() === party2.toLocaleUpperCase() &&
            !isSignParty2 ? (
              <button
                class="text-center text-black font-bold rounded py-2 w-6/12 focus:outline-none bg-blue-400 border-2 border-indigo-400"
                onClick={signENotary}
              >
                Sign E-Notary{" "}
              </button>
            ) : null}
          </Center>
        </div>
        {/* <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div> */}
      </div>
    </>
  );
}

export default Card;
