import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import { getCourseCount } from '../../services/courseService';
import getNavLinks from './../../services/NavLinks';

class Sidebar extends Component {


    state = {
        courseCount: ''
    };

    // async componentDidMount() {
    //     const { data: courseCount } = await getCourseCount();
    //     console.log(courseCount);
    //     this.setState({ courseCount: courseCount.count });
    // }


    logout = () => {
        sessionStorage.removeItem("access_token");
        window.location = '/';
    };

    hasAuthority = (authority) => {
        const authorities = JSON.parse(sessionStorage.getItem('authorities'));
        let foundAuthority = false;
        if (authorities !== undefined && authorities !== null) {
            authorities.forEach((authorityInfo) => {
                if (authorityInfo.authority === authority) {
                    foundAuthority = true;
                }
            });
        }
        return foundAuthority;
    };

    render() {
        let count = 1;
        const navLinks = getNavLinks();
        return (
            <nav className="col-2 position-fixed d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <div className="sidebar-header pb-3 pt-1 justify-content-center">
                        <div className="user-info justify-content-center text-center">
                            <span className="user-name justify-content-center">
                                <strong>شرکت آیسان</strong>
                            </span>
                        </div>
                    </div>
                    <ul className="nav flex-column">
                        {navLinks.map(nav => this.hasAuthority(nav.authority) ? (
                            <li className="nav-item sidebar-dropdown" key={count++}>
                                <Link className="nav-link" to={nav.path}>
                                    <span className={nav.icon}/>
                                    <span className="icon-title m-2">{nav.name}</span>
                                </Link>
                            </li>
                        ) : null)}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Sidebar;
