import React from 'react'

const Message = ({
  message,
}) => {
  return (
    <div>
      {
        message.visible &&
        message.error &&
        message.valid &&
        <strong>入力された値が不正である、もしくは該当のユーザーは存在しない可能性があります</strong>
      }
      {
        message.visible &&
        message.error &&
        !message.valid &&
        <strong>入力された値が不正です。<br />Nameは3文字以上、Numberは半角数字で「00-0000-0000」もしくは「090-0000-0000」の形式で入力してください</strong>
      }
      {
        message.visible &&
        !message.error &&
        !message.valid &&
        <p>ユーザーの登録が完了しました</p>
      }
    </div>
  )
}

export default Message