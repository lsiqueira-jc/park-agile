import { VStack, Heading, Image, Text, Flex, Icon } from 'native-base';
import Logo from '../../assets/logo.png';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useState } from 'react';
export function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSignIn() {}
  return (
    <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={24}>
      <Image source={Logo} />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
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
        onPress={handleSignIn}
      />
      <Text color={'white'} alignItems={'center'} mt={10}>
        ou
      </Text>
      <Button
        text="Entrar com a conta do google"
        bg={'white'}
        isLoading={loading}
        leftIcon={
          <Icon
            as={AntDesign}
            name={Platform.OS ? 'google' : 'google'}
            color="red"
            size="sm"
          />
        }
        mt={5}
        _text={{
          color: 'black',
        }}
        onPress={handleSignIn}
      />
    </VStack>
  );
}
