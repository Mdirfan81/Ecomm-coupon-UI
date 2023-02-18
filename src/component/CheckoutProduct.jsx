import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Flex,
  Text,
  Button,
  Input,
  useToast,
  Badge,
  Center,
} from "@chakra-ui/react";

import {
  applyCoupon,
  remove,
  removeCardItem,
} from "../features/products/productSlice";

import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { removeAllState } from "../features/coupon/couponValidate";

const CheckoutProduct = ({ product, coupons }) => {
  const [productCounter, setProductCounter] = useState(1);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (productCounter < 1) {
      dispatch(remove(product));
      dispatch(removeCardItem(product));
    }
  }, [productCounter]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(remove(product));
    dispatch(removeCardItem(product));
    dispatch(removeAllState());

    toast({
      title: `Item Removed Successfully`,
      status: "success",
      isClosable: true,
      position: "bottom-left",
    });
  };
  return (
    <Box
      w={["md", "1xl", "52rem"]}
      border="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      p={2}
      // display={{ md: "flex" }}
    >
      <Flex gap="20px" display={{ md: "flex" }}>
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
      <Flex justify="end" gap="10px">
        <Center></Center>
        <Button colorScheme="red" onClick={handleDelete}>
          <AiOutlineDelete />
        </Button>
      </Flex>
    </Box>
  );
};

export default CheckoutProduct;
