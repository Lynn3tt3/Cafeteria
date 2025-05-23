import React from 'react';
import Sidebar from '../../components/Sidebar.tsx';
import '../../styles/staffLayout.css';

const StaffLayout = ({children}: {children:React.ReactNode}) =>{
    return(
        <div className='staff-layout'>
            <Sidebar />
            <main className='staff-content'>
                {children}
            </main>
        </div>
    );
};

export default StaffLayout;