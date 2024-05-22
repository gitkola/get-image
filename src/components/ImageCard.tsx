import React from "react";
import { Card } from "../types";

const ImageCard: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div key={card.id} className="card card-custom">
      <img src={card.imageUrl || "placeholder.png"} alt="" />
      <div className="card-body">
        <p className="card-text">{card.prompt}</p>
      </div>
    </div>
  );
};

export default ImageCard;
