import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UserType = 'Customer' | 'ServiceProvider' | null;

interface UserTypeState {
  userType: UserType;
}

const initialState: UserTypeState = {
  userType: null,
};

export const userTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<Exclude<UserType, null>>) => {
      state.userType = action.payload;
    },
    clearUserType: state => {
      state.userType = null;
    },
  },
});

export const { setUserType, clearUserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;
