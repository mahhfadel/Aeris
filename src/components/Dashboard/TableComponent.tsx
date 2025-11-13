import React from 'react';
import { Box, Text, Table} from '@chakra-ui/react';
import {DashboardResponse} from '@/types/dashboard.types';

interface DashboardComponentProps {
  data: DashboardResponse;
  showDescription: boolean;
}

const TableComponent: React.FC<DashboardComponentProps> = ({data, showDescription}) => {
  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md" w="100%">
      <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.700">
        {data.titulo}
      </Text>
      
      <Box overflowX="auto">
        <Table.Root variant="line" bg="white" color="#191919">
          <Table.Body>
            {data.values.map((item, index) => (
              <Table.Row key={index} bg={index % 2 === 0 ? 'gray.50' : 'white'}>
                <Table.Cell textAlign="left" fontWeight="medium">
                  {item.name}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      
      {showDescription && (
        <Text fontSize="sm" color="gray.500" mt={4} textAlign="left">
          {data.descricao}
        </Text>
      )}
    </Box>
  );
};


export default TableComponent;