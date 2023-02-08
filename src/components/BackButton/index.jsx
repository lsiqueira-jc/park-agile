import { Icon, VStack } from 'native-base';

export function BackButton() {
  return (
    <VStack>
      <Icon type="FontAwesome" name={'back'} color="red" size="sm" />
    </VStack>
  );
}
