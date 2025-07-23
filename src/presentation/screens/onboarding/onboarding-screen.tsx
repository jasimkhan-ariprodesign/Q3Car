import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TextButton, IconButton, SafeAreaWrapper} from '../../components';
import {
  COLORS,
  WINDOW_HEIGHT,
  MS,
  SCREENS,
  STRINGS,
  COMMON_STYLES,
  WINDOW_WIDTH,
} from '../../../misc';
import {_onboardingData} from '../../../constant';
import {FONTS, ICONS} from '../../../assets';
import NextButtonWithProgressBar from './components/next-button-with-progress-bar';
import {RootStackParamList} from '../../../navigation/types/types';

const OnboardingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [curPageIndex, setCurPageIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  // _logger.log('index ->', curPageIndex);

  const _handleSkipClick = () => {
    navigation.push(SCREENS.welcomeStack, {
      screen: SCREENS.userTypeSelectScreen,
    });
    // navigation.push(SCREENS.drawerNavigator, {
    //   screen: SCREENS.dashboardScreen,
    // });
  };

  const _handleNextClick = () => {
    if (curPageIndex < _onboardingData?.length - 1) {
      if (scrollRef?.current) {
        const nextIndex = curPageIndex + 1;
        scrollRef?.current.scrollTo({
          animated: true,
          x: nextIndex * WINDOW_WIDTH,
        });
      }
    } else {
      _handleSkipClick();
    }
  };

  return (
    <SafeAreaWrapper style={[COMMON_STYLES.container]}>
      {/* icon, skip, onboarding image */}
      <ScrollView
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        snapToInterval={WINDOW_WIDTH}
        onScroll={event => {
          const offset = event.nativeEvent.contentOffset.x;
          const index = Math.round(offset / WINDOW_WIDTH);
          setCurPageIndex(index);
        }}
        style={COMMON_STYLES.flex}>
        {_onboardingData?.map(item => {
          return (
            <View key={item?.id} style={styles.parentCont}>
              <View style={styles.imageCont}>
                <Image source={item?.image} style={styles.img} />
              </View>

              <View style={styles.skipCont}>
                <IconButton icon={ICONS.q3Car} iconStyle={COMMON_STYLES.size54} />
                <TextButton title={STRINGS.skip} onPress={_handleSkipClick} disabled={false} />
              </View>

              {/* strings */}
              <View style={styles.stringCont}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.descTxt}>{item?.description}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <NextButtonWithProgressBar
        onPress={_handleNextClick}
        index={curPageIndex}
        dataLength={_onboardingData?.length}
      />
    </SafeAreaWrapper>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  parentCont: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.75,
  },
  skipCont: {
    flexDirection: 'row',
    position: 'absolute',
    width: WINDOW_WIDTH,
    top: 0,
    paddingHorizontal: MS(24),
    justifyContent: 'space-between',
  },
  imageCont: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.48,
    backgroundColor: COLORS.offWhite,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  stringCont: {
    width: WINDOW_WIDTH * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: MS(12),
  },
  title: {
    color: COLORS.black,
    fontSize: MS(18),
    fontFamily: FONTS.workSansMedium,
  },
  descTxt: {
    color: COLORS.textPrimary,
    fontSize: MS(12),
    fontFamily: FONTS.workSansMedium,
    textAlign: 'center',
  },
});
