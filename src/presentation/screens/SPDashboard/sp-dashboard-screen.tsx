import {KeyboardAvoidingView, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {_useCustomSafeAreaInsets, COLORS, COMMON_STYLES, isIOS, MS, MVS} from '../../../misc';
import {IconButton, SafeAreaWrapper} from '../../components';
import {ICONS} from '../../../assets';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types/types';
import SPDashboardHeader from './components/sp-dashboard-header';
import RenderMap from './components/RenderMap';

const SPDashboardScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const _renderHeader = () => {
    return (
      <>
        <SPDashboardHeader />
      </>
    );
  };

  const _renderMap = () => {
    return (
      <View style={styles.mapContainer}>
        <RenderMap />
      </View>
    );
  };

  // main view
  return (
    <>
      <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
        <SafeAreaWrapper>
          {/* header  */}
          {_renderHeader()}

          {/* map here */}
          {_renderMap()}

          {/* dashboard content */}
          {/* {_renderContentCont()} */}
        </SafeAreaWrapper>
      </KeyboardAvoidingView>
    </>
  );
};

export default SPDashboardScreen;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: COLORS.pink,
  },
});
