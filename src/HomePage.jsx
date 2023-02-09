import React from "react";
import { Box, Container, Wrap, WrapItem } from "@chakra-ui/react";
import ProductSkeleton from "./skeleton/ProductSkeleton";
import Product from "./component/Product";

const HomePage = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  return (
    <Box m={3}>
      <Wrap>
        {isLoading ? (
          new Array(20).fill(1).map((ele, index) => (
            <WrapItem>
              <ProductSkeleton isLoaded={isLoaded} key={index} />
            </WrapItem>
          ))
        ) : (
          <Product />
        )}
      </Wrap>
    </Box>
  );
};

export default HomePage;
