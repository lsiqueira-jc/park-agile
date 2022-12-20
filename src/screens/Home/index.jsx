import { Icon, Image, VStack } from 'native-base';

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Wifi from '../../assets/wifi.png';
import { Input } from '../../components/Input';

import { Button } from '../../components/Button';
export function Home({ navigation }) {
  const [address, setAddress] = useState('');

  return (
    <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={4}>
      {/* <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={15}
        pb={8}
        px={6}
        >
        <Image source={Wifi} />
        <IconButton >
      </HStack> */}
      <Image source={Wifi} />
      <Button
        text="Endereço atual"
        bg={'gray.500'}
        _text={{
          color: 'gray.200',
        }}
        justifyContent="space-between"
        startIcon={<Icon as={Ionicons} name="location" size="md" />}
        onPress={() => navigation.navigate('Maps')}
      />
      <Button
        text="Endereço de destino"
        bg={'gray.500'}
        _text={{
          color: 'gray.200',
        }}
        justifyContent="space-between"
        startIcon={<Icon as={Ionicons} name="location" size="md" />}
        mt={6}
      />

      <Input placeholder="Endereço de destino" onChangeText={setAddress} />
    </VStack>
  );
}
