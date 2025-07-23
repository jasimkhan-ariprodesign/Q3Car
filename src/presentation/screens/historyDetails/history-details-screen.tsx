import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {EdgeInsets} from 'react-native-safe-area-context';
import {useCustomSafeAreaInsets, COLORS, COMMON_STYLES, isIOS, MS} from '../../../misc';
import {IconButton, SafeAreaWrapper} from '../../components';
import {ICONS} from '../../../assets';
import {RootStackParamList} from '../../../navigation/types/types';
import RenderMap from './components/renderMap/render-map';
import ContentCont from './components/contentCont/content-cont';

const HistoryDetailsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useCustomSafeAreaInsets();
  const styles = getStyles(insets);

  const _handleBackClick = () => {
    navigation.goBack();
  };

  const _renderBackBTN = () => {
    return (
      <View style={styles.drawerBTNCont}>
        <IconButton
          icon={ICONS.angleLeftDark}
          iconStyle={COMMON_STYLES.size18}
          onPress={_handleBackClick}
          disabled={false}
        />
      </View>
    );
  };

  const _renderMap = () => {
    return (
      <View style={styles.mapContainer}>
        {/* button to go back */}
        {_renderBackBTN()}

        {/* map  */}
        <RenderMap />
      </View>
    );
  };

  const _renderContentCont = () => {
    return (
      //  child for all content in bottom
      <>
        <ContentCont />
      </>
    );
  };

  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper edges={isIOS() ? ['left', 'right'] : undefined}>
        {/* map here */}
        {_renderMap()}

        {/* bottom content here */}
        {_renderContentCont()}
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default HistoryDetailsScreen;

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    mapContainer: {
      flex: 1,
      backgroundColor: COLORS.pink,
    },

    drawerBTNCont: {
      position: 'absolute',
      top: insets?.top || 0,
      left: MS(24),
    },
  });
