import { useEffect, useState } from 'react';
import logo from '../../assets/logo2.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jscookie from 'js-cookie';
import { setNavbar } from '../../store/navbarSlice.js';
import defaultProfileImg from '../../assets/profileIcon2.avif';
import styles from './header.module.css';

export const NavbarComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navShow = useSelector(state => state.navbarSlice.navShow);
    const candidateData = useSelector(state => state.candidateSlice.candidateCredential);
    const [navbarItems, setNavbarItems] = useState();
    const location = useLocation();
    const [homeAddress, setHomeAddress] = useState('/home');

    const handleCandidateLogout = () => {
        jscookie.remove("candidate_email");
        jscookie.remove("candidate_token");
        dispatch(setNavbar("home"));
        navigate('/');
        window.location.reload();
    }

    const handleRecruiterLogout = () => {
        jscookie.remove("recruiter_email");
        jscookie.remove("recruiter_token");
        dispatch(setNavbar("home"));
        navigate("/");
        window.location.reload();
    }

    const handleAdminLogout = () => {
        jscookie.remove("admin_email");
        jscookie.remove("admin_token");
        dispatch(setNavbar("home"));
        navigate("/");
        window.location.reload();
    }

    useEffect(() => {
        switch (navShow) {
            case 'home': {
                setHomeAddress('/');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item active'>
                            <Link to='/' className={`nav-link`} >Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/jobSeekerRegistration' className='nav-link'>Job Seeker</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterRegistration' className='nav-link'>Employee</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/login' className='nav-link'>Signin</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'candidateHome': {
                setHomeAddress('/candidateHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/candidateProfile' className='nav-link'>Profile</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/candidateVacancyList' className='nav-link'>Jobs</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/candidateAppliedVacancies' className='nav-link'>My Jobs</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleCandidateLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'candidateProfile': {
                setHomeAddress('/candidateHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/candidateHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/candidateVacancyList' className='nav-link'>Jobs</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/candidateAppliedVacancies' className='nav-link'>My Jobs</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleCandidateLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'candidateVacancyList': {
                setHomeAddress('/candidateHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/candidateHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/candidateProfile' className='nav-link'>Profile</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/candidateAppliedVacancies' className='nav-link'>My Jobs</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleCandidateLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'candidateAppliedVacancies': {
                setHomeAddress('/candidateHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/candidateHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/candidateProfile' className='nav-link'>Profile</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/candidateVacancyList' className='nav-link'>Jobs</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleCandidateLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'recruiterHome': {
                setHomeAddress('/recruiterHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/recruiterHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterProfile' className='nav-link'>Profile</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterVacancyList' className='nav-link'>My Vacancies</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterAddVacancy' className='nav-link'>Add Vacancy</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterViewApplicants' className='nav-link'>Candidate List</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleRecruiterLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }

            case 'recruiterProfile': {
                setHomeAddress('/recruiterHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/recruiterHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterVacancyList' className='nav-link'>My Vacancies</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterAddVacancy' className='nav-link'>Add Vacancy</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterViewApplicants' className='nav-link'>Candidate List</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleRecruiterLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'recruiterAddVacancy': {
                setHomeAddress('/recruiterHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/recruiterHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterProfile' className='nav-link'>Profile</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterVacancyList' className='nav-link'>My Vacancies</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterViewApplicants' className='nav-link'>Candidate List</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleRecruiterLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'recruiterUpdateVacancy': {
                setHomeAddress('/recruiterHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterProfile' className='nav-link'>Profile</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterVacancyList' className='nav-link'>My Vacancies</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterAddVacancy' className='nav-link'>Add Vacancies</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterViewApplicants' className='nav-link'>Candidate List</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleRecruiterLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'recruiterVacancyList': {
                setHomeAddress('/recruiterHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/recruiterHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterProfile' className='nav-link'>Profile</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterAddVacancy' className='nav-link'>Add Vacancy</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterViewApplicants' className='nav-link'>Candidate List</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleRecruiterLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'recruiterViewApplicants': {
                setHomeAddress('/recruiterHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/recruiterHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterProfile' className='nav-link'>Profile</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterVacancyList' className='nav-link'>My Vacancies</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recruiterAddVacancy' className='nav-link'>Add Vacancy</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleRecruiterLogout}>Logout</Link>
                        </li>
                    </ul>
                );
                break;
            }
            case 'adminHome': {
                setHomeAddress('/adminHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/adminHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/adminRecruiterList' className='nav-link'>Recruiter List</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleAdminLogout}>Logout</Link>
                        </li>
                    </ul>
                )
                break;
            }
            case 'adminRecruiterList': {
                setHomeAddress('/adminHome');
                setNavbarItems(
                    <ul className='navbar-nav ms-3 ms-lg-auto ms-xl-auto'>
                        <li className='nav-item'>
                            <Link to='/adminHome' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' onClick={handleAdminLogout}>Logout</Link>
                        </li>
                    </ul>
                )
                break;
            }

        }
    }, [navShow]);

    return (<>
        <header className='mb-5'>
            <nav className={`navbar navbar-expand-lg ${styles.navbarStyle} shadow-lg fixed-top`}>
                <div className='container'>
                    <Link to={homeAddress} className='navbar-brand'>
                        <img src={logo} alt='logo' width={70} height={50} className='img-responsive w-100' />
                    </Link>
                    <button type='button' className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#embarkNavbar' aria-controls='embarkNavbar' aria-expanded='false' aria-label='emabark navbar'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='navbar-collapse collapse pe-5' id='embarkNavbar'>
                        {navbarItems}
                    </div>
                </div>
            </nav>
        </header>


    </>);
}
