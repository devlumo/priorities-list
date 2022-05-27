import React from "react";
import { useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import "./itemStyles.scss";

const Item = ({ index, desc, handleDrop }) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  function handleDrag(e) {
    e.preventDefault();
    setDraggedItemIndex(index);
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  return (
    <div
      className="item"
      draggable
      onDrag={handleDrag}
      onDragOver={allowDrop}
      onDrop={handleDrop(index)}
    >
      <div className="description">{desc}</div>
      <div className="drag-icon">
        <MdDragIndicator />
      </div>
    </div>
  );
};

export default Item;
