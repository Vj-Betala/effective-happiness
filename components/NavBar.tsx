import React, { useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../lib/context';

export default function NavBar() {

    const {user, username} = useContext(UserContext);

  return (
    <nav className='navbar'>
        <ul>
            <li>
            <Link href={"/"}>
                <button className='btn-logo'>FEED</button>
            </Link>
            </li>
            {username && (
                <>
                    <li className='push-left'>
                        <Link href={'/admin'}>
                            <button className='btn-blue'>Write Posts</button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${username}`}>
                            <img 
                            src={user?.photoURL}
                            ></img>
                        </Link>
                    </li>
                </>
            )}

            {!username && (
                <li>
                    <Link href={'/enter'}>
                        <button className='btn-blue'>Sign In</button>
                    </Link>
                </li>
            )}
        </ul>
    </nav>
  )
}
