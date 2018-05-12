import Vue, { ComponentOptions } from 'vue';

let createApp = function () {
    return {
        el: '#app',
        data: {
            message: 'Hello Vue!'
        }
    } as ComponentOptions<Vue>;
};
export default createApp;