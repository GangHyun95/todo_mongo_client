import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../styles/loginCss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

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
          <button>로그인</button>
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
