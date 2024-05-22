import React, { useRef, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { Card } from "../types";

interface ImageDescriptionFormProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
  onSubmit: (newCard: Card) => void;
}

const MAX_PROMPT_LENGTH = 1000;
const MAX_TEXTAREA_HEIGHT = 200;

const validatePrompt = (prompt: string): boolean => {
  const value = prompt.trim();
  return value.length >= 2 && /[a-zA-Zа-яА-Я]{2}/.test(value);
};

const ImageDescriptionForm: React.FC<ImageDescriptionFormProps> = ({
  prompt,
  setPrompt,
  isSubmitting,
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const promptIsValid = validatePrompt(prompt);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_PROMPT_LENGTH) {
      setPrompt(e.target.value);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        const height = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${height}px`;
        if (height >= MAX_TEXTAREA_HEIGHT) {
          textareaRef.current.style.overflowY = "scroll";
        } else {
          textareaRef.current.style.overflowY = "hidden";
        }
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && promptIsValid) {
      e.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promptIsValid) return;

    const timestamp = Date.now();
    const newCard: Card = {
      id: timestamp,
      prompt: prompt.trim(),
      imageUrl: "",
    };
    onSubmit(newCard);
    setPrompt("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} ref={formRef} data-testid="form">
        <label htmlFor="prompt">Введіть опис зображення</label>
        <div className="d-flex align-items-end">
          <textarea
            id="prompt"
            className="form-control auto-resize"
            rows={1}
            placeholder="Опишіть зображення..."
            value={prompt}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            maxLength={MAX_PROMPT_LENGTH}
            ref={textareaRef}
            required
            style={{ maxHeight: `${MAX_TEXTAREA_HEIGHT}px` }}
          />
          <button
            type="submit"
            className="submit-button"
            disabled={!promptIsValid || isSubmitting}
          >
            {isSubmitting ? (
              <i className="fas fa-spinner fa-spin icon"></i>
            ) : (
              <i className="fas fa-arrow-up icon"></i>
            )}
          </button>
        </div>
        <div className="text-right mt-2">
          <small className="text-muted">
            {prompt.length}/{MAX_PROMPT_LENGTH} символів
          </small>
        </div>
        <div className="text-right mt-1">
          <small className="text-muted">
            Максимальна довжина опису - {MAX_PROMPT_LENGTH} символів.
          </small>
        </div>
      </form>
    </div>
  );
};

export default ImageDescriptionForm;
