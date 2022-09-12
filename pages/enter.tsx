import React, { useCallback, useContext, useEffect, useState } from 'react'
import { auth, firestore, googleAuthProvider} from '../lib/firebase'
import { UserContext } from '../lib/context';
import  debounce  from 'lodash.debounce';

export default function EnterPage () {
  
  const {user, username} = useContext(UserContext);
  
  return (
      <main>
        {user ? !username ? <UsernameForm/> : <SignOutButton/> : <SignInButton/>}
      </main>
  )
}



function SignInButton() {

  const signInWithGoogle = async () => {
    
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <div>
      <button className='btn-google' onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  )
}

function SignOutButton() {
  return (
    <div>
      <button className='btn-google' onClick={() => {auth.signOut()}}>
        Sign out
      </button>
    </div>
  )
}

function UsernameForm() {

  const [formValue, setFormValue]= useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const {user, username} = useContext(UserContext);

  const onChange = e => {
    const val = e.target.value.toLowerCase();
    const regExpression = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
    if(val.length < 3){
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
  
    if(regExpression.test(val)){
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUserName = useCallback(debounce(async (username : string) => {
    if(username.length >= 3) {
      const ref = firestore.doc(`usernames/${username}`);
      const { exists } = await ref.get();
      console.log("firestore read");
      setIsValid(!exists);
      setLoading(false);
    }
  }, 500), []);

  useEffect(() => {
    checkUserName(formValue);
  }, [formValue])

  const onSubmit = async (e) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();

    try {
      batch.set(userDoc, {username: formValue, photoURL: user.photoURL, displayName: user.displayName});
      batch.set(usernameDoc, {uid: user.uid});

      await batch.commit();
    } catch (error) {
      
    }
  }

  

  return (
    !username && (
      <section>
        <h2>Select username</h2>

        <form onSubmit={onSubmit}>

          <input name='username' placeholder='username' value={formValue} onChange={onChange}/>

          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

          <button type='submit' className='btn-green' disabled={!isValid}>
            Submit
          </button>

          <p>Debug State</p>
          <div>
            UserName: {formValue}
            <br/>
            Loading : {loading.toString()}
            <br/>
            Username Valid : {isValid.toString()}
          </div>
        </form>
      </section>
    )
  )
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}