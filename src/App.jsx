import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [data, setdData] = useState([]);
  const [limit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch(
      `https://jsonplaceholder.typicode.com/comments?_start=${skip}&_limit=${limit}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setdData((prev) => {
          return [...prev, ...res];
        });
      })
      .finally(() => {
        setLoader(false);
      });
  }, [skip]);

  function handleClick() {
    setSkip((prev) => {
      return prev + limit;
    });
  }
  return (
    <>
      <div className="container" id="card-wrapper">
        {data &&
          data.map(({ body, name }, index) => {
            return (
              <div key={index} className="max-card">
                <img
                  className="card-img"
                  src={`https://picsum.photos/320/200?random=${index}`}
                  alt=""
                />
                <div className="card">
                  <h2 className="title">{name}</h2>
                  <p className="text">{body}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="container" id="button-card">
        {loader && (
          <button className="add-button">"Iltmos biroz kuting"</button>
        )}
        <button onClick={handleClick} className="add-button">
          Ko'proq ma'lumotlar
        </button>
      </div>
    </>
  );
}
