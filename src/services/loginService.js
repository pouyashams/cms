import axios from "axios";

export async function login(username, password) {
    const data = {
        username: username,
        password: password
    };
    let loginInfo = null;
    await axios({
        method: 'POST',
        url: `http://shop.isuncharge.com/isunshop/fetch/access-token`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    }).then(response => {
        loginInfo = response.data;
    }).catch((error) => {
        throw error
    });
    return loginInfo;
}
