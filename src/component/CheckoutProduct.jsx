import React, { useState } from "react";
import { Box, Image, Flex, Text, Button, Input } from "@chakra-ui/react";
import { remove, removeCardItem } from "../features/products/productSlice";
import { useDispatch } from "react-redux";

const CheckoutProduct = ({ product }) => {
  const [productCounter, setProductCounter] = useState(1);
  const dispatch = useDispatch();

  const incrementCounter = (e) => {
    e.preventDefault();
  };
  const decrementCounter = (e) => {
    e.preventDefault();
    if (productCounter <= 0) {
      console.log("Remove this element");
      //      dispatch(remove(payload));
      //   dispatch(removeCardItem(payload));
    }
    if (productCounter > 0) {
      setProductCounter((prev) => prev - 1);
    }
  };
  return (
    <Box w="52rem" border="1px" borderColor="gray.200" borderRadius="2xl" p={2}>
      <Flex gap="20px">
        <Box>
          <Image
            src={product.image}
            alt="product Image"
            boxSize="150px"
            objectFit="scale-down"
            borderRadius="2xl"
            w="10rem"
          />
        </Box>
        <Flex direction="column" gap={2}>
          <Box>
            <Text fontSize="3xl" noOfLines={1}>
              {product.title}
            </Text>
          </Box>
          <Box>
            <Flex gap="3px">
              <Button
                colorScheme="teal"
                variant="ghost"
                _hover={{ bg: "red", color: "white" }}
                onClick={decrementCounter}
              >
                -
              </Button>
              <Input width="60px" value={productCounter} />
              <Button
                colorScheme="teal"
                variant="ghost"
                _hover={{ bg: "green", color: "white" }}
                onClick={incrementCounter}
              >
                +
              </Button>
            </Flex>
          </Box>
          <Box>
            <Text
              color="red"
              fontSize="3xl"
              noOfLines={1}
              fontWeight="extrabold"
            >
              <span>$</span>
              {product.price}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CheckoutProduct;
