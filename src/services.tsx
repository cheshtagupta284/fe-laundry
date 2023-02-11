const userData = [
  {
    fname: 'Golu',
    lname: 'Gupta',
    email: 'gg@gg.com',
    password: 'gg'
  },
  {
    fname: 'Manu',
    lname: 'Singh',
    email: 'ms@ms.com',
    password: 'ms'
  }
];

export const fetchUser = (credentials: any) => {
  const [user] = userData.filter(
    (user) => credentials.email == user.email && credentials.password === user.password
  );
  return user;
};
