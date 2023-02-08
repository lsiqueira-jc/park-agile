import { Box, Button, Flex, Heading, Icon, Text, VStack } from 'native-base';
import React, { useState } from 'react';
export function ConfirmReserv({ route, navigation }) {
  const hours = [
    {
      hours: '1-2',
      value: 10,
      selected: true,
    },
    {
      hours: '2-3',
      value: 20,
    },
    {
      hours: '4-6',
      value: 30,
    },
  ];
  const [hoursState, setHours] = useState(hours[0]);
  return (
    <VStack bg="gray.700" px={8} pt={1} flex={1}>
      <Icon type="FontAwesome" name="back" color="white" />
      <Text color={'white'} fontSize={20} textAlign="left" fontWeight={'bold'}>
        Tempo
      </Text>
      <Text
        color={'white'}
        fontSize={15}
        textAlign="left"
        fontWeight={'bold'}
        mb={3}
      >
        Escolha o tempo para reserva a vaga
      </Text>
      <Flex direction="row">
        {hours.map((time, key) => {
          return (
            <Box
              key={key}
              border="2"
              borderRadius="md"
              bg={hoursState.key === key ? 'primary.700' : 'white'}
              _text={{
                color: 'white',
              }}
              width={'1/3'}
              mb={3}
              mr={2}
              justifyContent="center"
              textAlign={'center'}
            >
              <VStack
                space="4"
                _text={{
                  color: 'white',
                }}
                justifyContent="center"
                textAlign={'center'}
              >
                <Button
                  px="4"
                  _text={{
                    color: 'white',
                    backgroundColor: 'white',
                  }}
                  backgroundColor="#00000000"
                  onPress={(e) => {
                    setHours({
                      hours: time.hours,
                      value: time.value,
                      selected: true,
                      key: key,
                    });
                  }}
                >
                  <Heading
                    color={hoursState.key === key ? 'white' : 'gray.600'}
                    fontSize={16}
                    mb={3}
                    mt={2}
                  >
                    {time.hours} horas
                  </Heading>
                  <Text
                    color={hoursState.key === key ? 'white' : 'gray.400'}
                    mb={3}
                  >
                    R${time.value.toFixed(2)}
                  </Text>
                </Button>
              </VStack>
            </Box>
          );
        })}
      </Flex>
      <Flex direction="row" justifyContent={'space-between'}>
        <Text
          color={'white'}
          fontSize={20}
          textAlign="left"
          fontWeight={'bold'}
        >
          Total
        </Text>
        <Text
          color={'white'}
          fontSize={20}
          textAlign="left"
          fontWeight={'bold'}
        >
          {hoursState && hoursState.value
            ? `R$${hoursState.value.toFixed(2)}`
            : 'R$00,00'}
        </Text>
      </Flex>
    </VStack>
  );
}
