var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/@capacitor/core/dist/index.js
var ExceptionCode, CapacitorException, getPlatformId, createCapacitor, initCapacitorGlobal, Capacitor, registerPlugin, WebPlugin, encode, decode, CapacitorCookiesPluginWeb, CapacitorCookies, readBlobAsBase64, normalizeHttpHeaders, buildUrlParams, buildRequestInit, CapacitorHttpPluginWeb, CapacitorHttp;
var init_dist = __esm({
  "node_modules/@capacitor/core/dist/index.js"() {
    (function(ExceptionCode2) {
      ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
      ExceptionCode2["Unavailable"] = "UNAVAILABLE";
    })(ExceptionCode || (ExceptionCode = {}));
    CapacitorException = class extends Error {
      constructor(message, code, data) {
        super(message);
        this.message = message;
        this.code = code;
        this.data = data;
      }
    };
    getPlatformId = (win) => {
      var _a, _b;
      if (win === null || win === void 0 ? void 0 : win.androidBridge) {
        return "android";
      } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
        return "ios";
      } else {
        return "web";
      }
    };
    createCapacitor = (win) => {
      const capCustomPlatform = win.CapacitorCustomPlatform || null;
      const cap = win.Capacitor || {};
      const Plugins = cap.Plugins = cap.Plugins || {};
      const getPlatform = () => {
        return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
      };
      const isNativePlatform = () => getPlatform() !== "web";
      const isPluginAvailable = (pluginName) => {
        const plugin = registeredPlugins.get(pluginName);
        if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
          return true;
        }
        if (getPluginHeader(pluginName)) {
          return true;
        }
        return false;
      };
      const getPluginHeader = (pluginName) => {
        var _a;
        return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find((h) => h.name === pluginName);
      };
      const handleError = (err) => win.console.error(err);
      const registeredPlugins = /* @__PURE__ */ new Map();
      const registerPlugin2 = (pluginName, jsImplementations = {}) => {
        const registeredPlugin = registeredPlugins.get(pluginName);
        if (registeredPlugin) {
          console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
          return registeredPlugin.proxy;
        }
        const platform = getPlatform();
        const pluginHeader = getPluginHeader(pluginName);
        let jsImplementation;
        const loadPluginImplementation = async () => {
          if (!jsImplementation && platform in jsImplementations) {
            jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
          } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
            jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
          }
          return jsImplementation;
        };
        const createPluginMethod = (impl, prop) => {
          var _a, _b;
          if (pluginHeader) {
            const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
            if (methodHeader) {
              if (methodHeader.rtype === "promise") {
                return (options) => cap.nativePromise(pluginName, prop.toString(), options);
              } else {
                return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
              }
            } else if (impl) {
              return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
            }
          } else if (impl) {
            return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
          } else {
            throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
          }
        };
        const createPluginMethodWrapper = (prop) => {
          let remove;
          const wrapper = (...args) => {
            const p = loadPluginImplementation().then((impl) => {
              const fn = createPluginMethod(impl, prop);
              if (fn) {
                const p2 = fn(...args);
                remove = p2 === null || p2 === void 0 ? void 0 : p2.remove;
                return p2;
              } else {
                throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
              }
            });
            if (prop === "addListener") {
              p.remove = async () => remove();
            }
            return p;
          };
          wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
          Object.defineProperty(wrapper, "name", {
            value: prop,
            writable: false,
            configurable: false
          });
          return wrapper;
        };
        const addListener = createPluginMethodWrapper("addListener");
        const removeListener = createPluginMethodWrapper("removeListener");
        const addListenerNative = (eventName, callback) => {
          const call = addListener({ eventName }, callback);
          const remove = async () => {
            const callbackId = await call;
            removeListener({
              eventName,
              callbackId
            }, callback);
          };
          const p = new Promise((resolve2) => call.then(() => resolve2({ remove })));
          p.remove = async () => {
            console.warn(`Using addListener() without 'await' is deprecated.`);
            await remove();
          };
          return p;
        };
        const proxy = new Proxy({}, {
          get(_, prop) {
            switch (prop) {
              // https://github.com/facebook/react/issues/20030
              case "$$typeof":
                return void 0;
              case "toJSON":
                return () => ({});
              case "addListener":
                return pluginHeader ? addListenerNative : addListener;
              case "removeListener":
                return removeListener;
              default:
                return createPluginMethodWrapper(prop);
            }
          }
        });
        Plugins[pluginName] = proxy;
        registeredPlugins.set(pluginName, {
          name: pluginName,
          proxy,
          platforms: /* @__PURE__ */ new Set([...Object.keys(jsImplementations), ...pluginHeader ? [platform] : []])
        });
        return proxy;
      };
      if (!cap.convertFileSrc) {
        cap.convertFileSrc = (filePath) => filePath;
      }
      cap.getPlatform = getPlatform;
      cap.handleError = handleError;
      cap.isNativePlatform = isNativePlatform;
      cap.isPluginAvailable = isPluginAvailable;
      cap.registerPlugin = registerPlugin2;
      cap.Exception = CapacitorException;
      cap.DEBUG = !!cap.DEBUG;
      cap.isLoggingEnabled = !!cap.isLoggingEnabled;
      return cap;
    };
    initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
    Capacitor = /* @__PURE__ */ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    registerPlugin = Capacitor.registerPlugin;
    WebPlugin = class {
      constructor() {
        this.listeners = {};
        this.retainedEventArguments = {};
        this.windowListeners = {};
      }
      addListener(eventName, listenerFunc) {
        let firstListener = false;
        const listeners2 = this.listeners[eventName];
        if (!listeners2) {
          this.listeners[eventName] = [];
          firstListener = true;
        }
        this.listeners[eventName].push(listenerFunc);
        const windowListener = this.windowListeners[eventName];
        if (windowListener && !windowListener.registered) {
          this.addWindowListener(windowListener);
        }
        if (firstListener) {
          this.sendRetainedArgumentsForEvent(eventName);
        }
        const remove = async () => this.removeListener(eventName, listenerFunc);
        const p = Promise.resolve({ remove });
        return p;
      }
      async removeAllListeners() {
        this.listeners = {};
        for (const listener in this.windowListeners) {
          this.removeWindowListener(this.windowListeners[listener]);
        }
        this.windowListeners = {};
      }
      notifyListeners(eventName, data, retainUntilConsumed) {
        const listeners2 = this.listeners[eventName];
        if (!listeners2) {
          if (retainUntilConsumed) {
            let args = this.retainedEventArguments[eventName];
            if (!args) {
              args = [];
            }
            args.push(data);
            this.retainedEventArguments[eventName] = args;
          }
          return;
        }
        listeners2.forEach((listener) => listener(data));
      }
      hasListeners(eventName) {
        var _a;
        return !!((_a = this.listeners[eventName]) === null || _a === void 0 ? void 0 : _a.length);
      }
      registerWindowListener(windowEventName, pluginEventName) {
        this.windowListeners[pluginEventName] = {
          registered: false,
          windowEventName,
          pluginEventName,
          handler: (event) => {
            this.notifyListeners(pluginEventName, event);
          }
        };
      }
      unimplemented(msg = "not implemented") {
        return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
      }
      unavailable(msg = "not available") {
        return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
      }
      async removeListener(eventName, listenerFunc) {
        const listeners2 = this.listeners[eventName];
        if (!listeners2) {
          return;
        }
        const index = listeners2.indexOf(listenerFunc);
        this.listeners[eventName].splice(index, 1);
        if (!this.listeners[eventName].length) {
          this.removeWindowListener(this.windowListeners[eventName]);
        }
      }
      addWindowListener(handle) {
        window.addEventListener(handle.windowEventName, handle.handler);
        handle.registered = true;
      }
      removeWindowListener(handle) {
        if (!handle) {
          return;
        }
        window.removeEventListener(handle.windowEventName, handle.handler);
        handle.registered = false;
      }
      sendRetainedArgumentsForEvent(eventName) {
        const args = this.retainedEventArguments[eventName];
        if (!args) {
          return;
        }
        delete this.retainedEventArguments[eventName];
        args.forEach((arg) => {
          this.notifyListeners(eventName, arg);
        });
      }
    };
    encode = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    CapacitorCookiesPluginWeb = class extends WebPlugin {
      async getCookies() {
        const cookies = document.cookie;
        const cookieMap = {};
        cookies.split(";").forEach((cookie) => {
          if (cookie.length <= 0)
            return;
          let [key, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
          key = decode(key).trim();
          value = decode(value).trim();
          cookieMap[key] = value;
        });
        return cookieMap;
      }
      async setCookie(options) {
        try {
          const encodedKey = encode(options.key);
          const encodedValue = encode(options.value);
          const expires = options.expires ? `; expires=${options.expires.replace("expires=", "")}` : "";
          const path = (options.path || "/").replace("path=", "");
          const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
          document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
        } catch (error) {
          return Promise.reject(error);
        }
      }
      async deleteCookie(options) {
        try {
          document.cookie = `${options.key}=; Max-Age=0`;
        } catch (error) {
          return Promise.reject(error);
        }
      }
      async clearCookies() {
        try {
          const cookies = document.cookie.split(";") || [];
          for (const cookie of cookies) {
            document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }
      async clearAllCookies() {
        try {
          await this.clearCookies();
        } catch (error) {
          return Promise.reject(error);
        }
      }
    };
    CapacitorCookies = registerPlugin("CapacitorCookies", {
      web: () => new CapacitorCookiesPluginWeb()
    });
    readBlobAsBase64 = async (blob) => new Promise((resolve2, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        resolve2(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
    normalizeHttpHeaders = (headers = {}) => {
      const originalKeys = Object.keys(headers);
      const loweredKeys = Object.keys(headers).map((k) => k.toLocaleLowerCase());
      const normalized = loweredKeys.reduce((acc, key, index) => {
        acc[key] = headers[originalKeys[index]];
        return acc;
      }, {});
      return normalized;
    };
    buildUrlParams = (params, shouldEncode = true) => {
      if (!params)
        return null;
      const output = Object.entries(params).reduce((accumulator, entry2) => {
        const [key, value] = entry2;
        let encodedValue;
        let item;
        if (Array.isArray(value)) {
          item = "";
          value.forEach((str) => {
            encodedValue = shouldEncode ? encodeURIComponent(str) : str;
            item += `${key}=${encodedValue}&`;
          });
          item.slice(0, -1);
        } else {
          encodedValue = shouldEncode ? encodeURIComponent(value) : value;
          item = `${key}=${encodedValue}`;
        }
        return `${accumulator}&${item}`;
      }, "");
      return output.substr(1);
    };
    buildRequestInit = (options, extra = {}) => {
      const output = Object.assign({ method: options.method || "GET", headers: options.headers }, extra);
      const headers = normalizeHttpHeaders(options.headers);
      const type = headers["content-type"] || "";
      if (typeof options.data === "string") {
        output.body = options.data;
      } else if (type.includes("application/x-www-form-urlencoded")) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(options.data || {})) {
          params.set(key, value);
        }
        output.body = params.toString();
      } else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
        const form = new FormData();
        if (options.data instanceof FormData) {
          options.data.forEach((value, key) => {
            form.append(key, value);
          });
        } else {
          for (const key of Object.keys(options.data)) {
            form.append(key, options.data[key]);
          }
        }
        output.body = form;
        const headers2 = new Headers(output.headers);
        headers2.delete("content-type");
        output.headers = headers2;
      } else if (type.includes("application/json") || typeof options.data === "object") {
        output.body = JSON.stringify(options.data);
      }
      return output;
    };
    CapacitorHttpPluginWeb = class extends WebPlugin {
      /**
       * Perform an Http request given a set of options
       * @param options Options to build the HTTP request
       */
      async request(options) {
        const requestInit = buildRequestInit(options, options.webFetchExtra);
        const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
        const url = urlParams ? `${options.url}?${urlParams}` : options.url;
        const response = await fetch(url, requestInit);
        const contentType = response.headers.get("content-type") || "";
        let { responseType = "text" } = response.ok ? options : {};
        if (contentType.includes("application/json")) {
          responseType = "json";
        }
        let data;
        let blob;
        switch (responseType) {
          case "arraybuffer":
          case "blob":
            blob = await response.blob();
            data = await readBlobAsBase64(blob);
            break;
          case "json":
            data = await response.json();
            break;
          case "document":
          case "text":
          default:
            data = await response.text();
        }
        const headers = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        return {
          data,
          headers,
          status: response.status,
          url: response.url
        };
      }
      /**
       * Perform an Http GET request given a set of options
       * @param options Options to build the HTTP request
       */
      async get(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
      }
      /**
       * Perform an Http POST request given a set of options
       * @param options Options to build the HTTP request
       */
      async post(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
      }
      /**
       * Perform an Http PUT request given a set of options
       * @param options Options to build the HTTP request
       */
      async put(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
      }
      /**
       * Perform an Http PATCH request given a set of options
       * @param options Options to build the HTTP request
       */
      async patch(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
      }
      /**
       * Perform an Http DELETE request given a set of options
       * @param options Options to build the HTTP request
       */
      async delete(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
      }
    };
    CapacitorHttp = registerPlugin("CapacitorHttp", {
      web: () => new CapacitorHttpPluginWeb()
    });
  }
});

