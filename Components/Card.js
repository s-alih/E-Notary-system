import React from "react";
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


function Card({ add , add1, ipfs}) {
 
console.log(add)
    return (
      <Stack>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-10}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `https://gateway.pinata.cloud/ipfs/${ipfs}`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src="https://i.ibb.co/5nkZB3V/Pngtree-reload-icon-in-trendy-style-4823782.png"
            />
            
          </Box>
          <Heading
            pt={"8px"}
            textAlign={"center"}
            fontSize={"2xl"}
            color={"black"}
            fontFamily={"body"}
            fontWeight={500}
          >
            hdeiufh
          </Heading>

          <Text
            pt={"10px"}
            textAlign={"center"}
            color={"black.500"}
            textTransform={"uppercase"}
            fontSize={"2xl"}
          >
            wuehsyr
          </Text>

          <Text
            pt={"4px"}
            color={"black"}
            textAlign={"center"}
            fontWeight={800}
            fontSize={"xl"}
          >
            39057389
          </Text>

          <Center>
            {/* <Select
            placeholder=""
            borderColor={"purple.200"}
            color={"black"}
            bg={"purple.100"}
            fontSize={"xl"}
            fontWeight={"bold"}
            width={"160px"}
            pt={"9%"}
            borderRadius={"10px"}
            // value={swapFrom}
            onChange={(e) => {
              setBuyOn(e.target.value);
            }}
          >
            <option value="4"> ETHEREUM </option>
            <option value="80001"> POLYGON </option>
            <option value="97"> BINANCE SMART CHAIN </option>
          </Select> */}
            <Text
              pt={"4px"}
              color={"black"}
              textAlign={"center"}
              fontWeight={800}
              fontSize={"xl"}
            >

            </Text>
          </Center>
          <Center>
            <Flex justifyContent={"center"}>
              <Text
                pt={"5px"}
                textAlign={"center"}
                fontWeight={800}
                fontSize={"xl"}
                color={"purple.500"}
              >
                
                {/* {nativeCrypto}  */}
              </Text>
              {/* <Image w={"15px"} ml={"10px"} src={logo} /> */}
            </Flex>
          </Center>

          <Center>
            {/* <Button mt={"5%"} bg={"purple.800"} onClick={buyHandler}> */}
              {" "}
              <Text color={"white"}> BUY </Text>{" "}
            {/* </Button> */}
          </Center>
        </Box>
      </Stack>
    );
  }


export default Card;
