import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { AuthorizationStatusType } from '../../types/state';

type UserStateType = {
  authorization: AuthorizationStatusType;
  email: string;
}

const initialState: UserStateType = {
  authorization: AuthorizationStatus.Unknown,
  email: '',
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    updateAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatusType>) => {
      state.authorization = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  }
});

export const {updateAuthorizationStatus, setEmail} = user.actions;