// node_modules/@capacitor/app/dist/esm/web.js
var web_exports = {};
__export(web_exports, {
  AppWeb: () => AppWeb
});
var AppWeb;
var init_web = __esm({
  "node_modules/@capacitor/app/dist/esm/web.js"() {
    init_dist();
    AppWeb = class extends WebPlugin {
      constructor() {
        super();
        this.handleVisibilityChange = () => {
          const data = {
            isActive: document.hidden !== true
          };
          this.notifyListeners("appStateChange", data);
          if (document.hidden) {
            this.notifyListeners("pause", null);
          } else {
            this.notifyListeners("resume", null);
          }
        };
        document.addEventListener("visibilitychange", this.handleVisibilityChange, false);
      }
      exitApp() {
        throw this.unimplemented("Not implemented on web.");
      }
      async getInfo() {
        throw this.unimplemented("Not implemented on web.");
      }
      async getLaunchUrl() {
        return { url: "" };
      }
      async getState() {
        return { isActive: document.hidden !== true };
      }
      async minimizeApp() {
        throw this.unimplemented("Not implemented on web.");
      }
      async toggleBackButtonHandler() {
        throw this.unimplemented("Not implemented on web.");
      }
    };
  }
});

// node_modules/@capacitor/preferences/dist/esm/web.js
var web_exports2 = {};
__export(web_exports2, {
  PreferencesWeb: () => PreferencesWeb
});
var PreferencesWeb;
var init_web2 = __esm({
  "node_modules/@capacitor/preferences/dist/esm/web.js"() {
    init_dist();
    PreferencesWeb = class extends WebPlugin {
      constructor() {
        super(...arguments);
        this.group = "CapacitorStorage";
      }
      async configure({ group }) {
        if (typeof group === "string") {
          this.group = group;
        }
      }
      async get(options) {
        const value = this.impl.getItem(this.applyPrefix(options.key));
        return { value };
      }
      async set(options) {
        this.impl.setItem(this.applyPrefix(options.key), options.value);
      }
      async remove(options) {
        this.impl.removeItem(this.applyPrefix(options.key));
      }
      async keys() {
        const keys = this.rawKeys().map((k) => k.substring(this.prefix.length));
        return { keys };
      }
      async clear() {
        for (const key of this.rawKeys()) {
          this.impl.removeItem(key);
        }
      }
      async migrate() {
        var _a;
        const migrated = [];
        const existing = [];
        const oldprefix = "_cap_";
        const keys = Object.keys(this.impl).filter((k) => k.indexOf(oldprefix) === 0);
        for (const oldkey of keys) {
          const key = oldkey.substring(oldprefix.length);
          const value = (_a = this.impl.getItem(oldkey)) !== null && _a !== void 0 ? _a : "";
          const { value: currentValue } = await this.get({ key });
          if (typeof currentValue === "string") {
            existing.push(key);
          } else {
            await this.set({ key, value });
            migrated.push(key);
          }
        }
        return { migrated, existing };
      }
      async removeOld() {
        const oldprefix = "_cap_";
        const keys = Object.keys(this.impl).filter((k) => k.indexOf(oldprefix) === 0);
        for (const oldkey of keys) {
          this.impl.removeItem(oldkey);
        }
      }
      get impl() {
        return window.localStorage;
      }
      get prefix() {
        return this.group === "NativeStorage" ? "" : `${this.group}.`;
      }
      rawKeys() {
        return Object.keys(this.impl).filter((k) => k.indexOf(this.prefix) === 0);
      }
      applyPrefix(key) {
        return this.prefix + key;
      }
    };
  }
});

// node_modules/@capacitor/filesystem/dist/esm/definitions.js
var Directory, Encoding;
var init_definitions = __esm({
  "node_modules/@capacitor/filesystem/dist/esm/definitions.js"() {
    (function(Directory2) {
      Directory2["Documents"] = "DOCUMENTS";
      Directory2["Data"] = "DATA";
      Directory2["Library"] = "LIBRARY";
      Directory2["Cache"] = "CACHE";
      Directory2["External"] = "EXTERNAL";
      Directory2["ExternalStorage"] = "EXTERNAL_STORAGE";
      Directory2["ExternalCache"] = "EXTERNAL_CACHE";
      Directory2["LibraryNoCloud"] = "LIBRARY_NO_CLOUD";
      Directory2["Temporary"] = "TEMPORARY";
    })(Directory || (Directory = {}));
    (function(Encoding2) {
      Encoding2["UTF8"] = "utf8";
      Encoding2["ASCII"] = "ascii";
      Encoding2["UTF16"] = "utf16";
    })(Encoding || (Encoding = {}));
  }
});

