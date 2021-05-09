import React from 'react';

/** App.js => AllIndex.js => Footer.js*/
function Footer() {
    return (
      <footer >
          <h4>NOUS CONTACTER</h4>
          <div id ="contactBox">
            <p>36 rue des paquerette <br/> 31450 Toulouse, FRANCE</p>
            <p>contact@mayapark.com <br/> 084 954 14 14 </p>
          </div>
          <p className="w-100 text-center items-center "><i>copyright</i></p>
      </footer>
    );
  }
  
  export default Footer;