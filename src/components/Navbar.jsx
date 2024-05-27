import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="blue.500" px={4} py={2} mb={6}>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white">
          <Link to="/">Postboard</Link>
        </Heading>
      </Flex>
    </Box>
  );
};

export default Navbar;