// node_modules/@capacitor/filesystem/dist/esm/web.js
var web_exports3 = {};
__export(web_exports3, {
  FilesystemWeb: () => FilesystemWeb
});
function resolve(path) {
  const posix = path.split("/").filter((item) => item !== ".");
  const newPosix = [];
  posix.forEach((item) => {
    if (item === ".." && newPosix.length > 0 && newPosix[newPosix.length - 1] !== "..") {
      newPosix.pop();
    } else {
      newPosix.push(item);
    }
  });
  return newPosix.join("/");
}
function isPathParent(parent, children) {
  parent = resolve(parent);
  children = resolve(children);
  const pathsA = parent.split("/");
  const pathsB = children.split("/");
  return parent !== children && pathsA.every((value, index) => value === pathsB[index]);
}
var FilesystemWeb;
var init_web3 = __esm({
  "node_modules/@capacitor/filesystem/dist/esm/web.js"() {
    init_dist();
    init_definitions();
    FilesystemWeb = class _FilesystemWeb extends WebPlugin {
      constructor() {
        super(...arguments);
        this.DB_VERSION = 1;
        this.DB_NAME = "Disc";
        this._writeCmds = ["add", "put", "delete"];
        this.downloadFile = async (options) => {
          var _a, _b;
          const requestInit = buildRequestInit(options, options.webFetchExtra);
          const response = await fetch(options.url, requestInit);
          let blob;
          if (!options.progress)
            blob = await response.blob();
          else if (!(response === null || response === void 0 ? void 0 : response.body))
            blob = new Blob();
          else {
            const reader = response.body.getReader();
            let bytes = 0;
            const chunks = [];
            const contentType = response.headers.get("content-type");
            const contentLength = parseInt(response.headers.get("content-length") || "0", 10);
            while (true) {
              const { done, value } = await reader.read();
              if (done)
                break;
              chunks.push(value);
              bytes += (value === null || value === void 0 ? void 0 : value.length) || 0;
              const status = {
                url: options.url,
                bytes,
                contentLength
              };
              this.notifyListeners("progress", status);
            }
            const allChunks = new Uint8Array(bytes);
            let position = 0;
            for (const chunk of chunks) {
              if (typeof chunk === "undefined")
                continue;
              allChunks.set(chunk, position);
              position += chunk.length;
            }
            blob = new Blob([allChunks.buffer], { type: contentType || void 0 });
          }
          const result = await this.writeFile({
            path: options.path,
            directory: (_a = options.directory) !== null && _a !== void 0 ? _a : void 0,
            recursive: (_b = options.recursive) !== null && _b !== void 0 ? _b : false,
            data: blob
          });
          return { path: result.uri, blob };
        };
      }
      readFileInChunks(_options, _callback) {
        throw this.unavailable("Method not implemented.");
      }
      async initDb() {
        if (this._db !== void 0) {
          return this._db;
        }
        if (!("indexedDB" in window)) {
          throw this.unavailable("This browser doesn't support IndexedDB");
        }
        return new Promise((resolve2, reject) => {
          const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
          request.onupgradeneeded = _FilesystemWeb.doUpgrade;
          request.onsuccess = () => {
            this._db = request.result;
            resolve2(request.result);
          };
          request.onerror = () => reject(request.error);
          request.onblocked = () => {
            console.warn("db blocked");
          };
        });
      }
      static doUpgrade(event) {
        const eventTarget = event.target;
        const db = eventTarget.result;
        switch (event.oldVersion) {
          case 0:
          case 1:
          default: {
            if (db.objectStoreNames.contains("FileStorage")) {
              db.deleteObjectStore("FileStorage");
            }
            const store = db.createObjectStore("FileStorage", { keyPath: "path" });
            store.createIndex("by_folder", "folder");
          }
        }
      }
      async dbRequest(cmd, args) {
        const readFlag = this._writeCmds.indexOf(cmd) !== -1 ? "readwrite" : "readonly";
        return this.initDb().then((conn) => {
          return new Promise((resolve2, reject) => {
            const tx = conn.transaction(["FileStorage"], readFlag);
            const store = tx.objectStore("FileStorage");
            const req = store[cmd](...args);
            req.onsuccess = () => resolve2(req.result);
            req.onerror = () => reject(req.error);
          });
        });
      }
      async dbIndexRequest(indexName, cmd, args) {
        const readFlag = this._writeCmds.indexOf(cmd) !== -1 ? "readwrite" : "readonly";
        return this.initDb().then((conn) => {
          return new Promise((resolve2, reject) => {
            const tx = conn.transaction(["FileStorage"], readFlag);
            const store = tx.objectStore("FileStorage");
            const index = store.index(indexName);
            const req = index[cmd](...args);
            req.onsuccess = () => resolve2(req.result);
            req.onerror = () => reject(req.error);
          });
        });
      }
      getPath(directory, uriPath) {
        const cleanedUriPath = uriPath !== void 0 ? uriPath.replace(/^[/]+|[/]+$/g, "") : "";
        let fsPath = "";
        if (directory !== void 0)
          fsPath += "/" + directory;
        if (uriPath !== "")
          fsPath += "/" + cleanedUriPath;
        return fsPath;
      }
      async clear() {
        const conn = await this.initDb();
        const tx = conn.transaction(["FileStorage"], "readwrite");
        const store = tx.objectStore("FileStorage");
        store.clear();
      }
      /**
       * Read a file from disk
       * @param options options for the file read
       * @return a promise that resolves with the read file data result
       */
      async readFile(options) {
        const path = this.getPath(options.directory, options.path);
        const entry2 = await this.dbRequest("get", [path]);
        if (entry2 === void 0)
          throw Error("File does not exist.");
        return { data: entry2.content ? entry2.content : "" };
      }
      /**
       * Write a file to disk in the specified location on device
       * @param options options for the file write
       * @return a promise that resolves with the file write result
       */
      async writeFile(options) {
        const path = this.getPath(options.directory, options.path);
        let data = options.data;
        const encoding = options.encoding;
        const doRecursive = options.recursive;
        const occupiedEntry = await this.dbRequest("get", [path]);
        if (occupiedEntry && occupiedEntry.type === "directory")
          throw Error("The supplied path is a directory.");
        const parentPath = path.substr(0, path.lastIndexOf("/"));
        const parentEntry = await this.dbRequest("get", [parentPath]);
        if (parentEntry === void 0) {
          const subDirIndex = parentPath.indexOf("/", 1);
          if (subDirIndex !== -1) {
            const parentArgPath = parentPath.substr(subDirIndex);
            await this.mkdir({
              path: parentArgPath,
              directory: options.directory,
              recursive: doRecursive
            });
          }
        }
        if (!encoding && !(data instanceof Blob)) {
          data = data.indexOf(",") >= 0 ? data.split(",")[1] : data;
          if (!this.isBase64String(data))
            throw Error("The supplied data is not valid base64 content.");
        }
        const now = Date.now();
        const pathObj = {
          path,
          folder: parentPath,
          type: "file",
          size: data instanceof Blob ? data.size : data.length,
          ctime: now,
          mtime: now,
          content: data
        };
        await this.dbRequest("put", [pathObj]);
        return {
          uri: pathObj.path
        };
      }
      /**
       * Append to a file on disk in the specified location on device
       * @param options options for the file append
       * @return a promise that resolves with the file write result
       */
      async appendFile(options) {
        const path = this.getPath(options.directory, options.path);
        let data = options.data;
        const encoding = options.encoding;
        const parentPath = path.substr(0, path.lastIndexOf("/"));
        const now = Date.now();
        let ctime = now;
        const occupiedEntry = await this.dbRequest("get", [path]);
        if (occupiedEntry && occupiedEntry.type === "directory")
          throw Error("The supplied path is a directory.");
        const parentEntry = await this.dbRequest("get", [parentPath]);
        if (parentEntry === void 0) {
          const subDirIndex = parentPath.indexOf("/", 1);
          if (subDirIndex !== -1) {
            const parentArgPath = parentPath.substr(subDirIndex);
            await this.mkdir({
              path: parentArgPath,
              directory: options.directory,
              recursive: true
            });
          }
        }
        if (!encoding && !this.isBase64String(data))
          throw Error("The supplied data is not valid base64 content.");
        if (occupiedEntry !== void 0) {
          if (occupiedEntry.content instanceof Blob) {
            throw Error("The occupied entry contains a Blob object which cannot be appended to.");
          }
          if (occupiedEntry.content !== void 0 && !encoding) {
            data = btoa(atob(occupiedEntry.content) + atob(data));
          } else {
            data = occupiedEntry.content + data;
          }
          ctime = occupiedEntry.ctime;
        }
        const pathObj = {
          path,
          folder: parentPath,
          type: "file",
          size: data.length,
          ctime,
          mtime: now,
          content: data
        };
        await this.dbRequest("put", [pathObj]);
      }
      /**
       * Delete a file from disk
       * @param options options for the file delete
       * @return a promise that resolves with the deleted file data result
       */
      async deleteFile(options) {
        const path = this.getPath(options.directory, options.path);
        const entry2 = await this.dbRequest("get", [path]);
        if (entry2 === void 0)
          throw Error("File does not exist.");
        const entries = await this.dbIndexRequest("by_folder", "getAllKeys", [IDBKeyRange.only(path)]);
        if (entries.length !== 0)
          throw Error("Folder is not empty.");
        await this.dbRequest("delete", [path]);
      }
      /**
       * Create a directory.
       * @param options options for the mkdir
       * @return a promise that resolves with the mkdir result
       */
      async mkdir(options) {
        const path = this.getPath(options.directory, options.path);
        const doRecursive = options.recursive;
        const parentPath = path.substr(0, path.lastIndexOf("/"));
        const depth = (path.match(/\//g) || []).length;
        const parentEntry = await this.dbRequest("get", [parentPath]);
        const occupiedEntry = await this.dbRequest("get", [path]);
        if (depth === 1)
          throw Error("Cannot create Root directory");
        if (occupiedEntry !== void 0)
          throw Error("Current directory does already exist.");
        if (!doRecursive && depth !== 2 && parentEntry === void 0)
          throw Error("Parent directory must exist");
        if (doRecursive && depth !== 2 && parentEntry === void 0) {
          const parentArgPath = parentPath.substr(parentPath.indexOf("/", 1));
          await this.mkdir({
            path: parentArgPath,
            directory: options.directory,
            recursive: doRecursive
          });
        }
        const now = Date.now();
        const pathObj = {
          path,
          folder: parentPath,
          type: "directory",
          size: 0,
          ctime: now,
          mtime: now
        };
        await this.dbRequest("put", [pathObj]);
      }
      /**
       * Remove a directory
       * @param options the options for the directory remove
       */
      async rmdir(options) {
        const { path, directory, recursive } = options;
        const fullPath = this.getPath(directory, path);
        const entry2 = await this.dbRequest("get", [fullPath]);
        if (entry2 === void 0)
          throw Error("Folder does not exist.");
        if (entry2.type !== "directory")
          throw Error("Requested path is not a directory");
        const readDirResult = await this.readdir({ path, directory });
        if (readDirResult.files.length !== 0 && !recursive)
          throw Error("Folder is not empty");
        for (const entry3 of readDirResult.files) {
          const entryPath = `${path}/${entry3.name}`;
          const entryObj = await this.stat({ path: entryPath, directory });
          if (entryObj.type === "file") {
            await this.deleteFile({ path: entryPath, directory });
          } else {
            await this.rmdir({ path: entryPath, directory, recursive });
          }
        }
        await this.dbRequest("delete", [fullPath]);
      }
      /**
       * Return a list of files from the directory (not recursive)
       * @param options the options for the readdir operation
       * @return a promise that resolves with the readdir directory listing result
       */
      async readdir(options) {
        const path = this.getPath(options.directory, options.path);
        const entry2 = await this.dbRequest("get", [path]);
        if (options.path !== "" && entry2 === void 0)
          throw Error("Folder does not exist.");
        const entries = await this.dbIndexRequest("by_folder", "getAllKeys", [IDBKeyRange.only(path)]);
        const files = await Promise.all(entries.map(async (e) => {
          let subEntry = await this.dbRequest("get", [e]);
          if (subEntry === void 0) {
            subEntry = await this.dbRequest("get", [e + "/"]);
          }
          return {
            name: e.substring(path.length + 1),
            type: subEntry.type,
            size: subEntry.size,
            ctime: subEntry.ctime,
            mtime: subEntry.mtime,
            uri: subEntry.path
          };
        }));
        return { files };
      }
      /**
       * Return full File URI for a path and directory
       * @param options the options for the stat operation
       * @return a promise that resolves with the file stat result
       */
      async getUri(options) {
        const path = this.getPath(options.directory, options.path);
        let entry2 = await this.dbRequest("get", [path]);
        if (entry2 === void 0) {
          entry2 = await this.dbRequest("get", [path + "/"]);
        }
        return {
          uri: (entry2 === null || entry2 === void 0 ? void 0 : entry2.path) || path
        };
      }
      /**
       * Return data about a file
       * @param options the options for the stat operation
       * @return a promise that resolves with the file stat result
       */
      async stat(options) {
        const path = this.getPath(options.directory, options.path);
        let entry2 = await this.dbRequest("get", [path]);
        if (entry2 === void 0) {
          entry2 = await this.dbRequest("get", [path + "/"]);
        }
        if (entry2 === void 0)
          throw Error("Entry does not exist.");
        return {
          name: entry2.path.substring(path.length + 1),
          type: entry2.type,
          size: entry2.size,
          ctime: entry2.ctime,
          mtime: entry2.mtime,
          uri: entry2.path
        };
      }
      /**
       * Rename a file or directory
       * @param options the options for the rename operation
       * @return a promise that resolves with the rename result
       */
      async rename(options) {
        await this._copy(options, true);
        return;
      }
      /**
       * Copy a file or directory
       * @param options the options for the copy operation
       * @return a promise that resolves with the copy result
       */
      async copy(options) {
        return this._copy(options, false);
      }
      async requestPermissions() {
        return { publicStorage: "granted" };
      }
      async checkPermissions() {
        return { publicStorage: "granted" };
      }
      /**
       * Function that can perform a copy or a rename
       * @param options the options for the rename operation
       * @param doRename whether to perform a rename or copy operation
       * @return a promise that resolves with the result
       */
      async _copy(options, doRename = false) {
        let { toDirectory } = options;
        const { to, from, directory: fromDirectory } = options;
        if (!to || !from) {
          throw Error("Both to and from must be provided");
        }
        if (!toDirectory) {
          toDirectory = fromDirectory;
        }
        const fromPath = this.getPath(fromDirectory, from);
        const toPath = this.getPath(toDirectory, to);
        if (fromPath === toPath) {
          return {
            uri: toPath
          };
        }
        if (isPathParent(fromPath, toPath)) {
          throw Error("To path cannot contain the from path");
        }
        let toObj;
        try {
          toObj = await this.stat({
            path: to,
            directory: toDirectory
          });
        } catch (e) {
          const toPathComponents = to.split("/");
          toPathComponents.pop();
          const toPath2 = toPathComponents.join("/");
          if (toPathComponents.length > 0) {
            const toParentDirectory = await this.stat({
              path: toPath2,
              directory: toDirectory
            });
            if (toParentDirectory.type !== "directory") {
              throw new Error("Parent directory of the to path is a file");
            }
          }
        }
        if (toObj && toObj.type === "directory") {
          throw new Error("Cannot overwrite a directory with a file");
        }
        const fromObj = await this.stat({
          path: from,
          directory: fromDirectory
        });
        const updateTime = async (path, ctime2, mtime) => {
          const fullPath = this.getPath(toDirectory, path);
          const entry2 = await this.dbRequest("get", [fullPath]);
          entry2.ctime = ctime2;
          entry2.mtime = mtime;
          await this.dbRequest("put", [entry2]);
        };
        const ctime = fromObj.ctime ? fromObj.ctime : Date.now();
        switch (fromObj.type) {
          // The "from" object is a file
          case "file": {
            const file = await this.readFile({
              path: from,
              directory: fromDirectory
            });
            if (doRename) {
              await this.deleteFile({
                path: from,
                directory: fromDirectory
              });
            }
            let encoding;
            if (!(file.data instanceof Blob) && !this.isBase64String(file.data)) {
              encoding = Encoding.UTF8;
            }
            const writeResult = await this.writeFile({
              path: to,
              directory: toDirectory,
              data: file.data,
              encoding
            });
            if (doRename) {
              await updateTime(to, ctime, fromObj.mtime);
            }
            return writeResult;
          }
          case "directory": {
            if (toObj) {
              throw Error("Cannot move a directory over an existing object");
            }
            try {
              await this.mkdir({
                path: to,
                directory: toDirectory,
                recursive: false
              });
              if (doRename) {
                await updateTime(to, ctime, fromObj.mtime);
              }
            } catch (e) {
            }
            const contents = (await this.readdir({
              path: from,
              directory: fromDirectory
            })).files;
            for (const filename of contents) {
              await this._copy({
                from: `${from}/${filename.name}`,
                to: `${to}/${filename.name}`,
                directory: fromDirectory,
                toDirectory
              }, doRename);
            }
            if (doRename) {
              await this.rmdir({
                path: from,
                directory: fromDirectory
              });
            }
          }
        }
        return {
          uri: toPath
        };
      }
      isBase64String(str) {
        try {
          return btoa(atob(str)) == str;
        } catch (err) {
          return false;
        }
      }
    };
    FilesystemWeb._debug = true;
  }
});

// node_modules/@capacitor/share/dist/esm/web.js
var web_exports4 = {};
__export(web_exports4, {
  ShareWeb: () => ShareWeb
});
var ShareWeb;
var init_web4 = __esm({
  "node_modules/@capacitor/share/dist/esm/web.js"() {
    init_dist();
    ShareWeb = class extends WebPlugin {
      async canShare() {
        if (typeof navigator === "undefined" || !navigator.share) {
          return { value: false };
        } else {
          return { value: true };
        }
      }
      async share(options) {
        if (typeof navigator === "undefined" || !navigator.share) {
          throw this.unavailable("Share API not available in this browser");
        }
        await navigator.share({
          title: options.title,
          text: options.text,
          url: options.url
        });
        return {};
      }
    };
  }
});

// node_modules/@capacitor/haptics/dist/esm/definitions.js
var ImpactStyle, NotificationType;
var init_definitions2 = __esm({
  "node_modules/@capacitor/haptics/dist/esm/definitions.js"() {
    (function(ImpactStyle2) {
      ImpactStyle2["Heavy"] = "HEAVY";
      ImpactStyle2["Medium"] = "MEDIUM";
      ImpactStyle2["Light"] = "LIGHT";
    })(ImpactStyle || (ImpactStyle = {}));
    (function(NotificationType2) {
      NotificationType2["Success"] = "SUCCESS";
      NotificationType2["Warning"] = "WARNING";
      NotificationType2["Error"] = "ERROR";
    })(NotificationType || (NotificationType = {}));
  }
});

// node_modules/@capacitor/haptics/dist/esm/web.js
var web_exports5 = {};
__export(web_exports5, {
  HapticsWeb: () => HapticsWeb
});
var HapticsWeb;
var init_web5 = __esm({
  "node_modules/@capacitor/haptics/dist/esm/web.js"() {
    init_dist();
    init_definitions2();
    HapticsWeb = class extends WebPlugin {
      constructor() {
        super(...arguments);
        this.selectionStarted = false;
      }
      async impact(options) {
        const pattern = this.patternForImpact(options === null || options === void 0 ? void 0 : options.style);
        this.vibrateWithPattern(pattern);
      }
      async notification(options) {
        const pattern = this.patternForNotification(options === null || options === void 0 ? void 0 : options.type);
        this.vibrateWithPattern(pattern);
      }
      async vibrate(options) {
        const duration = (options === null || options === void 0 ? void 0 : options.duration) || 300;
        this.vibrateWithPattern([duration]);
      }
      async selectionStart() {
        this.selectionStarted = true;
      }
      async selectionChanged() {
        if (this.selectionStarted) {
          this.vibrateWithPattern([70]);
        }
      }
      async selectionEnd() {
        this.selectionStarted = false;
      }
      patternForImpact(style = ImpactStyle.Heavy) {
        if (style === ImpactStyle.Medium) {
          return [43];
        } else if (style === ImpactStyle.Light) {
          return [20];
        }
        return [61];
      }
      patternForNotification(type = NotificationType.Success) {
        if (type === NotificationType.Warning) {
          return [30, 40, 30, 50, 60];
        } else if (type === NotificationType.Error) {
          return [27, 45, 50];
        }
        return [35, 65, 21];
      }
      vibrateWithPattern(pattern) {
        if (navigator.vibrate) {
          navigator.vibrate(pattern);
        } else {
          throw this.unavailable("Browser does not support the vibrate API");
        }
      }
    };
  }
});

// src/js/app.js
init_dist();

// node_modules/@capacitor/app/dist/esm/index.js
init_dist();
var App = registerPlugin("App", {
  web: () => Promise.resolve().then(() => (init_web(), web_exports)).then((m) => new m.AppWeb())
});

// node_modules/@capacitor/status-bar/dist/esm/index.js
init_dist();

// node_modules/@capacitor/status-bar/dist/esm/definitions.js
var Style;
(function(Style2) {
  Style2["Dark"] = "DARK";
  Style2["Light"] = "LIGHT";
  Style2["Default"] = "DEFAULT";
})(Style || (Style = {}));
var Animation;
(function(Animation2) {
  Animation2["None"] = "NONE";
  Animation2["Slide"] = "SLIDE";
  Animation2["Fade"] = "FADE";
})(Animation || (Animation = {}));

// node_modules/@capacitor/status-bar/dist/esm/index.js
var StatusBar = registerPlugin("StatusBar");

// src/js/data.js
var PLANS = {
  A: {
    name: "Druck",
    focus: "Brust, Quadrizeps, Trizeps, Schulter",
    ex: [
      { id: "chestpress", n: "Vertical Chest Press", r: "3 \xD7 8\u201312", step: 5 },
      { id: "butterfly", n: "Butterfly", r: "3 \xD7 10\u201315", step: 5 },
      { id: "legext", n: "Leg Extension", r: "3 \xD7 12\u201315", step: 5 },
      { id: "backkick", n: "Back Kick mit Fu\xDFschlaufe", r: "3 \xD7 12\u201315 je Bein", step: 5, hint: "Unterer Kabelzug, Bein gestreckt nach hinten. Ein Tipp pro Durchgang." },
      { id: "pushdown", n: "Triceps Pushdown", r: "3 \xD7 10\u201315", step: 5, hint: "Zu grobe Spr\xFCnge? 3 s langsam ablassen statt h\xF6her." },
      { id: "deltoid", n: "Deltoid Raise, einarmig", r: "2 \xD7 12\u201315 je Arm", step: 2.5, s: 2 },
      { id: "abcrunch", n: "Ab Crunch am Kabel", r: "3 \xD7 12\u201315", step: 5 }
    ]
  },
  B: {
    name: "Zug",
    focus: "R\xFCcken, Beine einbeinig, Bizeps, Rumpf",
    ex: [
      { id: "lat", n: "Lat Pulldown", r: "3 \xD7 8\u201312", step: 5 },
      { id: "lowrow", n: "Low Row", r: "3 \xD7 8\u201312", step: 5 },
      { id: "split", n: "Bulgarian Split Squat", r: "3 \xD7 8\u201312 je Bein", bw: true, hint: "Hinterer Fu\xDF auf der Bank." },
      { id: "curl", n: "Standing Arm Curl", r: "3 \xD7 10\u201312", step: 5 },
      { id: "upright", n: "Upright Row", r: "3 \xD7 12", step: 5, hint: "Nur bis Brusth\xF6he ziehen, nicht bis zum Kinn." },
      { id: "calf", n: "Wadenheben auf Stufe", r: "3 \xD7 15\u201320", bw: true },
      { id: "plank", n: "Plank", r: "3 \xD7 30\u201360 s", bw: true }
    ]
  },
  C: {
    name: "Ganzk\xF6rper",
    focus: "Verk\xFCrzte Einheit f\xFCr Nachtschichtwochen",
    ex: [
      { id: "lat", n: "Lat Pulldown", r: "2\u20133 \xD7 10\u201312", step: 5 },
      { id: "chestpress", n: "Vertical Chest Press", r: "2\u20133 \xD7 10\u201312", step: 5 },
      { id: "legext", n: "Leg Extension", r: "2\u20133 \xD7 10\u201312", step: 5 },
      { id: "hipraise", n: "Beckenheben, einbeinig", r: "2\u20133 \xD7 10\u201312 je Bein", bw: true },
      { id: "lowrow", n: "Low Row", r: "2\u20133 \xD7 10\u201312", step: 5 },
      { id: "armset", n: "Arm Curl + Pushdown", r: "2 \xD7 10\u201312 im Wechsel", step: 5, s: 2 },
      { id: "abcrunch", n: "Ab Crunch am Kabel", r: "2\u20133 \xD7 12\u201315", step: 5 }
    ]
  }
};
var BANDS = {
  chestpress: [4, 6],
  butterfly: [2, 4],
  legext: [3, 5],
  backkick: [2, 4],
  pushdown: [3, 5],
  deltoid: [1, 3],
  abcrunch: [3, 5],
  lat: [4, 6],
  lowrow: [4, 6],
  curl: [3, 5],
  upright: [3, 5],
  armset: [3, 5]
};
var MONTHS = [
  "J\xE4nner",
  "Februar",
  "M\xE4rz",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
];
var WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
function exOf(planKey, id) {
  const p = PLANS[planKey];
  if (!p) return null;
  return p.ex.find((x) => x.id === id) || null;
}
function goal(x) {
  return x.s || 3;
}

// src/js/store.js
init_dist();

// node_modules/@capacitor/preferences/dist/esm/index.js
init_dist();
var Preferences = registerPlugin("Preferences", {
  web: () => Promise.resolve().then(() => (init_web2(), web_exports2)).then((m) => new m.PreferencesWeb())
});

// node_modules/@capacitor/filesystem/dist/esm/index.js
init_dist();

// node_modules/@capacitor/synapse/dist/synapse.mjs
function s(t) {
  t.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, n) {
        return new Proxy({}, {
          get(w, o) {
            return (c, p, r) => {
              const i = t.Capacitor.Plugins[n];
              if (i === void 0) {
                r(new Error(`Capacitor plugin ${n} not found`));
                return;
              }
              if (typeof i[o] != "function") {
                r(new Error(`Method ${o} not found in Capacitor plugin ${n}`));
                return;
              }
              (async () => {
                try {
                  const a = await i[o](c);
                  p(a);
                } catch (a) {
                  r(a);
                }
              })();
            };
          }
        });
      }
    }
  );
}
function u(t) {
  t.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, n) {
        return t.cordova.plugins[n];
      }
    }
  );
}
function f(t = false) {
  typeof window > "u" || (window.CapacitorUtils = window.CapacitorUtils || {}, window.Capacitor !== void 0 && !t ? s(window) : window.cordova !== void 0 && u(window));
}

