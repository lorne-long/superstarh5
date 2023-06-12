export const createStorage = ({
  prefixKey = "",
  storage = localStorage,
  key = "0123456789123456",
  iv = "0123456789123456",
  hasEncrypt = false,
  timeout = null,
} = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error("When hasEncrypt is true, the key or iv must be 16 bits!");
  }
  //加密
  // const encryption = new AesEncryption({ key, iv });
  const encryption = {};
  const WebStorage = class WebStorage {
    storage;
    prefixKey;
    encryption;
    hasEncrypt;
    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }
    getKey(key) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }
    /**
     *
     * @param {string} key
     * @param {*} value
     * @expire Expiration time in seconds
     * @memberof Cache
     */
    set(key, value, expire = timeout) {
      if (!this.storage) return;
      try {
        const stringData = JSON.stringify({
          value,
          time: Date.now(),
          expire: expire ? Date.now() + expire * 1000 : null,
        });
        const stringifyValue = this.hasEncrypt
          ? this.encryption.encryptByAES(stringData)
          : stringData;
        this.storage.setItem(this.getKey(key), stringifyValue);
      } catch (e) {
        console.log(e);
      }
    }

    /**
     *Read cache
     * @param {string} key
     * @memberof Cache
     */
    get(key, def = null) {
      if (!this.storage) return def;
      const val = this.storage.getItem(this.getKey(key));

      if (!val) return def;
      try {
        const decVal = this.hasEncrypt
          ? this.encryption.decryptByAES(val)
          : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (expire == null || expire >= Date.now()) {
          return value;
        }
        this.remove(key);
      } catch (e) {
        return def;
      }
      return def;
    }
    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key) {
      if (!this.storage) return;
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * Delete all caches of this instance
     */
    clear() {
      if (!this.storage) return;
      this.storage.clear();
    }
  };
  return new WebStorage();
};

export default createStorage();
