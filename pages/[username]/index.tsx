import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'

export default function Username() {
  return (
    <div>
        <button onClick={(() => toast.success('Hello Toast'))}>
            Toast
        </button>
    </div>
  )
}
