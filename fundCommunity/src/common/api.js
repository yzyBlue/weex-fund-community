const serverConfig={
    localhost:"http://99.6.150.44:8888/",
    develop:"http://99.6.150.41:820/WebAPI/",
    production:"http://99.6.150.44:8888/WebAPI/",
    test: "http://99.6.150.52:810/",
    resource:"http://99.6.150.44:821/images/"
}

const serverUrl=serverConfig.test;

const apiURL = {
    userApi:{
        users: serverUrl + "api/Users",
        login: serverUrl+"api/Users?request=Login",
        register: serverUrl+"api/Users?request=Register",
        concernedusers: serverUrl+"api/ConcernedUsers"
    },
    fundApi: {
        funds: serverUrl + "api/Funds",
        concernedfunds: serverUrl + "api/ConcernedFunds"
    },
    treadApi: {
        usertread: serverUrl + "api/UserDynamics",
        fundtread: serverUrl + "api/FundDynamics"
    },
    imgUrl:serverConfig.resource
};

export default apiURL;