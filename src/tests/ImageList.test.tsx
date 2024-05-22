import React from "react";
import { render, screen } from "@testing-library/react";
import ImageList from "../components/ImageList";
import { Card } from "../types";

const cards: Card[] = [
  {
    id: 1,
    prompt: "First prompt",
    imageUrl: "https://example.com/first-image.jpg",
  },
  {
    id: 2,
    prompt: "Second prompt",
    imageUrl: "https://example.com/second-image.jpg",
  },
];

describe("ImageList", () => {
  it("renders a list of cards", () => {
    const scrollableRef = React.createRef<HTMLDivElement>();
    render(<ImageList cards={cards} scrollableRef={scrollableRef} />);

    expect(screen.getByText("First prompt")).toBeInTheDocument();
    expect(screen.getByText("Second prompt")).toBeInTheDocument();

    const images = screen.getAllByAltText("");
    expect(images[0]).toHaveAttribute(
      "src",
      "https://example.com/second-image.jpg"
    );
    expect(images[1]).toHaveAttribute(
      "src",
      "https://example.com/first-image.jpg"
    );
  });

  it("renders a placeholder image when imageUrl is not provided", () => {
    const cardsWithPlaceholder: Card[] = [
      { id: 1, prompt: "First prompt", imageUrl: "" },
    ];
    const scrollableRef = React.createRef<HTMLDivElement>();
    render(
      <ImageList cards={cardsWithPlaceholder} scrollableRef={scrollableRef} />
    );

    expect(screen.getByText("First prompt")).toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute("src", "placeholder.png");
  });
});
