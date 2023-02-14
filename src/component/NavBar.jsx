import { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  useBreakpointValue,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import e from "../assets/e-c.jpg";
import { CiShoppingCart } from "react-icons/ci";
import { fetchCardItem, getCard } from "../features/products/productSlice";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [orderCount, setOrderCount] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  const dispatch = useDispatch();
  const baskitItem = useSelector(getCard);

  // useEffect(() => {
  //   dispatch(fetchCardItem());
  // }, [dispatch]);
  return (
    <Box as="section">
      <Box boxShadow="sm">
        <Box
          py={{
            base: "3",
            lg: "3",
          }}
        >
          <Flex align="center" justify="space-between" mx={5}>
            <Link to="/">
              <Image src={e} w="40px" alt="Logo" rounded="lg" />
            </Link>
            <HStack spacing="3">
              <Link to="/checkout">
                <Button colorScheme="red">
                  <CiShoppingCart size={30} />
                  <span>
                    {baskitItem
                      ? baskitItem.length > 0
                        ? baskitItem.length
                        : ""
                      : ""}
                  </span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
              >
                LogIn as Admin
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Box>
      <DrawerExample
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnRef={btnRef}
      />
    </Box>
  );
};

export default NavBar;

function DrawerExample({ isOpen, onOpen, onClose, btnRef }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
    return;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username, password);
  };
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>LogIn as Admin</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <Input
                type="text"
                size="lg"
                placeholder="Enter the username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
