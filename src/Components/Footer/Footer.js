import React, { useState } from "react";
import Modal from "../UI/Modal";
import CloseBtn from "../UI/CloseBtn/CloseBtn";

import TmIcon from "./TmIcon";
import VkIcon from "./VkIcon";
import WpIcon from "./WpIcon";
import IgIcon from "./IgIcon";
import YtIcon from "./YtIcon";
import "./_Footer.scss";

const Footer = () => {
  const [modalIsShown, setmodalIsShown] = useState(false);
  const [closingModal, setClosingModal] = useState(false);
  const [contentId, setContentId] = useState("");

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
  };

  const modalContent = (
    <Modal
      slowOpacity={closingModal ? "" : "backdrop_closing"}
      className={closingModal ? "" : "modal_closing"}
      onClose={closeModalHandler}
    >
      <header className="new-user-modal-header">
        <h1>
          {contentId === "aboutUs" && "О нас"}
          {contentId === "delivery" && "Доставка и оплата"}
          {contentId === "makeOrder" && "Как сделать заказ"}
          {contentId === "feedback" && "Обратная связь"}
          {contentId === "job" && "Вакансии"}
        </h1>
        <CloseBtn onClose={closeModalHandler} />
      </header>
      {contentId === "aboutUs" && (
        <div className="new-user-modal-content_footer">
          <h2>СКАЛКА - доставка еды по Московскому р-ну Санкт-Петербурга.</h2>
          <br />
          <h3>Важен каждый клиент</h3>
          <br />
          <p>
            Мы всегда прислушиваемся к вашим отзывам и готовы быстро прийти на
            помощь в решении любых проблем. Вся обратная связь регулярно
            обрабатывается нашими сотрудниками, чтобы вы оставались довольны
            нашим сервисом.
          </p>
          <br />
          <h3>Высокие стандарты качества</h3>
          <br />
          <p>
            Вы можете быть уверены в качестве наших блюд. Мы пристально следим
            за соблюдением норм производства продукции на каждом этапе: от
            поставки до приготовления.
          </p>
        </div>
      )}
      {contentId === "delivery" && (
        <div className="new-user-modal-content_footer">
          <h3>Время работы</h3>
          <br />
          <p>
            Мы принимаем заказы на доставку каждый день с 10:00 до 23:00. Заказ
            оформленный после 23:00 через сайт будет взят в обработку уже на
            следующий день.
          </p>
          <br />
          <h3>Время и стоимость доставки</h3>
          <br />
          <p>
            Доставка осуществляется по Московскому р-ну г. Санкт-Петербурга.
            Время доставки зависит от величины Вашего заказа и начинается от 30
            минут. Минимальная сумма заказа составляет 500 руб. При заказе от
            500 ₽ до 999 ₽ стоимость доставки составит 200 ₽, а при заказе от
            1000 ₽ доставка бесплатная.
          </p>
          <br />
          <h3>Оплата заказа</h3>
          <br />
          <p>
            На данный момент оплата заказа возможна только за наличный расчет
            или переводом через Систему Быстрых Платежей.
          </p>
        </div>
      )}
      {contentId === "makeOrder" && (
        <div className="new-user-modal-content_footer">
          <h3>Варианты размещения заказа</h3>
          <br />
          <p>
            Вы можете заказать понравившееся Вам блюдо как позвонив нам по
            телефону +7 (999) 777-77-**, так и разместив заказ через наш сайт.
          </p>
        </div>
      )}
      {contentId === "feedback" && (
        <div className="new-user-modal-content_footer">
          <h3>
            У вас возникли вопросы или пожелания по качеству обслуживания?
          </h3>
          <br />
          <p>
            Если Вы нашли на нашем сайте орфографические ошибки, неточности, или
            считаете, что нам стоит что-то поменять в нашей работе, то напишите
            нам об этом на BeBetter@skalka.ru.
          </p>
        </div>
      )}
      {contentId === "job" && (
        <div className="new-user-modal-content_footer">
          <h3>Курьер</h3>
          <br />
          <p>
            В службу доставки еды СКАЛКА требуются курьеры. Город
            Санкт-Петербург, Московский район. Мы предлагаем:
            <ul>
              <li>
                -трудоустройство рядом с домом (более 50 филиалов на территории
                Санкт-Петербурга);
              </li>
              <li>- работа в пределах одного района (радиус не более 5 км);</li>
              <li>- гибкий график (обсуждается индивидуально);</li>
              <li>- бесплатное корпоративное питание.</li>
            </ul>
            <br />
            Курьер на велосипеде: от 2000 до 4000 руб. за смену. Курьер на авто:
            от 3000 до 6000 руб. за смену. Возможна работа на электровелосипеде
            или автомобиле компании!
            <br />
            <br /> Звоните : +7 (999) 777-77-**
          </p>
        </div>
      )}
    </Modal>
  );

  return (
    <footer className="footer">
      {modalIsShown && modalContent}
      <section className="footer-wrapper">
        <div className="footer-links">
          <header>
            <h3>
              2022 © <span>СКАЛКА</span>
              <br />
              Доставка Еды
            </h3>
          </header>
          <ul className="footer-links__map">
            <li>
              <button onClick={showModalHandler}>
                <p id="aboutUs">О Нас</p>
              </button>
            </li>
            <li>
              <button onClick={showModalHandler}>
                <p id="delivery">Доставка и оплата</p>
              </button>
            </li>
            <li>
              <button onClick={showModalHandler}>
                <p id="makeOrder">Как сделать заказ</p>
              </button>
            </li>
            <li>
              <button onClick={showModalHandler}>
                <p id="feedback">Обратная связь</p>
              </button>
            </li>
            <li>
              <button onClick={showModalHandler}>
                <p id="job">Вакансии</p>
              </button>
            </li>
          </ul>
        </div>
        <div className="footer-makeorder">
          <header>
            <h3>Сделать заказ</h3>
          </header>
          <div className="footer-makeorder__wh">
            <h2>+7 (999) 777-77-**</h2>
            <br />
            <p>
              <span>График работы:</span>
              <br />
              Пн-Пт с 11:00 до 22:00
              <br />
              Сб-Вс 11:00 до 23:00
            </p>
          </div>
        </div>
        <div className="footer-bebetter">
          <header>
            <h3>Помочь нам стать лучше</h3>
          </header>
          <div className="footer-bebetter__helpus">
            <p>
              Если Вы нашли на нашем сайте орфографические ошибки, неточности,
              или считаете, что нам стоит что-то поменять в нашей работе, то
              напишите нам об этом.
              <br />
              <br />
              Email: <span>BeBetter@skalka.ru</span>
            </p>
          </div>
        </div>
        <div className="footer-social">
          <header>
            <h3>Мессенджеры и социальные сети</h3>
          </header>
          <div className="footer-social__links">
            <a
              href="https://web.telegram.org/"
              target="_blank"
              rel="noreferrer"
            >
              <TmIcon />
            </a>
            <a href="https://vk.com/" target="_blank" rel="noreferrer">
              <VkIcon />
            </a>
            <a
              href="https://www.whatsapp.com/"
              target="_blank"
              rel="noreferrer"
            >
              <WpIcon />
            </a>
            <a href="https://yappy.media/" target="_blank" rel="noreferrer">
              <IgIcon />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <YtIcon />
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
