import React from "react";
import { Box, Image, Flex, Button, Text, Badge } from "@chakra-ui/react";
const Product = () => {
  return (
    <Box
      w="250px"
      h="345px"
      bg="white"
      border="1px"
      borderColor="gray.200"
      boxShadow="xs"
      rounded="md"
      p={1}
    >
      <Flex justify="center" direction="column">
        <Image
          w="240px"
          objectFit="cover"
          src="https://bit.ly/dan-abramov"
          alt="TV"
          borderRadius="lg"
        />
        <Box h={50} style={{ overflow: "hidden" }}>
          <Text fontSize="md" fontWeight="bold" fontFamily="Raleway">
            Mens Casual Premium Slim Fit T-Shirts
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
              <span>$</span>22.3
            </Badge>

            <Button colorScheme="whatsapp">Add to card</Button>
          </Flex>
        </div>
      </Flex>
    </Box>
  );
};

export default Product;
