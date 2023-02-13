import { Box, Flex, Heading, Image, Radio, Text, VStack } from 'native-base';

import React, { useState } from 'react';

import comprovante from '../../assets/comprovante.png';
import { Button } from '../../components/Button';
export function CuponsList({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cupon, setCupon] = useState();
  const [message, setMessage] = useState('');
  const cupons = ['47A56E0D3A', '47A56E0D3B', '47A56E0D3C'];
  const [value, setValue] = React.useState('one');
  function validCupon() {
    const cupomValud = cupons.find((cupons) => {
      console.log(
        '🚀 ~ file: index.jsx:15 ~ cupomValud ~ cupons',
        cupons,
        cupon,
      );
      return cupons === cupon;
    });
    if (cupomValud) {
      setMessage('Cupom adicionado com sucesso!');
    } else {
      setMessage('Cupom inválido');
    }
  }
  return (
    <VStack bg="gray.700" px={8} pt={'20%'} flex={1} pb={10}>
      <VStack flex={1}>
        <Flex
          mb={20}
          direction="row"
          alignContent={'center'}
          alignItems={'center'}
        >
          <Image source={comprovante} mr={3} />
          <Text color={'white'} fontSize={18} fontWeight={'bold'}>
            Quer economizar? Veja os cupons disponíveis.
          </Text>
        </Flex>

        <Text color={'primary.700'} fontSize={18} fontWeight={'bold'}>
          Cupons disponíveis
        </Text>
        <VStack>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            <Box
              border="2"
              borderRadius="md"
              bg={'gray.500'}
              _text={{
                color: 'white',
              }}
              width={'full'}
              mb={3}
              justifyContent="space-between"
            >
              <VStack
                space="4"
                _text={{
                  color: 'white',
                }}
              >
                <Box
                  px="4"
                  _text={{
                    color: 'white',
                  }}
                >
                  <Radio value="one" my={1}>
                    <Heading color="white" fontSize="xl" mb={3} mt={4}>
                      R$ 10,00 para 8 horas
                    </Heading>
                  </Radio>

                  <Flex direction="row" justifyContent={'space-between'}>
                    <Flex direction="row" mb={4} alignItems="center">
                      <Text
                        color="gray.200"
                        ml={2}
                        fontSize="16"
                        fontWeight={'bold'}
                      >
                        Disponível somente para reservas 6-8 horas
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </VStack>
            </Box>

            <Box
              border="2"
              borderRadius="md"
              bg={'gray.500'}
              _text={{
                color: 'white',
              }}
              width={'full'}
              mb={3}
              justifyContent="space-between"
            >
              <VStack
                space="4"
                _text={{
                  color: 'white',
                }}
              >
                <Box
                  px="4"
                  _text={{
                    color: 'white',
                  }}
                >
                  <Radio value="two" my={1}>
                    <Heading color="gray.300" fontSize="xl" mb={3} mt={4}>
                      R$ 5,00 para 1 hora
                    </Heading>
                  </Radio>

                  <Flex direction="row" justifyContent={'space-between'}>
                    <Flex direction="row" mb={4} alignItems="center">
                      <Text
                        color="gray.300"
                        ml={2}
                        fontSize="16"
                        fontWeight={'bold'}
                      >
                        Inativo
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </VStack>
            </Box>

            <Box
              border="2"
              borderRadius="md"
              bg={'gray.500'}
              _text={{
                color: 'white',
              }}
              width={'full'}
              mb={3}
              justifyContent="space-between"
            >
              <VStack
                space="4"
                _text={{
                  color: 'white',
                }}
              >
                <Box
                  px="4"
                  _text={{
                    color: 'white',
                  }}
                >
                  <Radio value="three" my={1} _disabled={true}>
                    <Heading color="gray.300" fontSize="xl" mb={3} mt={4}>
                      R$ 20,00 para 6 horas
                    </Heading>
                  </Radio>

                  <Flex direction="row" justifyContent={'space-between'}>
                    <Flex direction="row" mb={4} alignItems="center">
                      <Text
                        color="gray.300"
                        ml={2}
                        fontSize="16"
                        fontWeight={'bold'}
                      >
                        Inativo
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </VStack>
            </Box>
          </Radio.Group>
        </VStack>
      </VStack>
      <Button
        text={'Aplicar Cupom'}
        color="#FBA94C"
        mb={'20%'}
        backgroundColor="#FBA94C"
        _text={{
          fontSize: 18,
          fontWeight: 'fonts.heading',
        }}
        onPress={() => {
          setModalVisible(!modalVisible), navigation.navigate('Home', {});
        }}
      />
    </VStack>
  );
}
