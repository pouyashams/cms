import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import getNavLinks from './../../services/NavLinks';
import "bootstrap-v4-rtl/dist/css/bootstrap.min.css"

class Sidebar extends Component {

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
            <nav className="col-2 position-fixed d-none d-md-block sidebar side-back">
                <div className="sidebar-sticky">
                    <div className="sidebar-header pb-3 pt-1 justify-content-center">
                        <div className="user-info justify-content-center text-center">
                            <span className="user-name justify-content-center text-white">
                                <strong>شرکت آیسانیک</strong>
                            </span>
                        </div>
                    </div>
                    <ul className="nav flex-column">
                        <div id="accordion">
                            <span>
                                 <li className="nav-item sidebar-dropdown" data-toggle="collapse" href="#collapseThree"
                                     key={count++}>
                                <span className="nav-link pointer">
                                    <span className="fa fa-unsorted text-warning"/>
                                    <span className="icon-title m-2 font-weight-bold text-warning">ایجاد کالا</span>
                                </span>
                            </li>
                                {navLinks.map(nav => this.hasAuthority(nav.authority) ?
                                    nav.type==="product" ?
                                        <div id="collapseThree" className="collapse" data-parent="#accordion">
                                            <li className="nav-item sidebar-dropdown" key={count++}>
                                                <Link className="nav-link" to={nav.path}>
                                                    <span className={`${nav.icon} text-light`}/>
                                                    <span className="icon-title m-2 text-light">{nav.name}</span>
                                                </Link>
                                            </li>
                                        </div>
                                        : null
                                    : null)}
                            </span>
                            <span>
                                 <li className="nav-item sidebar-dropdown" data-toggle="collapse" href="#collapseOne"
                                     key={count++}>
                                 <span className="nav-link pointer">
                                     <span className="fa fa-unsorted text-warning"/>
                                    <span className="icon-title m-2 font-weight-bold text-warning">مدیریت ها</span>
                                </span>
                            </li>
                                {navLinks.map(nav => this.hasAuthority(nav.authority) ?
                                    nav.type==="management" ?
                                        <div id="collapseOne" className="collapse" data-parent="#accordion">
                                            <li className="nav-item sidebar-dropdown" key={count++}>
                                                <Link className="nav-link" to={nav.path}>
                                                    <span className={`${nav.icon} text-light`}/>
                                                    <span className="icon-title m-2 text-light">{nav.name}</span>
                                                </Link>
                                            </li>
                                        </div>
                                        : null
                                    : null)}
                            </span>
                            <span>
                                 <li className="nav-item sidebar-dropdown" data-toggle="collapse" href="#collapseTwo"
                                     key={count++}>
                                 <span className="nav-link pointer">
                                     <span className="fa fa-unsorted text-warning"/>
                                    <span className="icon-title m-2 font-weight-bold text-warning">گزارشات</span>
                                </span>
                            </li>
                                {navLinks.map(nav => this.hasAuthority(nav.authority) ?
                                    nav.type==="report" ?
                                        <div id="collapseTwo" className="collapse" data-parent="#accordion">
                                            <li className="nav-item sidebar-dropdown" key={count++}>
                                                <Link className="nav-link" to={nav.path}>
                                                    <span className={`${nav.icon} text-light`}/>
                                                    <span className="icon-title m-2 text-light">{nav.name}</span>
                                                </Link>
                                            </li>
                                        </div>
                                        : null
                                    : null)}
                            </span>
                            <span>
                                 <li className="nav-item sidebar-dropdown" data-toggle="collapse" href="#collapseFour"
                                     key={count++}>
                                <span className="nav-link pointer">
                                    <span className="fa fa-unsorted text-warning"/>
                                    <span className="icon-title m-2 font-weight-bold text-warning">بررسی و ممیزی</span>
                                </span>
                            </li>
                                {navLinks.map(nav => this.hasAuthority(nav.authority) ?
                                    nav.type==="other" ?
                                        <div id="collapseFour" className="collapse" data-parent="#accordion">
                                            <li className="nav-item sidebar-dropdown" key={count++}>
                                                <Link className="nav-link" to={nav.path}>
                                                    <span className={`${nav.icon} text-light`}/>
                                                    <span className="icon-title m-2 text-light">{nav.name}</span>
                                                </Link>
                                            </li>
                                        </div>
                                        : null
                                    : null)}
                            </span>
                        </div>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Sidebar;
