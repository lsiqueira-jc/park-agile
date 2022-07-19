import { VStack, Heading, Image, Text, Flex, useTheme } from 'native-base';
import Logo from '../../assets/logo.png';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useState } from 'react';
export function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={24}>
      <Image source={Logo} />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta {password}
      </Heading>
      <Input placeholder="Email" onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Flex direction="row" mb={8}>
        <Text alignItems={'center'} color={'white'}>
          Esqueceu a senha?{' '}
        </Text>
        <Text color={'white'} alignItems={'center'}>
          Recuperar
        </Text>
      </Flex>
      <Button
        text="Entrar"
        bg={'primary.700'}
        isLoading={loading}
        _text={{
          color: 'white',
        }}
      />
    </VStack>
  );
}
