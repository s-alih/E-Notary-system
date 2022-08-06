import {
  background,
  Box,
  Button,
  Flex,
  Image,
  Img,
  Text,
  Container,
  SimpleGrid,
  Icon,
  Stack,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import Navbar from "./api/components/Navbar";
import NotConnectedModal from "./api/components/NotConnectedModal";
import { useMetamask } from "./api/components/context/metamsk.context";
import ConnectedModal from "./api/components/ConnectedModal";
import { ButtonGroup } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import LazyMarketplace from "./LazyMarketplace";
import React from "react";
export default function Homepage() {
  const {
    isWalletConnected,
    walletAddress,
    chain,
    currentWallet,
    connectMetamask,
  } = useMetamask();
  // React.useEffect(() => {
  //   connectMetamask();
  // }, []);
  return (
    <>
      {/* <Navbar/> */}

      <Flex
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        width={"100vw"}
        height={"100vh"}
        flexDirection={"column"}
        className={"containerLand"}
      >
        <Flex
          width={"100vw"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          padding={"20px"}
        >
          <Link
            href="./dashboard"
            pl={"70px"}
            pr={"60px"}
            variant={"unstyled"}
            colorScheme={"purple"}
            color={"black"}
            fontWeight={"bold"}
            mt={"20px"}
          >
            DashBoard
          </Link>
          <Link
            href="./upload"
            pl={"70px"}
            pr={"60px"}
            variant={"unstyled"}
            colorScheme={"purple"}
            color={"black"}
            fontWeight={"bold"}
            mt={"20px"}
          >
            Upload
          </Link>

          <Box pl={"70px"} pr={"60px"}>
            {isWalletConnected && walletAddress && chain && currentWallet ? (
              <>
                <ConnectedModal />
              </>
            ) : (
              <NotConnectedModal />
            )}
          </Box>
        </Flex>

        <Flex flexDirection={"row"} height={"150vh"} wrap={"wrap"}>
          <Flex width={"40%"} height={{ md: "27%" }} mb={"50px"}>
            <Box>
              <Text
                bgGradient="linear(to-l, white, teal.300)"
                bgClip="text"
                fontSize="5xl"
                fontWeight="extrabold"
                pl={"100px"}
                pt={"200px"}
                textColor={"black"}
                position={"absolute"}
                zIndex={100}
              >
                Sign your Documents with<Text>US</Text>
              </Text>
              <Blur
                position={"absolute"}
                top={-10}
                left={-10}
                style={{ filter: "blur(70px)" }}
              />
            </Box>

            <Blur
              position={"absolute"}
              top={-10}
              left={-10}
              style={{ filter: "blur(70px)" }}
            />
          </Flex>

          <Flex width={"50%"} height={{ md: "47%" }}  mt={"80px"} ml={"110px"}>
            <Box
              boxShadow="inner"
              p="6"
              rounded="md"
              bgGradient="linear(teal.200,purple.100)"
              dropShadow={"md"}
              width={"fit-content"}
              height={"fit-content"}
              zIndex={1000}
            >
              <Image src="https://s4.gifyu.com/images/94d063c6e79fbe19164c99b05fdb8ca3.gif"  />
            </Box>
          </Flex>
          <Flex width={"50%"} height={{ md: "37%" }} mb={"50px"}>
            <Box>
             
              <Blur
                position={"absolute"}
               
                right={-10}
                style={{ filter: "blur(70px)" }}
              />
            </Box>

            <Blur
              position={"absolute"}
              bottom={-5}
              right={-10}
              style={{ filter: "blur(70px)" }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}


export const Blur = (props, IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "60vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#FED7E2" />
      <circle cx="244" cy="106" r="139" fill="#FAF089" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#FBD38D" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#B2F5EA" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#68D391" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
