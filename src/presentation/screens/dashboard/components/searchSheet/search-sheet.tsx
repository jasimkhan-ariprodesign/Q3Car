import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import {COLORS, SCREENS} from '../../../../../misc';

interface SearchSheetProp {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  handleSheetChanges: (index: number, position: number, type: SNAP_POINT_TYPE) => void;
}

// deleted code

//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   _logger.log('bottomSheetModalRef -->', JSON.stringify(bottomSheetModalRef, null, 2));

//   const _handleSearchClick = () => {
//     // navigation.navigate(_screens.appStack, {
//     //   screen: _screens.searchScreen,
//     // });
//     bottomSheetModalRef.current?.present();
//   };

//   const _handleBottomSheetChanges = useCallback(
//     (index: number, position: number, type: SNAP_POINT_TYPE) => {
//       console.log('handleSheetChanges', index, position, type);
//     },
//     [],
//   );

//  {/* search bottom sheet */}
//     {_renderSearchSheetCont()}

//   const _renderSearchSheetCont = () => {
//     return (
//       <>
//         <SearchSheet
//           bottomSheetModalRef={bottomSheetModalRef}
//           handleSheetChanges={_handleBottomSheetChanges}
//         />
//       </>
//     );
//   };

// deleted end

const SearchSheet: React.FC<SearchSheetProp> = ({bottomSheetModalRef, handleSheetChanges}) => {
  const _handleCloseBottomSheet = () => {
    bottomSheetModalRef.current?.close();
  };

  const _renderBackdropComponent = ({style}: BottomSheetBackdropProps) => {
    return (
      <Pressable
        style={[style, {backgroundColor: COLORS.transparentBlack5}]}
        onPress={_handleCloseBottomSheet}
      />
    );
  };
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      snapPoints={['90%']}
      enablePanDownToClose={true}
      enableOverDrag={true}
      backdropComponent={_renderBackdropComponent}
      animationConfigs={{duration: 150}}
      enableDismissOnClose>
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
    </BottomSheetModal>
  );
};

export default SearchSheet;

const styles = StyleSheet.create({
  contentContainer: {
    height: '100%',
  },
  handle: {
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  handleIndicator: {
    width: 40,
    height: 500,
    backgroundColor: '#ff0000',
    borderRadius: 3,
  },
});
