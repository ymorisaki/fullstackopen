import React from 'react'
import styles from './Message.module.scss'

const Message = ({ message }) => {
  return (
    <>
      {message.message &&
    <p className={
      message.error
        ? `${styles.message} ${styles.error}`
        : `${styles.message} ${styles.success}`
    }>{message.message}</p>
      }
    </>
  )
}

export default Message