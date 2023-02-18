import React from "react";
import {
  Box,
  Image,
  Flex,
  Button,
  Text,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";

const Product = ({ product, isAdded, handleItemToCard }) => {
  const toast = useToast();

  return (
    <Box
      w="280px"
      h="345px"
      bg="white"
      border="1px"
      borderColor="gray.200"
      boxShadow="lg"
      rounded="md"
      p={1}
    >
      <Flex justify="center" direction="column">
        <Image
          w="240px"
          h="240px"
          src={product.image}
          alt={product.title}
          borderRadius="lg"
        />
        <Box h={50} style={{ overflow: "hidden" }}>
          <Text fontSize="md" fontWeight="bold" fontFamily="Raleway" mx={2}>
            {product.title}
          </Text>
        </Box>
        <div>
          <Flex align="center" justify="space-between">
            <Badge
              variant="subtle"
              colorScheme="green"
              fontSize="1.6em"
              letterSpacing={0.5}
            >
              <span>$</span>
              {product.price}
            </Badge>
            <Button
              onClick={(e) => {
                handleItemToCard(e, product, isAdded);
                if (!isAdded) {
                  return toast({
                    title: `Item Added Successfully`,
                    status: "success",
                    isClosable: true,
                    position: "bottom-left",
                  });
                } else {
                  return toast({
                    title: `Item Removed Successfully`,
                    status: "success",
                    isClosable: true,
                    position: "bottom-left",
                  });
                }
              }}
              colorScheme={isAdded ? "red" : "whatsapp"}
            >
              {isAdded ? <AiOutlineDelete /> : "Add item"}
            </Button>
          </Flex>
        </div>
      </Flex>
    </Box>
  );
};

export default Product;
