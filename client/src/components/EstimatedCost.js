import React, { useState, useEffect } from "react";
import MatrimoneyApi from "../helpers/MatrimoneyApi.js";
import EstimatedCostForm from "./EstimatedCostForm";
import { Link, useOutletContext } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";

export default function EstimatedCostDisplay(props) {
  const { estimatedCosts, setEstCosts } = useOutletContext();
  let totalIncome = props.allIncome.reduce(function (acc, obj) {
    return acc + obj.amount;
  }, 0);
  let estimatedSum = estimatedCosts.reduce(function (acc, obj) {
    return acc + obj.amount;
  }, 0);

  const addCost = async (newEstCost) => {
    let uresponse = await MatrimoneyApi.addCostEstimate(newEstCost);
    if (uresponse.ok) {
      setEstCosts(uresponse.data);
    } else {
      console.log(`Error! ${uresponse.error}`);
    }
  };

  const deleteCostEstimate = async (id) => {
    let uresponse = await MatrimoneyApi.deleteCostEstimate(id);
    if (uresponse.ok) {
      setEstCosts(uresponse.data);
    } else {
      console.log(`Error! ${uresponse.error}`);
    }
  };

  return (
    <div className="EstimatedCost">
      <div className="secondary-nav">
        <Link to="/budget" className="selected-second-nav">
          Estimated
        </Link>
        <Link to="/budget/costs">Actual</Link>
        <Link to="/budget/compare">Compare</Link>
      </div>
      <div className="bottom-container">
        <div className="row justify-content-center">
          <div className="col-5">
            <h3>Estimated Costs:</h3>
            <table>
              <tbody>
                <tr>
                  <th>Expense Category</th>
                  <th>Cost</th>
                </tr>
                {estimatedCosts.map((c) => (
                  <tr key={c.id}>
                    <td>{c.text}</td>
                    <td style={{ borderRight: "none" }}>${c.amount}</td>
                    <td
                      className="cursor-pointer"
                      style={{ borderLeft: "none", width: 10 }}
                    >
                      <button
                        type="submit"
                        onClick={(e) => deleteCostEstimate(c.id)}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Total:</td>
                  <td style={{ borderRight: "none" }}>${estimatedSum}</td>
                </tr>
                <tr>
                  <td>Remaining:</td>
                  <td style={{ borderRight: "none" }}>
                    ${totalIncome - estimatedSum}
                  </td>
                  <td style={{ borderLeft: "none" }}></td>
                </tr>
              </tbody>
            </table>
            <h4>Add Estimated Cost:</h4>
            <EstimatedCostForm
              addCostCb={(newEstCost) => addCost(newEstCost)}
            />
          </div>
          <div className="col-5">
            <h3>Our Recommendations:*</h3>
            <table>
              <tbody>
                <tr>
                  <th>Expense Category</th>
                  <th>Cost</th>
                </tr>
                <tr>
                  <td>Venue</td>
                  <td>${(totalIncome * 0.25).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Food</td>
                  <td>${(totalIncome * 0.14).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Drinks</td>
                  <td>${(totalIncome * 0.08).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Music</td>
                  <td>${(totalIncome * 0.1).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Photographer</td>
                  <td>${(totalIncome * 0.1).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Attire for Couple</td>
                  <td>${(totalIncome * 0.08).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Flowers/Decor</td>
                  <td>${(totalIncome * 0.08).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Stationary</td>
                  <td>${(totalIncome * 0.02).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Wedding Coordinator</td>
                  <td>${(totalIncome * 0.07).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Hair and Makeup</td>
                  <td>${(totalIncome * 0.03).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Wedding Rings</td>
                  <td>${(totalIncome * 0.02).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Favors and Gifts</td>
                  <td>${(totalIncome * 0.01).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Extra Fees/Emergency</td>
                  <td>${(totalIncome * 0.02).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Your funds:</td>
                  <td>${totalIncome}</td>
                </tr>
              </tbody>
            </table>
            <p>
              *Recommendation based off of your funds and average breakdown of
              wedding costs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
