"use client";
import { Box, Flex, Heading, Text, Button, VStack, HStack, Badge, ChakraProvider, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

// 示例历史数据
const historyData = [
  { date: "2024-01", value: 100 },
  { date: "2024-02", value: 102 },
  { date: "2024-03", value: 105 },
  { date: "2024-04", value: 110 },
  { date: "2024-05", value: 108 },
  { date: "2024-06", value: 115 },
];

const certificateData = [
  { name: "Priority Note A", amount: "$1,000,000", yield: "6.5%", maturity: "2025-12-31", repaid: "$200,000", repayDate: "2024-12-31" },
  { name: "Priority Note B", amount: "$500,000", yield: "7.2%", maturity: "2026-06-30", repaid: "$100,000", repayDate: "2025-06-30" },
];

export default function InvestPage() {
  const [modalType, setModalType] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (type: string) => {
    setModalType(type);
    onOpen();
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "yield": return "Yield History";
      case "asset": return "Asset Count History";
      case "nav": return "NAV History";
      case "shares": return "Total Shares History";
      default: return "";
    }
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="var(--background)">
        <Flex direction="column" align="center" py={12} px={{ base: 4, md: 24 }}>
          {/* 回到主页的链接 */}
          <Box w="full" maxW="4xl" mb={4}>
            <Link href="/">
              <Button variant="ghost" color="#3B4A6B" _hover={{ bg: "#F8E9E6" }}>Back to Home</Button>
            </Link>
          </Box>
          <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0" w="full" maxW="4xl" mb={10}>
            <Heading as="h1" size="xl" color="#3B4A6B" mb={6} textAlign="center">BlockChuan</Heading>
            <HStack spacing={8} justify="center" flexWrap="wrap">
              <VStack spacing={2}>
                <Text color="#3B4A6B" fontSize="sm" fontWeight="500">Yield</Text>
                <Button variant="ghost" color="#3B4A6B" onClick={() => openModal("yield")}>6.5%</Button>
              </VStack>
              <VStack spacing={2}>
                <Text color="#3B4A6B" fontSize="sm" fontWeight="500">Asset Count</Text>
                <Button variant="ghost" color="#3B4A6B" onClick={() => openModal("asset")}>12</Button>
              </VStack>
              <VStack spacing={2}>
                <Text color="#3B4A6B" fontSize="sm" fontWeight="500">NAV</Text>
                <Button variant="ghost" color="#3B4A6B" onClick={() => openModal("nav")}>$2,500,000</Button>
              </VStack>
              <VStack spacing={2}>
                <Text color="#3B4A6B" fontSize="sm" fontWeight="500">Total Shares</Text>
                <Button variant="ghost" color="#3B4A6B" onClick={() => openModal("shares")}>1,000,000</Button>
              </VStack>
            </HStack>
          </Box>

          {/* Modal for history charts */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{getModalTitle()}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historyData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3B4A6B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Priority Certificates Table */}
          <Box bg="white" borderRadius="2xl" p={8} boxShadow="0 8px 32px rgba(0,0,0,0.12)" border="1px solid #E2E8F0" w="full" maxW="4xl">
            <Heading as="h2" size="lg" color="#3B4A6B" mb={6} textAlign="center">Priority Certificates</Heading>
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Investment Amount</Th>
                  <Th>Expected Yield</Th>
                  <Th>Expected Maturity</Th>
                  <Th>Repaid Amount</Th>
                  <Th>Expected Repayment</Th>
                </Tr>
              </Thead>
              <Tbody>
                {certificateData.map((item, idx) => (
                  <Tr key={item.name} _hover={{ bg: "#FDECEC" }}>
                    <Td fontWeight="semibold" color="#3B4A6B">{item.name}</Td>
                    <Td>{item.amount}</Td>
                    <Td>{item.yield}</Td>
                    <Td>{item.maturity}</Td>
                    <Td>{item.repaid}</Td>
                    <Td>{item.repayDate}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
