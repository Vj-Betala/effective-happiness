import React from 'react'
import styles from '../../styles/Home.module.css'
import UserProfile from '../../components/UserProfile'
import PostFeed from '../../components/PostFeed'
import { getUserWithUserName, postToJSON } from '../../lib/firebase'
import { limit, orderBy, query, where } from 'firebase/firestore'

export async function getServerSideProps({ query }) {

  const { username } = query;

  const userDoc = await getUserWithUserName(username);

  let user = null;
  let posts = null;

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  if(userDoc) {
    user = userDoc.data();
    // const postsQuery = userDoc.ref
    // .collection('posts')
    // .where('published', '==', true)
    // .orderBy('createdAt', 'desc')
    // .limit(5);

    const postsQuery = query(userDoc.get('posts'), where('published','==',true), orderBy('createdAt', 'desc'), limit(5));

    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props : { user, posts},
  }
}

export default function UserProfilePage({ user, posts}) {

  //Find Admin and change it

  return (
    <main>
      <UserProfile user={user}/>
      <PostFeed posts={posts} admin={false}/>
    </main>
  )
}


