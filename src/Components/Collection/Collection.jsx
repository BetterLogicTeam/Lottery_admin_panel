import React from "react";
import "./Collection.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { Pagination } from "@mui/material";
import {
  loteryContractAbi,
  loteryContractAddress,
} from "../../utilies/Bsc_contract";
import Web3 from "web3";
import { loadWeb3 } from "../../apis/api";
// import Connect_wallet_modal from "../Connect_wallet_modal/Connect_wallet_modal";

import lucky from "../../Assets/images/lucky.png";
import { useNavigate } from "react-router-dom";

const emg_data = [
  {
    value: "$67.6k",
    statement: "Income",
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-primary dark:text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    value: "12.6K",
    statement: "Completed",
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-success"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        ></path>
      </svg>
    ),
  },
  {
    value: "143",
    statement: "Pending",
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-warning"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    value: "651",
    statement: "Dispatch",
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-info"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        ></path>
      </svg>
    ),
  },
];

function Collection() {
  const [filterdata, setfilterdata] = useState("All");
  const history = useNavigate();
  let isuser= localStorage.getItem("UserAuth")
  console.log("isuser",isuser);
  const [get_lottery_Investor, setget_lottery_Investor] = useState([]);
  const [get_Winner, setget_Winner] = useState([]);
  const [total_entries, settotal_entries] = useState();
  const [total_invested_amount, settotal_invested_amount] = useState();
  const [total_lottery_completed, settotal_lottery_completed] = useState();
  const [total_reward, settotal_reward] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [postsPerPage1] = useState(5);
  const get_lottery_investor = async () => {
    try {
      console.log("Timer", Date("1677155160"));
      let res = await axios.post("https://winner.archiecoin.online/get_Lotter_invester", {
        userAddress: filterdata,
      });
      setget_lottery_Investor(res.data.data);
      console.log("get_Lotter_invester", res.data.data);
    } catch (e) {
      console.log("Error While calling API Get lottery Investor", e);
    }
  };
  const get_lottery_Winner = async () => {
    try {
      let res = await axios.post("https://winner.archiecoin.online/get_Winner_list", {
        userAddress: filterdata,
      });
      setget_Winner(res.data.data);
      console.log("get_Lotter_invester", res.data.data);
    } catch (e) {
      console.log("Error While calling API Get lottery Investor", e);
    }
  };

  const lotter_all_data = async () => {
    try {
      const webSupply = new Web3(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      );
      let acc = await loadWeb3();
      const web3 = window.web3;
      let loteryContractOf = new webSupply.eth.Contract(
        loteryContractAbi,
        loteryContractAddress
      );

      let total_entries = await loteryContractOf.methods.total_entries().call();
      settotal_entries(total_entries);
      let total_invested_amount = await loteryContractOf.methods
        .total_invested_amount()
        .call();
      settotal_invested_amount(total_invested_amount);
      let total_lottery_completed = await loteryContractOf.methods
        .total_lottery_completed()
        .call();
      settotal_lottery_completed(total_lottery_completed);
      let total_reward = await loteryContractOf.methods.total_reward().call();
      settotal_reward(total_reward);
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTokens = get_lottery_Investor.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const indexOfLastPost1 = currentPage1 * postsPerPage1;
  const indexOfFirstPost1 = indexOfLastPost1 - postsPerPage1;
  const currentTokens1 = get_Winner.slice(indexOfFirstPost1, indexOfLastPost1);

  const setPageNumber = (event, value) => {
    // setPage(value);
    setCurrentPage(value);
  };

  const setPageNumber1 = (event, value) => {
    // setPage(value);
    setCurrentPage1(value);
  };
  useEffect(() => {
    get_lottery_investor();
    get_lottery_Winner();
    lotter_all_data();
  }, [filterdata]);

  return (
    <div>
        <div className="header-top-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header-top-area-inner">
                      <a href="" className="logo">
                        <img src={lucky} alt="" />
                      </a>
                      <div className="d-flex">
                        {/* <Connect_wallet_modal /> */}
                        <button
                            class="custom-button2 navmainbt"
                            onClick={() => (history("/"),localStorage.removeItem("UserAuth"))}
                          >
                            Log Out
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

      <div className="container">
        <div className="row">
         
          <div className="mt-4 mb-5 grid grid-cols-2 gap-3 px-4 sm:mt-5 sm:grid-cols-4 sm:gap-5 sm:px-5 lg:mt-6">
            <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
              <div className="flex justify-between space-x-1">
                <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                  {total_entries}
                </p>
                {emg_data[0].img}
              </div>
              <p className="mt-1 text-xs+">Total Entries</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
              <div className="flex justify-between space-x-1">
                <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                  {total_invested_amount}
                </p>
                {emg_data[1].img}
              </div>
              <p className="mt-1 text-xs+">Total Invested Amount</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
              <div className="flex justify-between space-x-1">
                <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                  {total_lottery_completed}
                </p>
                {emg_data[2].img}
              </div>
              <p className="mt-1 text-xs+">Total Lottery Completed</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
              <div className="flex justify-between space-x-1">
                <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                  {total_reward}
                </p>
                {emg_data[3].img}
              </div>
              <p className="mt-1 text-xs+">Total Reward</p>
            </div>
          </div>
        </div>
        <div className="text">
          <h2 className="title_admin">Lottery Invester</h2>
        </div>

        <Table responsive border>
          <thead>
            <tr className="t_head">
              <th>#</th>
              <th>Investor Address</th>
              <th>Card Number</th>
              {/* <th>Position</th> */}
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {currentTokens.map((item, index) => {
            
              return (
                <>
                  <tr className="boxx">
                    <td>{index + 1}</td>
                    <td>{item.userAddress}</td>
                    <td>{item.card_Number}</td>
                    {/* <td>{item.position}</td> */}
                    <td>
                      {moment((item.time)*1000).format("M/D/YYYY h:m:s A")}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Pagination
            count={Math.ceil(get_lottery_Investor.length / postsPerPage)}
            page={currentPage}
            onChange={setPageNumber}
          />
        </div>

        <div className="text">
          <h1 className="title_admin">Lottery Winner</h1>
        </div>

        <Table responsive border>
          <thead>
            <tr className="t_head">
              <th>#</th>
              <th>Winner Address</th>
              <th>Card Number</th>
              <th>Reward</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {currentTokens1.map((item, index) => {
              console.log("Dte", Date(item.time));
              return (
                <>
                  <tr className="boxx">
                    <td>{index + 1}</td>
                    <td>{item.userAddress}</td>
                    <td>{item.card_Number}</td>
                    <td>{item.reward}</td>
                    <td>
                    {moment((item.time)*1000).format("M/D/YYYY h:m:s A")}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Pagination
            count={Math.ceil(get_Winner.length / postsPerPage1)}
            page={currentPage1}
            onChange={setPageNumber1}
          />
        </div>
      </div>
    </div>
  );
}

export default Collection;
