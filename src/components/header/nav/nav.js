import React from 'react';
import {NavLink} from 'react-router-dom';



function Nav() {
    return(
        <> 
        
        <nav className='bg-white  flex flex-col md:flex-row md:bg-white  gap-4'>
            <NavLink exact to='/home'className={(navData) => navData.isActive ? 'm-2 mb-0  text-primary md:border-b-2 dark:text-primary md:border-primary ' : 'm-2 mb-0' }> <span>Home</span></NavLink>
            <NavLink to='/dashboard' className={(navData) => navData.isActive ? 'm-2 mb-0 text-primary md:border-b-2 dark:text-primary md:border-primary ' : 'm-2 mb-0' }>Dashboard</NavLink>
            <NavLink to='/customers'className={(navData) => navData.isActive ? 'm-2 mb-0 text-primary md:border-b-2 dark:text-primary md:border-primary ' : 'm-2 mb-0' }>Customer</NavLink>
            <NavLink to='/sales' className={(navData) => navData.isActive ? 'm-2 mb-0 text-primary md:border-b-2 dark:text-primary md:border-primary ' : 'm-2 mb-0' }>Sales</NavLink>
        </nav>
        </>
       
    );
}

export default Nav;