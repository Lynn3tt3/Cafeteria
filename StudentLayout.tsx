import React from 'react';
import Navbar from '../../components/Navbar.tsx';
import '../../styles/StaffLayout.css';

const StudentLayout = ({children}: {children:React.ReactNode}) =>{
    return(
        <div className='student-layout'>
            <Sidebar />
            <main className='student-content'>
                {children}
            </main>
        </div>
    );
};

export default StudentLayout;