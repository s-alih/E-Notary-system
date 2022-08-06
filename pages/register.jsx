import { useForm } from "react-hook-form";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <Flex
        minH={"50vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Register
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Docusign made easy for you✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel> Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="UserName" isRequired>
                    <FormLabel>User Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Aadhar Number</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Pan Number</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.200",
                    onClick: () => {
                      handleSubmit(onSubmit);
                    },
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
export default register;
