"use client";
import { useEffect, useState } from "react";
import { Box, Container, Heading, Button, ChakraProvider, Spinner, Flex, Text, VStack, HStack, SimpleGrid, Badge, Icon, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Link from "next/link";
import { Manager } from "../types";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRocket, FaShieldAlt, FaChartLine, FaGlobe } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/managers.json")
      .then((res) => res.json())
      .then((data) => {
        setManagers(data);
        setLoading(false);
      });
  }, []);

  // 统计区块数据
  const totalAUM = managers.reduce((sum, m) => {
    const num = parseFloat((m.aum || "0").replace(/[^\d.]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
  const avgYield = managers.length > 0 ? (managers.reduce((sum, m) => sum + parseFloat((m.historicalYield || "0").replace(/[^\d.]/g, "")), 0) / managers.length).toFixed(2) : "-";
  const totalAssets = managers.reduce((sum, m) => sum + (m.assetCount || 0), 0);

  // 使用全局CSS变量
  const bgGradient = "linear-gradient(135deg, var(--accent) 0%, #2A4365 50%, #2C5282 100%)";
  const cardBg = "var(--secondary-bg)";
  const cardShadow = "0 8px 32px rgba(0,0,0,0.12)";
  const borderColor = "#e2e8f0";
  const mainText = "var(--foreground)";
  const secondaryText = "var(--secondary-text)";

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="var(--background)" color={mainText}>
        {/* Banner Section - 新设计 */}
        <Flex
          minH="360px"
          direction={{ base: "column", md: "row" }}
          w="full"
          px={{ base: 4, md: 24 }} // 两侧留白
        >
          {/* 左侧 Logo 区域 */}
          <Box
            flex="1"
            bg="#F8E9E6"
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
                <Button variant="ghost" color="white" _hover={{ bg: "#F8E9E6", color: "#3B4A6B" }}>HOME</Button>
              </Link>
              <Link href="/about-us">
                <Button variant="ghost" color="white" _hover={{ bg: "#F8E9E6", color: "#3B4A6B" }}>ABOUT US</Button>
              </Link>
              <Link href="/our-services">
                <Button variant="ghost" color="white" _hover={{ bg: "#F8E9E6", color: "#3B4A6B" }}>OUR SERVICES</Button>
              </Link>
              <Link href="/contact-us">
                <Button variant="ghost" color="white" _hover={{ bg: "#F8E9E6", color: "#3B4A6B" }}>CONTACT US</Button>
              </Link>
            </HStack>
            <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
              Welcome to CHUAN
            </Heading>
            <Text fontSize="lg" mb={6}>
              Real World Yield, OnChain.<br />
              Unbound, Unlocked, Unstoppable.<br />
              加密混合·无边界·另类资产网络
            </Text>
            <Button
              size="lg"
              bg="#F8E9E6"
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
        <Container maxW="container.xl" pt={16} pb={20} px={{ base: 4, md: 8 }}>
          {/* Key Stats Section */}
          <VStack spacing={12} mb={16}>
            <VStack spacing={4}>
              <Heading as="h3" size="lg" color={mainText} textAlign="center">
                Unprecedented onchain exposure to world-class alternative assets
              </Heading>
              <Text color={secondaryText} fontSize="lg" textAlign="center" maxW="2xl">
                Access institutional-grade private credit funds and real-world assets through blockchain technology
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`} textAlign="center">
                <Icon as={FaChartLine} boxSize={8} color="var(--accent)" mb={4} />
                <Text fontSize="2xl" fontWeight="bold" color={mainText} mb={2}>
                  {avgYield}%
                </Text>
                <Text color={secondaryText} fontSize="md">
                  Net estimated yield
                </Text>
              </Box>
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`} textAlign="center">
                <Icon as={FaGlobe} boxSize={8} color="var(--accent)" mb={4} />
                <Text fontSize="2xl" fontWeight="bold" color={mainText} mb={2}>
                  {totalAssets.toLocaleString()}+
                </Text>
                <Text color={secondaryText} fontSize="md">
                  Total assets
                </Text>
              </Box>
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`} textAlign="center">
                <Icon as={FaShieldAlt} boxSize={8} color="var(--accent)" mb={4} />
                <Text fontSize="2xl" fontWeight="bold" color={mainText} mb={2}>
                  ${(totalAUM / 1000).toFixed(1)}B+
                </Text>
                <Text color={secondaryText} fontSize="md">
                  Total fund manager AUM
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
          {/* Features Section */}
          <VStack spacing={12} mb={16}>
            <VStack spacing={4}>
              <Heading as="h3" size="lg" color={mainText} textAlign="center">
                Access world-class alternative assets in one single pool
              </Heading>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`}>
                <Icon as={FaRocket} boxSize={8} color="var(--accent)" mb={4} />
                <Heading as="h4" size="md" color={mainText} mb={3}>
                  Institutional Grade
                </Heading>
                <Text color={secondaryText}>
                  Exposure to multi-billion dollar funds from leading alternative asset managers with proven track records.
                </Text>
              </Box>
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`}>
                <Icon as={FaShieldAlt} boxSize={8} color="var(--accent)" mb={4} />
                <Heading as="h4" size="md" color={mainText} mb={3}>
                  Decades of Experience
                </Heading>
                <Text color={secondaryText}>
                  Alternative asset managers selected by CHUAN all have 10+ years of experience in their respective markets.
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
          {/* Fund Managers Table */}
          <VStack spacing={8}>
            <VStack spacing={4}>
              <Heading as="h3" size="lg" color={mainText} textAlign="center">
                Asset Managers
              </Heading>
              <Text color={secondaryText} fontSize="md" textAlign="center">
                Diversified institutional grade alternative assets
              </Text>
            </VStack>
            <Box
              bg={cardBg}
              borderRadius="2xl"
              boxShadow={cardShadow}
              border={`1px solid ${borderColor}`}
              px={{ base: 4, md: 8 }}
              py={8}
              overflowX="auto"
              w="full"
            >
              {loading ? (
                <Box textAlign="center" py={20}><Spinner size="xl" /></Box>
              ) : (
                <Table size="lg">
                  <Thead>
                    <Tr>
                      <Th>Asset Manager</Th>
                      <Th>Track Record</Th>
                      <Th>AUM</Th>
                      <Th>Historical Yield</Th>
                      <Th>Details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {managers.map((m) => (
                      <Tr key={m.id} _hover={{ bg: "#f3f6fa" }}>
                        <Td fontWeight="semibold" color={mainText}>{m.name}</Td>
                        <Td>{m.assetCount}+ years</Td>
                        <Td>{m.aum}</Td>
                        <Td>
                          <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
                            {m.historicalYield}
                          </Badge>
                        </Td>
                        <Td>
                          <Link href={`/manager/${m.id}`}>
                            <Button bg="var(--accent)" color="white" variant="outline" size="sm" p={2} minW="auto" _hover={{ bg: "#25345d" }}>
                              <AiOutlineInfoCircle size={20} />
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Box>
          </VStack>
          {/* CTA Section */}
          <Box bg={cardBg} borderRadius="2xl" p={12} boxShadow={cardShadow} border={`1px solid ${borderColor}`} textAlign="center" mt={16}>
            <VStack spacing={6}>
              <Heading as="h3" size="lg" color={mainText}>
                Ready to unlock the future of alternative assets?
              </Heading>
              <Text color={secondaryText} fontSize="lg" maxW="2xl">
                CHUAN curates a pool of funds from institutional grade managers with a track record of success. 
                Get started now and experience the power of blockchain-enabled alternative investments.
              </Text>
              <Button size="lg" bg="var(--accent)" color="white" px={8} py={6} fontSize="lg" fontWeight="600" _hover={{ bg: "#25345d" }}>
                Start Investing Today
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
