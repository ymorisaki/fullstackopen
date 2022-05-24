const listHelper = require('../util/list_helpers');

test('dummy return one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)

  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      "title": "test",
      "author": "mori",
      "url": "http://localhost",
      "likes": 15,
      "_id": "628c466cbd8a074a0283e05f",
      "__v": 0
    },
    {
      "title": "test",
      "author": "saki",
      "url": "http://localhost",
      "likes": 3,
      "_id": "628c466cbd8a074a0283e05f",
      "__v": 0
    },
    {
      "title": "test",
      "author": "mori",
      "url": "http://localhost",
      "likes": 5,
      "_id": "628c466cbd8a074a0283e05f",
      "__v": 0
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)

    expect(result).toBe(23)
  })

  test('最もお気に入りされている記事', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)

    expect(result).toEqual({
      title: "test",
      author: "test",
      likes: 15,
    })
  })
})
