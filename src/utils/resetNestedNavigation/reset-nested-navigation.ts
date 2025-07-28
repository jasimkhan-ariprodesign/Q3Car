import { CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types/types';

type ResetNestedNavigationProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  parentRouteName: string;
  targetRouteName: string;
  params?: object;
};

export const resetNestedNavigation = ({
  navigation,
  parentRouteName,
  targetRouteName,
  params = {},
}: ResetNestedNavigationProps) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: parentRouteName,
          state: {
            index: 0,
            routes: [
              {
                name: targetRouteName,
                params,
              },
            ],
          },
        },
      ],
    }),
  );
};