// node_modules/@capacitor/filesystem/dist/esm/index.js
init_definitions();
var Filesystem = registerPlugin("Filesystem", {
  web: () => Promise.resolve().then(() => (init_web3(), web_exports3)).then((m) => new m.FilesystemWeb())
});
f();

// node_modules/@capacitor/share/dist/esm/index.js
init_dist();
var Share = registerPlugin("Share", {
  web: () => Promise.resolve().then(() => (init_web4(), web_exports4)).then((m) => new m.ShareWeb())
});

// src/js/store.js
var KEY = "training:v2";
var FOLDER = "PTapp";
var isNative = () => Capacitor.isNativePlatform();
var DEFAULT_STATE = { log: {}, kg: {}, next: "A", nights: {}, pw: 4.5 };
async function loadState() {
  try {
    const { value } = await Preferences.get({ key: KEY });
    if (!value) return { ...DEFAULT_STATE };
    return migrate(Object.assign({ ...DEFAULT_STATE }, JSON.parse(value)));
  } catch (e) {
    console.warn("Laden fehlgeschlagen:", e);
    return { ...DEFAULT_STATE };
  }
}
async function saveState(state) {
  await Preferences.set({ key: KEY, value: JSON.stringify(state) });
}
function migrate(s2) {
  Object.values(s2.log || {}).forEach((e) => {
    if (!e || !e.t) return;
    Object.keys(e.t).forEach((id) => {
      if (e.t[id] === true) e.t[id] = 3;
    });
  });
  return s2;
}
function stamp() {
  const d = /* @__PURE__ */ new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}
