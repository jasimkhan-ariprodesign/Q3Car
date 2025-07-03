import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import {_color, _screens} from '../../../../../misc';

interface SearchSheetProp {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  handleSheetChanges: (index: number, position: number, type: SNAP_POINT_TYPE) => void;
}

const SearchSheet: React.FC<SearchSheetProp> = ({bottomSheetModalRef, handleSheetChanges}) => {
  const _handleCloseBottomSheet = () => {
    bottomSheetModalRef.current?.close();
  };

  const _renderBackdropComponent = ({style}: BottomSheetBackdropProps) => {
    return (
      <Pressable
        style={[style, {backgroundColor: _color.transparentBlack5}]}
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
