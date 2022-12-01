import React from 'react';
import {useParams} from 'react-router-dom'
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";


const PostIdPages = () => {
    const params = useParams()
    const [post,setPost] = React.useState({})
    const [comments,setComments] = React.useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id)=>{
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id)=>{
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })

    React.useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    },[])


    return (
        <div>
            <h1>You have opened a post with ID = {post.id}</h1>
            {isLoading
                ? <Loader/>
                : <div> {post.id}. {post.title} </div>
            }
            <h1>
                Comments
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>{comments.map(comm =>
                    <div style={{marginTop: 15}}>
                        <h5>{comm.email}</h5>
                        <h5>{comm.body}</h5>
                    </div>
                )}
                 </div>
            }
        </div>
    );
};

export default PostIdPages;