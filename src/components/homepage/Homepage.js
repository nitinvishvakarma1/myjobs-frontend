import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faXTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import banner from '../../assets/poster.webp';
import vodaphone from '../../assets/vodafonelogo.png';
import tesla from '../../assets/tesla-9 1.png';
import talkit from '../../assets/talkit.png';
import amd from '../../assets/amd-logo-1.png';
import engIcon from '../../assets/icons/technology.png';
import finIcon from '../../assets/icons/fin.png';
import salesIcon from '../../assets/icons/trend.png';
import healthIcon from '../../assets/icons/health.png';
import itIcon from '../../assets/icons/it.png';
import myJobsLogo from '../../assets/icons/myJobsLogo2.png'
import { Link, useNavigate } from 'react-router-dom';
import styles from './homepage.module.css';
import matchedJobBanner from '../../assets/getMatchedJob.jpg';
import postJobBanner from '../../assets/jobp.png';

export const HomePageComponent = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="container-fluid m-0 p-0 py-5" style={{ backgroundColor: 'whitesmoke' }}>
                <div className="container mt-4 mt-xl-5 pb-0">
                    <div className="row">
                        <div className="col-md-6 p-3" style={{ textAlign: 'justify' }}>
                            <div className="container w-100 h-auto p-5" >
                                <h1 className="display-5 fw-bold">Discover <br />Thousands of </h1>
                                <h1><span className="display-4 fw-bold text-primary">Job Opportunities</span></h1>
                                <p className="lead">Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
                                <button type="button" className='btn btn-lg w-lg-50 btn-primary border border-2 btn-active' onClick={() => navigate('/jobSeekerRegistration')}>Get Started</button>
                            </div>
                        </div>
                        <div className="col-md-6 pt-0 pt-xl-2 p-xl-5">
                            <img src={banner} alt="banner" className="img-fluid img-responsive d-block w-100 mx-auto" />
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row p-3 p-lg-5 justify-content-md-center">
                        <h3 className={`text-center p-4 mb-lg-5 `}>Explore from Multiple Categories</h3>
                        <div className="row services-wrapper">
                            <div className="col-md-6 col-lg-4 col-xs-12 mb-4 mb-lg-5 padding-none shadow">
                                <div className={`${styles.servicesItem} wow fadeInDown`} data-wow-delay={`${0.2 * 2}s`}>
                                    <div className={`${styles.icon}`}>
                                        <img src={salesIcon} alt="" style={{ width: '35px', height: '35px' }} />
                                    </div>
                                    <div className="services-content">
                                        <h3>Sales and Marketing</h3>
                                        <p>Sales Management, Digital Marketing, Market Research, Advertising</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xs-12 mb-4 mb-lg-5 padding-none shadow">
                                <div className={`${styles.servicesItem} wow fadeInDown`} data-wow-delay={`${0.2 * 2}s`}>
                                    <div className={`${styles.icon}`}>
                                        <img src={itIcon} alt="" style={{ width: '35px', height: '35px' }} />
                                    </div>
                                    <div className="services-content">
                                        <h3>Information Technology</h3>
                                        <p>Software Development, Network Administration, Cybersecurity, IT Support</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xs-12 mb-4 mb-lg-5 padding-none shadow">
                                <div className={`${styles.servicesItem} wow fadeInDown`} data-wow-delay={`${0.2 * 2}s`}>
                                    <div className={`${styles.icon}`}>
                                        <img src={engIcon} alt="" style={{ width: '35px', height: '35px' }} />
                                    </div>
                                    <div className="services-content">
                                        <h3>Engineering</h3>
                                        <p>Civil Engineering, Mechanical Engineering, Electrical Engineering, Software Engineering</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xs-12 mb-4 mb-lg-5 padding-none shadow">
                                <div className={`${styles.servicesItem} wow fadeInDown`} data-wow-delay={`${0.2 * 2}s`}>
                                    <div className={`${styles.icon}`}>
                                        <img src={engIcon} alt="" style={{ width: '35px', height: '35px' }} />
                                    </div>
                                    <div className="services-content">
                                        <h3>Human Resources</h3>
                                        <p>Recruitment, Employee Relations, Training and Development, HR Management</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xs-12 mb-4 mb-lg-5 padding-none shadow">
                                <div className={`${styles.servicesItem} wow fadeInDown`} data-wow-delay={`${0.2 * 2}s`}>
                                    <div className={`${styles.icon}`}>
                                        <img src={finIcon} alt="" style={{ width: '35px', height: '35px' }} />
                                    </div>
                                    <div className="services-content">
                                        <h3>Finance</h3>
                                        <p>Accounting, Banking, Financial Analysis, Investment Banking</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xs-12 mb-4 mb-lg-5 padding-none shadow">
                                <div className={`${styles.servicesItem} wow fadeInDown`} data-wow-delay={`${0.2 * 2}s`}>
                                    <div className={`${styles.icon}`}>
                                        <img src={healthIcon} alt="" style={{ width: '35px', height: '35px' }} />
                                    </div>
                                    <div className="services-content">
                                        <h3>Healthcare</h3>
                                        <p>Nursing, Physicians, Medical Technicians, Healthcare Administration</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`container-fluid p-0 mb-0 bg-success ${styles.stepBackground}`}>
                    <div className={`row justify-content-center align-items-center ps-lg-5 pe-lg-5 ${styles.overStepBackground}`}>
                        <div className={`container ps-lg-5 pe-lg-5`}>
                            <div className={`row justify-content-center align-items-center`}>
                                <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
                                    <div className={`${styles.stepCard} px-4`}>
                                        <h4 className='card-title text-primary mb-2'>01 Steps</h4>
                                        <h5 className='card-title fw-bold mb-3'>REGISTER AN ACCOUNT</h5>
                                        <p className='card-text'>Sign up on Team MyJobs by creating an account. Choose if you are a job seeker or an employer. Follow the easy registration process to get started.</p>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
                                    <div className={`${styles.stepCard} px-4`}>
                                        <h4 className='card-title text-primary mb-2'>02 Steps</h4>
                                        <h5 className='card-title fw-bold mb-3'>SEARCH YOUR DESIRED JOB</h5>
                                        <p className='card-text'>Explore various job listings tailored to your preferences. Use filters to narrow down your search and find the perfect job that fits your skills and interests.</p>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-4'>
                                    <div className={`${styles.stepCard} px-4`}>
                                        <h4 className='card-title text-primary mb-2'>03 Steps</h4>
                                        <h5 className='card-title fw-bold mb-3'>SEND RESUME TO EMPLOYER WITH ONE CLICK</h5>
                                        <p className='card-text'>Once you find the right job, easily submit your resume to the employer with a single click. Streamline your application process and increase your chances of getting hired.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`container p-5`}>
                    <h3 className='text-center display-6 fw-bold pb-4'>About Us</h3>
                    <div className={`row border border-1 border-dark rounded-4 p-3 p-lg-5 p-xl-5 p-md-5 ${styles.aboutContainer}`} style={{ textAlign: 'justify' }}>
                        <p>Welcome to Team MyJobs, a comprehensive job listing platform developed using the MERN stack technology. Our platform is fully responsive, ensuring a seamless experience across all devices.</p>
                        <p>At Team MyJobs, candidates or job seekers can visit our website to register, add their resumes, and explore jobs based on various categories. With just one click, they can apply for jobs and potentially get shortlisted by top recruiters. Our user-friendly interface allows job seekers to manage their profiles efficiently, making the job hunting process smooth and straightforward.</p>
                        <p>Recruiters can also benefit greatly from our platform. They can register with their company details, view the list of applied candidates, and manage their applications. Our portal allows recruiters to post new job vacancies and manage their existing listings with ease. Both job seekers and recruiters have complete control over their profiles, making Team MyJobs a versatile and essential tool for the modern job market.</p>
                        <p>Join us at Team MyJobs and take the next step in your career journey or find the perfect candidates to join your team. We're here to bridge the gap between job seekers and recruiters, ensuring the best matches in the industry.</p>
                    </div>
                </div>



                <div className="container mb-lg-2">
                    <div className="row p-5">
                        <h4 className="mb-5 text-center pb-4 ">Top Companies're Here to Hire You</h4>
                        <div className='col-md-3 col-6 mb-4'>
                            <img src={vodaphone} alt="vodaphone" className='img-responsive d-block w-75  h-100 mx-auto' />
                        </div>
                        <div className='col-md-3 col-6 mb-4'>
                            <img src={tesla} alt="tesla" className='img-responsive d-block w-50 h-75 mx-auto' />
                        </div>
                        <div className='col-md-3 col-6 mb-4'>
                            <img src={talkit} alt="talkit" className='img-responsive d-block w-50 h-75 mx-auto' />
                        </div>
                        <div className='col-md-3 col-6 mb-4'>
                            <img src={amd} alt="amd" className='img-responsive d-block w-50 h-75 mx-auto' />
                        </div>
                    </div>
                </div>


                <div id="registrationCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className='container p-0 mb-3 shadow-lg mb-lg-4 border border-2' style={{ backgroundColor: 'aliceblue', color: 'black', textAlign: 'justify' }}>
                                <div className='row align-items-center'>
                                    <div className='col-xl-6 col-lg-6 col-md-12 mb-4 mb-md-0 p-5 px-lg-5'>
                                        <h3>Looking to Post a Job?</h3>
                                        <p className='mb-4'>Are you a recruiter looking for top talent? Register on Team MyJobs and gain access to a vast pool of qualified candidates. Post job vacancies, manage applications, and streamline your hiring process. Join us and find the perfect candidates to help your company thrive!</p>
                                        <button className='btn btn-md w-lg-50 btn-active btn-outline-primary' onClick={() => navigate('/recruiterRegistration')}>Post Your Jobs for Free</button>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 d-flex justify-content-center'>
                                        <img src={postJobBanner} alt="Post Job Banner" className='img-fluid d-block w-100' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='container p-0 mb-3 shadow-lg mb-lg-4 border border-2' style={{ backgroundColor: 'aliceblue', color: 'black', textAlign: 'justify' }}>
                                <div className='row'>
                                    <div className='col-xl-6 col-lg-6 col-md-12 mb-4 mb-md-0'>
                                        <img src={matchedJobBanner} alt="Get Matched Banner" className='img-fluid d-block w-100' />
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 d-flex flex-column justify-content-center p-5 px-lg-5'>
                                        <h3 className=''>Get Matched with the Best Jobs</h3>
                                        <p className='mb-4'>Join Team MyJobs today and unlock thousands of job opportunities that match your skills and preferences. Our platform offers an intuitive interface for job seekers to register, upload resumes, and apply for jobs with a single click. Connect with top recruiters and take the next step in your career!</p>
                                        <button className='btn btn-md w-lg-50 btn-active btn-outline-primary' onClick={() => navigate('/jobSeekerRegistration')}>Register Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#registrationCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#registrationCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
        </>
    );
}

