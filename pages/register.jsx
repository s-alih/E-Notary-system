import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { useMetamask } from "./api/components/context/metamsk.context";
import { abi as ABI } from "../Constants/abi";

const register = () => {
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
          }
        }
        setContract(marketplace);
        setSigner(signer);
      }
    };
    fetchData();
  }, [walletAddress, provider]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("Name", { required: true, maxLength: 20 })} />
        <input
          {...register("UserName", { required: true, min: 6, maxLength: 20 })}
        />
        <input
          {...register("Aadhar Number", { required: true, maxLength: 15 })}
        />
        <input
          {...register("Pan Number", { required: true, min: 8, maxLength: 15 })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default register;
