import {
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { CopyIcon } from "@radix-ui/react-icons";

function App() {
  const [length, setLength] = useState<number>(8);
  const [includeNum, setIncludeNum] = useState<boolean>(false);
  const [includeChar, setIncludeChar] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const toast = useToast();

  const generatePassword = useCallback(() => {
    let pass:string = "";
    let str:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNum) str += "0123456789";
    if (includeChar) str += "!@#$%^&*()_~";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [includeNum, includeChar, setPassword, length]);

  const copyPassword = useCallback(() => {
   
      navigator.clipboard.writeText(password);
      toast({
        title: 'Password copied.',
        description: "The password is copied to clipboard.",
        position: "top",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
  }, [password, toast])

  useEffect(() => {
    generatePassword();
  }, [length, includeNum, includeChar, generatePassword]);

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      fontFamily={"poppins"}
      minHeight={"100vh"}
      bgColor={"gray.700"}
      textColor={"white"}
    >
      <Text fontSize={"x-large"} fontWeight={"bold"}>
        Password generator
      </Text>

      <Flex
        flexDirection={"column"}
        borderRadius={"10px"}
        padding={4}
        bgColor={"gray.900"}
        width={"70%"}
      >
        <InputGroup>
          <Input
            variant={"filled"}
            placeholder="Password"
            type="text"
            value={password}
            readOnly
            color={"black"}
          />
          <InputRightAddon>
            <CopyIcon cursor={"pointer"} onClick={copyPassword} color="black" />
          </InputRightAddon>
        </InputGroup>

        <Flex flexDirection={["column", "", "row"]} alignContent={"center"} justifyContent={"space-between"} margin={2}>
          <Flex justifyContent={["center", "", ""]} alignContent={"center"} gap={2} marginY={["4", "", ""]}>
            <input
              onChange={(e) => {
                setLength(parseInt(e.target.value, 10));
              }}
              type="range"
              value={length}  
              min={6}
              max={50}
              className="length_input"
            />
            <label htmlFor="length">Length: {length}</label>
          </Flex>
          <Flex  justifyContent={["center", "", ""]} gap={2} marginY={["4", "", ""]}>
            <Flex gap={1} alignItems={"center"}>
              <input
                type="checkbox"
                defaultChecked={includeNum}
                id="numberInput"
                onChange={() => {
                  setIncludeNum((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </Flex>
            <Flex gap={1} alignContent={"center"}>
              <input
                type="checkbox"
                defaultChecked={includeChar}
                id="charInput"
                onChange={() => {
                  setIncludeChar((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Characters</label>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
