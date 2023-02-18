import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSoldItemDetails,
  placeOrderDetails,
} from "./features/admin/adminSlice";
import {
  Box,
  Image,
  Flex,
  Button,
  Text,
  Badge,
  useToast,
  Heading,
  Highlight,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const AdminPage = () => {
  const [totalAmountState, setTotalAmountState] = useState(0);
  const [totalProductState, setTotalProductState] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);

  const dispatch = useDispatch();
  const adminData = useSelector(getSoldItemDetails);
  if (adminData) {
    ({ adminData });
  }
  useEffect(() => {
    dispatch(placeOrderDetails());
  }, []);

  useEffect(() => {
    calculater();
  }, [adminData]);

  const calculater = () => {
    let totalAmount = 0;
    let totalProduct = 0;
    let totalDiscountAmount = 0;
    if (adminData.length > 1) {
      for (let i of adminData) {
        if (i?.discountPrice) {
          totalAmount += i?.discountPrice;
        } else {
          totalAmount += i?.realPrice;
        }
        totalDiscountAmount += i?.realPrice - i?.discountPrice;
        totalProduct += i?.products.length;
      }

      setTotalAmountState(totalAmount);
      setTotalProductState(totalProduct);
      setTotalDiscountAmount(totalDiscountAmount);
    }
  };
  return (
    <Box p="2">
      <Flex justify="center">
        <HStack spacing={8} p="3">
          <Wrap>
            {[
              { "Total Orders": adminData.length },
              { "Total Amount": totalAmountState },
              { "Total Product": totalProductState },
              { "Total Discound Amount": totalDiscountAmount },
            ].map((ele) =>
              Object.entries(ele).map((e, index) => (
                <WrapItem>
                  <Details title={e[0]} data={e[1]} key={index} />
                </WrapItem>
              ))
            )}
          </Wrap>
        </HStack>
      </Flex>
      <Box>
        <Box
          shadow="md"
          borderWidth="1px"
          w="100%"
          h="323px"
          overflow="scroll"
          p="2"
        >
          <Text fontSize="3xl" fontWeight="bold">
            Sold Products
          </Text>
          <Flex justify="center" align="center">
            <Wrap>
              {adminData.length > 1 ? (
                adminData.map((ele, index) =>
                  ele.products.map((product, index) => (
                    <WrapItem>
                      <Box
                        w="280px"
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        p={2}
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
                      </Box>
                    </WrapItem>
                  ))
                )
              ) : (
                <h1>Loading</h1>
              )}
            </Wrap>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

const Details = ({ title, data }) => {
  return (
    <Box p={6} w="295px" h="150px" shadow="md" borderWidth="1px">
      <Flex direction="column" gap="35px">
        <Heading fontSize="xl">{title}</Heading>
        <Text fontSize="4xl" fontWeight="bold" textAlign="right">
          {title === "Total Amount" || title.includes("Discound") ? (
            <span>$</span>
          ) : (
            ""
          )}
          {data}
        </Text>
      </Flex>
    </Box>
  );
};
export default AdminPage;
