import React from "react";
import { render, screen } from "@testing-library/react";
import ImageCard from "../components/ImageCard";
import { Card } from "../types";

const card: Card = {
  id: 1,
  prompt: "This is a test prompt",
  imageUrl: "https://example.com/test-image.jpg",
};

describe("ImageCard", () => {
  it("renders without crashing", () => {
    render(<ImageCard card={card} />);
    expect(screen.getByText("This is a test prompt")).toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute("src", card.imageUrl);
  });

  it("displays a placeholder image when imageUrl is not provided", () => {
    const cardWithoutImage: Card = {
      ...card,
      imageUrl: "",
    };
    render(<ImageCard card={cardWithoutImage} />);
    expect(screen.getByAltText("")).toHaveAttribute("src", "placeholder.png");
  });
});
