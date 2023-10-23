import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { PostCard, Container } from '../components'
import { useSelector } from 'react-redux'


function AllPosts() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = posts ? posts.userId === userData.$id : false
    useEffect(() => {
        appwriteService.getAllPost([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='min-h-screen w-full py-8'>
            <Container>
                {isAuthor && <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>

                            <PostCard {...post} />

                        </div>
                    ))}
                </div>
                }
            </Container>
        </div>
    )
}

export default AllPosts