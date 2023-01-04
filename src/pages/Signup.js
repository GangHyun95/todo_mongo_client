import React, { useState } from "react";
import SignUpDiv from "../styles/signUpCss";
// firebase 기본 코드를 포함.
import firebase from "../firebase";
import axios from "axios";

const SignUp = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  // firebase 회원가입 기능.
  const registFunc = (e) => {
    e.preventDefault();
    // 각 항목을 입력했는지 체크
    // 빈문자열 체크를 정규표현식으로 추후 업데이트예정
    // 닉네임이 빈 문자열인지 체크
    if (!nickName) {
      return alert("닉네임을 입력하세요.");
    }
    if (!email) {
      return alert("이메일을 입력하세요.");
    }
    if (!pw) {
      return alert("비밀번호를 입력하세요.");
    }
    if (!pwCheck) {
      return alert("비밀번호 확인을 입력하세요.");
    }
    // 비밀번호가 같은지 비교처리
    if (pw !== pwCheck) {
      return alert("비밀번호는 같아야 합니다.");
    }

    // firebase 로 이메일과 비밀번호를 전송
    // https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=3#web-version-9_1
    const createUser = firebase.auth();
    createUser
      .createUserWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        // 회원가입이 된경우
        const user = userCredential.user;
        console.log(user);

        // 사용자 프로필의 displayName 을 업데이트
        // https://firebase.google.com/docs/auth/web/manage-users
        user
          .updateProfile({
            displayName: nickName,
          })
          .then(() => {
            // 데이터베이스로 정보를 저장한다.
            // 사용자 정보를 저장한다.(이메일,닉네임,UID)
            axios.post("/api/user/register");
          })
          .catch((err) => {
            // 프로필 업데이트 실패
          });
      })
      .catch((error) => {
        // 회원가입이 실패한 경우
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="p-6 m-4 shadow">
      <h2>SignUp</h2>
      <SignUpDiv>
        <form>
          <label>닉네임</label>
          <input
            type="text"
            required
            minLength={3}
            maxLength={20}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <label>이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>비밀번호</label>
          <input
            type="password"
            required
            minLength={6}
            maxLength={16}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <label>비밀번호 확인</label>
          <input
            type="password"
            required
            minLength={6}
            maxLength={16}
            value={pwCheck}
            onChange={(e) => setPwCheck(e.target.value)}
          />
          <button
            onClick={(e) => {
              registFunc(e);
            }}
          >
            회원가입
          </button>
        </form>
      </SignUpDiv>
    </div>
  );
};

export default SignUp;
