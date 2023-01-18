import { Text, VStack } from 'native-base';

import { useEffect, useState } from 'react';
import { Input } from '../../components/Input';

import { api } from '../../api';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
export function Profile({ navigation }) {
  const [userData, setUserData] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    api.post;
  }, []);

  return (
    <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={4}>
      <Text color={'primary.700'} mt={10} fontSize={20} textAlign="left">
        Dados Pessoais
      </Text>

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
      {/* <Image source={Wifi} /> */}

      <Input
        placeholder="Nome"
        onChangeText={setUserData}
        value={user && user.name}
      />
      <Input
        placeholder="Email"
        onChangeText={setUserData}
        value={user && user.email}
      />
      <Text color={'primary.700'} mt={10} fontSize={20} textAlign="left">
        Senha
      </Text>
      <Input
        placeholder="Senha Atual"
        onChangeText={setUserData}
        value={user && user.phone}
      />
      <Input
        placeholder="Nova senha"
        onChangeText={setUserData}
        value={user && user.name}
      />
      <Button
        text="Sair"
        bg={'gray.500'}
        _text={{
          color: 'gray.200',
        }}
        justifyContent="space-between"
        mt={6}
      />
    </VStack>
  );
}
