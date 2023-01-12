import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../styles/loginCss";
// firebase 로그인
import firebase from "../firebase.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutErrMsg = setTimeout(() => {
      setErrMsg("");
    }, 3000);
    return () => {
      clearTimeout(timeoutErrMsg);
    };
  }, [errMsg]);
  // 로그인 처리
  const signInFunc = (e) => {
    e.preventDefault();
    if (!email) {
      return alert("이메일을 입력하세요.");
    }
    if (!pw) {
      return alert("비밀번호를 입력하세요.");
    }
    const tempUser = firebase.auth();
    tempUser
      .signInWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        // 로그인 성공
        const user = userCredential.user;
        console.log(user);
        navigate("/todo");
        // Redux를 이용한 App 의 store 관리 시작
        // Component의 state로 관리하기는 복잡하다.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          setErrMsg("비밀번호를 확인하세요.");
        } else if (errorCode === "auth/user-not-found") {
          setErrMsg("이메일을 확인하세요.");
        } else {
          setErrMsg("로그인에 실패하였습니다.");
        }
        // console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="p-6 m-4 shadow">
      <h2>Login</h2>
      <LoginDiv>
        <form>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label>비밀번호</label>
          <input
            type="password"
            maxLength={8}
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
            required
          />
          {errMsg !== "" && (
            <p className="text-red-500 text-center">{errMsg}</p>
          )}
          <button
            className="mt-2"
            onClick={(e) => {
              signInFunc(e);
            }}
          >
            로그인
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            회원가입
          </button>
        </form>
      </LoginDiv>
    </div>
  );
};

export default Login;
