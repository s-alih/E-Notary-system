import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ipfsClient from "ipfs-http-client";
import { useMetamask } from "../pages/api/components/context/metamsk.context";
import {abi as ABI} from "../Constants/abi"
import { ethers } from "ethers";
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

const FileUpload = () => {
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
      <button
        className="bg-red-800  text-white py-2 px-2 rounded w-40 text-center font-semibold"
        onClick={openModal}
      >
        FileUpload
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>❌</button>
        <div>Drop Your Document</div>

        <div className=" pt-16 justify-center place-self-center">
          <input type="file" onChange={captureFile} />
          {/* <PdfView />
           */}
           <iframe
        src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
        sandbox
      ></iframe>
          <button onClick={uploadIpfs}> Upload</button>
        </div>
      </Modal>

     
    </>
  );
};

export default FileUpload;
