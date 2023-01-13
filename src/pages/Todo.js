import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import List from "../components/List";
import Form from "../components/Form";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
// React-Bootstrap
import { Dropdown, DropdownButton } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
/*
  클래스 /함수 컴포넌트 (용도별로 2가지 케이스)
  내용출력 전용, 데이터관리 용도

  클래스 형식으로 제작되는 것 class : TypeScript
  state 를 리랜더링(Re-rendering)
  Life-cycle : Mounte, Update, unMount...

  함수 형식으로 제작되는 것 function
  state 를 못 쓰므로 화면 갱신 어렵다.
  useState() state 변경가능

  Life-cycle 을 지원 안한다.
  useEffect() Life-cycle 체크가능
*/

/* 최초의 로컬에서 todoData 를 읽어와서
todoData 라는 useState 를 초기화 해 주어야 한다
useState(초기값)
초기값:로컬에서 불러서 채운다.
*/
// 로컬스토리지에 내용을 읽어온다.
// MongoDB 에서 목록을 읽어온다.
// let initTodo = localStorage.getItem("todoData2");
// 삼항연산자를 이용해서 초기값이 없으면 빈배열[]로 초기화 한다.
// 읽어온 데이터가 있으면 JSON.stringify() 저장한 파일을
// JSON.parse() 로 다시 객체화 하여 사용x한다.
// initTodo = initTodo ? JSON.parse(initTodo) : [];

