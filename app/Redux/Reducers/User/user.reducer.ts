import { createSlice } from '@reduxjs/toolkit';

const LOGIN_OPTIONS = {
  MANUAL: 'MANUAL',
  GOOGLE: 'GOOGLE',
};

type State = {
  loginOptions: string;
  email: string;
  token: string;
  timestamp: string;
};

const initialState: State = {
  loginOptions: '',
  email: '',
  token: '',
  timestamp: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveToken: (state: State, action) => ({
      ...state,
      ...action.payload,
    }),
    validateToken: (state: State, dispatch: any) => {
      const currentIsoTime = new Date().toISOString();
      const diffInMinutes =
        (new Date(currentIsoTime).getTime() -
          new Date(state.timestamp).getTime()) /
        (1000 * 60);

      if (diffInMinutes > 7) {
        dispatch(logoutUser());
      }
    },
    logoutUser: (state: State) => ({
      ...state,
      loginOptions: '',
      email: '',
      token: '',
    }),
  },
});

export const { logoutUser, saveToken } = userSlice.actions;

export default userSlice.reducer;
