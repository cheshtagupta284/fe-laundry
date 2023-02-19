export const fetchUser = async (credentials: any): Promise<Record<string, any>> => {
  const response = await fetch('https://laundry.tanq.tk:5000/user', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  alert('Authenticated');
  return response.json();
};

export const createUser = async (user: any): Promise<Record<string, any>> => {
  const response = await fetch('https://laundry.tanq.tk:5000/user/register', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  alert('Authenticated');
  return response.json();
};

export const createCloth = async (cloth: any, email: string): Promise<Record<string, any>> => {
  const data = new FormData();
  data.append('image', cloth.image);
  data.append('type', cloth.type);

  const response = await fetch('https://laundry.tanq.tk:5000/cloth/create', {
    method: 'POST',
    body: data,
    headers: {
      User: email
    }
  });

  alert('Cloth Processed');
  return response.json();
};

export const getClothByUser = async (email: string): Promise<Record<string, any>> => {
  const response = await fetch('https://laundry.tanq.tk:5000/cloth', {
    headers: {
      User: email
    }
  });

  return response.json();
};

export const getLaundryByUser = async (email: string): Promise<Record<string, any>> => {
  const response = await fetch('https://laundry.tanq.tk:5000/laundry', {
    headers: {
      User: email
    }
  });

  return response.json();
};

export const createLaundry = async (laundry: any, email: string): Promise<Record<string, any>> => {
  const response = await fetch('https://laundry.tanq.tk:5000/laundry/create', {
    method: 'POST',
    body: JSON.stringify(laundry),
    headers: {
      User: email,
      'Content-Type': 'application/json'
    }
  });

  alert('Laundry Processed');
  return response.json();
};
