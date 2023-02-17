import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Wrap,
  WrapItem,
  Text,
  Divider,
  Badge,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";
import CheckoutProduct from "./CheckoutProduct";
import { useSelector, useDispatch } from "react-redux";
import {
  emptyBasket,
  fetchCardItem,
  getCard,
  removeItems,
} from "../features/products/productSlice";

import {
  fetchAllCoupons,
  getAllCoupons,
  getCouponsStatus,
  getCouponError,
} from "../features/coupon/couponSlice";
import {
  checkCoupon,
  getValidateCoupon,
  getValidateCouponStatus,
  getValidateCouponError,
  removeAllState,
} from "../features/coupon/couponValidate";
import { useNavigate } from "react-router-dom";
import {
  checkout,
  getSoldError,
  getSoldStatus,
} from "../features/admin/adminSlice";

const CheckoutPage = () => {
  const [totalSum, setTotalSum] = useState(0);
  const [isDiscount, setIsDiscount] = useState("");
  const [isLoadingCoupon, setLoadingCoupon] = useState(
    useSelector(getValidateCouponStatus)
  );

  const [checkoutData, setCheckoutData] = useState({
    products: null,
    realPrice: 0,
    discount: "10%",
    discountCode: "",
    discountPrice: 0,
  });

  const dispatch = useDispatch();
  const cardItem = useSelector(getCard);
  const allCoupons = useSelector(getAllCoupons);
  const toast = useToast();

  const validForCoupon = useSelector(getValidateCoupon);
  const validCouponError = useSelector(getValidateCouponError);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCardItem());
    dispatch(fetchAllCoupons());

    return () => {
      setTotalSum(0);
      setIsDiscount("");
      setLoadingCoupon("");
      dispatch(removeAllState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (validForCoupon != null) {
      let newSum = Math.ceil((totalSum / 100) * 10);
      setTotalSum((prev) => prev - newSum);
      setIsDiscount(newSum);
      return;
    }
  }, [validForCoupon]);

  useEffect(() => {
    if (cardItem.length > 0) {
      let sum = cardItem.reduce(
        (sum, current) => sum + Math.ceil(current.price),
        0
      );
      setTotalSum(Math.ceil(sum));
    }
  }, [cardItem]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    dispatch(checkCoupon(allCoupons.code));
  };
  const checkOut = (e) => {
    e.preventDefault();

    if (validForCoupon === null) {
      setCheckoutData((checkoutData.realPrice = totalSum));
      setCheckoutData((checkoutData.discountPrice = 0));
      setCheckoutData((checkoutData.discountCode = ""));
      setCheckoutData((checkoutData.discount = ""));
      setCheckoutData((checkoutData.products = cardItem));

      dispatch(checkout(checkoutData));

      dispatch(emptyBasket());
      dispatch(removeItems());
      toast({
        title: `Your Order Placed Successfully. Thanks for Shopping`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 500,
        containerStyle: {
          width: "1000px",
          height: "800px",
          maxWidth: "100%",
        },
      });
      navigate("/");
      return;
    }
    setCheckoutData((checkoutData.realPrice = totalSum + isDiscount));
    setCheckoutData((checkoutData.discountPrice = totalSum));
    setCheckoutData((checkoutData.discountCode = allCoupons.code));
    setCheckoutData((checkoutData.discount = allCoupons.name));
    setCheckoutData((checkoutData.products = cardItem));
    setCheckoutData((checkoutData.discountPrice = totalSum));
    dispatch(checkout(checkoutData));

    dispatch(emptyBasket());
    dispatch(removeItems());
    toast({
      title: `Your Order Placed Successfully. Thanks for Shopping`,
      status: "success",
      isClosable: true,
      position: "top",
      duration: 500,
      containerStyle: {
        width: "1000px",
        height: "800px",
        maxWidth: "100%",
      },
    });
    navigate("/");
    return;
    // }
  };

  return (
    <Box m="5">
      <Flex justify="space-between" align="center">
        <Box
          w="70%"
          h="480px"
          p={2}
          overflowX="auto"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Wrap>
            {cardItem && cardItem.length > 0 ? (
              cardItem.map((item, index) => (
                <WrapItem>
                  <CheckoutProduct
                    key={index}
                    product={item}
                    coupons={allCoupons}
                  />
                </WrapItem>
              ))
            ) : (
              <Text>Card is Empty</Text>
            )}
          </Wrap>
        </Box>
        <Box
          w="30%"
          h="470px"
          border="1px"
          borderColor="gray.200"
          boxShadow="lg"
          rounded="md"
          p="3"
        >
          <Text fontSize="5xl">BILL</Text>
          <Divider />

          <Flex
            w="100%"
            h="50%"
            direction="column"
            align="end"
            overflowY="scroll"
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {cardItem.length > 0 ? (
              cardItem.map((item, index) => (
                <Text fontSize="3xl" key={index}>
                  ${item.price}
                </Text>
              ))
            ) : (
              <h1>Loading</h1>
            )}
          </Flex>
          <Divider />
          <Box>
            <Badge w="full" p="3">
              <Flex gap="4px" justify="space-between">
                {validForCoupon && isDiscount ? (
                  <Button colorScheme="teal" variant="ghost" rounded="4xl">
                    Applied
                  </Button>
                ) : (
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    rounded="4xl"
                    onClick={handleApplyCoupon}
                    isLoading={isLoadingCoupon}
                    loadingText="Checking"
                  >
                    Apply
                  </Button>
                )}

                <Center>
                  <Badge
                    variant="subtle"
                    colorScheme="green"
                    p="2"
                    cursor="pointer"
                  >
                    {isDiscount && validForCoupon ? (
                      <span>-${isDiscount}</span>
                    ) : (
                      <div>
                        <span> </span>
                        <span>{allCoupons.name}</span>
                      </div>
                    )}
                  </Badge>
                </Center>
              </Flex>
            </Badge>
          </Box>
          <Divider />
          <Box>
            <Text fontSize="3xl">
              <Flex w="100%" h="60%" justify="space-between">
                <span>Total</span>
                <span>${totalSum ?? 0}</span>
              </Flex>
            </Text>
          </Box>
          <Flex justify={"end"}>
            <Box w="full">
              <Button w="full" colorScheme="red" onClick={checkOut}>
                Place Order
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CheckoutPage;
