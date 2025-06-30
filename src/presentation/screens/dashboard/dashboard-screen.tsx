import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {EdgeInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {IconButton, SafeAreaWrapper} from '../../components';
import {_color, _height, _isIOS, _ms, _mvs, _styles, _useCustomSafeAreaInsets} from '../../../misc';
import {_fonts, _icons} from '../../../assets';
import {RootStackParamList} from '../../../navigation/types/types';

const DashboardScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const insets = _useCustomSafeAreaInsets();
  const styles = getStyles(insets);

  const _handleDrawerToggle = () => {
    navigation.toggleDrawer();
  };

  const _renderDrawerBTN = () => {
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
        {_renderDrawerBTN()}
      </View>
    );
  };
  return (
    <SafeAreaWrapper edges={_isIOS() ? ['left', 'right'] : undefined}>
      {/* map here */}
      {_renderMap()}

      {/* dashboard content */}
      <View style={_styles.flex}>
        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.child}>
              <Text style={styles.titleString}>Where are you going today?</Text>

              <View style={styles.pickupAndDestCont}>
                {/* pick up point button */}
                <TouchableOpacity style={styles.pickupPointBTN} activeOpacity={0.6}>
                  <Image source={_icons.circleBlue} style={_styles.size22} resizeMode="contain" />
                  <Text style={styles.pickupPointBTNString}>Choose pick up point</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.pickupPointBTN} activeOpacity={0.6}>
                  <Image source={_icons.locationRed} style={_styles.size22} resizeMode="contain" />
                  <Text style={styles.pickupPointBTNString}>Choose pick up point</Text>
                </TouchableOpacity>

                {/* vertical line - image */}
                <Image
                  source={_icons.verticalLine}
                  style={styles.verticalLine}
                  resizeMode="cover"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default DashboardScreen;

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    mapContainer: {
      height: _height * 0.56,
      backgroundColor: _color.pink,
    },

    drawerBTNCont: {
      position: 'absolute',
      top: insets?.top || 0,
      left: _ms(24),
    },

    //   content cont
    contentContainer: {
      flex: 1,
      backgroundColor: _color.white,
      marginTop: -_mvs(24),
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      paddingTop: _mvs(24),
    },
    child: {
      paddingHorizontal: _ms(20),
      rowGap: _mvs(8),
    },
    pickupAndDestCont: {
      rowGap: _mvs(12),
      justifyContent: 'center',
    },
    titleString: {
      color: _color.black,
      fontSize: _ms(14),
      fontFamily: _fonts.poppinsRegular,
    },

    pickupPointBTN: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.2,
      borderColor: _color.EDEDED,
      padding: _ms(8),
      borderRadius: 20,
      columnGap: _ms(12),
    },
    pickupPointBTNString: {
      color: _color.textPrimary,
      fontSize: _ms(12),
      fontFamily: _fonts.poppinsRegular,
      includeFontPadding: false,
    },
    verticalLine: {
      width: _ms(2),
      height: _mvs(28),
      position: 'absolute',
      left: _ms(8 + 11),
    },
  });
