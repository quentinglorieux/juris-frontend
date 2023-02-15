
import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import {PrimeIcons} from 'primevue/api';

import Button from "primevue/button";
import Card from "primevue/card";
import Sidebar from 'primevue/sidebar';
import RadioButton from 'primevue/radiobutton';
import InputSwitch from 'primevue/inputswitch';
import Tree from 'primevue/tree';
import Tag from 'primevue/tag';


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});

    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('Card', Card);
    nuxtApp.vueApp.component('Sidebar', Sidebar);
    nuxtApp.vueApp.component('RadioButton', RadioButton);
    nuxtApp.vueApp.component('InputSwitch', InputSwitch);
    nuxtApp.vueApp.component('Tree', Tree);
    nuxtApp.vueApp.component('Tag', Tag);
});

