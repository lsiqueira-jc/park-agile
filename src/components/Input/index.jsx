import { Input as NativeBaseIput } from 'native-base';

export function Input({ ...rest }) {
  return (
    <NativeBaseIput
      bg="gray.600"
      borderWidth={0}
      h={14}
      size={'md'}
      fontSize={'md'}
      fontFamily={'body'}
      color={'white'}
      placeholderTextColor={'gray.300'}
      mt={6}
      _focus={{
        borderWidth: 1,
        borderColor: 'primary.700',
        color: 'white',
      }}
      {...rest}
    />
  );
}
