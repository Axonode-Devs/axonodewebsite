import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { i18n } from "./i18n.js";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import {
  faEnvelope as faRegularEnvelope,
  faIdCard,
} from "@fortawesome/free-regular-svg-icons";
import { faLightbulb as faRegularLightbulb } from "@fortawesome/free-regular-svg-icons";

import {
  faCoffee,
  faChevronRight,
  faGear,
  faCode,
  faBrush,
  faPeopleGroup,
  faLightbulb,
  faXmark,
  faUsers,
  faUserCheck,
  faRocket,
  faChevronDown,
  faCheck,
  faCircleNotch,
  faCircleExclamation,
  faEnvelope,     
  faUser,        
  faPhone,        
  faArrowRight,   
} from "@fortawesome/free-solid-svg-icons";

// --- 3. BRANDS ICONS PACKAGE ---
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

// --- 4. ADD EVERYTHING TO THE LIBRARY ---
library.add(
  faRegularEnvelope,
  faRegularLightbulb,
  faLightbulb,
  faIdCard, 
  faCoffee,
  faChevronRight,
  faGithub,
  faInstagram,
  faGear,
  faCode,
  faBrush,
  faPeopleGroup,
  faXmark,
  faUsers,
  faUserCheck,
  faRocket,
  faChevronDown,
  faCheck,
  faCircleNotch,
  faCircleExclamation,
  faEnvelope, 
  faUser,     
  faPhone,    
  faArrowRight,
  faLaptopCode,
  faPaperPlane,
  faTriangleExclamation,
  faCircleXmark,
);

import "./style.css";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(i18n);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");