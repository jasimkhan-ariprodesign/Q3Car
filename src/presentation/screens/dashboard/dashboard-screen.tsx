import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import React from 'react';
import {EdgeInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {IconButton, SafeAreaWrapper} from '../../components';
import {
  _color,
  _height,
  _isIOS,
  _ms,
  _screens,
  _styles,
  _useCustomSafeAreaInsets,
} from '../../../misc';
import {_icons} from '../../../assets';
import {RootStackParamList} from '../../../navigation/types/types';
import RenderMap from './components/renderMap/render-map';
import DashboardContent from './components/dashboardContent/dashboard-content';

const DashboardScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const insets = _useCustomSafeAreaInsets();
  const styles = getStyles(insets);

  const _handleDrawerToggle = () => {
    navigation.toggleDrawer();
  };

  const _handleSearchClick = () => {
    navigation.navigate(_screens.appStack, {
      screen: _screens.searchScreen,
    });
  };

  const _renderOpenDrawerBTN = () => {
    return (
      <View style={styles.drawerBTNCont}>
        <IconButton
          icon={_icons.drawer}
          iconStyle={_styles.size36}
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
      <View style={_styles.flex}>
        {/* child for all content in bottom */}
        <DashboardContent _handleSearchClick={_handleSearchClick} />
      </View>
    );
  };

  //   main view
  return (
    <KeyboardAvoidingView style={_styles.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper edges={_isIOS() ? ['left', 'right'] : undefined}>
        {/* map here */}
        {_renderMap()}

        {/* dashboard content */}
        {_renderDashboardCont()}
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default DashboardScreen;

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    mapContainer: {
      height: _height * 0.58,
      backgroundColor: _color.pink,
    },

    drawerBTNCont: {
      position: 'absolute',
      top: insets?.top || 0,
      left: _ms(24),
    },
  });
