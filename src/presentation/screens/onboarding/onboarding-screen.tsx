import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TextButton, Icon, SafeAreaWrapper} from '../../components';
import {_color, _height, _ms, _screens, _strings, _styles, _width} from '../../../misc';
import {_onboardingData} from '../../../constant';
import {_fonts, _icons} from '../../../assets';
import NextButtonWithProgressBar from './components/next-button-with-progress-bar';

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const [curPageIndex, setCurPageIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  // console.log('index ->', curPageIndex);

  const _handleSkipClick = () => {
    navigation.push(_screens.userTypeSelectScreen);
  };

  const _handleNextClick = () => {
    if (curPageIndex < _onboardingData?.length - 1) {
      if (scrollRef?.current) {
        const nextIndex = curPageIndex + 1;
        scrollRef?.current.scrollTo({
          animated: true,
          x: nextIndex * _width,
        });
      }
    } else {
      _handleSkipClick();
    }
  };

  return (
    <SafeAreaWrapper style={[_styles.container]}>
      {/* icon, skip, onboarding image */}
      <ScrollView
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        snapToInterval={_width}
        onScroll={event => {
          const offset = event.nativeEvent.contentOffset.x;
          const index = Math.round(offset / _width);
          setCurPageIndex(index);
        }}
        style={_styles.flex}>
        {_onboardingData?.map(item => {
          return (
            <View key={item?.id} style={styles.parentCont}>
              <View style={styles.imageCont}>
                <Image source={item?.image} style={styles.img} />
              </View>

              <View style={styles.skipCont}>
                <Icon icon={_icons.q3Car} iconStyle={_styles.size54} />
                <TextButton title={_strings.skip} onPress={_handleSkipClick} disabled={false} />
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
    width: _width,
    height: _height * 0.75,
  },
  skipCont: {
    flexDirection: 'row',
    position: 'absolute',
    width: _width,
    top: 0,
    paddingHorizontal: _ms(24),
    justifyContent: 'space-between',
  },
  imageCont: {
    width: _width,
    height: _height * 0.48,
    backgroundColor: _color.offWhite,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  stringCont: {
    width: _width * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: _ms(12),
  },
  title: {
    color: _color.black,
    fontSize: _ms(18),
    fontFamily: _fonts.workSansMedium,
  },
  descTxt: {
    color: _color.textPrimary,
    fontSize: _ms(12),
    fontFamily: _fonts.workSansMedium,
    textAlign: 'center',
  },
});
