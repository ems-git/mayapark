import axios from 'axios';

const GlobalVar = {
    url :"http://localhost:4242/",
    axios : axios,
    regEmail : /([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{1,6})\w+/g,
    regMdp : /([A-Za-z0-9!?§]{3,8})/g,
}
export default GlobalVar