"use client";
import { useEffect, useState } from "react";
import { Box, Container, Heading, Button, ChakraProvider, defaultSystem, Spinner, Flex, Text } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import Link from "next/link";
import { Manager } from "../types";
import { AiOutlineInfoCircle } from "react-icons/ai";

// 简单 Lotus 图标 SVG
function LotusLogo() {
  return (
    <Box boxSize="48px" mr={3}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="40" rx="12" ry="4" fill="#BFC7D1"/>
        <path d="M24 38C24 38 19 32 19 24C19 16 24 10 24 10C24 10 29 16 29 24C29 32 24 38 24 38Z" fill="#6B7A8F"/>
        <path d="M24 38C24 38 22 34 22 28C22 22 24 18 24 18C24 18 26 22 26 28C26 34 24 38 24 38Z" fill="#A0AEC0"/>
        <path d="M24 38C24 38 14 32 14 22C14 12 24 10 24 10C24 10 34 12 34 22C34 32 24 38 24 38Z" stroke="#6B7A8F" strokeWidth="2" fill="none"/>
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

  // 固定浅色模式
  const cardBg = "white";
  const cardShadow = "0 4px 24px rgba(160,174,192,0.12)";
  const borderColor = "gray.200";

  return (
    <ChakraProvider value={defaultSystem}>
      <Box minH="100vh" bg="#F7FAFC">
        <Container maxW="container.xl" pt={10} pb={16} px={{ base: 2, md: 8 }}>
          {/* 顶部品牌区块 */}
          <Flex align="center" mb={8} justify="center">
            <LotusLogo />
            <Heading as="h1" size="2xl" letterSpacing="tight" color="gray.800" fontWeight="bold">
              Lotus
            </Heading>
          </Flex>
          <Text textAlign="center" color="gray.500" fontSize="xl" mb={10}>
            东南亚个人信贷管理人对比平台
          </Text>
          {/* 统计区块 */}
          <Flex direction="row" gap={8} justify="center" mb={10}>
            <Box bg={cardBg} borderRadius="lg" px={8} py={4} boxShadow={cardShadow} border={`1px solid ${borderColor}`} minW="200px" textAlign="center">
              <Text color="gray.500" fontSize="md" mb={2}>总管理规模</Text>
              <Text fontSize="2xl" fontWeight="bold">${totalAUM.toLocaleString()} USD</Text>
            </Box>
            <Box bg={cardBg} borderRadius="lg" px={8} py={4} boxShadow={cardShadow} border={`1px solid ${borderColor}`} minW="200px" textAlign="center">
              <Text color="gray.500" fontSize="md" mb={2}>平均历史收益率</Text>
              <Text fontSize="2xl" fontWeight="bold">{avgYield}%</Text>
            </Box>
            <Box bg={cardBg} borderRadius="lg" px={8} py={4} boxShadow={cardShadow} border={`1px solid ${borderColor}`} minW="200px" textAlign="center">
              <Text color="gray.500" fontSize="md" mb={2}>底层资产总数</Text>
              <Text fontSize="2xl" fontWeight="bold">{totalAssets.toLocaleString()}</Text>
            </Box>
          </Flex>
          {/* 表格区块 */}
          <Box
            bg={cardBg}
            borderRadius="2xl"
            boxShadow={cardShadow}
            border={`1px solid ${borderColor}`}
            px={{ base: 2, md: 8 }}
            py={6}
            overflowX="auto"
          >
            {loading ? (
              <Box textAlign="center" py={20}><Spinner size="xl" /></Box>
            ) : (
              <Table.Root size="lg">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>管理人名称</Table.ColumnHeader>
                    <Table.ColumnHeader>历史收益率</Table.ColumnHeader>
                    <Table.ColumnHeader>底层资产个数</Table.ColumnHeader>
                    <Table.ColumnHeader>总管理规模</Table.ColumnHeader>
                    <Table.ColumnHeader>详情</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {managers.map((m) => (
                    <Table.Row key={m.id} _hover={{ bg: "gray.50" }}>
                      <Table.Cell fontWeight="semibold" color="gray.700">{m.name}</Table.Cell>
                      <Table.Cell>{m.historicalYield}</Table.Cell>
                      <Table.Cell>{m.assetCount}</Table.Cell>
                      <Table.Cell>{m.aum}</Table.Cell>
                      <Table.Cell>
                        <Link href={`/manager/${m.id}`}>
                          <Button colorScheme="gray" variant="outline" size="sm" p={2} minW={"auto"}>
                            <AiOutlineInfoCircle size={32} color="#4A5568" />
                          </Button>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            )}
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
