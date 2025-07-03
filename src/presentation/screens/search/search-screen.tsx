import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {_styles, _isIOS, _color, _mvs, _ms} from '../../../misc';
import {SafeAreaWrapper, PrimaryHeader} from '../../components';

const SearchScreen = () => {
  const _rendersearchBarCont = () => {
    return (
      <View style={styles.searchBarCont}>
        <TextInput placeholder="Search Address Here" />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={_styles.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <View style={styles.headerCont}>
          <PrimaryHeader containerStyle={styles.headerStyle} />
        </View>
        <View style={_styles.flex}>
          <Text>Search</Text>
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
const leftSpace = _ms(16);
const styles = StyleSheet.create({
  headerCont: {
    flexDirection: 'row',
    paddingLeft: leftSpace,
  },
  headerStyle: {
    // backgroundColor: _color.pink,
    paddingVertical: _isIOS() ? _mvs(4) : _mvs(12),
  },

  searchBarCont: {},
});
