import { Icon, VStack } from 'native-base';

export function BackButton() {
  return (
    <VStack>
      <Icon
        as={AntDesign}
        name={Platform.OS ? 'google' : 'google'}
        color="red"
        size="sm"
      />
    </VStack>
  );
}
