// 작은 store 역할의 slice
// 사용자 정보 저장 내용 userSlice
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // 사용자닉네임
    nickName: "", //사용자 닉네임
    email: "",
    uid: "", //firebase연동을 위한 고유식별자
    accessToken: "", //firebase 에서 임시로 생성해줌
  },
  reducers: {
    // 로그인 되면 user store의 state 업데이트,
    loginUser: (state, action) => {
      // action.payload 로 담겨옮
      state.nickName = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.nickName = "";
      state.email = "";
      state.uid = "";
      state.accessToken = "";
    },
    // 로그아웃하면 user store의 state 초기화(비우기)
  },
});

export default userSlice;

export const { loginUser, clearUser } = userSlice.actions;