var DIRS = [Directory.Documents, Directory.Data];
var backupDir = DIRS[0];
async function exportBackup(state) {
  const data = JSON.stringify({ app: "ptapp", version: 1, exported: (/* @__PURE__ */ new Date()).toISOString(), state }, null, 2);
  const name = `ptapp-${stamp()}.json`;
  if (!isNative()) {
    downloadInBrowser(name, data);
    return { name, path: "Download-Ordner" };
  }
  let res = null, lastErr = null;
  for (const dir of DIRS) {
    try {
      await ensureFolder(dir);
      res = await Filesystem.writeFile({
        path: `${FOLDER}/${name}`,
        data,
        directory: dir,
        encoding: Encoding.UTF8
      });
      backupDir = dir;
      break;
    } catch (e) {
      lastErr = e;
    }
  }
  if (!res) throw lastErr || new Error("Kein Schreibzugriff");
  try {
    if ((await Share.canShare()).value) {
      await Share.share({ title: "PTapp Sicherung", url: res.uri, dialogTitle: "Sicherung teilen" });
    }
  } catch (e) {
  }
  return { name, path: backupDir === Directory.Documents ? `Dokumente/${FOLDER}` : `App-Ordner/${FOLDER}` };
}
async function listBackups() {
  if (!isNative()) return [];
  const seen = /* @__PURE__ */ new Map();
  for (const dir of DIRS) {
    try {
      const res = await Filesystem.readdir({ path: FOLDER, directory: dir });
      (res.files || []).forEach((f2) => {
        const name = typeof f2 === "string" ? f2 : f2.name;
        if (name.endsWith(".json") && !seen.has(name)) seen.set(name, { name, dir });
      });
    } catch (e) {
    }
  }
  return [...seen.values()].sort((a, b) => b.name.localeCompare(a.name));
}
async function readBackup(name) {
  let lastErr = null;
  for (const dir of DIRS) {
    try {
      const res = await Filesystem.readFile({
        path: `${FOLDER}/${name}`,
        directory: dir,
        encoding: Encoding.UTF8
      });
      return parseBackup(res.data);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("Datei nicht gefunden");
}
function parseBackup(text) {
  const obj = JSON.parse(text);
  const state = obj && obj.state ? obj.state : obj;
  if (!state || typeof state !== "object" || !("log" in state)) throw new Error("Keine g\xFCltige Sicherung");
  return migrate(Object.assign({ ...DEFAULT_STATE }, state));
}
async function ensureFolder(dir) {
  try {
    await Filesystem.mkdir({ path: FOLDER, directory: dir, recursive: true });
  } catch (e) {
  }
}
function downloadInBrowser(name, data) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: "application/json" }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1e3);
}

