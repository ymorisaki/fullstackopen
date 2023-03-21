const Notice = ({message}) => {
  const style = {
    color: 'red'
  }

  return (
    <div>
      <p style={style}><strong>{message}</strong></p>
    </div>
  )
}

export default Notice
