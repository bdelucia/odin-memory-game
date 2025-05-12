import "./index.css";
import { useState } from "react";
import Card from "./components/Card";

function App() {
  const [cardInfo, setCardInfo] = useState({
    image: "",
    title: "",
  });

  return (
    <>
      <Card cardInfo={cardInfo} setCardInfo={setCardInfo} />
    </>
  );
}

export default App;
