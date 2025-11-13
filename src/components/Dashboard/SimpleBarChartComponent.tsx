import React from 'react';
import { Box, Text} from '@chakra-ui/react';
import {Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {DashboardResponse} from '@/types/dashboard.types';
import CustomLegend from './CustomLegend ';

interface DashboardComponentProps {
  data: DashboardResponse;
  showLegend?: boolean;
  showDescription: boolean;
}

const SimpleBarChartComponent: React.FC<DashboardComponentProps> = ({ 
  data,
  showLegend,
  showDescription
}) => {

    return (
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md" w="100%">
              <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.700">
                {data.titulo}
              </Text>
              
              <Box h="232px" w="100%">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.values}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {data.values.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              
              {showLegend && (
                <Box mt={4}>
                  <CustomLegend data={data.values} orientation="horizontal" />
                </Box>
              )}
              
              {showDescription && (
                <Text fontSize="sm" color="gray.500" mt={4} textAlign="left">
                  {data.descricao}
                </Text>
              )}
            </Box>
    );
};


export default SimpleBarChartComponent;