// src/js/state.js
var S = { ...DEFAULT_STATE };
var saveErr = "";
var listeners = [];
function onChange(fn) {
  listeners.push(fn);
}
function emit() {
  listeners.forEach((fn) => fn());
}
function lastError() {
  return saveErr;
}
async function init() {
  Object.assign(S, await loadState());
}
async function persist() {
  try {
    await saveState(S);
    saveErr = "";
  } catch (e) {
    saveErr = "Konnte nicht gespeichert werden. Die Eingaben gelten nur f\xFCr diese Sitzung.";
  }
  emit();
}
function replaceState(next) {
  Object.keys(S).forEach((k) => delete S[k]);
  Object.assign(S, next);
  return persist();
}
function iso(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function monday(d) {
  const x = new Date(d), wd = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - wd);
  x.setHours(0, 0, 0, 0);
  return x;
}
var today = /* @__PURE__ */ new Date();
var tk = iso(today);
var wk = iso(monday(today));
function refreshDay() {
  const now = /* @__PURE__ */ new Date();
  if (iso(now) === tk) return false;
  today = now;
  tk = iso(now);
  wk = iso(monday(now));
  return true;
}
function band(id) {
  const n = S.kg[id] || 0, b = BANDS[id];
  if (!b || !n) return null;
  if (n <= b[0]) return "g";
  if (n <= b[1]) return "y";
  return "r";
}
function isNight() {
  return !!S.nights[wk];
}
function suggested() {
  return isNight() ? "C" : S.next || "A";
}
var sel = null;
function selectPlan(k) {
  sel = k;
  emit();
}
function activePlan() {
  return sel || (S.log[tk] ? S.log[tk].k : suggested());
}
function entry() {
  const k = activePlan();
  if (!S.log[tk] || S.log[tk].k !== k) return { k, t: {}, w: {}, done: false };
  return S.log[tk];
}
function weekCount() {
  let n = 0;
  const m = monday(today);
  for (let i = 0; i < 7; i++) {
    const d = new Date(m);
    d.setDate(m.getDate() + i);
    const e = S.log[iso(d)];
    if (e && e.done) n++;
  }
  return n;
}
function weekTarget() {
  return isNight() ? 2 : 4;
}
function setsDone(e, x) {
  const v = e && e.t ? e.t[x.id] : 0;
  if (v === true) return goal(x);
  return v || 0;
}
function plateKg(id) {
  const n = (S.kg[id] || 0) * (S.pw || 4.5);
  return fmt(n);
}
function fmt(n) {
  return (Math.round(n * 10) / 10).toString().replace(".", ",");
}
function ensureEntry(k) {
  let e = S.log[tk];
  if (!e || e.k !== k) {
    e = { k, t: {}, w: {}, done: false };
    S.log[tk] = e;
  }
  return e;
}
function snapshotWeights(e, k) {
  e.w = e.w || {};
  PLANS[k].ex.forEach((x) => {
    if (!x.bw) e.w[x.id] = S.kg[x.id] || 0;
  });
}
function toggleExercise(id) {
  const k = activePlan(), e = ensureEntry(k), x = exOf(k, id);
  if (!x) return false;
  const n = setsDone(e, x) + 1;
  const wrapped = n > goal(x);
  e.t[id] = wrapped ? 0 : n;
  snapshotWeights(e, k);
  persist();
  return !wrapped && n >= goal(x);
}
function bumpWeight(id, dir) {
  S.kg[id] = Math.max(0, Math.min(20, (S.kg[id] || 0) + dir));
  const k = activePlan(), e = S.log[tk];
  if (e && e.k === k) snapshotWeights(e, k);
  persist();
}
function setPlateWeight(v) {
  S.pw = v;
  persist();
}
function finish() {
  const k = activePlan(), e = ensureEntry(k);
  snapshotWeights(e, k);
  if (e.done) {
    e.done = false;
    if (k === "A" || k === "B") S.next = k;
  } else {
    e.done = true;
    if (k === "A") S.next = "B";
    if (k === "B") S.next = "A";
  }
  sel = null;
  persist();
  return e.done;
}
function toggleNight() {
  if (S.nights[wk]) delete S.nights[wk];
  else S.nights[wk] = true;
  sel = null;
  persist();
}
function hasAnySet() {
  const k = activePlan(), e = entry();
  return PLANS[k].ex.some((x) => setsDone(e, x) > 0);
}

