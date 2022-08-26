import React, { Fragment, useEffect, useState } from "react";
import "./_Main.scss";
import Promo from "./Promo/Promo";
import NaviBar from "./NaviBar/NaviBar";
import UnitCard from "./UnitCard/UnitCard";

const Main = (props) => {
  const [meals, setMeals] = useState([]);
  const [mealsIsLoading, setMealsIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [filtredMenu, setFiltredMenu] = useState([]);
  const [subFiltredMenu, setSubFiltredMenu] = useState([]);
  const [subfiltersCondition, setSubfiltersCondition] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://skalka-database-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Что-то пошло не так. Скоро мы это исправим.");
      }

      const data = await response.json();

      const fetchedMeals = [];

      for (const key in data) {
        fetchedMeals.push({
          id: key,
          type: data[key].type,
          subtype: data[key].subtype,
          name: data[key].name,
          des: data[key].des,
          weight: data[key].weight,
          ingrds: data[key].ingrds,
          nutrition: {
            protein: data[key].nutrition.protein,
            fat: data[key].nutrition.fat,
            carbohydrates: data[key].nutrition.carbohydrates,
            calories: data[key].nutrition.calories,
          },
          price: data[key].price,
          img: data[key].img,
        });
      }

      setMeals(fetchedMeals);
      setMealsIsLoading(false);
    };

    fetchData().catch((error) => {
      setMealsIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  let pizzaFilter = [];
  let burgerFilter = [];
  let pirogFilter = [];
  let khinkaliFilter = [];

  const menuFilterHandler = (filterConfig) => {
    if (filterConfig.pizzaFilter.current.checked) {
      pizzaFilter = meals.filter((unit) => {
        return unit.type === "pizza";
      });
    } else if (!filterConfig.pizzaFilter.current.checked) {
      pizzaFilter = [];
    }

    if (filterConfig.burgerFilter.current.checked) {
      burgerFilter = meals.filter((unit) => {
        return unit.type === "burger";
      });
    } else if (!filterConfig.burgerFilter.current.checked) {
      burgerFilter = [];
    }

    if (filterConfig.pirogFilter.current.checked) {
      pirogFilter = meals.filter((unit) => {
        return unit.type === "pirog";
      });
    } else if (!filterConfig.pirogFilter.current.checked) {
      pirogFilter = [];
    }

    if (filterConfig.khinkaliFilter.current.checked) {
      khinkaliFilter = meals.filter((unit) => {
        return unit.type === "khinkali";
      });
    } else if (!filterConfig.khinkaliFilter.current.checked) {
      khinkaliFilter = [];
    }

    setFiltredMenu([
      ...pizzaFilter,
      ...burgerFilter,
      ...pirogFilter,
      ...khinkaliFilter,
    ]);

    if (subFiltredMenu.length > 0) {
      menuSubFilterHandler(subfiltersCondition);
    }
  };

  let pizzaMeatFilter = [];
  let pizzaVeganFilter = [];
  let burgerBeefFilter = [];
  let burgerChickenFilter = [];
  let burgerProkFilter = [];
  let pirogMeatFilter = [];
  let pirogVeganFilter = [];
  let khinkaliRamFilter = [];
  let khinkaliBeefFilter = [];
  let khinkaliVeganFilter = [];

  const menuSubFilterHandler = (subFiltersState) => {
    setSubfiltersCondition(subFiltersState);
    for (let i = 0; i < subFiltersState.length; i++) {
      if (
        subFiltersState[i].subtype === "pizzaSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "meat"
      ) {
        pizzaMeatFilter = (filtredMenu.length > 0 ? filtredMenu : meals).filter(
          (unit) => {
            return unit.type === "pizza" && unit.subtype === "meat";
          }
        );
      } else if (
        subFiltersState[i].subtype === "pizzaSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "meat"
      ) {
        pizzaMeatFilter = [];
      }

      if (
        subFiltersState[i].subtype === "pizzaSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "vegan"
      ) {
        pizzaVeganFilter = (
          filtredMenu.length > 0 ? filtredMenu : meals
        ).filter((unit) => {
          return unit.type === "pizza" && unit.subtype === "vegan";
        });
      } else if (
        subFiltersState[i].subtype === "pizzaSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "vegan"
      ) {
        pizzaVeganFilter = [];
      }

      if (
        subFiltersState[i].subtype === "burgerSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "beef"
      ) {
        burgerBeefFilter = (
          filtredMenu.length > 0 ? filtredMenu : meals
        ).filter((unit) => {
          return unit.type === "burger" && unit.subtype === "beef";
        });
      } else if (
        subFiltersState[i].subtype === "burgerSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "beef"
      ) {
        burgerBeefFilter = [];
      }

      if (
        subFiltersState[i].subtype === "burgerSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "chicken"
      ) {
        burgerChickenFilter = (
          filtredMenu.length > 0 ? filtredMenu : meals
        ).filter((unit) => {
          return unit.type === "burger" && unit.subtype === "chicken";
        });
      } else if (
        subFiltersState[i].subtype === "burgerSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "chicken"
      ) {
        burgerChickenFilter = [];
      }

      if (
        subFiltersState[i].subtype === "burgerSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "pork"
      ) {
        burgerProkFilter = (
          filtredMenu.length > 0 ? filtredMenu : meals
        ).filter((unit) => {
          return unit.type === "burger" && unit.subtype === "pork";
        });
      } else if (
        subFiltersState[i].subtype === "burgerSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "pork"
      ) {
        burgerProkFilter = [];
      }

      if (
        subFiltersState[i].subtype === "pirogSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "meat"
      ) {
        pirogMeatFilter = (filtredMenu.length > 0 ? filtredMenu : meals).filter(
          (unit) => {
            return unit.type === "pirog" && unit.subtype === "meat";
          }
        );
      } else if (
        subFiltersState[i].subtype === "pirogSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "meat"
      ) {
        pirogMeatFilter = [];
      }

      if (
        subFiltersState[i].subtype === "pirogSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "vegan"
      ) {
        pirogVeganFilter = (
          filtredMenu.length > 0 ? filtredMenu : meals
        ).filter((unit) => {
          return unit.type === "pirog" && unit.subtype === "vegan";
        });
      } else if (
        subFiltersState[i].subtype === "pirogSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "vegan"
      ) {
        pirogVeganFilter = [];
      }

      if (
        subFiltersState[i].subtype === "khinkaliSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "ram"
      ) {
        khinkaliRamFilter = (
          filtredMenu.length > 0 ? filtredMenu : meals
        ).filter((unit) => {
          return unit.type === "khinkali" && unit.subtype === "ram";
        });
      } else if (
        subFiltersState[i].subtype === "khinkaliSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "ram"
      ) {
        khinkaliRamFilter = [];
      }

      if (
        subFiltersState[i].subtype === "khinkaliSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "beef"
      ) {
        khinkaliBeefFilter = (
          filtredMenu.length > 0 ? filtredMenu : meals
        ).filter((unit) => {
          return unit.type === "khinkali" && unit.subtype === "beef";
        });
      } else if (
        subFiltersState[i].subtype === "khinkaliSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "beef"
      ) {
        khinkaliBeefFilter = [];
      }

      if (
        subFiltersState[i].subtype === "khinkaliSub" &&
        subFiltersState[i].checked &&
        subFiltersState[i].id === "vegan"
      ) {
        khinkaliVeganFilter = (
          filtredMenu.length > 0 ? filtredMenu : meals
        ).filter((unit) => {
          return unit.type === "khinkali" && unit.subtype === "vegan";
        });
      } else if (
        subFiltersState[i].subtype === "khinkaliSub" &&
        !subFiltersState[i].checked &&
        subFiltersState[i].id === "vegan"
      ) {
        khinkaliVeganFilter = [];
      }
    }

    setSubFiltredMenu([
      ...pizzaMeatFilter,
      ...pizzaVeganFilter,
      ...burgerBeefFilter,
      ...burgerChickenFilter,
      ...burgerProkFilter,
      ...pirogMeatFilter,
      ...pirogVeganFilter,
      ...khinkaliRamFilter,
      ...khinkaliBeefFilter,
      ...khinkaliVeganFilter,
    ]);
  };

  let mealList;

  if (subFiltredMenu.length > 0) {
    mealList = subFiltredMenu.map((unit) => (
      <UnitCard
        key={unit.id}
        id={unit.id}
        img={unit.img}
        name={unit.name}
        ingrds={unit.ingrds}
        price={unit.price}
        onClick={props.onShowUnitInfo}
        des={unit.des}
        weight={unit.weight}
        protein={unit.nutrition.protein}
        fat={unit.nutrition.fat}
        carbohydrates={unit.nutrition.carbohydrates}
        calories={unit.nutrition.calories}
        unit={unit}
        slowOpacity={props.slowOpacity}
        className={props.className}
      />
    ));
  } else if (filtredMenu.length > 0) {
    mealList = filtredMenu.map((unit) => (
      <UnitCard
        key={unit.id}
        id={unit.id}
        img={unit.img}
        name={unit.name}
        ingrds={unit.ingrds}
        price={unit.price}
        onClick={props.onShowUnitInfo}
        des={unit.des}
        weight={unit.weight}
        protein={unit.nutrition.protein}
        fat={unit.nutrition.fat}
        carbohydrates={unit.nutrition.carbohydrates}
        calories={unit.nutrition.calories}
        unit={unit}
        slowOpacity={props.slowOpacity}
        className={props.className}
      />
    ));
  } else
    {mealList = meals.map((unit) => (
      <UnitCard
        key={unit.id}
        id={unit.id}
        img={unit.img}
        name={unit.name}
        ingrds={unit.ingrds}
        price={unit.price}
        onClick={props.onShowUnitInfo}
        des={unit.des}
        weight={unit.weight}
        protein={unit.nutrition.protein}
        fat={unit.nutrition.fat}
        carbohydrates={unit.nutrition.carbohydrates}
        calories={unit.nutrition.calories}
        unit={unit}
        slowOpacity={props.slowOpacity}
        className={props.className}
      />
    ))};

  

  return (
    <main>
      <Promo />
      <section className="meals">
        <div className="meals-wrapper">
          {mealsIsLoading && (
            <div className="meals-layout__loading">
              <h2>Загрузка меню...</h2>
            </div>
          )}
          {httpError && (
            <div className="meals-layout__error">
              <h2>{httpError}</h2>
            </div>
          )}
          {!mealsIsLoading && !httpError && (
            <Fragment>
              <NaviBar
                passFilterState={menuFilterHandler}
                passSubFilterState={menuSubFilterHandler}
              />
              <ul className="meals-layout">{mealList}</ul>
            </Fragment>
          )}
        </div>
      </section>
    </main>
  );
};

export default Main;
