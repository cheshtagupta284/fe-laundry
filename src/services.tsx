export const SERVER = 'https://laundry.tanq.tk:5000';

export const fetchUser = async (credentials: any): Promise<Record<string, any>> => {
  const response = await fetch(`${SERVER}/user`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};

export const createUser = async (user: any): Promise<Record<string, any>> => {
  const response = await fetch(`${SERVER}/user/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};

export const deleteLaundry = async (id: number, email: string): Promise<Record<string, any>> => {
  const response = await fetch(`${SERVER}/laundry`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
      User: email
    }
  });

  return response;
};

export const createCloth = async (cloth: any, email: string): Promise<Record<string, any>> => {
  const data = new FormData();
  data.append('image', cloth.image);
  data.append('type', cloth.type);

  const response = await fetch(`${SERVER}/cloth/create`, {
    method: 'POST',
    body: data,
    headers: {
      User: email
    }
  });

  return response.json();
};

export const getClothByUser = async (email: string): Promise<Record<string, any>> => {
  const response = await fetch(`${SERVER}/cloth`, {
    headers: {
      User: email
    }
  });

  return response.json();
};

export const getLaundryByUser = async (email: string): Promise<Record<string, any>> => {
  const response = await fetch(`${SERVER}/laundry`, {
    headers: {
      User: email
    }
  });

  return response.json();
};

export const createLaundry = async (laundry: any, email: string): Promise<Record<string, any>> => {
  const response = await fetch(`${SERVER}/laundry/create`, {
    method: 'POST',
    body: JSON.stringify(laundry),
    headers: {
      User: email,
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};
