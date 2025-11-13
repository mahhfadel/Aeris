import React from 'react';
import { Box, Text, HStack, VStack} from '@chakra-ui/react';
import {DataDashboardResponse} from '@/types/dashboard.types';

interface DashboardComponentProps {
  data: DataDashboardResponse[];
   orientation?: 'vertical' | 'horizontal';
}

const CustomLegend: React.FC<DashboardComponentProps> = ({ 
  data,
  orientation = 'vertical',
}) => {
    const Container = orientation === 'vertical' ? VStack : HStack;
    
    return (
        <Container align="start" gap={2} flexWrap="wrap">
        {data.map((item, index) => (
            <HStack key={index} gap={2}>
            <Box w="12px" h="12px" borderRadius="full" bg={item.fill} />
            <Text fontSize="sm" color="gray.600">
                {item.name}: {item.value}
            </Text>
            </HStack>
        ))}
        </Container>
    );
};

export default CustomLegend;