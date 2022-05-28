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

    // swap items and reset item state / update backend

    let data = [...items];
    let saveItem = items[dropItemIndex];
    data[dropItemIndex] = data[draggedItemIndex];
    data[draggedItemIndex] = saveItem;

    setItems(data);

    await axios.patch(
      "http://localhost:3001/update",
      {
        // look at swapped items
        itemDroppedOn: data[draggedItemIndex],
        itemDragged: data[dropItemIndex],
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
