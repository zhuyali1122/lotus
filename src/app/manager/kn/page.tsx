"use client";
import { useEffect, useState } from "react";
import { Box, Container, Heading, Text, ChakraProvider, Spinner, VStack, HStack, Badge, Button, Flex, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Manager, Asset } from "../../../types";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";

const COLORS = ["#3182CE", "#2B6CB0", "#4299E1", "#90CDF4", "#63B3ED"];

export default function ManagerDetail() {
  const [manager, setManager] = useState<Manager | null>(null);
  const [loading, setLoading] = useState(true);

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
      <Box minH="100vh" bg="gray.50">
        <Container maxW="container.lg" py={10} px={{ base: 4, md: 8 }}>
          {/* Back Navigation */}
          <Link href="/">
            <Button leftIcon={<ArrowBackIcon />} variant="ghost" colorScheme="blue" mb={6}>
              Back to CHUAN
            </Button>
          </Link>

          {/* Manager Header */}
          <VStack spacing={6} align="stretch" mb={10}>
            <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0">
              <VStack spacing={4} align="stretch">
                <Heading as="h1" size="2xl" color="gray.800" textAlign="center">
                  {manager.name}
                </Heading>
                <Text color="gray.600" fontSize="lg" textAlign="center" maxW="3xl">
                  {manager.description}
                </Text>
                
                {/* Key Metrics */}
                <HStack spacing={8} justify="center" mt={4}>
                  <VStack spacing={2}>
                    <Text color="gray.500" fontSize="sm" fontWeight="500">Historical Yield</Text>
                    <Badge colorScheme="green" variant="solid" px={4} py={2} fontSize="lg" borderRadius="full">
                      {manager.historicalYield}
                    </Badge>
                  </VStack>
                  <VStack spacing={2}>
                    <Text color="gray.500" fontSize="sm" fontWeight="500">Total AUM</Text>
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">{manager.aum}</Text>
                  </VStack>
                  <VStack spacing={2}>
                    <Text color="gray.500" fontSize="sm" fontWeight="500">Asset Count</Text>
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">{manager.assetCount}</Text>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
          </VStack>

          {/* Asset Distribution Chart */}
          <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0" mb={10}>
            <VStack spacing={6}>
              <Heading as="h2" size="lg" color="gray.800" textAlign="center">
                Asset Distribution
              </Heading>
              <Text color="gray.600" textAlign="center" maxW="2xl">
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
            </VStack>
          </Box>

          {/* Asset Details Table */}
          <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0">
            <VStack spacing={6}>
              <Heading as="h3" size="lg" color="gray.800" textAlign="center">
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
                      <Tr key={asset.country} _hover={{ bg: "gray.50" }}>
                        <Td fontWeight="semibold" color="gray.700">
                          <HStack spacing={3}>
                            <Box w={4} h={4} borderRadius="full" bg={COLORS[idx % COLORS.length]} />
                            {asset.country}
                          </HStack>
                        </Td>
                        <Td>{asset.count.toLocaleString()}</Td>
                        <Td>
                          <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="full">
                            {percentage}%
                          </Badge>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </VStack>
          </Box>

          {/* CTA Section */}
          <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0" mt={10} textAlign="center">
            <VStack spacing={6}>
              <Heading as="h3" size="lg" color="gray.800">
                Ready to invest with {manager.name}?
              </Heading>
              <Text color="gray.600" fontSize="lg" maxW="2xl">
                Access institutional-grade alternative assets through CHUAN's curated platform. 
                Start your investment journey today.
              </Text>
              <Button size="lg" colorScheme="blue" px={8} py={6} fontSize="lg" fontWeight="600">
                Invest Now
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
} 