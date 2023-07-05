import React, { useEffect, useState } from 'react'

export default function PostList() {

    const[stories, setStories] = useState([]);
    

    useEffect(async () => {
        axios
            .get('http://localhost:3000/stories')
            .then((res) => setStories(res.data))
            .catch(console.log);
    });

    setStories (postFromPlaceholder);

    function getName(userId) {
        return stories.filter((pst) => pst.id === userId)? stories.filter((pst) => pst.id === userId) [0].storyname: "noname";
    }

    return (
        // <div>
        //     stories.map((pst, index) => 
        //     <div key={index}> <Post storyname ={getName(pst.userId)} description = { pst.desc}/> 
        //         {' '}
        //     </div> )
        // </div>
        <div>Error</div>
    )
}
