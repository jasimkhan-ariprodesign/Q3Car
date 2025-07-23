import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import React from 'react';
import {EdgeInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {IconButton, SafeAreaWrapper} from '../../components';
import {
  COLORS,
  WINDOW_HEIGHT,
  isIOS,
  MS,
  SCREENS,
  COMMON_STYLES,
  useCustomSafeAreaInsets,
} from '../../../misc';
import {ICONS} from '../../../assets';
import {RootStackParamList} from '../../../navigation/types/types';
import RenderMap from './components/renderMap/render-map';
import DashboardContent from './components/dashboardContent/dashboard-content';

const DashboardScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const insets = useCustomSafeAreaInsets();
  const styles = getStyles(insets);

  const _handleDrawerToggle = () => {
    navigation.toggleDrawer();
  };

  const _handleSearchClick = () => {
    navigation.navigate(SCREENS.appStack, {
      screen: SCREENS.searchScreen,
    });
  };

  const _renderOpenDrawerBTN = () => {
    return (
      <View style={styles.drawerBTNCont}>
        <IconButton
          icon={ICONS.drawer}
          iconStyle={COMMON_STYLES.size36}
          onPress={_handleDrawerToggle}
          disabled={false}
        />
      </View>
    );
  };

  const _renderMap = () => {
    return (
      <View style={styles.mapContainer}>
        {/* button to open drawer */}
        {_renderOpenDrawerBTN()}

        {/* map  */}
        <RenderMap />
      </View>
    );
  };

  const _renderDashboardCont = () => {
    return (
      <View style={COMMON_STYLES.flex}>
        {/* child for all content in bottom */}
        <DashboardContent _handleSearchClick={_handleSearchClick} />
      </View>
    );
  };

  //   main view
  return (
    <>
      <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
        <SafeAreaWrapper edges={isIOS() ? ['left', 'right'] : undefined}>
          {/* map here */}
          {_renderMap()}

          {/* dashboard content */}
          {_renderDashboardCont()}
        </SafeAreaWrapper>
      </KeyboardAvoidingView>
    </>
  );
};

export default DashboardScreen;

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    mapContainer: {
      height: WINDOW_HEIGHT * 0.58,
      backgroundColor: COLORS.pink,
    },

    drawerBTNCont: {
      position: 'absolute',
      top: insets?.top || 0,
      left: MS(24),
    },
  });
