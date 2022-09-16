import React from 'react'
import { firestore, getUserWithUserName, postToJSON } from '../../lib/firebase';
import styles from '../../styles/Home.module.css'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import PostContent from '../../components/PostContent';
import { doc, collection, getDocs, query, collectionGroup} from 'firebase/firestore';

export async function getStaticProps( {params} ) {
  const {username, slug} = params;
  const userDoc = await getUserWithUserName(username);

  let post, path;

  if(userDoc){
    // const postRef = userDoc.ref.collection('posts').doc(slug);
    const postRef = userDoc.get('posts', slug)
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props : {post, path},
    revalidate: 5000,
  }
}

export async function getStaticPaths() {
  // const snapshot = await firestore.collectionGroup('posts').get();

  const collect = query(collectionGroup(firestore, 'posts'))

  const snapshot = await getDocs(collect)

  const paths = snapshot.docs.map((doc) => {
    const {slug, username} = doc.data();

    return {
      params : {username, slug}
    }
  })

  return {
    paths,
    fallback:'blocking',
  };
}

export default function PostPage(props) {

  const postRef = doc(firestore, props.path);
  const [realTimeData] = useDocumentData(postRef); 

  const post = realTimeData || props.post;
  return (
    <main className={styles.container}>

      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

      </aside>
    </main>
  )
}
