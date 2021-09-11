import axios from "axios";

const Api = axios.create({
    //   baseURL: "http://localhost:2000/",
    baseURL: "https://dataservice.accuweather.com/"
});

export default Api;
