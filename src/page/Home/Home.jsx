import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import { FaSearchDollar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToFav } from "../../redux/slice/fav";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [data, setData] = useState([]);
  const inputRef = useRef();

  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  console.log(input);

  const fetchCom = async (currentPage) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false`
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const handlePage = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;

    const commentFormServer = await fetchCom(currentPage);
    setData(commentFormServer);
  };
  return (
    <section>
      <div className="div_contanier">
        <div className="div_head">
          <h2>Cyrpto Tracker Application</h2>
          <div className="input_div">
            <input
              ref={inputRef}
              onChange={() => setInput(inputRef.current.value)}
              type="text"
              placeholder="Search by crypto name"
            />
            <FaSearchDollar />
          </div>
        </div>
        <div className="div_table">
          <table>
            <thead>
              <tr>
                <th className="hover_class">Rank</th>
                <th className="coin_class">Coin Name</th>
                <th className="hover_class">Price</th>
                <th className="hover_class">Price Change</th>
                <th className="hover_class">Market Cap</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data
                  .filter((item) => {
                    if (
                      item.name?.toLowerCase().includes(input?.toLowerCase())
                    ) {
                      return item;
                    }
                  })
                  .map((item) => {
                    return (
                      <tr key={item.id} className="hover_class">
                        <td>{item.market_cap_rank}</td>
                        <td className="crypto_img">
                          <span>
                            <img src={`${item.image}`} alt="" />
                          </span>
                          {item.name}
                        </td>
                        <td className="coin_price">$ {item.current_price}</td>

                        {
                          <td>
                            {item.price_change_percentage_24h >= 0 ? (
                              <div
                                style={{ color: "green", fontWeight: "600" }}>
                                {item.price_change_percentage_24h}
                                <BiTrendingUp />
                              </div>
                            ) : (
                              <div style={{ color: "red", fontWeight: "600" }}>
                                {item.price_change_percentage_24h}
                                <BiTrendingDown />
                              </div>
                            )}{" "}
                          </td>
                        }
                        <td>$ {item.market_cap}</td>
                        <td className="button_class">
                          <button onClick={() => dispatch(addToFav(item))}>
                            Favourites
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        <div className="">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={25}
            onPageChange={handlePage}
            containerClassName={"contanierPag"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
