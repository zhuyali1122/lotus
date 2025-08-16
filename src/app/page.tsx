"use client";
import { useEffect, useState } from "react";
import { Box, Container, Heading, Button, ChakraProvider, Spinner, Flex, Text, VStack, HStack, SimpleGrid, Badge, Icon, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Link from "next/link";
import { Manager } from "../types";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRocket, FaShieldAlt, FaChartLine, FaGlobe } from "react-icons/fa";

// CHUAN Logo Component - Based on Chinese character "串" (chain/connect)
function ChuanLogo() {
  return (
    <Box boxSize="56px" mr={4}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle with gradient */}
        <circle cx="28" cy="28" r="26" fill="url(#bgGradient)" stroke="#3182CE" strokeWidth="2"/>
        
        {/* Main "串" character - three connected circles representing connection */}
        {/* Top circle - 上串 */}
        <circle cx="28" cy="18" r="5" fill="url(#circleGradient1)" stroke="#2B6CB0" strokeWidth="1.5"/>
        
        {/* Middle circle - 中串 */}
        <circle cx="28" cy="28" r="5" fill="url(#circleGradient2)" stroke="#2B6CB0" strokeWidth="1.5"/>
        
        {/* Bottom circle - 下串 */}
        <circle cx="28" cy="38" r="5" fill="url(#circleGradient3)" stroke="#2B6CB0" strokeWidth="1.5"/>
        
        {/* Connecting lines between circles - 连接线 */}
        <line x1="28" y1="23" x2="28" y2="33" stroke="#4299E1" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="28" y1="33" x2="28" y2="43" stroke="#4299E1" strokeWidth="2.5" strokeLinecap="round"/>
        
        {/* Chinese character "串" text overlay - larger and more prominent */}
        <text x="28" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">
          串
        </text>
        
        <defs>
          {/* Background gradient */}
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A365D"/>
            <stop offset="100%" stopColor="#2C5282"/>
          </linearGradient>
          
          {/* Top circle gradient */}
          <linearGradient id="circleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3182CE"/>
            <stop offset="100%" stopColor="#2B6CB0"/>
          </linearGradient>
          
          {/* Middle circle gradient */}
          <linearGradient id="circleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4299E1"/>
            <stop offset="100%" stopColor="#3182CE"/>
          </linearGradient>
          
          {/* Bottom circle gradient */}
          <linearGradient id="circleGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#63B3ED"/>
            <stop offset="100%" stopColor="#4299E1"/>
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}

