import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import {ICONS} from '../../../../assets';
import {COMMON_STYLES, COLORS, isIOS, MS, MVS} from '../../../../misc';
import {IconButton} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../../../../navigation/types/types';

interface SPDashboardHeaderProp {
  handleOffOn?: Function;
  netStatus?: string;
}

const SPDashboardHeader: React.FC<SPDashboardHeaderProp> = ({handleOffOn, netStatus}) => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const _handleDrawerToggle = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.headerCont}>
      <View>
        <IconButton
          icon={ICONS.drawer}
          iconStyle={COMMON_STYLES.size36}
          onPress={_handleDrawerToggle}
          disabled={false}
        />
      </View>

      <View>
        <Switch
          value={netStatus === 'online'}
          onValueChange={() => {
            handleOffOn && handleOffOn();
          }}
          thumbColor={COLORS.white}
          trackColor={{
            false: COLORS.CFCFCF,
            true: COLORS.primary,
          }}
        />
      </View>
    </View>
  );
};

export default SPDashboardHeader;

const styles = StyleSheet.create({
  headerCont: {
    // backgroundColor: 'lime',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: MS(24),
    justifyContent: 'space-between',
    paddingVertical: isIOS() ? MVS(4) : MVS(12),
    paddingBottom: isIOS() ? MVS(8) : MVS(12),
  },
});
