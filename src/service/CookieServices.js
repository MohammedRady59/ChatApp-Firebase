import Cookies from "universal-cookie";

const cookies = new Cookies();
class CookieServices {
  get(name) {
    return cookies.get(name);
  }
  set(name, value, options) {
    return cookies.set(name, value, options || undefined);
  }
  remove(name) {
    return cookies.remove(name);
  }
}
export default new CookieServices();
