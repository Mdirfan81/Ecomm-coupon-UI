import React, { useEffect } from "react";
import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import ProductSkeleton from "./skeleton/ProductSkeleton";
import Product from "./component/Product";
import {
  fetchAllProducts,
  getAllProducts,
  getCard,
  addCardItem,
  fetchCardItem,
  add,
  remove,
  removeCardItem,
} from "./features/products/productSlice";

import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const dispatch = useDispatch();
  const allProducts = useSelector(getAllProducts);
  const baskitItem = useSelector(getCard);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCardItem());
  }, []);

  const handleItemToCard = (e, payload, isAdded) => {
    e.preventDefault();
    if (!isAdded) {
      dispatch(addCardItem(payload));
      dispatch(add(payload));
    } else {
      dispatch(remove(payload));
      dispatch(removeCardItem(payload));
    }
  };
  const renderProduct =
    allProducts.length > 1
      ? allProducts.map((product, index) => (
          <Product
            key={index}
            product={product}
            handleItemToCard={handleItemToCard}
            isAdded={
              baskitItem.length > 0
                ? baskitItem.some((ele) => ele.id === product.id)
                : false
            }
          />
        ))
      : new Array(20).fill(1).map((ele, index) => (
          <WrapItem>
            <ProductSkeleton key={index} isLoaded={isLoaded} />
          </WrapItem>
        ));
  return (
    <Box m={3}>
      <Wrap spacing="25px">{renderProduct}</Wrap>
    </Box>
  );
};

//
export default HomePage;
