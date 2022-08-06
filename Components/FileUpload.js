import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ipfsClient from "ipfs-http-client";
import { useMetamask } from "../pages/api/components/context/metamsk.context";
import {abi as ABI} from "../Constants/abi"
import { ethers } from "ethers";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  HStack,
  Button,
  Input,
  ModalOverlay,
} from '@chakra-ui/react';


const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

const FileUpload = () => {
  

  const basicBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: '250px',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
    px: 4,
    
  }
  const [contract, setContract] = useState(undefined);
  const [signer, setSigner] = useState(null);
  const {
    isWalletConnected,
    walletAddress,
    chain,
    currentWallet,
    connectMetamask,
    provider,
  } = useMetamask ();
  React.useEffect(() => {
    connectMetamask();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      if (walletAddress) {
        const signer = provider?.getSigner();
        let marketplace;
        console.log(chain.toString())
        if (signer) {
          if (chain?.toString() == "42") {
            marketplace = new ethers.Contract(
              "0x598354734EfE24005e00a9c44dc7d04266546E32",
              ABI,
              signer
            );
          } 
        }
        setContract(marketplace)
        setSigner(signer);
      }
    };
    fetchData();
  }, [walletAddress, provider]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState([]);
  const [fileName, setfileName] = useState();
  const [multipleFilesUrl, setMultipleFilesUrl] = useState("");
  const [fileBuffer, setFileBuffer] = useState();
  const [ipfsHash, setIpfsHash] = useState("");

  async function captureFile(event) {
    console.log(event.target);
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setFileBuffer(Buffer(reader.result));
      console.log("buffer", fileBuffer);
    };
  }

  const uploadIpfs = async () => {
    try {
      await ipfs.add(fileBuffer, async (error, result) => {
        console.log("IPFS result", result);
        setIpfsHash(result[0].hash);
        console.log(result[0].hash);
        console.log(walletAddress)
        const txReceipt = await (
          await contract.putNotaryOnChain(
            result[0].hash,
            "0x3aEFd9DA1dCC077d24E4b5612AeF634766F82B17",
            "0xD2d68195cE18E985aa85e8483bde25BFa1BbDb4f",
          )
        ).wait();
        console.log("tx", txReceipt.status);
        console.log("txReceipt", txReceipt);
        if (txReceipt.status === 1) {
         console.log("Its done")
          }
        if (error) {
          console.error(error);
          throw error;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "580px",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  const PdfView = () => {
    return (
      <iframe
        src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
        sandbox
      ></iframe>
    );
  };


  return (
    <>
   
      <Box width={"500px"} boxShadow='dark-lg' p='6' rounded='md'  bgGradient='linear(teal.100 0%, orange.100 25%, yellow.100 50%)'>



      <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        h={"80%"}
       
       
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
       
        <Stack mt={"40%"}>
          <Center> 
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            Sign your documents with US!
          </Heading>
          </Center>
          <Text color={'gray.500'} pt={"5%"}>
          DIGISIGN affixes the authorized seal and signature to the certified document.
          
                    </Text>
        </Stack>
        <Box className="container"  drop boxShadow={false} mt={"10px"} > 
      <Center mt={"10%"}> 
      <button
        className="bg-teal-400 text-white py-2 px-2 rounded w-40 text-center font-semibold"
        onClick={openModal}
      >
        FileUpload
      </button>
      
      </Center>
      <Input mt={"20px"} bg={'teal.100'} variant='filled'  placeholder='Party Address 1 ' />
      <Input mt={"20px"} bg={'teal.100'} variant='filled' placeholder='Party Address 2 ' />
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        width="300px"
        contentLabel="Example Modal"
        backGroundColor={'bg-gradient-to-r from-teal-100 to-teal-500'}
        
      >
       <HStack spacing='40%'>
        <div> <Text fontSize={'xl'}  fontWeight="bold">Drop Your Document</Text> </div>
        <Button onClick={closeModal} >❌</Button>
        </HStack>

        <div className=" pt-16 justify-center place-self-center">
          <Input ml={'20px'} type="file" mb={'50px'} variant='unstyled' placeholder='Unstyled' onChange={captureFile} />
          {/* <PdfView />
           */}
           <iframe
          
        src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
        sandbox
      ></iframe>
          <Button ml={'20px'} onClick={uploadIpfs} mt={'50px'} bg={"blue.300"} variant="solid"> Upload</Button>
        </div>
      </Modal>
      </Box>


      </Box>
    </Center>
    
    </Box>



      

     

    </>
  );
};

export default FileUpload;

