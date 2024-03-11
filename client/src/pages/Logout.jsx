import { redirect } from 'react-router-dom';
import Logout from "../components/Logout/Logout"

function LogoutPage() {
  return <Logout/>
}

export default LogoutPage;

export function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  return redirect('/');
}