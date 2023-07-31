import ReactGiphySearchBox from 'react-giphy-searchbox-techedge'
import axios from 'axios';
import { useCallback, useState } from 'react';
import './giphy.css'

export function GIPHY({ onSelectedStickersChange }){

    let [searchedTerm, setSearchedTerm] = useState("");
    let [stickers, setStickers] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    const [selectedStickers, setSelectedStickers] = useState([]);
    

    let giphyapikey = '8TO3yvIyv8GjwG9F4uvUoJWqqnb670UD';
    let params = {
        api_key:giphyapikey,
        q:searchedTerm,  
        limit:5
    
    }

    let handleChange = (fig)=> {
        console.log(`this is the changed object->${fig.target.value}`);
        setSearchedTerm(fig.target.value)
    };

    let onSubmit = (event)=>{
        event.preventDefault();
        setCurrentPage(1);
        fetchStickers(1);
        
    }

    let fetchStickers = page => {
        axios.get('https://api.giphy.com/v1/stickers/search',{
            params:{...params,offset:(page-1)*5}
        }).then((response)=>{
            if(page == 1){
                console.log(response);
                setStickers(response.data.data)
            }else{
                setStickers((previousStickers) => [...previousStickers, ...response.data.data]);
            }
        }).catch(err=>console.log(err))
    }

    let handleLoadMore = ()=>{
        const nxtPage = currentPage + 1;
        setCurrentPage(nxtPage);
        fetchStickers(nxtPage)
    }

    //adding the handle select event here

    const handleStickerClick = (sticker) => {
        setSelectedStickers((prevStickers) => {
          const isStickerSelected = prevStickers.some((selected) => selected === sticker.images.fixed_height.url);
          if (isStickerSelected) {
            // console.log(sticker.)
            // If sticker is already selected, remove it from the array
            const updatedStickers = prevStickers.filter((selected) => selected !== sticker.images.fixed_height.url);
            // Call the callback function with the updated array
            onSelectedStickersChange(updatedStickers);
            return updatedStickers;
          } else {
            // If sticker is not selected, add it to the array
            const updatedStickers = [...prevStickers, sticker.images.fixed_height.url];
            // Call the callback function with the updated array
            onSelectedStickersChange(updatedStickers);
            return updatedStickers;
          }
        });
      };


    return (
        <div>
            <form onSubmit={onSubmit}>
        <input type="text" value={searchedTerm} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div className='scroll-box'>
        <div className='scroll-box__wrapper'>
            <div className='scorll-box__container' role='list'>
            {stickers.map((sticker) => (
          <img
          className={`stickers ${selectedStickers.includes(sticker.images.fixed_height.url) ? 'selected' : ''}`}
          key={sticker.id}
          src={sticker.images.fixed_height.url}
          alt={sticker.title}
          onClick={() => handleStickerClick(sticker)}
        />
        ))}
            </div>
        </div>
        
      </div>
      {stickers.length > 0 && (
        <button onClick={handleLoadMore} style={{ marginTop: '10px' }}>
          Load More
        </button>
      )}
        </div>
    )
}