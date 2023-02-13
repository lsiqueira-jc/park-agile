import { Icon, Input, Text, VStack } from 'native-base';

import React, { useState } from 'react';
import { Button } from '../../components/Button';
export function Cupons({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cupon, setCupon] = useState();
  const [message, setMessage] = useState('');
  const cupons = ['47A56E0D3A', '47A56E0D3B', '47A56E0D3C'];

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
    <VStack bg="gray.700" px={8} pt={12} flex={1} pb={10}>
      <VStack flex={1}>
        <Icon type="FontAwesome" name="back" color="primary.700" />
        <Text
          color={'primary.700'}
          fontSize={25}
          mb={5}
          textAlign="left"
          fontWeight={'bold'}
        >
          Adicione o código do voucher
        </Text>
        <Text
          color={'#FBA94C'}
          fontSize={25}
          mb={5}
          textAlign="left"
          fontWeight={'bold'}
        >
          {message}
        </Text>

        <Input
          placeholder="Digite o código do seu voucher "
          onChangeText={setCupon}
          color={'white'}
          fontSize={18}
          p={4}
        />
        <Button
          text={'Ok'}
          color="#FBA94C"
          mb={0}
          mt={'120%'}
          backgroundColor="#FBA94C"
          _text={{
            fontSize: 18,
            fontWeight: 'fonts.heading',
          }}
          onPress={() => {
            validCupon();
          }}
        />
      </VStack>
    </VStack>
  );
}
