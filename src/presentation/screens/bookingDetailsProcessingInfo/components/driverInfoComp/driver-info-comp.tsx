import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import {COLORS} from '../../../../../misc';

const DriverInfoComp = () => {
  //   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  //   const _handleCloseBottomSheet = () => {
  //     bottomSheetModalRef.current?.close();
  //   };

  //   useEffect(() => {
  //     bottomSheetModalRef.current?.present();
  //   }, []);

  //   const _renderBackdropComponent = ({style}: BottomSheetBackdropProps) => {
  //     return (
  //       <Pressable
  //         style={[style, {backgroundColor: COLORS.transparentBlack2}]}
  //         onPress={_handleCloseBottomSheet}
  //       />
  //     );
  //   };

  //   const _handleBottomSheetChanges = useCallback(
  //     (index: number, position: number, type: SNAP_POINT_TYPE) => {
  //       console.log('handleSheetChanges', index, position, type);
  //     },
  //     [],
  //   );

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={{borderWidth: 2, borderColor: 'blue', height: 400}}>
      <Text>DriverInfoComp</Text>
      {/* <BottomSheetModal
        //   style={{height:'40%'}}
        // handleStyle={{height: 100, backgroundColor: 'red'}}
        ref={bottomSheetModalRef}
        onChange={_handleBottomSheetChanges}
        snapPoints={['60%']}
        enablePanDownToClose={false}
        enableOverDrag={false}
        backdropComponent={_renderBackdropComponent}
        animationConfigs={{duration: 150}}
        enableDynamicSizing>
        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity onPress={_handleCloseBottomSheet}>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal> */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '100%']}
        index={1}
        enablePanDownToClose={false}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView>
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default DriverInfoComp;

const styles = StyleSheet.create({
  contentContainer: {
    // height: '100%',
  },
});
