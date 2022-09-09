import React, { useContext } from 'react'
import { auth, googleAuthProvider} from '../lib/firebase'
import { UserContext } from '../lib/context';

export default function EnterPage () {
  
  const {user, username} = useContext(UserContext);
  
  return (
      <main>
        {user ?
          !username ? <UsernameForm/> : <SignOutButton/>
          :
          <SignInButton/>
        }
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
  return (
    <div>
Test
    </div>
  )
}