// src/js/views/plan.js
var plan_exports = {};
__export(plan_exports, {
  render: () => render
});

// node_modules/@capacitor/haptics/dist/esm/index.js
init_dist();
init_definitions2();
var Haptics = registerPlugin("Haptics", {
  web: () => Promise.resolve().then(() => (init_web5(), web_exports5)).then((m) => new m.HapticsWeb())
});

// src/js/ui.js
function esc(s2) {
  return String(s2).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function on(selector, handler, event = "click") {
  document.querySelectorAll(selector).forEach((el) => el.addEventListener(event, handler));
}
var toastTimer = null;
function toast(msg, bad = false) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const el = document.createElement("div");
  el.className = "toast" + (bad ? " bad" : "");
  el.setAttribute("role", "status");
  el.textContent = msg;
  document.body.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), bad ? 5e3 : 2600);
}
async function haptic(style = "light") {
  try {
    await Haptics.impact({ style: style === "medium" ? ImpactStyle.Medium : ImpactStyle.Light });
  } catch (e) {
  }
}
function confirmBox(text) {
  return window.confirm(text);
}

// src/js/views/plan.js
function weekStrip() {
  const m = monday(today);
  let h = "";
  for (let i = 0; i < 7; i++) {
    const d = new Date(m);
    d.setDate(m.getDate() + i);
    const key = iso(d), e = S.log[key], done = e && e.done;
    h += '<div class="tp-day' + (done ? " filled" : "") + (key === tk ? " today" : "") + '"><div class="d">' + WEEKDAYS[i] + '</div><div class="m' + (done ? "" : " empty") + '">' + (done ? e.k : "\xB7") + "</div></div>";
  }
  return '<div class="tp-week">' + h + "</div>";
}
function exerciseRow(x, e) {
  const g = goal(x), n = setsDone(e, x), ok = n >= g;
  const bd = x.bw ? null : band(x.id);
  const right = x.bw ? '<div class="tp-bw">K\xF6rpergewicht</div>' : '<div class="tp-kg"><button data-kg="' + x.id + '" data-dir="-1" aria-label="Eine Platte weniger">\u2212</button><div class="val">' + (S.kg[x.id] || 0) + '<small> Pl.</small><div class="sub"><i class="dot ' + (bd || "n") + '"></i>' + plateKg(x.id) + ' kg</div></div><button data-kg="' + x.id + '" data-dir="1" aria-label="Eine Platte mehr">+</button></div>';
  return '<div class="tp-ex' + (ok ? " ok" : "") + (n > 0 && !ok ? " part" : "") + '" data-ex="' + x.id + '" role="button" tabindex="0" aria-label="' + esc(x.n) + ", " + n + " von " + g + ' S\xE4tzen"><div class="tp-box">' + (ok ? "\u2713" : n + "<em>/" + g + "</em>") + '</div><div><div class="nm">' + esc(x.n) + '</div><div class="rp">' + esc(x.r) + "</div>" + (x.hint ? '<div class="hint">' + esc(x.hint) + "</div>" : "") + "</div>" + right + "</div>";
}
function render(head2, mount2) {
  const k = activePlan(), p = PLANS[k], e = entry(), sug = suggested();
  const target = weekTarget(), cnt = weekCount();
  const night = isNight();
  const pick = ["A", "B", "C"].map((x) => '<button data-pick="' + x + '" class="' + (x === k ? "sel" : "") + (x === sug && x !== k ? " sug" : "") + '"><span class="k">' + x + "</span>" + PLANS[x].name + "</button>").join("");
  mount2.innerHTML = head2() + weekStrip() + '<div class="tp-count"><b>' + cnt + " von " + target + "</b> Einheiten diese Woche" + (night ? " \u2014 Nachtschichtwoche, Sa und So reichen." : "") + '</div><div class="tp-shift' + (night ? " on" : "") + '"><div><div class="lbl">Diese Woche Nachtschicht</div><div class="sub">Schaltet auf zwei Ganzk\xF6rper-Einheiten am Wochenende.</div></div><button class="tp-toggle" id="nt" role="switch" aria-checked="' + night + '" aria-label="Nachtschichtwoche"><span></span></button></div><div class="tp-pick">' + pick + '</div><div class="tp-card"><div class="tp-card-in"><div class="tp-title"><div class="big">' + k + '</div><div><div class="nm">' + esc(p.name) + '</div><div class="fo">' + esc(p.focus) + "</div></div></div>" + p.ex.map((x) => exerciseRow(x, e)).join("") + '<div class="tp-key"><span><i class="dot g"></i>leicht</span><span><i class="dot y"></i>mittel</span><span><i class="dot r"></i>schwer</span></div><button class="tp-finish' + (e.done ? " undo" : "") + '" id="fin"' + (!hasAnySet() && !e.done ? " disabled" : "") + ">" + (e.done ? "Eintrag zur\xFCcknehmen" : "Training abschlie\xDFen") + "</button></div></div>" + (lastError() ? '<div class="tp-err">' + esc(lastError()) + "</div>" : "") + '<div class="tp-pw"><span>Eine Platte wiegt</span><button data-pw="4.5" class="' + (S.pw === 4.5 ? "sel" : "") + '">4,5 kg</button><button data-pw="5" class="' + (S.pw === 5 ? "sel" : "") + '">5 kg</button></div><div class="tp-note">Nach dem Abschlie\xDFen springt der Vorschlag auf die n\xE4chste Einheit. Du kannst jederzeit eine andere w\xE4hlen \u2014 die gelbe Umrandung zeigt, was dran w\xE4re. Wenn du in allen S\xE4tzen die obere Wiederholungszahl schaffst, eine Platte h\xF6her.</div>';
  document.getElementById("nt").addEventListener("click", () => toggleNight());
  document.getElementById("fin").addEventListener("click", () => {
    haptic("medium");
    finish();
  });
  on("[data-pick]", (ev) => selectPlan(ev.currentTarget.dataset.pick));
  on("[data-pw]", (ev) => setPlateWeight(parseFloat(ev.currentTarget.dataset.pw)));
  on("[data-kg]", (ev) => {
    ev.stopPropagation();
    bumpWeight(ev.currentTarget.dataset.kg, parseInt(ev.currentTarget.dataset.dir, 10));
  });
  on("[data-ex]", (ev) => {
    if (toggleExercise(ev.currentTarget.dataset.ex)) haptic("light");
  });
  on("[data-ex]", (ev) => {
    if (ev.key === " " || ev.key === "Enter") {
      ev.preventDefault();
      toggleExercise(ev.currentTarget.dataset.ex);
    }
  }, "keydown");
}