const Todo = () => {
  // console.log("App Rendering...");
  // mongoDB 에서 초기값 읽어서 셋팅한다.
  // axios 및 useEffect를 이용한다.
  const [todoData, setTodoData] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.accessToken === "") {
      alert("로그인을 하셔야 합니다.");
      navigate("/login");
    } else {
    }
  }, [user]);

  // 목록 정렬 기능
  const [sort, setSort] = useState("최신순");
  useEffect(() => {
    setSkip(0);
    getList(search, 0);
  }, [sort]);

  // 검색 기능
  const [search, setSearch] = useState("");
  const searchHandler = () => {
    setSkip(0);
    getList(search, 0);
  };

  // axios를 이용해서 서버에 API 호출
  // 전체 목록 호출 메서드
  const getList = (_word = "", _stIndex = 0) => {
    setSkip(0);
    // 로딩창 보여주기
    setLoading(true);
    // 처음에 버튼 안보이게 처리
    setSkipToggle(false);
    const body = {
      sort: sort,
      search: _word,
      // 사용자 구분용도
      uid: user.uid,
      skip: _stIndex,
    };
    axios
      .post("/api/post/list", body)
      .then((response) => {
        // console.log(response.data);
        // 초기 할일데이터 셋팅
        if (response.data.success) {
          setTodoData(response.data.initTodo);
          // 시작하는 skip 번호를 갱신한다.
          setSkip(response.data.initTodo.length);
          // console.log(response.data.total);

          // 목록을 DB 에서 호출하면 전체 등록글 수를 받아서
          // 비교한다.
          if (response.data.total > 5) {
            setSkipToggle(true);
          }
        }
        // 로딩창 숨기기
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getListGo = (_word = "", _stIndex = 0) => {
    // 로딩창 보여주기
    setLoading(true);
    let body = {
      sort: sort,
      search: _word,
      // 사용자 구분용도
      uid: user.uid,
      skip: _stIndex,
    };
    axios
      .post("/api/post/list", body)
      .then((res) => {
        // console.log(res.data);
        // 초기 할일 데이터 셋팅
        if (res.data.success) {
          setTodoData([...todoData, ...res.data.initTodo]);
          // 시작하는 skip 번호를 갱신한다.
          setSkip(skip + res.data.initTodo.length);
          if (res.data.initTodo.length < 5) {
            setSkipToggle(false);
          }

          // 로딩창 숨기기
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 목록 갯수 출력
  const [skip, setSkip] = useState(0);
  const [skipToggle, setSkipToggle] = useState(true);

  const getListMore = () => {
    getListGo(search, skip);
  };
  useEffect(() => {
    // 초기데이터를 component가 mount 될 때
    getList("", 0);
  }, []);
  const deleteClick = useCallback(
    (id) => {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        setLoading(true);
        let body = { id: id };
        axios
          .post("/api/post/delete", body)
          .then((res) => {
            console.log(res);
            // 클릭된 ID 와 다른 요소들만 걸러서 새로운 배열 생성
            const nowTodo = todoData.filter((item) => item.id !== id);
            // console.log("클릭", nowTodo);
            // 목록을 갱신한다.
            // axios를 이용해서 MongoDB 삭제 진행
            setSkip(0);
            setTodoData(nowTodo);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      }
      // 로컬에 저장한다.(DB 예정)
      // localStorage.setItem("todoData2", JSON.stringify(nowTodo));
    },
    [todoData]
  );

  // 로딩창 관련
  const [loading, setLoading] = useState(false);

  const addTodoSubmit = (event) => {
    event.preventDefault();
    // { id: 4, title: "할일4", completed: false },

    // 공백 문자열 제거 추가
    let str = todoValue;
    str = str.replace(/^\s+|\s+$/gm, "");
    if (str.length === 0) {
      alert("내용을 입력하세요.");
      setTodoValue("");
      return;
    }
    setLoading(true);
    const addTodo = {
      id: Date.now(),
      title: todoValue,
      completed: false,
      uid: user.uid, //사용자 구분용도
    };
    // axios 로 MongoDB 에 항목 추가
    axios
      .post("/api/post/submit", { ...addTodo })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setLoading(false);
          // setTodoData([...todoData, addTodo]);
          // 새로운 할일을 추가했으므로 내용입력창의 글자를 초기화
          setTodoValue("");
          // 로컬에 저장한다.(DB 예정)
          // localStorage.setItem("todoData2", JSON.stringify([...todoData, addTodo]));
          setSkip(0);
          getList("", 0);
          alert("할일이 등록되었습니다.");
        } else {
          alert("할일 등록 실패하였습니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  // 배열을 비워서 다 삭제
  const deleteAllClick = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // axios를 이용하여 MongoDB 목록 비워줌.
      axios
        .post("/api/post/deleteall")
        .then(() => {
          setTodoData([]);
        })
        .catch((err) => console.log(err));

      // 자료를 지운다.(DB 초기화)
      // localStorage.clear();
    }
  };

  return (
    <div className="flex justify-center w-full mt-4">
      <div className="w-full p-6 m-4 bg-white rounded shadow border-8 lg:w-8/12">
        <div className="flex justify-between mb-3 border-b pb-2">
          <h2>{user.nickName} 할일 목록</h2>
          <button onClick={deleteAllClick} className="hover:text-red-500">
            Delete All
          </button>
        </div>
        <div className="flex justify-between mb-3">
          <DropdownButton title={sort} variant="outline-secondary">
            <Dropdown.Item onClick={() => setSort("최신순")}>
              최신순
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("과거순")}>
              과거순
            </Dropdown.Item>
          </DropdownButton>

          <div>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="border p-2 text-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandler();
                }
              }}
            />
          </div>
        </div>

        <List
          todoData={todoData}
          setTodoData={setTodoData}
          deleteClick={deleteClick}
          loading={loading}
          setLoading={setLoading}
        />

        {skipToggle && (
          <div className="flex justify-end">
            <button
              className="p-2 text-blue-400 border-2 border-blue-400 rounded
        hover:text-white hover:bg-blue-400"
              onClick={() => getListMore()}
            >
              더보기
            </button>
          </div>
        )}
        <Form
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          addTodoSubmit={addTodoSubmit}
        />
      </div>
      {/* 로딩창 샘플 */}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Todo;
