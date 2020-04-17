const users = [
  {
    id: '1',
    name: 'Sopheak',
    email: 'sopheak@gmail.com',
    age: 29
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@gmail.com'
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@gmail.com'
  }
]

const posts = [
  {
    id: '10',
    title: 'Zero to mastery',
    body: 'become a hero of coding with graphql',
    published: true,
    author: '1'
  },
  {
    id: '11',
    title: 'Amazing Spiderman',
    body: 'The first spiderman movie',
    published: false,
    author: '1'
  },
  {
    id: '12',
    title: 'Love and war',
    body: 'unable to make love when you are on war',
    published: true,
    author: '2'
  }
]

const comments = [
  {
    id: '102',
    text: 'This worked well for me. Thanks',
    author: '3',
    post: '10'
  },
  {
    id: '103',
    text: 'Glad you enjoyed it',
    author: '1',
    post: '10'
  },
  {
    id: '105',
    text: 'Hahahaah',
    author: '2',
    post: '11'
  },
  {
    id: '106',
    text: 'whatever ...',
    author: '1',
    post: '12'
  }
]

const db = {
  users,
  posts,
  comments
}

export { db as default }
