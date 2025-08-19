"use client";

import Link from "next/link";
import { Box, Flex, Heading, Text, Button, HStack, ChakraProvider, Container } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AboutUs() {
  const router = useRouter();
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="var(--background)">
        <Container maxW="container.xl" px={{ base: 4, md: 8 }} mb={8}>
          <Flex
            minH="360px"
            direction={{ base: "column", md: "row" }}
            w="full"
          >
            {/* 左侧 Logo 区域 */}
            <Box
              flex="1"
              bg="#fef1ed"
              display="flex"
              alignItems="center"
              justifyContent="center"
              minH={{ base: "180px", md: "360px" }}
              borderTopLeftRadius="2xl"
              borderBottomLeftRadius="2xl"
            >
              <Image src="/chuan-logo.jpg" alt="CHUAN Logo" width={128} height={128} />
            </Box>
            {/* 右侧品牌内容 */}
            <Box
              flex="2"
              bg="#3B4A6B"
              color="white"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              px={{ base: 6, md: 16 }}
              py={{ base: 8, md: 0 }}
              minH={{ base: "180px", md: "360px" }}
              borderTopRightRadius="2xl"
              borderBottomRightRadius="2xl"
            >
              <HStack spacing={4} mb={6} flexWrap="wrap">
                <Link href="/">
                  <Button variant="ghost" color="white" _hover={{ bg: "#fef1ed", color: "#3B4A6B" }}>HOME</Button>
                </Link>
                <Link href="/about-us">
                  <Button variant="ghost" color="white" _hover={{ bg: "#fef1ed", color: "#3B4A6B" }}>ABOUT US</Button>
                </Link>
                <Link href="/our-services">
                  <Button variant="ghost" color="white" _hover={{ bg: "#fef1ed", color: "#3B4A6B" }}>OUR SERVICES</Button>
                </Link>
                <Link href="/contact-us">
                  <Button variant="ghost" color="white" _hover={{ bg: "#fef1ed", color: "#3B4A6B" }}>CONTACT US</Button>
                </Link>
              </HStack>
              <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
                About Us
              </Heading>
              <Text fontSize="lg" mb={6}>
                CHUAN is dedicated to bringing real-world yield on-chain. Our team consists of experts in blockchain, finance, and technology, committed to providing users with a secure, transparent, and efficient alternative asset investment experience.
              </Text>
              <Button
                size="lg"
                bg="#fef1ed"
                color="#3B4A6B"
                fontWeight="bold"
                _hover={{ bg: "#e6d3cb" }}
                alignSelf="flex-start"
                onClick={() => router.push("/invest")}
              >
                Start Investing
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
