import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  data: {
    user: {
      _id: string;
      fullName: string;
      userType: string;
      isVerified: boolean;
      accessToken: string;
      phone: string;
      email: string;
      avatar: string;
      dob: string | null;
    };
  };
  message: string;
  success: string;
  statusCode: number;
}

interface UserState {
  userData: User | null;
}

const initialState: UserState = {
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    clearUserData: state => {
      state.userData = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
