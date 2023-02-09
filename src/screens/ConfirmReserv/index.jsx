import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Box,
  Button,
  CheckIcon,
  Flex,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import React, { useState } from 'react';
import mastercard from '../../assets/mastercard.png';
import { Button as ButtonComponent } from '../../components/Button';
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
    <VStack bg="gray.700" px={8} pt={1} flex={1} pb={10}>
      <ScrollView w={'full'} h="full">
        <VStack flex={1}>
          <Icon type="FontAwesome" name="back" color="white" />
          <Text
            color={'white'}
            fontSize={20}
            textAlign="left"
            fontWeight={'bold'}
          >
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
          <Text
            color={'white'}
            fontSize={20}
            textAlign="left"
            fontWeight={'bold'}
            mt={7}
          >
            Pagamento
          </Text>
          <Text
            color={'white'}
            fontSize={15}
            textAlign="left"
            fontWeight={'bold'}
            mb={3}
          >
            Escolha sua forma de pagamento
          </Text>
          <Box
            border="2"
            borderRadius="md"
            bg={'primary.700'}
            _text={{
              color: 'white',
            }}
            width={'full'}
            mb={6}
            mr={2}
            justifyContent="flex-start"
            textAlign={'left'}
          >
            <VStack
              space="4"
              _text={{
                color: 'white',
              }}
              justifyContent="flex-end"
              textAlign={'left'}
              p={5}
            >
              <Flex direction="row" justifyContent={'space-between'}>
                <Heading
                  color={'white'}
                  fontSize={16}
                  mb={3}
                  mt={2}
                  textAlign={'left'}
                >
                  Crédito
                </Heading>
                <Image source={mastercard} />
              </Flex>
              <Text color={'white'} mb={2} fontSize={17} fontWeight={'bold'}>
                Patrick J Appolinário
              </Text>
              <Text color={'white'} mb={3} fontSize={15}>
                .... - .... - .... - 9365
              </Text>
            </VStack>
          </Box>
          <Box
            border="2"
            borderRadius="md"
            bg={'white'}
            _text={{
              color: 'white',
            }}
            width={'full'}
            mb={4}
            justifyContent="flex-start"
            textAlign={'left'}
          >
            <VStack
              space="4"
              _text={{
                color: 'white',
              }}
              justifyContent="flex-end"
              textAlign={'left'}
              p={5}
            >
              <Flex
                direction="row"
                justifyContent={'space-between'}
                alignContent={'center'}
                alignItems={'center'}
              >
                <Heading
                  color={'gray.500'}
                  fontSize={16}
                  mt={2}
                  textAlign={'left'}
                >
                  .... - .... - .... - 9365
                </Heading>
                <CheckIcon size="5" mt="0.5" color="emerald.500" />
              </Flex>
            </VStack>
          </Box>
          <Box
            border="2"
            borderRadius="md"
            bg={'white'}
            _text={{
              color: 'white',
            }}
            mb={4}
            width={'full'}
            justifyContent="flex-start"
            textAlign={'left'}
          >
            <VStack
              space="4"
              _text={{
                color: 'white',
              }}
              justifyContent="flex-end"
              textAlign={'left'}
              p={5}
            >
              <Flex
                direction="row"
                justifyContent={'flex-start'}
                alignContent={'center'}
                alignItems={'center'}
              >
                <FontAwesome5 name="ticket-alt" size={24} color="black" />
                <Heading
                  color={'gray.500'}
                  fontSize={16}
                  mt={2}
                  textAlign={'left'}
                  ml={3}
                >
                  Vouchers
                </Heading>
              </Flex>
            </VStack>
          </Box>
          <Box
            border="2"
            borderRadius="md"
            bg={'white'}
            _text={{
              color: 'white',
            }}
            width={'full'}
            justifyContent="flex-start"
            textAlign={'left'}
            mb={50}
          >
            <VStack
              space="4"
              _text={{
                color: 'white',
              }}
              justifyContent="flex-end"
              textAlign={'left'}
              p={5}
            >
              <Flex
                direction="row"
                justifyContent={'flex-start'}
                alignContent={'center'}
                alignItems={'center'}
              >
                <MaterialCommunityIcons
                  name="cash-check"
                  size={24}
                  color="black"
                />
                <Heading
                  color={'gray.500'}
                  fontSize={16}
                  mt={2}
                  textAlign={'left'}
                  ml={3}
                >
                  Vouchers
                </Heading>
              </Flex>
            </VStack>
          </Box>
          <ButtonComponent
            text={'Pagar'}
            color="#FBA94C"
            mb={20}
            backgroundColor="#FBA94C"
            _text={{
              fontSize: 18,
              fontWeight: 'fonts.heading',
            }}
            onPress={() => {}}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
