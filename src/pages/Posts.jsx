import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'
import PostsList from "../Components/PostsList";
import PostForm from "../Components/PostForm";
import PostFilter from "../Components/PostFilter";
import MyModal from "../Components/UI/MyModal/MyModal";
import MyButton from "../Components/UI/button/MyButton";
import {usePosts} from "../Components/hooks/usePosts";
import PostsService from "../api/PostsService";
import Loader from "../Components/UI/Loader/Loader";
import {useFetching} from "../Components/hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../Components/UI/pagination/Pagination";
import {useObserver} from "../Components/hooks/useObserver";
import MySelect from "../Components/UI/select/MySelect";

const Posts = () => {
    let [posts, setPosts] = useState([
        // {id: 1, title: 'ccc', body: 'Description'},
        // {id: 2, title: 'rfr', body: 'Description'},
        // {id: 3, title: 'aaa', body: 'Description'}
    ])

    let [filter, setFilter] = useState({sort: '', query: ''})
    let [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    let [totalPages, setTotalPages] = useState(0)
    let [limit, setLimit] = useState(10)
    let [page, setPage] = useState(1)
    const lastElement = useRef()


    let [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostsService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => setPage(page + 1))


    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)

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
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Page count'
                options={[
                    {value:5, name: '5'},
                    {value:10, name: '10'},
                    {value:25, name: '25'},
                    {value:-1, name: 'All'}
                ]}
            />

            {postError &&
            <h1>Error is ${postError}</h1>
            }

            <PostsList remove={removePost} posts={sortedAndSearchedPosts} title='Posts list 1'/>

            <hr ref={lastElement}/>

            {isPostsLoading &&
            <div style={{display: 'flex', justifyContent: 'center', margin: '50px 0'}}><Loader/></div>
            }


            <Pagination
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />


        </div>
    );
}


export default Posts;
