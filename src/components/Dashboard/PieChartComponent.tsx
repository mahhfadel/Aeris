import React from 'react';
import { Box, Text, Flex} from '@chakra-ui/react';
import { PieChart, Pie, Cell,Tooltip, ResponsiveContainer } from 'recharts';
import {DashboardResponse} from '@/types/dashboard.types';
import CustomLegend from './CustomLegend ';

interface DashboardComponentProps {
  data: DashboardResponse;
  showLegend?: boolean;
  showDescription: boolean;
}

const PieChartComponent: React.FC<DashboardComponentProps> = ({ 
  data,
  showLegend,
  showDescription
}) => {

    return (
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md" w="100%">
              <Text fontSize="xl" fontWeight="bold" mb={2} color="gray.700">
                {data.titulo}
              </Text>
              
              <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" gap={4}>
                <Box flex={1} h="250px" w="100%">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.values}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.values.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                
                {showLegend && (
                  <Box>
                    <CustomLegend data={data.values} orientation="vertical" />
                  </Box>
                )}
              </Flex>
              
              {showDescription && (
                <Text fontSize="sm" color="gray.500" mt={4} textAlign="left">
                  {data.descricao}
                </Text>
              )}
            </Box>
    );
};


export default PieChartComponent;