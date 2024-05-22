import React from "react";
import { Card } from "../types";
import ImageCard from "./ImageCard";

interface ImageListProps {
  cards: Card[];
  scrollableRef: React.RefObject<HTMLDivElement>;
}

const ImageList: React.FC<ImageListProps> = ({ cards, scrollableRef }) => {
  return (
    <div className="scrollable" id="card-container" ref={scrollableRef}>
      {cards
        .slice()
        .reverse()
        .map((card) => (
          <ImageCard key={card.id} card={card} />
        ))}
    </div>
  );
};

export default ImageList;
