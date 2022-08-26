import "./_Promo.scss";
import LogoBig from "./LogoBig";

const Promo = (props) => {
    return (
      <section className="promo">
        <div className="promo-wrapper">
          <div className="promo-card">
            <div>
              <LogoBig />
            </div>
            <div className="promo-card__txt">
              <h1>Доставка Еды</h1>
              <h2>по Московскому р-ну Санкт-Петербурга</h2>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Promo;