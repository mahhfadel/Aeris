import React from 'react';
import { Box, Text} from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import {DashboardResponse} from '@/types/dashboard.types';
import CustomLegend from './CustomLegend ';

interface DashboardComponentProps {
  data: DashboardResponse;
  showLegend?: boolean;
}

const StraightAnglePieChartComponent: React.FC<DashboardComponentProps> = ({ 
  data,
  showLegend
}) => {

    return (
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md" w="100%">
              <Text fontSize="xl" fontWeight="bold" mb={2} color="gray.700">
                {data.titulo}
              </Text>
              
              <Box h="212px" w="100%">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.values}
                      cx="50%"
                      cy="70%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={100}
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
                <Box mt={4}>
                  <CustomLegend data={data.values} orientation="horizontal" />
                </Box>
              )}
              
              <Text fontSize="sm" color="gray.500" mt={4} textAlign="left">
                {data.descricao}
              </Text>
            </Box>
    );
};


export default StraightAnglePieChartComponent;