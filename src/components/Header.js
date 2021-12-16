import React from 'react';
import PropTypes from 'prop-types';

const Header = ({titulo}) => {
    //en className con materialize color despues intensidad de color
    return (
        <nav>
            <div className="nav-wrapper light-blue darken-2">
                <a href="#!" className="brand-logo">{titulo}</a>
            </div>
        </nav>
    );
}

Header.propTypes = {
    titulo: PropTypes.string.isRequired
}
export default Header;