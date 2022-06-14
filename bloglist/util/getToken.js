const getToken = (request) => {
  const authorization = request.get('authorization')

  if (
    authorization &&
    authorization.toLowerCase().startsWith('bearer ')
  ) {
    return authorization.substring(7)
  } else if (authorization) {
    return authorization
  }
  return null
}

module.exports = getToken
