import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../usersSlice';
function Users() {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector(store => store.users);
  
    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);
  
  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error}`;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{`${user.name.first} ${user.name.last}`}</li>
      ))}
    </ul>
  );
}

export default Users;