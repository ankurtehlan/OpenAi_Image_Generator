import { useState, useRef } from "react";

import "./ImageGenerator.css";
import defaultImage from "../Assets/default_image.svg";

const ImageGenerator = () => {
  const [imageUrl, setimageUrl] = useState("/");

  const inputRef = useRef(null);

  const imageHandler = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer /* {input you OpenAi api key here}*/",

          "User-Agent": "chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    console.log(data);
  };

  return (
    <div className="AiImageGenerator">
      <div className="header">
        Ai image <span>generator</span>
      </div>
      <div className="image-loading">
        <div className="image">
          <img src={imageUrl === "/" ? defaultImage : imageUrl} alt="Girl" />
        </div>
      </div>
      <div className="searchBox">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What You Want To See"
        />
        <div
          className="generateMedia"
          onClick={() => {
            imageHandler();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
