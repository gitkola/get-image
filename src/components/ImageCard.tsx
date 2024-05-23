import React from "react";
import { Card } from "../types";

const IMAGE_PLACEHOLDER = "https://placehold.co/600x400";

const ImageCard: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div key={card.id} className="card card-custom">
      <img src={card.imageUrl || IMAGE_PLACEHOLDER} alt="" />
      <div className="card-body">
        <p className="card-text">{card.prompt}</p>
      </div>
    </div>
  );
};

export default ImageCard;
