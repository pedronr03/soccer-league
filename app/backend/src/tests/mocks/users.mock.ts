const allUsers = [
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  }
];

export const findUserByEmail = (email: string) => allUsers.find((user) => user.email === email);

export const findUserById = (id: number) => allUsers.find((user) => user.id === id);

export const dtos = {
  invalidEmail: {
    email: 'invalid_user@user.com',
    password: 'secret_user',
  },
  invalidPassword: {
    email: 'user@user.com',
    password: 'invalid_secret',
  },
  undefinedEmail: {
    password: 'secret_user',
  },
  undefinedPassword: {
    email: 'user@user.com',
  },
  valid: {
    email: 'user@user.com',
    password: 'secret_user',
  },
}