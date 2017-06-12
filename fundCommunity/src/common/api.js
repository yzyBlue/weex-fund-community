const serverConfig={
    localhost:"http://99.6.150.44:8888/",
    develop:"http://99.6.150.41:820/WebAPI/",
    production:"http://99.6.150.44:8888/WebAPI/"
}

const serverUrl=serverConfig.develop;

const apiURL = {
    userApi:{
        login:serverUrl+"api/users?request=Login",
        register:serverUrl+"api/users?request=Register"
    }
};

export default apiURL;