import { Button as NativeBaseButton } from 'native-base';

export function Button({ ...rest }) {
  return (
    <NativeBaseButton
      {...rest}
      w="full"
      h={12}
      rounded="sm"
      _pressed={{
        bg: 'primary.500',
      }}
    >
      {rest.text}
    </NativeBaseButton>
  );
}
