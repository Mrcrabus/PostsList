import React, {useState} from "react";
import './styles/App.css'
import PostsList from "./Components/PostsList";
import PostForm from "./Components/PostForm";

const App = () => {
    let [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
        {id: 3, title: 'Javascript 3', body: 'Description'}
    ])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }


    return (
        <div className='App'>
            <PostForm create={createPost}/>
            {posts.length !== 0
                ?
                <PostsList remove={removePost} posts={posts} title='Posts list 1'/>
                :
                <h1 style={{textAlign: 'center'}}>Post's List is empty</h1>
            }

        </div>
    );
}


export default App;
