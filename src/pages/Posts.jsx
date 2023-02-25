import React from 'react'
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import {usePosts} from "../hooks/usePost";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/pagination/Pagination";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import {useFetching} from "../hooks/useFetching";
import classes from '../components/UI/button/MyButton.module.css'


function Posts() {

    const [posts, setPosts] = React.useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
    ])
    const [filter, setFilter] = React.useState({sort: '', query: ''})
    const [modal, setModal] = React.useState('')
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = React.useState(0)
    const [limit, setLimit] = React.useState(10)
    const [page, setPage] = React.useState(1)

    const [fetchPosts, isPostsLoading, postError] =
        useFetching(async (limit, page) => {
            const response = await PostService.getAll(limit, page)
            setPosts(response.data)
            const totalCount = response.headers['x-total-count']
            setTotalPages(getPageCount(totalCount, limit))
        })


    console.log(totalPages)

    React.useEffect(() => {
        fetchPosts(limit, page)
    }, [])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }

    return (
        <div className="App">
            <MyButton  onClick={fetchPosts}>GET POSTS</MyButton>
            <MyButton
                style={{marginTop: '30px'}}
                onClick={() => setModal(true)}>
                Create User
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Error ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Loader/>
                </div>
                : <PostList remove={removePost}
                            posts={sortedAndSearchedPosts}
                            title='Post List'
                />
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    );
}

export default Posts;
