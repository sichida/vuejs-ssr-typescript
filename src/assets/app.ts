import Vue, { ComponentOptions } from 'vue';
import * as VueRender from 'vue-server-renderer';

let createApp = function () {
    return {
        props: ['message'],
        template: '<span>{{ message }}</span>'
    } as ComponentOptions<Vue>;
};
export default createApp;