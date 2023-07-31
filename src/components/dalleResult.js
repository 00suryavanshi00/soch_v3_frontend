import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import InputBox from "./InputBox";
import "./DalleResule.css";

export function DalleResult({ selectedOption , onImageSelect}) {
  let [userPrompt, setUserPrompt] = useState("");
  let [imageUrls, setImageUrls] = useState([]);
  let [loading, setLoading] = useState(false);
  let [selectedImageUrl, setSelectedImageUrl] = useState("");

  const configuration = new Configuration({
    apiKey: "sk-Wazmyi6TCgtGhUDUd9B4T3BlbkFJbLqfakErvzGkm8mZY5lc",
  });

  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    setImageUrls([]);
  }, [selectedOption]);

  const generateImages = async () => {
    setLoading(true);
    try {
      const res = await openai.createImage({
        prompt: userPrompt,
        n: 4,
        size: "512x512",
      });

      const urls = res.data.data.map((item) => item.url);
      setImageUrls(urls);
      setLoading(false);
    } catch (err) {
      console.log(`Something broke -> ${err}`);
      setLoading(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    onImageSelect(imageUrl); // Pass the selected image URL back to the parent component
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main>
          {imageUrls.length > 0 &&
            imageUrls.map((url, index) => (
              <img
                className={`dalleimage ${selectedImageUrl === url ? 'selected' : ''}`}
                key={index}
                src={url}
                alt={`Generated Image ${index + 1}`}
                onClick={() => handleImageClick(url)}
              />
            ))}
          <div id="main-search">
              <InputBox className="inbox" placeholder="What's on your mind 🤔" setAttribute={setUserPrompt} />
              <button className="but" onClick={generateImages}>Generate</button>

          </div>
          
        </main>
      )}
    </div>
  );
}
