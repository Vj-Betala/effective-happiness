import React, { useContext, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import AuthCheck from '../../components/AuthCheck'
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import { auth, firestore, serverTimeStamp } from '../../lib/firebase'
import kebabCase from 'lodash.kebabcase'
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import styles from '../../styles/Home.module.css'

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <PostList/>
        <CreateNewPosts/>
      </AuthCheck>
    </main>
  )
}

function PostList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => {
    doc.data();
  })

  return (
    <>
      <h1>
        Manage Posts
      </h1>
      <PostFeed posts={posts} admin={true}/>
    </>
  )
}

function CreateNewPosts() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3  && title.length < 100;

  const CreatePost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published:false,
      content : "# Hello World",
      createdAt : serverTimeStamp(),
      updatedAt : serverTimeStamp(),
      heartCount : 0
    }

    await ref.set(data)

    toast.success('Post Created');

    router.push(`/admin/${slug}`);

  }

  return (
    <form onSubmit={CreatePost}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='create-posts' className={styles.input}/>
      <p>
        <strong>Slug: </strong> {slug}
      </p>

      <button type='submit' disabled={!isValid} className='btn-green'>
        Create Post
      </button>
    </form>
  )
}