export const FooterComponent = () => {
    return (<>
        <footer className={`${styles.footer} mt-5 p-5 pb-1`}>
            <div className={`container`}>
                <div className="row">
                    <div className="col-md-3  px-3">
                        <img src={myJobsLogo} alt="" className='img-responsive d-block w-100' />
                    </div>
                    <div className="col-md-3  px-5">
                        <h5 className='text-primary'>About Us</h5>
                        <p style={{ textAlign: "justify" }}>
                            The Team MyJobs is a leading online platform that empowers job seekers and recruiters to connect seamlessly. We provide a comprehensive job board featuring a vast selection of listings across various industries and experience levels.
                        </p>
                    </div>
                    <div className="col-md-3 px-5">
                        <h5 className='text-primary'>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>Email: myjobs.info@gmail.com</li>
                            <li>Phone: +91 97555 91256</li>
                            <li>Address: Indore India</li>
                        </ul>
                    </div>
                    <div className="col-md-3 px-5">
                        <h5 className='text-primary'>Follow Us</h5>
                        <ul className="list-inline footer-links">
                            <li className="list-inline-item p-2 rounded-pill">
                                {/* <a href="#" class="fa fa-instagram fw-bold fs-3"> */}
                                <FontAwesomeIcon icon={faInstagram} className='fs-2 text-secondary' />

                            </li>
                            <li className="list-inline-item p-2 rounded-pill">
                                <FontAwesomeIcon icon={faXTwitter} className='fs-2 text-secondary' />
                            </li>
                            <li className="list-inline-item p-2 rounded-pill">
                                <FontAwesomeIcon icon={faFacebook} className='fs-2 text-secondary' />
                            </li>
                            <li className="list-inline-item">
                                <FontAwesomeIcon icon={faLinkedin} className='fs-2 text-secondary' />
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <p>© 2024 www.myjobs.com . All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <ul className="list-inline footer-links">
                            <li className="list-inline-item">
                                <a href="#" className="text-white">
                                    Privacy Policy
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="text-white">
                                    Terms of Service
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="text-white">
                                    Sitemap
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </>);
}