// src/js/views/log.js
var log_exports = {};
__export(log_exports, {
  render: () => render2,
  resetSelection: () => resetSelection
});
var month = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1);
var selectedDay = null;
function resetSelection() {
  selectedDay = null;
}
function dayDetail() {
  if (!selectedDay) return null;
  const de = S.log[selectedDay];
  if (!de) return null;
  const [y, m, d] = selectedDay.split("-").map(Number);
  const dd = new Date(y, m - 1, d);
  const lines = PLANS[de.k].ex.map((x) => {
    const g = goal(x), n = setsDone(de, x), ok = n >= g;
    const plates = de.w && de.w[x.id] != null ? de.w[x.id] : 0;
    const w = x.bw ? "K\xF6rpergewicht" : plates + " Pl. \xB7 " + fmt(plates * (S.pw || 4.5)) + " kg";
    return '<div class="dt-row' + (ok ? "" : " skip") + '"><span class="dt-m">' + n + "/" + g + '</span><span class="dt-n">' + esc(x.n) + '</span><span class="dt-w">' + w + "</span></div>";
  }).join("");
  return '<div class="tp-card"><div class="tp-card-in"><div class="tp-title"><div class="big">' + de.k + '</div><div><div class="nm">' + dd.toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" }) + '</div><div class="fo">' + esc(PLANS[de.k].name) + (de.done ? " \xB7 abgeschlossen" : " \xB7 nicht abgeschlossen") + "</div></div></div>" + lines + "</div></div>";
}
function render2(head2, mount2) {
  const y = month.getFullYear(), m = month.getMonth();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  let cells = "", total = 0;
  const per = { A: 0, B: 0, C: 0 };
  WEEKDAYS.forEach((l) => {
    cells += '<div class="cal-h">' + l + "</div>";
  });
  for (let i = 0; i < lead; i++) cells += '<div class="cal-c void"></div>';
  for (let d = 1; d <= days; d++) {
    const key = iso(new Date(y, m, d)), e = S.log[key], done = e && e.done;
    if (done) {
      total++;
      per[e.k] = (per[e.k] || 0) + 1;
    }
    cells += '<button class="cal-c' + (done ? " done" : "") + (e && !done ? " part" : "") + (key === tk ? " now" : "") + (key === selectedDay ? " sel" : "") + '"' + (e ? "" : " disabled") + ' data-day="' + key + '" aria-label="' + d + ". " + MONTHS[m] + '"><span class="n">' + d + "</span>" + (e ? '<span class="k">' + e.k + "</span>" : "") + "</button>";
  }
  const detail = dayDetail() || '<div class="tp-hint">' + (total ? "Tippe auf einen markierten Tag, um \xDCbungen und Gewichte zu sehen." : "In diesem Monat ist noch nichts eingetragen.") + "</div>";
  mount2.innerHTML = head2() + '<div class="cal-bar"><button data-mon="-1" aria-label="Voriger Monat">\u2039</button><div class="cal-t">' + MONTHS[m] + " " + y + '</div><button data-mon="1" aria-label="N\xE4chster Monat">\u203A</button></div><div class="cal-sum"><b>' + total + "</b> " + (total === 1 ? "Einheit" : "Einheiten") + (total ? " \u2014 A " + per.A + " \xB7 B " + per.B + " \xB7 C " + per.C : "") + '</div><div class="cal">' + cells + "</div>" + detail;
  on("[data-mon]", (ev) => {
    month = new Date(month.getFullYear(), month.getMonth() + parseInt(ev.currentTarget.dataset.mon, 10), 1);
    selectedDay = null;
    document.dispatchEvent(new CustomEvent("rerender"));
  });
  on("[data-day]", (ev) => {
    const d = ev.currentTarget.dataset.day;
    selectedDay = selectedDay === d ? null : d;
    document.dispatchEvent(new CustomEvent("rerender"));
  });
}

// src/js/views/settings.js
var settings_exports = {};
__export(settings_exports, {
  refresh: () => refresh,
  render: () => render3
});
var backups = [];
function stats() {
  const entries = Object.values(S.log).filter((e) => e && e.done);
  const per = { A: 0, B: 0, C: 0 };
  entries.forEach((e) => {
    per[e.k] = (per[e.k] || 0) + 1;
  });
  const first = Object.keys(S.log).sort()[0];
  return { total: entries.length, per, first };
}
async function refresh() {
  backups = await listBackups();
}
function render3(head2, mount2) {
  const s2 = stats();
  mount2.innerHTML = head2() + '<div class="set-sec"><h2>\xDCberblick</h2><div class="set-stat"><div><b>' + s2.total + "</b>Einheiten gesamt</div><div><b>" + s2.per.A + " \xB7 " + s2.per.B + " \xB7 " + s2.per.C + "</b>A \xB7 B \xB7 C</div></div>" + (s2.first ? "<p>Erster Eintrag: " + esc(s2.first.split("-").reverse().join(".")) + "</p>" : "") + '</div><div class="set-sec"><h2>Gewicht einer Platte</h2><p>Gilt f\xFCr die Umrechnung aller Ger\xE4te im Studio.</p><div class="tp-pw"><span></span><button data-pw="4.5" class="' + (S.pw === 4.5 ? "sel" : "") + '">4,5 kg</button><button data-pw="5" class="' + (S.pw === 5 ? "sel" : "") + '">5 kg</button></div></div><div class="set-sec"><h2>Sicherung</h2><p>' + (isNative() ? "Legt eine JSON-Datei unter Dokumente/PTapp an und \xF6ffnet das Teilen-Men\xFC." : "L\xE4dt eine JSON-Datei herunter.") + '</p><button class="set-btn" id="exp">Daten sichern</button>' + (backups.length ? '<p>Vorhandene Sicherungen \u2014 Antippen stellt wieder her:</p><div class="set-list">' + backups.slice(0, 12).map((b) => '<button data-imp="' + esc(b.name) + '">' + esc(b.name) + "</button>").join("") + "</div>" : "") + '<button class="set-btn" id="paste">Sicherung aus Text einf\xFCgen</button></div><div class="set-sec"><h2>Zur\xFCcksetzen</h2><p>L\xF6scht Verlauf, Gewichte und Einstellungen unwiderruflich.</p><button class="set-btn warn" id="wipe">Alle Daten l\xF6schen</button></div><div class="tp-note">PTapp 1.0 \xB7 Daten liegen nur auf diesem Ger\xE4t.</div>';
  on("[data-pw]", (ev) => setPlateWeight(parseFloat(ev.currentTarget.dataset.pw)));
  document.getElementById("exp").addEventListener("click", async () => {
    try {
      const r = await exportBackup(S);
      toast("Gesichert: " + r.name);
      await refresh();
      document.dispatchEvent(new CustomEvent("rerender"));
    } catch (e) {
      toast("Sicherung fehlgeschlagen: " + e.message, true);
    }
  });
  on("[data-imp]", async (ev) => {
    const name = ev.currentTarget.dataset.imp;
    if (!confirmBox('Sicherung "' + name + '" laden? Die aktuellen Daten werden ersetzt.')) return;
    try {
      const next = await readBackup(name);
      await replaceState(next);
      toast("Wiederhergestellt.");
    } catch (e) {
      toast("Konnte nicht gelesen werden: " + e.message, true);
    }
  });
  document.getElementById("paste").addEventListener("click", async () => {
    const text = window.prompt("Inhalt der Sicherungsdatei hier einf\xFCgen:");
    if (!text) return;
    try {
      await replaceState(parseBackup(text));
      toast("Wiederhergestellt.");
    } catch (e) {
      toast("Kein g\xFCltiger Sicherungstext.", true);
    }
  });
  document.getElementById("wipe").addEventListener("click", async () => {
    if (!confirmBox("Wirklich alle Trainingsdaten l\xF6schen? Das l\xE4sst sich nicht r\xFCckg\xE4ngig machen.")) return;
    await replaceState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
    toast("Alles gel\xF6scht.");
  });
}

// src/js/app.js
var VIEWS = { plan: plan_exports, log: log_exports, settings: settings_exports };
var LABEL = { plan: "Training", log: "Verlauf", settings: "Mehr" };
var view = "plan";
var mount = document.getElementById("app");
function head() {
  return '<div class="tp-head"><h1>PTapp</h1><div class="tp-date">' + today.toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" }) + '</div></div><div class="tp-nav">' + Object.keys(VIEWS).map(
    (v) => '<button data-view="' + v + '" class="' + (v === view ? "sel" : "") + '">' + LABEL[v] + "</button>"
  ).join("") + "</div>";
}
function render4() {
  const scroll = window.scrollY;
  VIEWS[view].render(head, mount);
  document.querySelectorAll("[data-view]").forEach((b) => {
    b.addEventListener("click", () => setView(b.dataset.view));
  });
  window.scrollTo(0, scroll);
}
async function setView(v) {
  if (v === view) return;
  view = v;
  if (v === "log") resetSelection();
  if (v === "settings") await refresh();
  render4();
}
document.addEventListener("rerender", render4);
onChange(render4);
async function wireNative() {
  if (!Capacitor.isNativePlatform()) return;
  await App.addListener("backButton", () => {
    if (view !== "plan") setView("plan");
    else App.exitApp();
  });
  await App.addListener("appStateChange", ({ isActive }) => {
    if (isActive && refreshDay()) render4();
  });
  try {
    await StatusBar.setBackgroundColor({ color: "#16140F" });
    await StatusBar.setStyle({ style: Style.Dark });
  } catch (e) {
  }
}
function wireServiceWorker() {
  if (Capacitor.isNativePlatform()) return;
  if (!("serviceWorker" in navigator) || !location.protocol.startsWith("http")) return;
  navigator.serviceWorker.register("sw.js").catch(() => {
  });
}
setInterval(() => {
  if (refreshDay()) render4();
}, 6e4);
(async function start() {
  try {
    await init();
  } catch (e) {
    toast("Gespeicherte Daten konnten nicht geladen werden.", true);
  }
  await wireNative();
  wireServiceWorker();
  render4();
})();
