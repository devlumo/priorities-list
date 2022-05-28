import React from "react";
import { MdDragIndicator } from "react-icons/md";
import "./itemStyles.scss";

const Item = ({ index, desc, allowDrop, handleDrop, onDragStart }) => {
  return (
    <div
      className="item"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => allowDrop(e, index)}
      onDrop={(e) => handleDrop(e, index)}
    >
      <div className="description">{desc}</div>
      <div className="drag-icon">
        <MdDragIndicator />
      </div>
    </div>
  );
};

export default Item;
