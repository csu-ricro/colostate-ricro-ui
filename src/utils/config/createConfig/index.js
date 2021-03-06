import axios from 'axios';
import _ from 'lodash';
import defaults, { defaultContactHref } from './defaults';

const createNav = (config, nav) => {
  /*
   * Generates the 2D array for the navigation list. Stacks the defaults{} above
   * the list items from config{}.
   */
  if (config.unit.contactHref !== defaultContactHref) {
    nav[2].link = config.unit.contactHref;
  }
  if (!config.app.hasLogin) {
    nav.splice(1, 1); // remove <LoginLogout />
  }
  if (config.app.basename === '/') {
    // Apps removal of nav item as it is at the server root and "Apps" routes to server root
    nav.splice(0, 1);
  }
  return config.app.nav.length > 0
    ? [nav, ...config.app.nav.filter(array => array.length > 0)]
    : [nav];
};

const createConfig = (config = {}) => {
  /*
   * Grabs default nav list but then clears it before merge to avoid merging the
   * frist default nav list and the first config nav list. Avoid use of the spread
   * operator for these. They do not create new instances of the objects with a deep
   * copy, thus only top level objects are coppied.
   */
  const nav = _.cloneDeep(defaults.app.nav[0]);
  const moddedDefaults = _.cloneDeep(defaults);
  moddedDefaults.app.nav = [];

  /*
   * Merges the defaults{} and incoming config{} objects.
   * Check if the object value in config{} is set and uses that value otherwise
   * defaults to the value in defaults{}.
   */
  _.defaultsDeep(config, moddedDefaults);

  if (config.app.nav) {
    config.app.nav = createNav(config, nav);
  }

  /*
   * fix axios baseUrl since baseUrl doesn't get updated from the default config clone
   */
  if (config.api.path !== moddedDefaults.api.path || config.api.host !== moddedDefaults.api.host) {
    config.api.baseUrl = config.api.host + config.api.path;
    config.api.axios = axios.create({ baseURL: config.api.baseUrl, withCredentials: true });
  }

  return config;
};

export default createConfig;
