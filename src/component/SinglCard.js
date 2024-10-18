import React from "react";
import "./SinglCard.css";

export default function SinglCard({ card, handlechoice, flipped, disable }) {
  const handelclick = () => {
    if (!disable) {
      handlechoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          alt="card back"
          onClick={handelclick}
        />
      </div>
    </div>
  );
}
