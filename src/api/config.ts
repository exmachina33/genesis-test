import axios from 'axios';

const axiosInstance = axios.create();

// Перехватчик ошибки на самом верхнем уровне
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // Обработка ошибки
        if (error.response) {
            console.error(error.message)
        }
        throw error;
    }
);
async function auth() {
    const { data } = await axiosInstance.get('https://test.gnzs.ru/oauth/get-token.php', {
        headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': '30878566',
        }
    })
    const { access_token, base_domain } = data;
    sessionStorage.setItem('authToken', access_token);
    sessionStorage.setItem('baseDomain', base_domain);
    return data;
}
async function getAuthData() {
    let token = sessionStorage.getItem('authToken');
    let baseDomain = sessionStorage.getItem('baseDomain');

    if (!token || !baseDomain) {
        const { access_token, base_domain } = await auth()
        token = access_token;
        baseDomain = base_domain;
    }

    return {
        token: `Bearer ${token}`,
        baseDomain: `https://${baseDomain}`
    };
}

// Отсюда мы экспортируем нужный CRUD метод и по нему делаем api запрос
async function POST(url: string, payload: object = {}) {
    const { baseDomain, token } = await getAuthData();
    const { data } = await axiosInstance.post(url, payload,{
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
    });
    return data;
}

async function GET(url: string, params: object = {}) {
    const { baseDomain, token } = await getAuthData();
    const { data } = await axiosInstance.get(url, {
        params,
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    });

    return data;
}

export {
    POST,
    GET,
};
