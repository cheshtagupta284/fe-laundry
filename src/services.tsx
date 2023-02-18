export const fetchUser = async (credentials: any): Promise<Record<string, any>> => {
  const response = await fetch('http://localhost:8080/user', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

export const createUser = async (user: any): Promise<Record<string, any>> => {
  const response = await fetch('http://localhost:8080/user/register', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

export const createCloth = async (user: any): Promise<Record<string, any>> => {
  const data = new FormData();
  data.append('image', user.image);
  data.append('type', user.type);

  const response = await fetch('http://localhost:8080/cloth/create', {
    method: 'POST',
    body: data,
    headers: {
      User: 'test@test.com'
    }
  });

  return response.json();
};

export const getClothByUser = async (): Promise<Record<string, any>> => {
  const response = await fetch('http://localhost:8080/cloth', {
    headers: {
      User: 'test@test.com'
    }
  });

  return response.json();
};
