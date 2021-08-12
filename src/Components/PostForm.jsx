import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    let [post, setPost] = useState({
        title: '',
        body: ''
    })
    const addNewEvent = (event) => {
        event.preventDefault()

        const newPost ={
            ...post, id: Date.now()
        }

        create(newPost)

        setPost({
            title: '',
            body: ''
        })

    }


    return (
        <form>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Post's name"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}

                type="text"
                placeholder="Post's description"
            />
            <MyButton onClick={addNewEvent}>Make post</MyButton>
        </form>
    );
};

export default PostForm;