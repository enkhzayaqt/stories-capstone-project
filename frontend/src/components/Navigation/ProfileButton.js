import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoUserLogin from '../DemoUserModal'

function ProfileButton({ closeMenu }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  return (
    <>
      <ul id="menu-dropdown">
        {sessionUser ? (
          <>
            <li className="info-li"><i className="far fa-user" /> {sessionUser.username}</li>
            <li className="info-li"><i className="far fa-face-smile" /> {sessionUser.name}</li>
            <li className="info-li"><i className="far fa-envelope" /> {sessionUser.email}</li>
            <li className="info-li section-li"></li>
            <li onClick={logout}><i className="fa-solid fa-right-from-bracket"></i> Log Out</li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={() => closeMenu()}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={() => closeMenu()}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalMenuItem
              itemText="Demo User Login"
              onItemClick={() => closeMenu()}
              modalComponent={<DemoUserLogin />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
