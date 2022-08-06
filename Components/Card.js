import React from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import moment from "moment";
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
} from "@chakra-ui/react";
import { useMetamask } from "../pages/api/components/context/metamsk.context";

function Card({
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
  const { walletAddress } = useMetamask();

  return (
    <Stack>
      <Box
        role={"group"}
        p={2}
        maxW={"600px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={1}
          pos={"relative"}
          height={"380px"}
          ml={15}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 5,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <iframe
            src={`https://gateway.pinata.cloud/ipfs/${ipfs}`}
            height={250}
            width={400}
            sandbox
          ></iframe>
        </Box>
        <Heading
          mt={"28px"}
          textAlign={"center"}
          fontSize={"2xl"}
          color={"black"}
          fontFamily={"body"}
          fontWeight={500}
        >
          E-NOTARY DETAILS
        </Heading>
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
            <div >
              signed at={" "}
              {isSignParty2
                ? moment
                    .unix(part2SignTimeStampNotaryCreation.toString())
                    .format("DD/MM/YYYY , h:mm:ss a")
                : "0"}
            </div>
            <div>signature: {sigparty2.toString()}</div>
          </div>
        </div>
        <Center>Notary: address:{" "}
              {`0x${arb.slice(2, 5)}...${arb.slice(
                arb.length - 4,
                arb.length
              )}`}</Center>
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
            <button class="text-center text-black font-bold rounded py-2 w-6/12 focus:outline-none bg-blue-400 border-2 border-indigo-400">
              Sign E-Notary
            </button>
          ) : null}
          {walletAddress.toLocaleUpperCase() === party2.toLocaleUpperCase() &&
          !isSignParty2 ? (
            <button class="text-center text-black font-bold rounded py-2 w-6/12 focus:outline-none bg-blue-400 border-2 border-indigo-400">
              Sign E-Notary{" "}
            </button>
          ) : null}
        </Center>
      </Box>
    </Stack>
  );
}

export default Card;
