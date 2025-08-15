"use client";
import { useEffect, useState } from "react";
import { Box, Container, Heading, Text, ChakraProvider, defaultSystem, Spinner } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Manager, Asset } from "../../../types";

const COLORS = ["#8884d8", "#82ca9d", "#a4a4a4"];

export default function ManagerDetail() {
  const [manager, setManager] = useState<Manager | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/managers.json")
      .then((res) => res.json())
      .then((data: Manager[]) => {
        const m = data.find((item) => item.id === "kn");
        setManager(m);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <ChakraProvider value={defaultSystem}>
        <Box textAlign="center" py={20}><Spinner size="xl" /></Box>
      </ChakraProvider>
    );
  }

  if (!manager) return <div>未找到管理人信息</div>;
  return (
    <ChakraProvider value={defaultSystem}>
      <Container maxW="container.md" py={10} px={{ base: 2, md: 8 }}>
        <Heading as="h2" size="xl" mb={4}>{manager.name}</Heading>
        <Text color="gray.600" mb={6}>{manager.description}</Text>
        <Box h="250px" mb={8}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={manager.assets}
                dataKey="count"
                nameKey="country"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {manager.assets.map((entry: Asset, idx: number) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Heading as="h3" size="md" mb={4}>资产明细</Heading>
        <Table.Root bg="white" borderRadius="md" boxShadow="md">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>国家</Table.ColumnHeader>
              <Table.ColumnHeader>资产数量</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {manager.assets.map((asset: Asset) => (
              <Table.Row key={asset.country} _hover={{ bg: "gray.50" }}>
                <Table.Cell>{asset.country}</Table.Cell>
                <Table.Cell>{asset.count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
    </ChakraProvider>
  );
} 