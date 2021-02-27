import axios from 'axios'
// import AsyncStorage from '@react-native-community/async-storage'
// import { Config } from '../Config/'

const ApiClient = axios.create({
    /**
     * Import the config from the App/Config/index.js file
     */
    // baseURL: Config.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 3000,
})

ApiClient.interceptors.request.use(
    async (config) => {
        // const baseURL = (await AsyncStorage.getItem('@apiServer')) || config.baseURL
        // const authToken = await AsyncStorage.getItem('@authToken')
        // Do something before request is sent
        const headers = {
            ...config.headers,
            // Authorization: `Bearer ${authToken}`,
        }
        const params = {
            ...config.params,
        }
        return {
            ...config,
            // baseURL,
            URL,
            headers,
            params,
        }
    },
    (error) => {
        // Do something with request error
        console.log('error', { ...error })
        return Promise.reject(error)
    }
)

ApiClient.interceptors.response.use(
    async (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log(response)
        return response
    },
    async (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log('ApiClient', { ...error })
        throw error
    }
)

export default ApiClient
