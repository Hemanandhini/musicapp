
import { getAuthToken } from './util/auth'

export async function fetchAvailableSongs() {

  // let res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${100}`);
  // let data = await res.json();
  // console.log("data", data);
  // setLoading(false);
  // setSongs(data);

  const token = getAuthToken();

  console.log("token", token)
  const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=100');
  const resData = await response.json();

  console.log("photos", resData)
  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return resData;
}

export async function fetchAvailableAlbums() {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  const resData = await response.json();
  console.log("alb", resData)
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }

  return resData;
}