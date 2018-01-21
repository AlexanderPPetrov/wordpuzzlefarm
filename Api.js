import {Toast} from "native-base";
import I18n from './i18n/i18n';
import fetch from 'react-native-fetch-polyfill';

let Api = {
    get: (options = {}) => {
        Api.executeRequest(options, 'GET')
    },
    post: (options = {}) => {
        Api.executeRequest(options, 'POST')
    },
    executeRequest: (options, type) => {
        if(!options.url){
            console.log('URL is required')
            return;
        }

        let data = {
            ...options.data
        }
        let url = options.url;

        let _data = Api.prepareData(data, type)

        if (type == 'GET' && Object.keys(data).length > 0) {
            url = url + '?' + Object.keys(data).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
        }
        console.log(options, type)
        return fetch(url, _data)
            .then((response) => response.json())
            .then((responseJson) => {
                if(options.success){
                    options.success(responseJson)
                }
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);

                Toast.show({
                    text: error,
                    buttonText: I18n.t('ok')
                })
            });

    },
    prepareData: (data, type) => {
        let requestData = {
            method: type,
            // headers: {
            //     'Accept': 'application/json',
            //     'content-type': 'application/json',
            //     'Access-Control-Allow-Origin':'*'
            // }
            // nachin da dobavim v headers kym requesta
        }
        if(type == 'POST') {
            requestData.body = data
        }

        console.log(requestData)

        return requestData;
    }

}

export default Api;
