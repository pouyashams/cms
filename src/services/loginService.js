import axios from "axios";

export async function login(username, password) {
    const data = {
        username: username,
        password: password
    };
    let access_token = null;
    await axios({
        method: 'POST',
        url: `http://shop.isuncharge.com/isunshop/fetch/access-token`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    }).then(response => {
        access_token = response.data.access_token;
    }).catch((error) => {
        throw error
    });
    return access_token;
}
