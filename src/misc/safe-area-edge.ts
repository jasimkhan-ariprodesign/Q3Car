import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';

export const _useCustomSafeAreaInsets = (): EdgeInsets => {
  const insets = useSafeAreaInsets();
  return insets;
};
