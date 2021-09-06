import axios from "axios";

const Api = axios.create({
    //   baseURL: "http://localhost:2000/",
    baseURL: "http://dataservice.accuweather.com/"
});

export default Api;
