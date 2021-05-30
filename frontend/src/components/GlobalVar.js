import axios from 'axios';

const GlobalVar = {
    url :"http://localhost:4242/",
    axios:axios,
    regEmail:/([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{1,6})\w+/g,
    regName:/^([a-zA-Z])*$/g,
    regMdp:/^([A-Za-z0-9!?§]{4,8})*$/g,
    regDate:/^(19|20)\d{2}[/\-.](0[1-9]|1[0-2])[/\-.](0[1-9]|[12]\d|3[01])$/gm,
    // regDate:/^(19|20)\d{2}[\/\-\.](0[1-9]|1[0-2])[\/\-\.](0[1-9]|[12]\d|3[01])$/gm,
    // regDateDDMMYYYY : /^(0[1-9]|[12]\d|3[01])[\/\-\.](0[1-9]|1[0-2])[\/\-\.](19|20)\d{2}$/gm,
    widthDevice : window.screen.width,
    computerWidth:1024,
    tabletWidth:768,
    phoneWidth : 480,
}
export default GlobalVar