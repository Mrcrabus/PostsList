import React, {useEffect, useState} from "react";
import './styles/App.css'
import PostsList from "./Components/PostsList";
import PostForm from "./Components/PostForm";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/MyModal/MyModal";
import MyButton from "./Components/UI/button/MyButton";
import {usePosts} from "./Components/hooks/usePosts";
import axios from "axios";

const App = () => {
    let [posts, setPosts] = useState([])

    let [filter, setFilter] = useState({sort: '', query: ''})
    let [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    useEffect(()=> {
        fetchPosts()
    }, [])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const fetchPosts = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(response.data)
    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }


    return (
        <div className='App'>
            <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
            <MyButton style={{margin: "5px 0"}} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVision={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>

            <PostsList remove={removePost} posts={sortedAndSearchedPosts} title='Posts list 1'/>


        </div>
    );
}


export default App;
