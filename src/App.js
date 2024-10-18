import { useEffect, useState } from "react";
import "./App.css";
import SinglCard from "./component/SinglCard";

const cardImages = [
  {
    src: "/img/helmet-1.png",
    matched: false,
  },
  {
    src: "/img/potion-1.png",
    matched: false,
  },
  {
    src: "/img/ring-1.png",
    matched: false,
  },
  {
    src: "/img/scroll-1.png",
    matched: false,
  },
  {
    src: "/img/shield-1.png",
    matched: false,
  },
  {
    src: "/img/sword-1.png",
    matched: false,
  },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceone, setchoicenOne] = useState(null);
  const [choicetwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);
  const shuffeldcarts = () => {
    const shuffeldcarts = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setchoicenOne(null);
    setChoiceTwo(null);

    setCards(shuffeldcarts);
    setTurns(0);
  };
  const handlechoice = (card) => {
    choiceone ? setChoiceTwo(card) : setchoicenOne(card);
  };
  useEffect(() => {
    if (choiceone && choicetwo) {
      setDisable(true);
      if (choiceone.src === choicetwo.src) {
        resetTurns();
        setCards((prevcarts) => {
          return prevcarts.map((card) => {
            if (card.src === choiceone.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [choiceone, choicetwo]);

  const resetTurns = () => {
    setchoicenOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisable(false);
  };
  useEffect(() => {
    shuffeldcarts();
  }, []);
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffeldcarts}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SinglCard
            card={card}
            handlechoice={handlechoice}
            key={card.id}
            flipped={card === choiceone || card === choicetwo || card.matched}
            disable={disable}
          />
        ))}
      </div>
      <h3>Truns : {turns}</h3>
    </div>
  );
}

export default App;
