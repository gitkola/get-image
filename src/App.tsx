import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles.css";
import ImageList from "./components/ImageList";
import ImageDescriptionForm from "./components/ImageDescriptionForm";
import { Card } from "./types";

const REQUEST_URL = "https://get-image-back.onrender.com/api/v1/prompt";
const LOADING_IMAGE =
  "https://fakeimg.pl/600x400/00cccc/0000ff?text=Loading...";
const ERROR_IMAGE = "https://fakeimg.pl/600x400/00cccc/fa0026?text=Error";

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const scrollableRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (newCard: Card) => {
    newCard.imageUrl = LOADING_IMAGE;
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
    let successOrErrorImage;
    try {
      const response = await fetch(REQUEST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: newCard.prompt,
        }),
      });

      const data = await response.json();
      if (data && typeof data?.imageUrl === "string") {
        successOrErrorImage = data?.imageUrl;
      }
    } catch (error) {
      console.error("Error:", (error as Error)?.message);
      successOrErrorImage = ERROR_IMAGE;
    } finally {
      newCard.imageUrl = successOrErrorImage;
      setCards((prevCards) => [
        newCard,
        ...prevCards.filter((card) => card.id !== newCard.id),
      ]);
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
