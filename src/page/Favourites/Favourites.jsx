import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAll, DeleteFav } from "../../redux/slice/fav";
import "./Favourites.scss";
const Favourites = () => {
  const favCount = useSelector((state) => state.favCount.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="fav_contanier">
        <div className="fav_contanier_top">
          <h2>Your Favourite Coins</h2>
          <button
            onClick={() => {
              dispatch(DeleteAll());
            }}>
            Empty
          </button>
        </div>
        <div className="fav_coins">
          <ol>
            {favCount === [] ? <div>fav item yoxdu</div> : null}
            {favCount &&
              favCount.map((item) => {
                return (
                  <li key={item.id}>
                    <img src={`${item.image}`} alt="" />
                    <span>{item.name}</span>
                    <button onClick={() => dispatch(DeleteFav(item.id))}>
                      Delete
                    </button>
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
