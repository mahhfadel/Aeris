import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import {DashboardResponse} from '@/types/dashboard.types';

interface DashboardComponentProps {
  data: DashboardResponse;
}

const SingleValueComponent: React.FC<DashboardComponentProps> = ({ 
  data
}) => {
  const totalValue = data.values.reduce((sum, item) => sum + item.value, 0);

  return (
      <Box p={4} bg="white" borderRadius="lg" boxShadow="md" w="100%"  h="200px" textAlign="center">
          <Text fontSize="xl" fontWeight="bold" mb={2} color="gray.700">
            {data.titulo}
          </Text>
          
          <Text fontSize="6xl" fontWeight="bold" color="#AC4A00">
            {totalValue.toLocaleString()}
          </Text>
          
          <Text fontSize="sm" color="gray.500">
            {data.descricao}
          </Text>
        </Box>
  );
};


export default SingleValueComponent;