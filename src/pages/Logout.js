import { redirect } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function action() {
	localStorage.removeItem('token');
	toast.success('You have successfully logout. See you soon!');
	return redirect('/');
}
