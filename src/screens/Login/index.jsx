import { AntDesign } from '@expo/vector-icons';
import { Flex, Heading, Icon, Image, Text, VStack } from 'native-base';
import { useState } from 'react';
import Logo from '../../assets/logo.png';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { auth } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
export function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  async function loginUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const responseUserAuth = await auth.doSignInWithEmailAndPassword(
          email,
          password,
        );
        console.log(
          '🚀 ~ file: index.jsx:22 ~ returnnewPromise ~ responseUserAuth',
          responseUserAuth,
        );

        if (responseUserAuth.success) {
          if (!responseUserAuth) {
            alert('Email ou senha incorreto.');
            return;
          }
          setUser(responseUserAuth.data);
          return;
        } else {
          console.log('erroo-->', responseUserAuth);
        }
      } catch (error) {
        let errorMsg = '';
        if (error.code === 'auth/wrong-password') {
          errorMsg = 'E-mail ou senha incorretos.';
        } else if (
          error.code === 'auth/account-exists-with-different-credential'
        ) {
          errorMsg = 'Já existe uma conta com o e-mail informado.';
        } else if (
          error.message ===
          'Você não está autorizado a fazer login nesse momento. Contate o administrador para mais informações.'
        ) {
          errorMsg = 'E-mail não cadastrado para este cliente.';
        } else {
          errorMsg = 'E-mail ou senha incorretos.';
        }

        alert(errorMsg);
      }
    });
  }
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
        onPress={loginUser}
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
        onPress={loginUser}
      />
    </VStack>
  );
}
