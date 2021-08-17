import React, {useEffect, useState} from "react";
import './styles/App.css'
import PostsList from "./Components/PostsList";
import PostForm from "./Components/PostForm";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/MyModal/MyModal";
import MyButton from "./Components/UI/button/MyButton";
import {usePosts} from "./Components/hooks/usePosts";
import PostsService from "./api/PostsService";
import Loader from "./Components/UI/Loader/Loader";
import {useFetching} from "./Components/hooks/useFetching";

const App = () => {
    let [posts, setPosts] = useState([
        // {id: 1, title: 'ccc', body: 'Description'},
        // {id: 2, title: 'rfr', body: 'Description'},
        // {id: 3, title: 'aaa', body: 'Description'}
    ])

    let [filter, setFilter] = useState({sort: '', query: ''})
    let [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    let [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const posts = await PostsService.getAll();
        setPosts(posts)
    })


    useEffect(() => {
        fetchPosts()
    }, [])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
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

            {postError &&
                <h1>Error is ${postError}</h1>
            }

            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', margin: '50px 0'}}><Loader/></div>
                :
                <PostsList remove={removePost} posts={sortedAndSearchedPosts} title='Posts list 1'/>

            }


        </div>
    );
}


export default App;
