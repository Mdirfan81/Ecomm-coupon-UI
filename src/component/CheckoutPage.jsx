import React, { useEffect } from "react";
import { Box, Flex, Wrap, WrapItem, Text } from "@chakra-ui/react";
import CheckoutProduct from "./CheckoutProduct";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardItem, getCard } from "../features/products/productSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cardItem = useSelector(getCard);

  useEffect(() => {
    dispatch(fetchCardItem());
  }, [dispatch]);

  return (
    <Box m="5">
      <Flex justify="space-between" align="center">
        <Box w="70%" h="470px" p={2} overflowX="auto">
          <Wrap>
            {cardItem && cardItem.length > 0 ? (
              cardItem.map((item, index) => (
                <WrapItem>
                  <CheckoutProduct key={index} product={item} />
                </WrapItem>
              ))
            ) : (
              <Text>No Item Found</Text>
            )}
          </Wrap>
        </Box>
        <Box w="30%" h="470px" border="1px solid black">
          Calculate
        </Box>
      </Flex>
    </Box>
  );
};

export default CheckoutPage;
