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
