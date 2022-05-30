import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Item from "../Item/Item";

import "./itemsStyles.scss";

function Items() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [dropItemIndex, setDropItemIndex] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  async function getItems() {
    const results = await axios.get("http://localhost:3001/", {
      withCredentials: true,
    });
    setItems(results.data);
    setLoading(false);
  }

  function allowDrop(e, index) {
    e.preventDefault();

    // here we save the index of the draggedover item
    // so we can use it in the case it gets dropped on
    setDropItemIndex(index);
  }

  async function handleDrop(e) {
    e.stopPropagation();

    const draggedItem = items[draggedItemIndex];

    // copy items and remove the dragged item
    let data = [...items];
    data.splice(draggedItemIndex, 1);

    // rebuild items array
    let newItems = [
      ...data.slice(0, dropItemIndex),
      draggedItem,
      ...data.slice(dropItemIndex, data.length),
    ];
    setItems(newItems);

    const jsonItems = JSON.stringify(newItems);

    await axios.patch(
      "http://localhost:3001/update",
      {
        jsonItems,
      },
      { withCredentials: true }
    );
  }

  function handleDragStart(e, index) {
    setDraggedItemIndex(index);
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
                <div className="item-number" key={index}>
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="items">
              {items.map((item, index) => (
                <Item
                  key={index}
                  index={index}
                  desc={item}
                  allowDrop={allowDrop}
                  handleDrop={handleDrop}
                  onDragStart={handleDragStart}
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
