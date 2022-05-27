import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Item from "../Item/Item";

import "./itemsStyles.scss";

function Items() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);

  async function getItems() {
    const results = await axios.get("http://localhost:3001/", {
      withCredentials: true,
    });
    setItems(results.data);
    setLoading(false);
  }

  function handleDrop(e, index) {
    e.preventDefault();
    console.log(index);
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="items-wrapper">
      <h3>Prioritization Items</h3>
      <div className="items-container">
        {loading ? (
          <p>Loading</p>
        ) : (
          <div className="item-list">
            <div className="item-numbers">
              {items.map((item, index) => (
                <div className="item-number" key={item.id}>
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="items">
              {items.map((item, index) => (
                <Item
                  key={item.id}
                  index={index}
                  desc={item.description}
                  priority={item.priority}
                  handleDrop={(index) => handleDrop(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Items;
