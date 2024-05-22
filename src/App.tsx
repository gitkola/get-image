import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles.css";
import ImageList from "./components/ImageList";
import ImageDescriptionForm from "./components/ImageDescriptionForm";
import { Card } from "./types";

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const scrollableRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (newCard: Card) => {
    setCards((prevCards) => [newCard, ...prevCards]);
    setTimeout(() => {
      if (scrollableRef.current) {
        scrollableRef.current.scrollTo({
          top: scrollableRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.example.com/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: newCard.prompt }),
      });
      const data = await response.json();
      newCard.imageUrl = data.imageUrl;
      setCards((prevCards) => [
        newCard,
        ...prevCards.filter((card) => card.id !== newCard.id),
      ]);
    } catch (error) {
      console.error("Error:", (error as Error)?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container container-custom">
      <ImageList cards={cards} scrollableRef={scrollableRef} />
      <ImageDescriptionForm
        prompt={prompt}
        setPrompt={setPrompt}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
