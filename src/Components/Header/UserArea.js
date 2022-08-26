import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AuthContext from "../../store/auth-context";
import CloseBtn from "../UI/CloseBtn/CloseBtn";
import Modal from "../UI/Modal";
import OrdersList from "./OrdersList";

import "./_UserArea.scss";

const isEmpty = (value) => value.trim() === "";
const toShort = (value) => value.trim().length < 6;
const telIncorrect = (value) => value.indexOf("+7") || value.trim().length < 12;

const UserArea = (props) => {
  const authCtx = useContext(AuthContext);

  const [modalIsShown, setmodalIsShown] = useState(false);
  const [closingModal, setClosingModal] = useState(false);
  const [contentId, setContentId] = useState("");
  const [wrongFilling, setWrongFilling] = useState({
    noSuchUser: null,
    passIncorrect: null,
    telExist: null,
    tel: null,
    pass: null,
    name: null,
  });
  const [activeUser, setActiveUser] = useState({});
  const [userOrdersList, setUserOrdersList] = useState([]);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userTel = localStorage.getItem("isLogged");

      if (userTel) {
        const response = await fetch(
          "https://skalka-database-default-rtdb.firebaseio.com/users.json"
        );

        if (!response.ok) {
          throw new Error("Что-то пошло не так. Скоро мы это исправим.");
        }

        const data = await response.json();

        for (const key in data) {
          if (data[key].tel === userTel) {
            setActiveUser(data[key]);
          }
        }
      }

      const response = await fetch(
        "https://skalka-database-default-rtdb.firebaseio.com/orders.json"
      );

      if (!response.ok) {
        throw new Error("Что-то пошло не так. Скоро мы это исправим.");
      }

      const data = await response.json();

      const fetchedOrders = [];

      for (const key in data) {
        if (activeUser.tel === data[key].user.tel) {
          fetchedOrders.push(data[key]);
        }
      }

      setUserOrdersList(fetchedOrders);
    };

    fetchData().catch((error) => {
      setHttpError(error.message);
    });
  }, [modalIsShown]);

  const showModalHandler = (event) => {
    setContentId(event.target.id);
    setClosingModal(true);
    setmodalIsShown(true);
    document.body.classList.toggle("lock");
  };
  const closeModalHandler = () => {
    setClosingModal(false);
    setTimeout(() => {
      setmodalIsShown(false);
      document.body.classList.toggle("lock");
    }, 300);

    wrongFilling.telExist = null;
    wrongFilling.name = null;
    wrongFilling.tel = null;
    wrongFilling.pass = null;
    wrongFilling.noSuchUser = null;
    wrongFilling.passIncorrect = null;

    setWrongFilling((prevWrongFilling) => {
      return { ...prevWrongFilling, ...wrongFilling };
    });
  };

  const closeUserContentHandler = () => {
    authCtx.onLogout();
    closeModalHandler();
  };

  const nameField = useRef();
  const telField = useRef();
  const passField = useRef();

  const addNewUserHandler = async (event) => {
    event.preventDefault();

    const nameInputIsValid = !isEmpty(nameField.current.value);
    const passInputIsValid = !toShort(passField.current.value);
    const telInputIsValid = !telIncorrect(telField.current.value);

    const formIsValid = nameInputIsValid && passInputIsValid && telInputIsValid;

    if (!formIsValid) {
      wrongFilling.telExist = false;
      wrongFilling.name = !nameInputIsValid;
      wrongFilling.tel = !telInputIsValid;
      wrongFilling.pass = !passInputIsValid;
      setWrongFilling((prevWrongFilling) => {
        return { ...prevWrongFilling, ...wrongFilling };
      });

      return;
    }

    wrongFilling.name = !nameInputIsValid;
    wrongFilling.tel = !telInputIsValid;
    wrongFilling.pass = !passInputIsValid;
    setWrongFilling((prevWrongFilling) => {
      return { ...prevWrongFilling, ...wrongFilling };
    });
    const response = await fetch(
      "https://skalka-database-default-rtdb.firebaseio.com/users.json"
    );

    const data = await response.json();

    let userRegistred = false;

    for (const key in data) {
      if (data[key].tel === telField.current.value) {
        userRegistred = true;
      }
    }

    if (!userRegistred) {
      wrongFilling.telExist = userRegistred;
      setWrongFilling((prevWrongFilling) => {
        return { ...prevWrongFilling, ...wrongFilling };
      });

      await fetch(
        "https://skalka-database-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          body: JSON.stringify({
            name: nameField.current.value,
            tel: telField.current.value,
            pass: passField.current.value,
          }),
        }
      );

      setContentId("regSuccess");
    } else {
      wrongFilling.telExist = userRegistred;
      setWrongFilling((prevWrongFilling) => {
        return { ...prevWrongFilling, ...wrongFilling };
      });
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    const passInputIsValid = !toShort(passField.current.value);
    const telInputIsValid = !telIncorrect(telField.current.value);

    const formIsValid = passInputIsValid && telInputIsValid;

    if (!formIsValid) {
      wrongFilling.tel = !telInputIsValid;
      wrongFilling.pass = !passInputIsValid;
      setWrongFilling((prevWrongFilling) => {
        return { ...prevWrongFilling, ...wrongFilling };
      });
      return;
    }

    wrongFilling.tel = !telInputIsValid;
    wrongFilling.pass = !passInputIsValid;
    setWrongFilling((prevWrongFilling) => {
      return { ...prevWrongFilling, ...wrongFilling };
    });

    const response = await fetch(
      "https://skalka-database-default-rtdb.firebaseio.com/users.json"
    );

    const data = await response.json();

    for (const key in data) {
      if (data[key].tel === telField.current.value) {
        wrongFilling.noSuchUser = false;

        if (data[key].pass === passField.current.value) {
          wrongFilling.passIncorrect = false;
          setWrongFilling((prevWrongFilling) => {
            return { ...prevWrongFilling, ...wrongFilling };
          });

          setActiveUser(data[key]);

          authCtx.onLogin(data[key].tel);
          closeModalHandler();

          return;
        }

        wrongFilling.passIncorrect = true;
        setWrongFilling((prevWrongFilling) => {
          return { ...prevWrongFilling, ...wrongFilling };
        });

        return;
      } else {
        wrongFilling.noSuchUser = true;
        setWrongFilling((prevWrongFilling) => {
          return { ...prevWrongFilling, ...wrongFilling };
        });
      }
    }
  };

  const modalContent = (
    <Modal
      slowOpacity={closingModal ? "" : "backdrop_closing"}
      className={closingModal ? "" : "modal_closing"}
      onClose={closeModalHandler}
    >
      <header className="new-user-modal-header">
        <h1>
          {contentId === "loginBtn" && "Вход"}
          {contentId === "regBtn" && "Регистрация"}
          {contentId === "regSuccess" && "Успех!"}
          {contentId === "userContent" && activeUser.name}
        </h1>
        <CloseBtn onClose={closeModalHandler} />
      </header>

      {contentId === "loginBtn" && (
        <div className="new-user-modal-content">
          <h2>Введите, пожалуйста, свои номер телефона и пароль.</h2>
          <form onSubmit={loginHandler}>
            <label htmlFor="tel">Номер телефона</label>
            <input
              style={
                wrongFilling.tel || wrongFilling.noSuchUser
                  ? {
                      borderBottom: "0.3rem solid red",
                    }
                  : undefined
              }
              ref={telField}
              id="tel"
              type="tel"
              placeholder='Обязательно в формае - "+79117772233"'
            />
            {wrongFilling.tel && (
              <p className="invalid">
                Пожалуйста, проверьте корректность ввода номера телефона.
              </p>
            )}
            {wrongFilling.noSuchUser && (
              <p className="invalid">
                Пользователя с таким номером телефона не зарегистрировано.
              </p>
            )}
            <label htmlFor="pass">Пароль</label>
            <input
              ref={passField}
              id="pass"
              type="text"
              style={
                wrongFilling.pass || wrongFilling.passIncorrect
                  ? {
                      borderBottom: "0.3rem solid red",
                    }
                  : undefined
              }
            />
            {wrongFilling.pass && (
              <p className="invalid">
                Ваш пароль должен состоять минимум из 6-ти символов.
              </p>
            )}
            {wrongFilling.passIncorrect && (
              <p className="invalid">Не верный пароль.</p>
            )}
            <button>
              <h2>Войти</h2>
            </button>
          </form>
        </div>
      )}
      {contentId === "regBtn" && (
        <div className="new-user-modal-content">
          <h2>Заполните, пожалуйста, следующие поля:</h2>
          <form onSubmit={addNewUserHandler}>
            <label htmlFor="name">Имя</label>
            <input
              style={
                wrongFilling.name
                  ? {
                      borderBottom: "0.3rem solid red",
                    }
                  : undefined
              }
              ref={nameField}
              id="name"
              type="text"
              placeholder='Например, "Владимир Владимирович"'
            />
            {wrongFilling.name && <p className="invalid">Обязательное поле</p>}
            <label htmlFor="tel">Номер телефона</label>
            <input
              style={
                wrongFilling.tel || wrongFilling.telExist
                  ? {
                      borderBottom: "0.3rem solid red",
                    }
                  : undefined
              }
              ref={telField}
              id="tel"
              type="tel"
              placeholder='Обязательно в формае - "+79117772233"'
            />
            {wrongFilling.tel && (
              <p className="invalid">
                Пожалуйста, проверьте корректность ввода номера телефона
              </p>
            )}
            {wrongFilling.telExist && (
              <p className="invalid">
                Пользователь с таким номером телефона уже зарегестрирован
              </p>
            )}
            <label htmlFor="pass">Пароль</label>
            <input
              style={
                wrongFilling.pass
                  ? {
                      borderBottom: "0.3rem solid red",
                    }
                  : undefined
              }
              ref={passField}
              id="pass"
              type="text"
              placeholder="Минимум 6 знаков"
            />
            {wrongFilling.pass && (
              <p className="invalid">
                Ваш пароль должен состоять минимум из 6-ти символов
              </p>
            )}
            <button>
              <h2>Зарегистрироваться</h2>
            </button>
          </form>
        </div>
      )}
      {contentId === "regSuccess" && (
        <div className="new-user-modal-content new-user-modal-content_message">
          <h1>Регистрация завершена!</h1>
          <h2>
            Теперь вы можете зайти в систему под номером телефона и паролем,
            которые указали.
          </h2>
        </div>
      )}
      {contentId === "userContent" && (
        <div className="new-user-modal-content">
          <h2>Ваши заказы:</h2>
          <ul className="orders-list">
            {userOrdersList.map((unit) => {
              let orderTotalAmount = 0;
              for (const meal in unit.orderedItems) {
                orderTotalAmount =
                  orderTotalAmount +
                  unit.orderedItems[meal].amount *
                    unit.orderedItems[meal].price;
              }
              return (
                <OrdersList
                  orderUserName={unit.user.name}
                  orderStreet={unit.user.street}
                  orderBld={unit.user.bld}
                  totalAmount={orderTotalAmount}
                />
              );
            })}
            {httpError && <p>{httpError}</p>}
          </ul>

          <button className="logoutBtn" onClick={closeUserContentHandler}>
            <h2>Выйти из системы</h2>
          </button>
        </div>
      )}
    </Modal>
  );

  const loggedOutContent = (
    <Fragment>
      <div className="user__login">
        <button onClick={showModalHandler}>
          <h2 id="loginBtn">Вход</h2>
        </button>
      </div>
      <span className="user__span"></span>
      <div className="user__reg">
        <button onClick={showModalHandler}>
          <h2 id="regBtn">Регистрация</h2>
        </button>
      </div>
    </Fragment>
  );

  const loggedInContent = (
    <div className="user__login">
      <button onClick={showModalHandler}>
        <h2 id="userContent">{activeUser.name}</h2>
      </button>
    </div>
  );

  return (
    <div className="user">
      {modalIsShown && modalContent}
      {!authCtx.isLoggedIn && loggedOutContent}
      {authCtx.isLoggedIn && loggedInContent}
    </div>
  );
};

export default UserArea;
