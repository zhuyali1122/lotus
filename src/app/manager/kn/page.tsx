"use client";
import { useEffect, useState } from "react";
import { Box, Container, Heading, Text, ChakraProvider, Spinner, VStack, HStack, Badge, Button, Flex, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Manager, Asset } from "../../../types";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const COLORS = ["#F8E9E6", "#3B4A6B", "#4299E1", "#90CDF4", "#63B3ED"];

export default function ManagerDetail() {
  const [manager, setManager] = useState<Manager | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/managers.json")
      .then((res) => res.json())
      .then((data: Manager[]) => {
        const m = data.find((item) => item.id === "kn");
        setManager(m || null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <ChakraProvider>
        <Box textAlign="center" py={20}><Spinner size="xl" /></Box>
      </ChakraProvider>
    );
  }

  if (!manager) return <div>Manager information not found</div>;
  
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="var(--background)">
        <Container maxW="container.lg" py={10} px={{ base: 4, md: 8 }}>
          {/* Back Navigation */}
          <Link href="/">
            <Button leftIcon={<ArrowBackIcon />} variant="ghost" bg="#F8E9E6" color="#3B4A6B" _hover={{ bg: "#f3d9d4" }} mb={6}>
              Back to CHUAN
            </Button>
          </Link>

          {/* Manager Header */}
          <VStack spacing={6} align="stretch" mb={10}>
            <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0">
              <VStack spacing={4} align="stretch">
                <Heading as="h1" size="2xl" color="#3B4A6B" textAlign="center">
                  {manager.name}
                </Heading>
                <Text color="#3B4A6B" fontSize="lg" textAlign="center" maxW="3xl">
                  {manager.description}
                </Text>
                
                {/* Key Metrics */}
                <HStack spacing={8} justify="center" mt={4}>
                  <VStack spacing={2}>
                    <Text color="#3B4A6B" fontSize="sm" fontWeight="500">Historical Yield</Text>
                    <Badge bg="#3B4A6B" color="#F8E9E6" px={4} py={2} fontSize="lg" borderRadius="full">
                      {manager.historicalYield}
                    </Badge>
                  </VStack>
                  <VStack spacing={2}>
                    <Text color="#3B4A6B" fontSize="sm" fontWeight="500">Total AUM</Text>
                    <Text fontSize="lg" fontWeight="bold" color="#3B4A6B">{manager.aum}</Text>
                  </VStack>
                  <VStack spacing={2}>
                    <Text color="#3B4A6B" fontSize="sm" fontWeight="500">Asset Count</Text>
                    <Text fontSize="lg" fontWeight="bold" color="#3B4A6B">{manager.assetCount}</Text>
                  </VStack>
                </HStack>
                <Button mt={6} size="lg" bg="#F8E9E6" color="#3B4A6B" fontWeight="bold" _hover={{ bg: "#f3d9d4" }} alignSelf="center" onClick={() => router.push("/manager/kn/invest")}>Start Investing</Button>
              </VStack>
            </Box>
          </VStack>

          {/* Asset Distribution Chart */}
          <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0" mb={10}>
            <VStack spacing={6}>
              <Heading as="h2" size="lg" color="#3B4A6B" textAlign="center">
                Asset Distribution
              </Heading>
              <Text color="#3B4A6B" textAlign="center" maxW="2xl">
                Geographic distribution of underlying assets managed by {manager.name}
              </Text>
              <Box h="300px" w="full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={manager.assets}
                      dataKey="count"
                      nameKey="country"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ country, percent }) => `${country} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    >
                      {manager.assets.map((entry: Asset, idx: number) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Button mt={6} size="lg" bg="#F8E9E6" color="#3B4A6B" fontWeight="bold" _hover={{ bg: "#f3d9d4" }} alignSelf="center" onClick={() => router.push("/manager/kn/invest")}>Start Investing</Button>
            </VStack>
          </Box>

          {/* Asset Details Table */}
          <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0">
            <VStack spacing={6}>
              <Heading as="h3" size="lg" color="#3B4A6B" textAlign="center">
                Asset Details
              </Heading>
              <Table size="lg">
                <Thead>
                  <Tr>
                    <Th>Country/Region</Th>
                    <Th>Asset Count</Th>
                    <Th>Percentage</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {manager.assets.map((asset: Asset, idx: number) => {
                    const percentage = ((asset.count / manager.assetCount) * 100).toFixed(1);
                    return (
                      <Tr key={asset.country} _hover={{ bg: "#FDECEC" }}>
                        <Td fontWeight="semibold" color="#3B4A6B">
                          <HStack spacing={3}>
                            <Box w={4} h={4} borderRadius="full" bg={COLORS[idx % COLORS.length]} />
                            {asset.country}
                          </HStack>
                        </Td>
                        <Td>{asset.count.toLocaleString()}</Td>
                        <Td>
                          <Badge bg="#3B4A6B" color="#F8E9E6" px={3} py={1} borderRadius="full">
                            {percentage}%
                          </Badge>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Button mt={6} size="lg" bg="#F8E9E6" color="#3B4A6B" fontWeight="bold" _hover={{ bg: "#f3d9d4" }} alignSelf="center" onClick={() => router.push("/manager/kn/invest")}>Start Investing</Button>
            </VStack>
          </Box>

          {/* CTA Section */}
          <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0" mt={10} textAlign="center">
            <VStack spacing={6}>
              <Heading as="h3" size="lg" color="#3B4A6B">
                Ready to invest with {manager.name}?
              </Heading>
              <Text color="#3B4A6B" fontSize="lg" maxW="2xl">
                Access institutional-grade alternative assets through CHUAN's curated platform. 
                Start your investment journey today.
              </Text>
              <Button size="lg" bg="#3B4A6B" color="#F8E9E6" px={8} py={6} fontSize="lg" fontWeight="600" _hover={{ bg: "#25345d" }} onClick={() => router.push("/manager/kn/invest")}>Start Investing</Button>
            </VStack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
} 