export default function Home() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);

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

  const bgGradient = "linear-gradient(135deg, #1A365D 0%, #2A4365 50%, #2C5282 100%)";
  const cardBg = "white";
  const cardShadow = "0 8px 32px rgba(0,0,0,0.12)";
  const borderColor = "gray.100";

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        {/* Hero Section */}
        <Box bg={bgGradient} py={20}>
          <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
            <VStack spacing={8} textAlign="center">
              <Flex align="center" justify="center">
                <ChuanLogo />
                <Heading as="h1" size="3xl" color="white" fontWeight="900" letterSpacing="tight">
                  CHUAN
                </Heading>
              </Flex>
              
              <VStack spacing={6} maxW="4xl">
                <Heading as="h2" size="xl" color="white" fontWeight="600" lineHeight="1.2">
                  Where Crypto Meets Real-World Yield
                </Heading>
                <Text fontSize="lg" color="blue.100" fontWeight="500">
                  Unbound, Unlocked, Unstoppable
                </Text>
                <Text fontSize="md" color="blue.200" fontWeight="400">
                  加密混合·无边界·另类资产网络
                </Text>
              </VStack>

              <Button size="lg" colorScheme="blue" px={8} py={6} fontSize="lg" fontWeight="600" _hover={{ transform: "translateY(-2px)" }}>
                Start Investing
              </Button>
            </VStack>
          </Container>
        </Box>

        <Container maxW="container.xl" pt={16} pb={20} px={{ base: 4, md: 8 }}>
          {/* Key Stats Section */}
          <VStack spacing={12} mb={16}>
            <VStack spacing={4}>
              <Heading as="h3" size="lg" color="gray.800" textAlign="center">
                Unprecedented onchain exposure to world-class alternative assets
              </Heading>
              <Text color="gray.600" fontSize="lg" textAlign="center" maxW="2xl">
                Access institutional-grade private credit funds and real-world assets through blockchain technology
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`} textAlign="center">
                <Icon as={FaChartLine} boxSize={8} color="blue.500" mb={4} />
                <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
                  {avgYield}%
                </Text>
                <Text color="gray.600" fontSize="md">
                  Net estimated yield
                </Text>
              </Box>
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`} textAlign="center">
                <Icon as={FaGlobe} boxSize={8} color="blue.500" mb={4} />
                <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
                  {totalAssets.toLocaleString()}+
                </Text>
                <Text color="gray.600" fontSize="md">
                  Total assets
                </Text>
              </Box>
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`} textAlign="center">
                <Icon as={FaShieldAlt} boxSize={8} color="blue.500" mb={4} />
                <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
                  ${(totalAUM / 1000).toFixed(1)}B+
                </Text>
                <Text color="gray.600" fontSize="md">
                  Total fund manager AUM
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>

          {/* Features Section */}
          <VStack spacing={12} mb={16}>
            <VStack spacing={4}>
              <Heading as="h3" size="lg" color="gray.800" textAlign="center">
                Access world-class alternative assets in one single pool
              </Heading>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`}>
                <Icon as={FaRocket} boxSize={8} color="blue.500" mb={4} />
                <Heading as="h4" size="md" color="gray.800" mb={3}>
                  Institutional Grade
                </Heading>
                <Text color="gray.600">
                  Exposure to multi-billion dollar funds from leading alternative asset managers with proven track records.
                </Text>
              </Box>
              <Box bg={cardBg} borderRadius="xl" p={8} boxShadow={cardShadow} border={`1px solid ${borderColor}`}>
                <Icon as={FaShieldAlt} boxSize={8} color="blue.500" mb={4} />
                <Heading as="h4" size="md" color="gray.800" mb={3}>
                  Decades of Experience
                </Heading>
                <Text color="gray.600">
                  Alternative asset managers selected by CHUAN all have 10+ years of experience in their respective markets.
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>

          {/* Fund Managers Table */}
          <VStack spacing={8}>
            <VStack spacing={4}>
              <Heading as="h3" size="lg" color="gray.800" textAlign="center">
                Fund Managers
              </Heading>
              <Text color="gray.600" fontSize="md" textAlign="center">
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
                      <Th>Fund Manager</Th>
                      <Th>Track Record</Th>
                      <Th>AUM</Th>
                      <Th>Historical Yield</Th>
                      <Th>Details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {managers.map((m) => (
                      <Tr key={m.id} _hover={{ bg: "gray.50" }}>
                        <Td fontWeight="semibold" color="gray.700">{m.name}</Td>
                        <Td>{m.assetCount}+ years</Td>
                        <Td>{m.aum}</Td>
                        <Td>
                          <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
                            {m.historicalYield}
                          </Badge>
                        </Td>
                        <Td>
                          <Link href={`/manager/${m.id}`}>
                            <Button colorScheme="blue" variant="outline" size="sm" p={2} minW="auto">
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
              <Heading as="h3" size="lg" color="gray.800">
                Ready to unlock the future of alternative assets?
              </Heading>
              <Text color="gray.600" fontSize="lg" maxW="2xl">
                CHUAN curates a pool of funds from institutional grade managers with a track record of success. 
                Get started now and experience the power of blockchain-enabled alternative investments.
              </Text>
              <Button size="lg" colorScheme="blue" px={8} py={6} fontSize="lg" fontWeight="600">
                Start Investing Today
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
