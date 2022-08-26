import { Fragment, useRef, useState } from "react";
import MobiFiltersIco from "./MobiFiltersIco";

import "./_NaviBar.scss";

const NaviBar = (props) => {
  const [activeSub, setActiveSub] = useState("");
  const [subNavIsShown, setSubNavIsShown] = useState(false);
  const [mobiFiltersIsShown, setMobiFiltersIsShown] = useState(false);
  const [subFiltersConfig, setSubFiltersConfig] = useState([
    {
      type: "pizza",
      subtype: "pizzaSub",
      id: "meat",
      faceTxt: "С мясом",
      checked: false,
    },
    {
      type: "pizza",
      subtype: "pizzaSub",
      id: "vegan",
      faceTxt: "Вегетарианская",
      checked: false,
    },
    {
      type: "burger",
      subtype: "burgerSub",
      id: "beef",
      faceTxt: "С говядиной",
      checked: false,
    },
    {
      type: "burger",
      subtype: "burgerSub",
      id: "chicken",
      faceTxt: "С курицой",
      checked: false,
    },
    {
      type: "burger",
      subtype: "burgerSub",
      id: "pork",
      faceTxt: "Со свининой",
      checked: false,
    },
    {
      type: "pirog",
      subtype: "pirogSub",
      id: "meat",
      faceTxt: "С мясом",
      checked: false,
    },
    {
      type: "pirog",
      subtype: "pirogSub",
      id: "vegan",
      faceTxt: "Без мяса",
      checked: false,
    },
    {
      type: "khinkali",
      subtype: "khinkaliSub",
      id: "ram",
      faceTxt: "С бараниной",
      checked: false,
    },
    {
      type: "khinkali",
      subtype: "khinkaliSub",
      id: "beef",
      faceTxt: "С говядиной",
      checked: false,
    },
    {
      type: "khinkali",
      subtype: "khinkaliSub",
      id: "vegan",
      faceTxt: "Вегетарианские",
      checked: false,
    },
  ]);

  const pizzaFilter = useRef();
  const pirogFilter = useRef();
  const burgerFilter = useRef();
  const khinkaliFilter = useRef();

  const changeFilterHandler = () => {
    const filtersState = {
      pizzaFilter,
      pirogFilter,
      burgerFilter,
      khinkaliFilter,
    };
    props.passFilterState(filtersState);
  };

  const showSubNavHandler = (event) => {
    if (event.target.id === activeSub) {
      event.target.checked = false;
      setActiveSub("");
    }
    if (event.target.checked) {
      setActiveSub(event.target.id);
    }
    setSubNavIsShown(event.target.checked);
  };

  const showMobiFilterHandler = () => {
    if (mobiFiltersIsShown) {
      setMobiFiltersIsShown(false);
      if (subNavIsShown) {
        setSubNavIsShown(false);
        document.getElementById(activeSub).checked = false;
        setActiveSub("");
      }
    } else {
      setMobiFiltersIsShown(true);
    }
  };

  const changeSubFilterHandler = (event) => {
    let chosenIndex;
    subFiltersConfig.forEach((unit, index) => {
      if (unit.id === event.target.id && unit.subtype === activeSub) {
        chosenIndex = index;
      }
    });

    if (!subFiltersConfig[chosenIndex].checked) {
      subFiltersConfig[chosenIndex].checked = true;
      setSubFiltersConfig((prevSubFiltersConfig) => {
        return [...subFiltersConfig];
      });
    } else {
      subFiltersConfig[chosenIndex].checked = false;
      setSubFiltersConfig((prevSubFiltersConfig) => {
        return [...subFiltersConfig];
      });
    }

    props.passSubFilterState(subFiltersConfig);
  };

  const subfiltersRender = subFiltersConfig
    .filter((unit) => unit.subtype === activeSub)
    .map((unit) => (
      <li key={unit.id}>
        <label htmlFor={unit.id}>
          <input
            type="checkbox"
            id={unit.id}
            onChange={changeSubFilterHandler}
            checked={unit.checked}
          />
          <h3>{unit.faceTxt}</h3>
        </label>
      </li>
    ));

  return (
    <Fragment>
      <nav className="meals-nav">
        <div className="mobi-filters-ico">
          <MobiFiltersIco onClick={showMobiFilterHandler} className={mobiFiltersIsShown ? "filt-ico-pressed" : ""} />
        </div>
        <ul
          className={`meals-nav__main-links ${
            mobiFiltersIsShown ? "meals-nav__main-links_show-mobi-nav" : ""
          }`}
        >
          <li>
            <label htmlFor="pizzaSub" className="meals-nav__sub-config">
              <input
                name="sub-config"
                id="pizzaSub"
                type="radio"
                onClick={showSubNavHandler}
              />
              <h1>Пицца</h1>
            </label>
            <label className="nav-switch" htmlFor="pizza">
              <input
                ref={pizzaFilter}
                type="checkbox"
                id="pizza"
                onChange={changeFilterHandler}
              ></input>
              <span className="nav-switch__slider-round"></span>
            </label>
          </li>
          <li>
            <label htmlFor="burgerSub" className="meals-nav__sub-config">
              <input
                name="sub-config"
                id="burgerSub"
                type="radio"
                onClick={showSubNavHandler}
              />
              <h1>Бургеры</h1>
            </label>
            <label className="nav-switch" htmlFor="burger">
              <input
                ref={burgerFilter}
                type="checkbox"
                id="burger"
                onChange={changeFilterHandler}
              ></input>
              <span className="nav-switch__slider-round"></span>
            </label>
          </li>
          <li>
            <label htmlFor="pirogSub" className="meals-nav__sub-config">
              <input
                name="sub-config"
                id="pirogSub"
                type="radio"
                onClick={showSubNavHandler}
              />
              <h1>Пироги</h1>
            </label>
            <label className="nav-switch" htmlFor="pirog">
              <input
                ref={pirogFilter}
                type="checkbox"
                id="pirog"
                onChange={changeFilterHandler}
              ></input>
              <span className="nav-switch__slider-round"></span>
            </label>
          </li>
          <li>
            <label htmlFor="khinkaliSub" className="meals-nav__sub-config">
              <input
                name="sub-config"
                id="khinkaliSub"
                type="radio"
                onClick={showSubNavHandler}
              />
              <h1>Хинкали</h1>
            </label>
            <label className="nav-switch" htmlFor="khinkali">
              <input
                ref={khinkaliFilter}
                type="checkbox"
                id="khinkali"
                onChange={changeFilterHandler}
              ></input>
              <span className="nav-switch__slider-round"></span>
            </label>
          </li>
        </ul>
        <nav
          className={`sub-nav ${subNavIsShown ? "sub-nav_show-sub-menu" : ""}`}
        >
          <ul className="sub-nav__links">{subfiltersRender}</ul>
        </nav>
      </nav>
    </Fragment>
  );
};

export default NaviBar;
