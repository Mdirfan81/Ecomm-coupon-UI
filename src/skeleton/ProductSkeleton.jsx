import React from "react";
import { Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";

const ProductSkeleton = ({ isLoaded }) => {
  return (
    <Box m={5} w="250px" h="250px" padding="6" boxShadow="lg" bg="white">
      <Skeleton height="100px" isLoaded={isLoaded}></Skeleton>
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ProductSkeleton;
