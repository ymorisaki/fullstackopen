import React from 'react'

const Message = ({
  message,
}) => {
  return (
    <div>
      {
        message.visible &&
        message.error &&
        <strong>該当のユーザーは存在しません</strong>
      }
      {
        message.visible &&
        !message.error &&
        <p>ユーザーの登録が完了しました</p>
      }
    </div>
  )
}

export default Message