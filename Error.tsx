//handles invalid URLs and redirects users
import React from "react";
import '../../styles/styles.css';

const NotFound: React.FC=() =>{
    return(
        <div style={{textAlign:'center', padding:'50px', backgroundColor:'gold'}}>
            <h2>404- Page not found</h2>
            <p>Oops! The page you are looking for does not exist.</p>

            {/*Redirect button*/}
            <button onClick={()=>window.location.href='/landing'}>Go to HomePage</button>
        </div>
    );
};

export default NotFound;