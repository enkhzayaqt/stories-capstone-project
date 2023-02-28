import { useEffect, useRef, useState } from 'react';
import ProfileButton from '../Navigation/ProfileButton';


function Dropdown() {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();

    const closeMenu = (e) => {
        if (e === undefined) {
            setShowMenu(false);
            return;
        } else if (menuRef.current && showMenu && !menuRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeMenu);
        return () => document.removeEventListener("mousedown", closeMenu);
    }, [showMenu])

    return (
        <div className='dropdown-menu'>
            <div className='dropdown-button' onClick={() => setShowMenu(true)} >
                <img id='dropdown-profile-pic' src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' />
            </div>
            <div ref={menuRef} className={showMenu ? "dropdown-item" : "dropdown-item hidden"} >
                <ProfileButton closeMenu={closeMenu} />
            </div>
        </div>
    )
}

export default Dropdown;
