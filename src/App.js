import React, {useMemo, useState} from "react";
import './styles/App.css'
import PostsList from "./Components/PostsList";
import PostForm from "./Components/PostForm";
import MySelect from "./Components/UI/select/MySelect";
import MyInput from "./Components/UI/input/MyInput";
import PostFilter from "./Components/PostFilter";

const App = () => {
    let [posts, setPosts] = useState([
        {id: 1, title: 'ccc', body: 'Description'},
        {id: 2, title: 'rfr', body: 'Description'},
        {id: 3, title: 'aaa', body: 'Description'}
    ])

    let [filter, setFilter] = useState({sort: '', query: ''})

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort(
                (a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort)

    }


    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter/>
            {sortedAndSearchedPosts.length !== 0
                ?
                <PostsList remove={removePost} posts={sortedAndSearchedPosts} title='Posts list 1'/>
                :
                <h1 style={{textAlign: 'center'}}>Post's List is empty</h1>
            }

        </div>
    );
}


export default App;
