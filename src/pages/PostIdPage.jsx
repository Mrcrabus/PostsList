import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../Components/hooks/useFetching";
import PostsService from "../api/PostsService";
import Loader from "../Components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostsService.getById(id)
        setPost(response.data);
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostsService.getCommentsByPostId(id)
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)

    }, [])

    return (
        <div>
            <h1>Congratulation! Post {params.id} has been opened</h1>
            {isLoading ?
                <Loader/>
                :
                <div>
                    <div style={{marginTop: 15}}><strong>{post.id}.{post.title}</strong></div>
                    <div>{post.body}</div>
                </div>
            }
            <h1>
                Comments
            </h1>
            {isComLoading
                ? <Loader/>
                :
                <div>
                    {comments.map(comment =>
                        <div key={comment.id} style={{marginTop: 15}}>
                            < h5> {comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )
                    }
                </div>
            }

        </div>
    );
};

export default PostIdPage;