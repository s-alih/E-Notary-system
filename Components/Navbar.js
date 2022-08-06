import React from "react";
import ConnectedModal from "../pages/api/components/ConnectedModal";
import NotConnectedModal from "../pages/api/components/NotConnectedModal";
// import Connect from "./api/components/Connect";
import { Box, Image, Flex, Button, HStack, chakra } from "@chakra-ui/react";
import { useMetamask } from "../pages/api/components/context/metamsk.context";

const Navbar = () => {
  const {
    isWalletConnected,
    walletAddress,
    chain,
    currentWallet,
    connectMetamask,
  } = useMetamask();

  return (
    <nav className="mt-24">
      <div class="menu">
        <input type="checkbox" id="check" />
        <div class="logo">
          <a href="#">TeamOne</a>
        </div>
        <ul>
          <label class="btn cancel" for="check">
            <i class="fas fa-times"></i>
          </label>

          <li>
            {isWalletConnected && walletAddress && chain && currentWallet ? (
              <>
                <ConnectedModal />
              </>
            ) : (
              <NotConnectedModal />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
