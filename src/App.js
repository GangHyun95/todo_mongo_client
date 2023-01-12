import React, { useEffect } from "react";
// react-redux 모듈
import { useSelector, useDispatch } from "react-redux";
import firebase from "./firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import UserInfo from "./pages/UserInfo";
import { loginUser, clearUser } from "./reducer/userSlice";

export default function App() {
  // action 보내서 store.user.state 를 업데이트
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // 로그인 상태 테스트
  useEffect(() => {
    // fire의 사용자 로그인 변경 이벤트
    firebase.auth().onAuthStateChanged((userInfo) => {
      // firebase에 로그인 시 출력 정보확인
      // console.log("로그인 정보: ", userInfo);
      if (userInfo) {
        // userInfo 로그인을 했다면 true
        // 로그인 했다면 info를 store.user.state 에 저장해야함.
        // 여기에서의 userInfo 는 Firebase 사이트에서 준것

        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        // 로그아웃 했어요.
        // 로그아웃 했다면 store.user.state를 초기화
        dispatch(clearUser());
      }
    });
  });

  // 임시로 로그아웃을 컴포넌트가 mount 될 때 실행
  // useEffect(() => {
  //   // // 로그아웃
  //   // firebase.auth().signOut();
  // }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
    </>
  );
}
