// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ sx, ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user?.photoURL}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar('John').color}
      {...other}
      sx={
        sx || {
          padding: 0,
          width: 30,
          height: 30,
        }
      }
    >
      {createAvatar('John').name}
    </MAvatar>
  );
}
