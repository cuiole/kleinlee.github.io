const isApple = /(iPhone|iPod|iPad|Macintosh|Mac OS X)/i.test(navigator.userAgent);

// confirm："IOS系统版本需要高于17.4"
if (isApple) {
    const iosVersionMatch = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (iosVersionMatch) {
        const majorVersion = parseInt(iosVersionMatch[1]);
        const minorVersion = parseInt(iosVersionMatch[2]);
        const patchVersion = iosVersionMatch[3] ? parseInt(iosVersionMatch[3]) : 0;
        
        // 检查是否低于17.4版本
        if (majorVersion < 17 || (majorVersion === 17 && minorVersion < 4)) {
            const shouldUpdate = confirm("IOS系统版本需要高于17.4");
            // 可以根据用户选择执行后续操作
            if (shouldUpdate) {
                history.back();
            }
        }
    }
}

// 初始化视频播放器
characterVideo = document.createElement('video');
characterVideo.setAttribute('playsinline', '');
characterVideo.crossOrigin = "";
characterVideo.style.display = 'none';
document.body.appendChild(characterVideo);

// 获取视频和画布元素
const canvas_video = document.getElementById('canvas_video');
const ctx_video = canvas_video.getContext('2d', { willReadFrequently: true });

const resizedCanvas = document.createElement('canvas');
const resizedCtx = resizedCanvas.getContext('2d', { willReadFrequently: true });
resizedCanvas.width = 180;
resizedCanvas.height = 180;

let imageDataPtr = null;

var Module;
var createQtAppInstance = ( () => {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined')
        _scriptDir = _scriptDir || __filename;
    return (function(createQtAppInstance) {
        createQtAppInstance = createQtAppInstance || {};

        Module = typeof createQtAppInstance != "undefined" ? createQtAppInstance : {};
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise(function(resolve, reject) {
            readyPromiseResolve = resolve;
            readyPromiseReject = reject
        }
        );
        var moduleOverrides = Object.assign({}, Module);
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => {
            throw toThrow
        }
        ;
        var ENVIRONMENT_IS_WEB = typeof window == "object";
        var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
        var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
        var scriptDirectory = "";
        function locateFile(path) {
            if (Module["locateFile"]) {
                return Module["locateFile"](path, scriptDirectory)
            }
            return scriptDirectory + path
        }
        var read_, readAsync, readBinary, setWindowTitle;
        function logExceptionOnExit(e) {
            if (e instanceof ExitStatus)
                return;
            let toLog = e;
            err("exiting due to exception: " + toLog)
        }
        if (ENVIRONMENT_IS_NODE) {
            var fs = require("fs");
            var nodePath = require("path");
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = nodePath.dirname(scriptDirectory) + "/"
            } else {
                scriptDirectory = __dirname + "/"
            }
            read_ = (filename, binary) => {
                filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
                return fs.readFileSync(filename, binary ? undefined : "utf8")
            }
            ;
            readBinary = filename => {
                var ret = read_(filename, true);
                if (!ret.buffer) {
                    ret = new Uint8Array(ret)
                }
                return ret
            }
            ;
            readAsync = (filename, onload, onerror) => {
                filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
                fs.readFile(filename, function(err, data) {
                    if (err)
                        onerror(err);
                    else
                        onload(data.buffer)
                })
            }
            ;
            if (process["argv"].length > 1) {
                thisProgram = process["argv"][1].replace(/\\/g, "/")
            }
            arguments_ = process["argv"].slice(2);
            process["on"]("uncaughtException", function(ex) {
                if (!(ex instanceof ExitStatus)) {
                    throw ex
                }
            });
            process["on"]("unhandledRejection", function(reason) {
                throw reason
            });
            quit_ = (status, toThrow) => {
                if (keepRuntimeAlive()) {
                    process["exitCode"] = status;
                    throw toThrow
                }
                logExceptionOnExit(toThrow);
                process["exit"](status)
            }
            ;
            Module["inspect"] = function() {
                return "[Emscripten Module object]"
            }
        } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href
            } else if (typeof document != "undefined" && document.currentScript) {
                scriptDirectory = document.currentScript.src
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1)
            } else {
                scriptDirectory = ""
            }
            {
                read_ = url => {
                    var xhr = new XMLHttpRequest;
                    xhr.open("GET", url, false);
                    xhr.send(null);
                    return xhr.responseText
                }
                ;
                if (ENVIRONMENT_IS_WORKER) {
                    readBinary = url => {
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", url, false);
                        xhr.responseType = "arraybuffer";
                        xhr.send(null);
                        return new Uint8Array(xhr.response)
                    }
                }
                readAsync = (url, onload, onerror) => {
                    var xhr = new XMLHttpRequest;
                    xhr.open("GET", url, true);
                    xhr.responseType = "arraybuffer";
                    xhr.onload = () => {
                        if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                            onload(xhr.response);
                            return
                        }
                        onerror()
                    }
                    ;
                    xhr.onerror = onerror;
                    xhr.send(null)
                }
            }
            setWindowTitle = title => document.title = title
        } else {}
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        Object.assign(Module, moduleOverrides);
        moduleOverrides = null;
        if (Module["arguments"])
            arguments_ = Module["arguments"];
        if (Module["thisProgram"])
            thisProgram = Module["thisProgram"];
        if (Module["quit"])
            quit_ = Module["quit"];
        var POINTER_SIZE = 4;
        var wasmBinary;
        if (Module["wasmBinary"])
            wasmBinary = Module["wasmBinary"];
        var noExitRuntime = Module["noExitRuntime"] || true;
        if (typeof WebAssembly != "object") {
            abort("no native wasm support detected")
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
        function assert(condition, text) {
            if (!condition) {
                abort(text)
            }
        }
        var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
        // 将 stringToUTF8 挂载到 Module 上
        Module["stringToUTF8"] = function(str, outPtr, maxBytesToWrite) {
            return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
        };
        function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
            var endIdx = idx + maxBytesToRead;
            var endPtr = idx;
            while (heapOrArray[endPtr] && !(endPtr >= endIdx))
                ++endPtr;
            if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
                return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr))
            }
            var str = "";
            while (idx < endPtr) {
                var u0 = heapOrArray[idx++];
                if (!(u0 & 128)) {
                    str += String.fromCharCode(u0);
                    continue
                }
                var u1 = heapOrArray[idx++] & 63;
                if ((u0 & 224) == 192) {
                    str += String.fromCharCode((u0 & 31) << 6 | u1);
                    continue
                }
                var u2 = heapOrArray[idx++] & 63;
                if ((u0 & 240) == 224) {
                    u0 = (u0 & 15) << 12 | u1 << 6 | u2
                } else {
                    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63
                }
                if (u0 < 65536) {
                    str += String.fromCharCode(u0)
                } else {
                    var ch = u0 - 65536;
                    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
                }
            }
            return str
        }
        function UTF8ToString(ptr, maxBytesToRead) {
            return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
        }
        function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
            if (!(maxBytesToWrite > 0))
                return 0;
            var startIdx = outIdx;
            var endIdx = outIdx + maxBytesToWrite - 1;
            for (var i = 0; i < str.length; ++i) {
                var u = str.charCodeAt(i);
                if (u >= 55296 && u <= 57343) {
                    var u1 = str.charCodeAt(++i);
                    u = 65536 + ((u & 1023) << 10) | u1 & 1023
                }
                if (u <= 127) {
                    if (outIdx >= endIdx)
                        break;
                    heap[outIdx++] = u
                } else if (u <= 2047) {
                    if (outIdx + 1 >= endIdx)
                        break;
                    heap[outIdx++] = 192 | u >> 6;
                    heap[outIdx++] = 128 | u & 63
                } else if (u <= 65535) {
                    if (outIdx + 2 >= endIdx)
                        break;
                    heap[outIdx++] = 224 | u >> 12;
                    heap[outIdx++] = 128 | u >> 6 & 63;
                    heap[outIdx++] = 128 | u & 63
                } else {
                    if (outIdx + 3 >= endIdx)
                        break;
                    heap[outIdx++] = 240 | u >> 18;
                    heap[outIdx++] = 128 | u >> 12 & 63;
                    heap[outIdx++] = 128 | u >> 6 & 63;
                    heap[outIdx++] = 128 | u & 63
                }
            }
            heap[outIdx] = 0;
            return outIdx - startIdx
        }
        function stringToUTF8(str, outPtr, maxBytesToWrite) {
            return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
        }
        function lengthBytesUTF8(str) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
                var c = str.charCodeAt(i);
                if (c <= 127) {
                    len++
                } else if (c <= 2047) {
                    len += 2
                } else if (c >= 55296 && c <= 57343) {
                    len += 4;
                    ++i
                } else {
                    len += 3
                }
            }
            return len
        }
        var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64;
        function updateGlobalBufferAndViews(buf) {
            buffer = buf;
            Module["HEAP8"] = HEAP8 = new Int8Array(buf);
            Module["HEAP16"] = HEAP16 = new Int16Array(buf);
            Module["HEAP32"] = HEAP32 = new Int32Array(buf);
            Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
            Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
            Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
            Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
            Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
            Module["HEAP64"] = HEAP64 = new BigInt64Array(buf);
            Module["HEAPU64"] = HEAPU64 = new BigUint64Array(buf)
        }
        var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 52428800;
        var wasmTable;
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATEXIT__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        function keepRuntimeAlive() {
            return noExitRuntime
        }
        function preRun() {
            if (Module["preRun"]) {
                if (typeof Module["preRun"] == "function")
                    Module["preRun"] = [Module["preRun"]];
                while (Module["preRun"].length) {
                    addOnPreRun(Module["preRun"].shift())
                }
            }
            callRuntimeCallbacks(__ATPRERUN__)
        }
        function initRuntime() {
            runtimeInitialized = true;
            if (!Module["noFSInit"] && !FS.init.initialized)
                FS.init();
            FS.ignorePermissions = false;
            TTY.init();
            callRuntimeCallbacks(__ATINIT__)
        }
        function preMain() {
            callRuntimeCallbacks(__ATMAIN__)
        }
        function postRun() {
            if (Module["postRun"]) {
                if (typeof Module["postRun"] == "function")
                    Module["postRun"] = [Module["postRun"]];
                while (Module["postRun"].length) {
                    addOnPostRun(Module["postRun"].shift())
                }
            }
            callRuntimeCallbacks(__ATPOSTRUN__)
        }
        function addOnPreRun(cb) {
            __ATPRERUN__.unshift(cb)
        }
        function addOnInit(cb) {
            __ATINIT__.unshift(cb)
        }
        function addOnPostRun(cb) {
            __ATPOSTRUN__.unshift(cb)
        }
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function getUniqueRunDependency(id) {
            return id
        }
        function addRunDependency(id) {
            runDependencies++;
            if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies)
            }
        }
        function removeRunDependency(id) {
            runDependencies--;
            if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies)
            }
            if (runDependencies == 0) {
                if (runDependencyWatcher !== null) {
                    clearInterval(runDependencyWatcher);
                    runDependencyWatcher = null
                }
                if (dependenciesFulfilled) {
                    var callback = dependenciesFulfilled;
                    dependenciesFulfilled = null;
                    callback()
                }
            }
        }
        function abort(what) {
            if (Module["onAbort"]) {
                Module["onAbort"](what)
            }
            what = "Aborted(" + what + ")";
            err(what);
            ABORT = true;
            EXITSTATUS = 1;
            what += ". Build with -sASSERTIONS for more info.";
            var e = new WebAssembly.RuntimeError(what);
            readyPromiseReject(e);
            throw e
        }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) {
            return filename.startsWith(dataURIPrefix)
        }
        function isFileURI(filename) {
            return filename.startsWith("file://")
        }
        var wasmBinaryFile;
        wasmBinaryFile = "DHLiveMini.wasm";
        if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile)
        }
        function getBinary(file) {
            try {
                if (file == wasmBinaryFile && wasmBinary) {
                    return new Uint8Array(wasmBinary)
                }
                if (readBinary) {
                    return readBinary(file)
                }
                throw "both async and sync fetching of the wasm failed"
            } catch (err) {
                abort(err)
            }
        }
        function getBinaryPromise() {
            if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
                if (typeof fetch == "function" && !isFileURI(wasmBinaryFile)) {
                    return fetch(wasmBinaryFile, {
                        credentials: "same-origin"
                    }).then(function(response) {
                        if (!response["ok"]) {
                            throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
                        }
                        return response["arrayBuffer"]()
                    }).catch(function() {
                        return getBinary(wasmBinaryFile)
                    })
                } else {
                    if (readAsync) {
                        return new Promise(function(resolve, reject) {
                            readAsync(wasmBinaryFile, function(response) {
                                resolve(new Uint8Array(response))
                            }, reject)
                        }
                        )
                    }
                }
            }
            return Promise.resolve().then(function() {
                return getBinary(wasmBinaryFile)
            })
        }
        function createWasm() {
            var info = {
                "env": asmLibraryArg,
                "wasi_snapshot_preview1": asmLibraryArg
            };
            function receiveInstance(instance, module) {
                var exports = instance.exports;
                Module["asm"] = exports;
                wasmMemory = Module["asm"]["memory"];
                updateGlobalBufferAndViews(wasmMemory.buffer);
                wasmTable = Module["asm"]["__indirect_function_table"];
                addOnInit(Module["asm"]["__wasm_call_ctors"]);
                removeRunDependency("wasm-instantiate")
            }
            addRunDependency("wasm-instantiate");
            function receiveInstantiationResult(result) {
                receiveInstance(result["instance"])
            }
            function instantiateArrayBuffer(receiver) {
                return getBinaryPromise().then(function(binary) {
                    return WebAssembly.instantiate(binary, info)
                }).then(function(instance) {
                    return instance
                }).then(receiver, function(reason) {
                    err("failed to asynchronously prepare wasm: " + reason);
                    abort(reason)
                })
            }
            function instantiateAsync() {
                if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
                    return fetch(wasmBinaryFile, {
                        credentials: "same-origin"
                    }).then(function(response) {
                        var result = WebAssembly.instantiateStreaming(response, info);
                        return result.then(receiveInstantiationResult, function(reason) {
                            err("wasm streaming compile failed: " + reason);
                            err("falling back to ArrayBuffer instantiation");
                            return instantiateArrayBuffer(receiveInstantiationResult)
                        })
                    })
                } else {
                    return instantiateArrayBuffer(receiveInstantiationResult)
                }
            }
            if (Module["instantiateWasm"]) {
                try {
                    var exports = Module["instantiateWasm"](info, receiveInstance);
                    return exports
                } catch (e) {
                    err("Module.instantiateWasm callback failed with error: " + e);
                    readyPromiseReject(e)
                }
            }
            instantiateAsync().catch(readyPromiseReject);
            return {}
        }
        var tempDouble;
        var tempI64;
        var ASM_CONSTS = {
            2764644: () => {
                function getAccurateFrameIndex(tempCtx, canvasWidth) {
                    const x = canvasWidth - 2;
                    const y = 0;
                    const width = 2;
                    const height = 2;
                    const imageData = tempCtx.getImageData(x, y, width, height);
                    const data = imageData.data;
                    if (isApple) {
                        let rSum = 0;
                        let gSum = 0;
                        let bSum = 0;
                        for (let i = 0; i < data.length; i += 4) {
                            rSum += data[i];
                            gSum += data[i + 1];
                            bSum += data[i + 2]
                        }
                        const rAvg = Math.round(rSum / (data.length / 4));
                        const gAvg = Math.round(gSum / (data.length / 4));
                        const bAvg = Math.round(bSum / (data.length / 4));
                        // console.log("FFFFFFFFFF", rAvg, gAvg, bAvg, characterVideo.currentTime);
                        return Math.round((rAvg + gAvg + bAvg) / 3 / 40)
                    }
                    let alphaSum = 0;
                    for (let i = 3; i < data.length; i += 4) {
                        alphaSum += data[i]
                    }
                    return Math.round(alphaSum / (data.length / 4) / 40)
                }
                function findRealFrame(currentFrame, currentFrame0) {
                    for (let offset = -3; offset <= 3; offset++) {
                        const candidate = currentFrame + offset;
                        if (candidate >= 0 && candidate % 7 === currentFrame0) {
                            return candidate
                        }
                    }
                    console.warn("returning approximate frame");
                    return currentFrame
                }
                let realFrame = -1;
                if (characterVideo.readyState >= 2) {
                    const currentFrame = Math.floor(characterVideo.currentTime * 25);
                    if (canvas_video.width !== characterVideo.videoWidth || canvas_video.height !== characterVideo.videoHeight) {
                        canvas_video.width = characterVideo.videoWidth;
                        canvas_video.height = characterVideo.videoHeight
                    }
                    ctx_video.globalCompositeOperation = "copy";
                    ctx_video.clearRect(0, 0, canvas_video.width, canvas_video.height);
                    ctx_video.drawImage(characterVideo, 0, 0, canvas_video.width, canvas_video.height);
                    const currentFrame0 = getAccurateFrameIndex(ctx_video, canvas_video.width);
                    realFrame = findRealFrame(currentFrame, currentFrame0)
                }
                return realFrame
            }
            ,
            2766392: ($0, $1, $2, $3) => {
                let rect_x = $0;
                let rect_y = $1;
                let rect_w = $2;
                let rect_h = $3;
                rect_w = rect_w - rect_x;
                rect_h = rect_h - rect_y;
                resizedCtx.clearRect(0, 0, 180, 180);
                resizedCtx.drawImage(canvas_video, rect_x, rect_y, rect_w, rect_h, 0, 0, 180, 180);
                if (!imageDataPtr) {
                    const imageDataSize = 180 * 180 * 4;
                    imageDataPtr = Module._malloc(imageDataSize)
                }
                const imageData = resizedCtx.getImageData(0, 0, 180, 180);
                Module.HEAPU8.set(imageData.data, imageDataPtr);
                Module._inputImage(imageDataPtr, 180, 180)
            }
            ,
            2766896: ($0, $1, $2, $3) => {
                let rect_x = $0;
                let rect_y = $1;
                let rect_w = $2;
                let rect_h = $3;
                rect_w = rect_w - rect_x;
                rect_h = rect_h - rect_y;
                ctx_video.clearRect(rect_x, rect_y, rect_w, rect_h);
                const pixelPtr = Module._getPixelData();
                const pixelData = new Uint8Array(Module.HEAPU8.buffer,pixelPtr,180 * 180 * 4);
                const width = 180;
                const height = 180;
                const imageData = new ImageData(new Uint8ClampedArray(pixelData),width,height);
                resizedCtx.putImageData(imageData, 0, 0);
                ctx_video.globalCompositeOperation = "source-over";
                ctx_video.drawImage(resizedCanvas, 0, 0, width, height, rect_x, rect_y, rect_w, rect_h);
            }
        };
        function ExitStatus(status) {
            this.name = "ExitStatus";
            this.message = "Program terminated with exit(" + status + ")";
            this.status = status
        }
        function callRuntimeCallbacks(callbacks) {
            while (callbacks.length > 0) {
                callbacks.shift()(Module)
            }
        }
        function ___assert_fail(condition, filename, line, func) {
            abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"])
        }
        function ExceptionInfo(excPtr) {
            this.excPtr = excPtr;
            this.ptr = excPtr - 24;
            this.set_type = function(type) {
                HEAPU32[this.ptr + 4 >> 2] = type
            }
            ;
            this.get_type = function() {
                return HEAPU32[this.ptr + 4 >> 2]
            }
            ;
            this.set_destructor = function(destructor) {
                HEAPU32[this.ptr + 8 >> 2] = destructor
            }
            ;
            this.get_destructor = function() {
                return HEAPU32[this.ptr + 8 >> 2]
            }
            ;
            this.set_refcount = function(refcount) {
                HEAP32[this.ptr >> 2] = refcount
            }
            ;
            this.set_caught = function(caught) {
                caught = caught ? 1 : 0;
                HEAP8[this.ptr + 12 >> 0] = caught
            }
            ;
            this.get_caught = function() {
                return HEAP8[this.ptr + 12 >> 0] != 0
            }
            ;
            this.set_rethrown = function(rethrown) {
                rethrown = rethrown ? 1 : 0;
                HEAP8[this.ptr + 13 >> 0] = rethrown
            }
            ;
            this.get_rethrown = function() {
                return HEAP8[this.ptr + 13 >> 0] != 0
            }
            ;
            this.init = function(type, destructor) {
                this.set_adjusted_ptr(0);
                this.set_type(type);
                this.set_destructor(destructor);
                this.set_refcount(0);
                this.set_caught(false);
                this.set_rethrown(false)
            }
            ;
            this.add_ref = function() {
                var value = HEAP32[this.ptr >> 2];
                HEAP32[this.ptr >> 2] = value + 1
            }
            ;
            this.release_ref = function() {
                var prev = HEAP32[this.ptr >> 2];
                HEAP32[this.ptr >> 2] = prev - 1;
                return prev === 1
            }
            ;
            this.set_adjusted_ptr = function(adjustedPtr) {
                HEAPU32[this.ptr + 16 >> 2] = adjustedPtr
            }
            ;
            this.get_adjusted_ptr = function() {
                return HEAPU32[this.ptr + 16 >> 2]
            }
            ;
            this.get_exception_ptr = function() {
                var isPointer = ___cxa_is_pointer_type(this.get_type());
                if (isPointer) {
                    return HEAPU32[this.excPtr >> 2]
                }
                var adjusted = this.get_adjusted_ptr();
                if (adjusted !== 0)
                    return adjusted;
                return this.excPtr
            }
        }
        var exceptionLast = 0;
        var uncaughtExceptionCount = 0;
        function ___cxa_throw(ptr, type, destructor) {
            var info = new ExceptionInfo(ptr);
            info.init(type, destructor);
            exceptionLast = ptr;
            uncaughtExceptionCount++;
            throw ptr
        }
        function embindRepr(v) {
            if (v === null) {
                return "null"
            }
            var t = typeof v;
            if (t === "object" || t === "array" || t === "function") {
                return v.toString()
            } else {
                return "" + v
            }
        }
        function embind_init_charCodes() {
            var codes = new Array(256);
            for (var i = 0; i < 256; ++i) {
                codes[i] = String.fromCharCode(i)
            }
            embind_charCodes = codes
        }
        var embind_charCodes = undefined;
        function readLatin1String(ptr) {
            var ret = "";
            var c = ptr;
            while (HEAPU8[c]) {
                ret += embind_charCodes[HEAPU8[c++]]
            }
            return ret
        }
        var awaitingDependencies = {};
        var registeredTypes = {};
        var typeDependencies = {};
        var char_0 = 48;
        var char_9 = 57;
        function makeLegalFunctionName(name) {
            if (undefined === name) {
                return "_unknown"
            }
            name = name.replace(/[^a-zA-Z0-9_]/g, "$");
            var f = name.charCodeAt(0);
            if (f >= char_0 && f <= char_9) {
                return "_" + name
            }
            return name
        }
        function createNamedFunction(name, body) {
            name = makeLegalFunctionName(name);
            return new Function("body","return function " + name + "() {\n" + '    "use strict";' + "    return body.apply(this, arguments);\n" + "};\n")(body)
        }
        function extendError(baseErrorType, errorName) {
            var errorClass = createNamedFunction(errorName, function(message) {
                this.name = errorName;
                this.message = message;
                var stack = new Error(message).stack;
                if (stack !== undefined) {
                    this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "")
                }
            });
            errorClass.prototype = Object.create(baseErrorType.prototype);
            errorClass.prototype.constructor = errorClass;
            errorClass.prototype.toString = function() {
                if (this.message === undefined) {
                    return this.name
                } else {
                    return this.name + ": " + this.message
                }
            }
            ;
            return errorClass
        }
        var BindingError = undefined;
        function throwBindingError(message) {
            throw new BindingError(message)
        }
        var InternalError = undefined;
        function throwInternalError(message) {
            throw new InternalError(message)
        }
        function registerType(rawType, registeredInstance, options={}) {
            if (!("argPackAdvance"in registeredInstance)) {
                throw new TypeError("registerType registeredInstance requires argPackAdvance")
            }
            var name = registeredInstance.name;
            if (!rawType) {
                throwBindingError('type "' + name + '" must have a positive integer typeid pointer')
            }
            if (registeredTypes.hasOwnProperty(rawType)) {
                if (options.ignoreDuplicateRegistrations) {
                    return
                } else {
                    throwBindingError("Cannot register type '" + name + "' twice")
                }
            }
            registeredTypes[rawType] = registeredInstance;
            delete typeDependencies[rawType];
            if (awaitingDependencies.hasOwnProperty(rawType)) {
                var callbacks = awaitingDependencies[rawType];
                delete awaitingDependencies[rawType];
                callbacks.forEach(cb => cb())
            }
        }
        function integerReadValueFromPointer(name, shift, signed) {
            switch (shift) {
            case 0:
                return signed ? function readS8FromPointer(pointer) {
                    return HEAP8[pointer]
                }
                : function readU8FromPointer(pointer) {
                    return HEAPU8[pointer]
                }
                ;
            case 1:
                return signed ? function readS16FromPointer(pointer) {
                    return HEAP16[pointer >> 1]
                }
                : function readU16FromPointer(pointer) {
                    return HEAPU16[pointer >> 1]
                }
                ;
            case 2:
                return signed ? function readS32FromPointer(pointer) {
                    return HEAP32[pointer >> 2]
                }
                : function readU32FromPointer(pointer) {
                    return HEAPU32[pointer >> 2]
                }
                ;
            case 3:
                return signed ? function readS64FromPointer(pointer) {
                    return HEAP64[pointer >> 3]
                }
                : function readU64FromPointer(pointer) {
                    return HEAPU64[pointer >> 3]
                }
                ;
            default:
                throw new TypeError("Unknown integer type: " + name)
            }
        }
        function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {
            name = readLatin1String(name);
            var shift = getShiftFromSize(size);
            var isUnsignedType = name.indexOf("u") != -1;
            if (isUnsignedType) {
                maxRange = (1n << 64n) - 1n
            }
            registerType(primitiveType, {
                name: name,
                "fromWireType": function(value) {
                    return value
                },
                "toWireType": function(destructors, value) {
                    if (typeof value != "bigint" && typeof value != "number") {
                        throw new TypeError('Cannot convert "' + embindRepr(value) + '" to ' + this.name)
                    }
                    if (value < minRange || value > maxRange) {
                        throw new TypeError('Passing a number "' + embindRepr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!")
                    }
                    return value
                },
                "argPackAdvance": 8,
                "readValueFromPointer": integerReadValueFromPointer(name, shift, !isUnsignedType),
                destructorFunction: null
            })
        }
        function getShiftFromSize(size) {
            switch (size) {
            case 1:
                return 0;
            case 2:
                return 1;
            case 4:
                return 2;
            case 8:
                return 3;
            default:
                throw new TypeError("Unknown type size: " + size)
            }
        }
        function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                "fromWireType": function(wt) {
                    return !!wt
                },
                "toWireType": function(destructors, o) {
                    return o ? trueValue : falseValue
                },
                "argPackAdvance": 8,
                "readValueFromPointer": function(pointer) {
                    var heap;
                    if (size === 1) {
                        heap = HEAP8
                    } else if (size === 2) {
                        heap = HEAP16
                    } else if (size === 4) {
                        heap = HEAP32
                    } else {
                        throw new TypeError("Unknown boolean type size: " + name)
                    }
                    return this["fromWireType"](heap[pointer >> shift])
                },
                destructorFunction: null
            })
        }
        var emval_free_list = [];
        var emval_handle_array = [{}, {
            value: undefined
        }, {
            value: null
        }, {
            value: true
        }, {
            value: false
        }];
        function __emval_decref(handle) {
            if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
                emval_handle_array[handle] = undefined;
                emval_free_list.push(handle)
            }
        }
        function count_emval_handles() {
            var count = 0;
            for (var i = 5; i < emval_handle_array.length; ++i) {
                if (emval_handle_array[i] !== undefined) {
                    ++count
                }
            }
            return count
        }
        function get_first_emval() {
            for (var i = 5; i < emval_handle_array.length; ++i) {
                if (emval_handle_array[i] !== undefined) {
                    return emval_handle_array[i]
                }
            }
            return null
        }
        function init_emval() {
            Module["count_emval_handles"] = count_emval_handles;
            Module["get_first_emval"] = get_first_emval
        }
        var Emval = {
            toValue: handle => {
                if (!handle) {
                    throwBindingError("Cannot use deleted val. handle = " + handle)
                }
                return emval_handle_array[handle].value
            }
            ,
            toHandle: value => {
                switch (value) {
                case undefined:
                    return 1;
                case null:
                    return 2;
                case true:
                    return 3;
                case false:
                    return 4;
                default:
                    {
                        var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
                        emval_handle_array[handle] = {
                            refcount: 1,
                            value: value
                        };
                        return handle
                    }
                }
            }
        };
        function simpleReadValueFromPointer(pointer) {
            return this["fromWireType"](HEAP32[pointer >> 2])
        }
        function __embind_register_emval(rawType, name) {
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                "fromWireType": function(handle) {
                    var rv = Emval.toValue(handle);
                    __emval_decref(handle);
                    return rv
                },
                "toWireType": function(destructors, value) {
                    return Emval.toHandle(value)
                },
                "argPackAdvance": 8,
                "readValueFromPointer": simpleReadValueFromPointer,
                destructorFunction: null
            })
        }
        function floatReadValueFromPointer(name, shift) {
            switch (shift) {
            case 2:
                return function(pointer) {
                    return this["fromWireType"](HEAPF32[pointer >> 2])
                }
                ;
            case 3:
                return function(pointer) {
                    return this["fromWireType"](HEAPF64[pointer >> 3])
                }
                ;
            default:
                throw new TypeError("Unknown float type: " + name)
            }
        }
        function __embind_register_float(rawType, name, size) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                "fromWireType": function(value) {
                    return value
                },
                "toWireType": function(destructors, value) {
                    return value
                },
                "argPackAdvance": 8,
                "readValueFromPointer": floatReadValueFromPointer(name, shift),
                destructorFunction: null
            })
        }
        function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
            name = readLatin1String(name);
            if (maxRange === -1) {
                maxRange = 4294967295
            }
            var shift = getShiftFromSize(size);
            var fromWireType = value => value;
            if (minRange === 0) {
                var bitshift = 32 - 8 * size;
                fromWireType = value => value << bitshift >>> bitshift
            }
            var isUnsignedType = name.includes("unsigned");
            var checkAssertions = (value, toTypeName) => {}
            ;
            var toWireType;
            if (isUnsignedType) {
                toWireType = function(destructors, value) {
                    checkAssertions(value, this.name);
                    return value >>> 0
                }
            } else {
                toWireType = function(destructors, value) {
                    checkAssertions(value, this.name);
                    return value
                }
            }
            registerType(primitiveType, {
                name: name,
                "fromWireType": fromWireType,
                "toWireType": toWireType,
                "argPackAdvance": 8,
                "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
                destructorFunction: null
            })
        }
        function __embind_register_memory_view(rawType, dataTypeIndex, name) {
            var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array];
            var TA = typeMapping[dataTypeIndex];
            function decodeMemoryView(handle) {
                handle = handle >> 2;
                var heap = HEAPU32;
                var size = heap[handle];
                var data = heap[handle + 1];
                return new TA(buffer,data,size)
            }
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                "fromWireType": decodeMemoryView,
                "argPackAdvance": 8,
                "readValueFromPointer": decodeMemoryView
            }, {
                ignoreDuplicateRegistrations: true
            })
        }
        function __embind_register_std_string(rawType, name) {
            name = readLatin1String(name);
            var stdStringIsUTF8 = name === "std::string";
            registerType(rawType, {
                name: name,
                "fromWireType": function(value) {
                    var length = HEAPU32[value >> 2];
                    var payload = value + 4;
                    var str;
                    if (stdStringIsUTF8) {
                        var decodeStartPtr = payload;
                        for (var i = 0; i <= length; ++i) {
                            var currentBytePtr = payload + i;
                            if (i == length || HEAPU8[currentBytePtr] == 0) {
                                var maxRead = currentBytePtr - decodeStartPtr;
                                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                                if (str === undefined) {
                                    str = stringSegment
                                } else {
                                    str += String.fromCharCode(0);
                                    str += stringSegment
                                }
                                decodeStartPtr = currentBytePtr + 1
                            }
                        }
                    } else {
                        var a = new Array(length);
                        for (var i = 0; i < length; ++i) {
                            a[i] = String.fromCharCode(HEAPU8[payload + i])
                        }
                        str = a.join("")
                    }
                    _free(value);
                    return str
                },
                "toWireType": function(destructors, value) {
                    if (value instanceof ArrayBuffer) {
                        value = new Uint8Array(value)
                    }
                    var length;
                    var valueIsOfTypeString = typeof value == "string";
                    if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
                        throwBindingError("Cannot pass non-string to std::string")
                    }
                    if (stdStringIsUTF8 && valueIsOfTypeString) {
                        length = lengthBytesUTF8(value)
                    } else {
                        length = value.length
                    }
                    var base = _malloc(4 + length + 1);
                    var ptr = base + 4;
                    HEAPU32[base >> 2] = length;
                    if (stdStringIsUTF8 && valueIsOfTypeString) {
                        stringToUTF8(value, ptr, length + 1)
                    } else {
                        if (valueIsOfTypeString) {
                            for (var i = 0; i < length; ++i) {
                                var charCode = value.charCodeAt(i);
                                if (charCode > 255) {
                                    _free(ptr);
                                    throwBindingError("String has UTF-16 code units that do not fit in 8 bits")
                                }
                                HEAPU8[ptr + i] = charCode
                            }
                        } else {
                            for (var i = 0; i < length; ++i) {
                                HEAPU8[ptr + i] = value[i]
                            }
                        }
                    }
                    if (destructors !== null) {
                        destructors.push(_free, base)
                    }
                    return base
                },
                "argPackAdvance": 8,
                "readValueFromPointer": simpleReadValueFromPointer,
                destructorFunction: function(ptr) {
                    _free(ptr)
                }
            })
        }
        var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : undefined;
        function UTF16ToString(ptr, maxBytesToRead) {
            var endPtr = ptr;
            var idx = endPtr >> 1;
            var maxIdx = idx + maxBytesToRead / 2;
            while (!(idx >= maxIdx) && HEAPU16[idx])
                ++idx;
            endPtr = idx << 1;
            if (endPtr - ptr > 32 && UTF16Decoder)
                return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
            var str = "";
            for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
                var codeUnit = HEAP16[ptr + i * 2 >> 1];
                if (codeUnit == 0)
                    break;
                str += String.fromCharCode(codeUnit)
            }
            return str
        }
        function stringToUTF16(str, outPtr, maxBytesToWrite) {
            if (maxBytesToWrite === undefined) {
                maxBytesToWrite = 2147483647
            }
            if (maxBytesToWrite < 2)
                return 0;
            maxBytesToWrite -= 2;
            var startPtr = outPtr;
            var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
            for (var i = 0; i < numCharsToWrite; ++i) {
                var codeUnit = str.charCodeAt(i);
                HEAP16[outPtr >> 1] = codeUnit;
                outPtr += 2
            }
            HEAP16[outPtr >> 1] = 0;
            return outPtr - startPtr
        }
        function lengthBytesUTF16(str) {
            return str.length * 2
        }
        function UTF32ToString(ptr, maxBytesToRead) {
            var i = 0;
            var str = "";
            while (!(i >= maxBytesToRead / 4)) {
                var utf32 = HEAP32[ptr + i * 4 >> 2];
                if (utf32 == 0)
                    break;
                ++i;
                if (utf32 >= 65536) {
                    var ch = utf32 - 65536;
                    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
                } else {
                    str += String.fromCharCode(utf32)
                }
            }
            return str
        }
        function stringToUTF32(str, outPtr, maxBytesToWrite) {
            if (maxBytesToWrite === undefined) {
                maxBytesToWrite = 2147483647
            }
            if (maxBytesToWrite < 4)
                return 0;
            var startPtr = outPtr;
            var endPtr = startPtr + maxBytesToWrite - 4;
            for (var i = 0; i < str.length; ++i) {
                var codeUnit = str.charCodeAt(i);
                if (codeUnit >= 55296 && codeUnit <= 57343) {
                    var trailSurrogate = str.charCodeAt(++i);
                    codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023
                }
                HEAP32[outPtr >> 2] = codeUnit;
                outPtr += 4;
                if (outPtr + 4 > endPtr)
                    break
            }
            HEAP32[outPtr >> 2] = 0;
            return outPtr - startPtr
        }
        function lengthBytesUTF32(str) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
                var codeUnit = str.charCodeAt(i);
                if (codeUnit >= 55296 && codeUnit <= 57343)
                    ++i;
                len += 4
            }
            return len
        }
        function __embind_register_std_wstring(rawType, charSize, name) {
            name = readLatin1String(name);
            var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
            if (charSize === 2) {
                decodeString = UTF16ToString;
                encodeString = stringToUTF16;
                lengthBytesUTF = lengthBytesUTF16;
                getHeap = () => HEAPU16;
                shift = 1
            } else if (charSize === 4) {
                decodeString = UTF32ToString;
                encodeString = stringToUTF32;
                lengthBytesUTF = lengthBytesUTF32;
                getHeap = () => HEAPU32;
                shift = 2
            }
            registerType(rawType, {
                name: name,
                "fromWireType": function(value) {
                    var length = HEAPU32[value >> 2];
                    var HEAP = getHeap();
                    var str;
                    var decodeStartPtr = value + 4;
                    for (var i = 0; i <= length; ++i) {
                        var currentBytePtr = value + 4 + i * charSize;
                        if (i == length || HEAP[currentBytePtr >> shift] == 0) {
                            var maxReadBytes = currentBytePtr - decodeStartPtr;
                            var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                            if (str === undefined) {
                                str = stringSegment
                            } else {
                                str += String.fromCharCode(0);
                                str += stringSegment
                            }
                            decodeStartPtr = currentBytePtr + charSize
                        }
                    }
                    _free(value);
                    return str
                },
                "toWireType": function(destructors, value) {
                    if (!(typeof value == "string")) {
                        throwBindingError("Cannot pass non-string to C++ string type " + name)
                    }
                    var length = lengthBytesUTF(value);
                    var ptr = _malloc(4 + length + charSize);
                    HEAPU32[ptr >> 2] = length >> shift;
                    encodeString(value, ptr + 4, length + charSize);
                    if (destructors !== null) {
                        destructors.push(_free, ptr)
                    }
                    return ptr
                },
                "argPackAdvance": 8,
                "readValueFromPointer": simpleReadValueFromPointer,
                destructorFunction: function(ptr) {
                    _free(ptr)
                }
            })
        }
        function __embind_register_void(rawType, name) {
            name = readLatin1String(name);
            registerType(rawType, {
                isVoid: true,
                name: name,
                "argPackAdvance": 0,
                "fromWireType": function() {
                    return undefined
                },
                "toWireType": function(destructors, o) {
                    return undefined
                }
            })
        }
        var nowIsMonotonic = true;
        function __emscripten_get_now_is_monotonic() {
            return nowIsMonotonic
        }
        function _abort() {
            abort("")
        }
        var readEmAsmArgsArray = [];
        function readEmAsmArgs(sigPtr, buf) {
            readEmAsmArgsArray.length = 0;
            var ch;
            buf >>= 2;
            while (ch = HEAPU8[sigPtr++]) {
                buf += ch != 105 & buf;
                readEmAsmArgsArray.push(ch == 105 ? HEAP32[buf] : (ch == 106 ? HEAP64 : HEAPF64)[buf++ >> 1]);
                ++buf
            }
            return readEmAsmArgsArray
        }
        function runEmAsmFunction(code, sigPtr, argbuf) {
            var args = readEmAsmArgs(sigPtr, argbuf);
            return ASM_CONSTS[code].apply(null, args)
        }
        function _emscripten_asm_const_int(code, sigPtr, argbuf) {
            return runEmAsmFunction(code, sigPtr, argbuf)
        }
        function _emscripten_date_now() {
            return Date.now()
        }
        var JSEvents = {
            inEventHandler: 0,
            removeAllEventListeners: function() {
                for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
                    JSEvents._removeHandler(i)
                }
                JSEvents.eventHandlers = [];
                JSEvents.deferredCalls = []
            },
            registerRemoveEventListeners: function() {
                if (!JSEvents.removeEventListenersRegistered) {
                    __ATEXIT__.push(JSEvents.removeAllEventListeners);
                    JSEvents.removeEventListenersRegistered = true
                }
            },
            deferredCalls: [],
            deferCall: function(targetFunction, precedence, argsList) {
                function arraysHaveEqualContent(arrA, arrB) {
                    if (arrA.length != arrB.length)
                        return false;
                    for (var i in arrA) {
                        if (arrA[i] != arrB[i])
                            return false
                    }
                    return true
                }
                for (var i in JSEvents.deferredCalls) {
                    var call = JSEvents.deferredCalls[i];
                    if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
                        return
                    }
                }
                JSEvents.deferredCalls.push({
                    targetFunction: targetFunction,
                    precedence: precedence,
                    argsList: argsList
                });
                JSEvents.deferredCalls.sort(function(x, y) {
                    return x.precedence < y.precedence
                })
            },
            removeDeferredCalls: function(targetFunction) {
                for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
                    if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
                        JSEvents.deferredCalls.splice(i, 1);
                        --i
                    }
                }
            },
            canPerformEventHandlerRequests: function() {
                return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls
            },
            runDeferredCalls: function() {
                if (!JSEvents.canPerformEventHandlerRequests()) {
                    return
                }
                for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
                    var call = JSEvents.deferredCalls[i];
                    JSEvents.deferredCalls.splice(i, 1);
                    --i;
                    call.targetFunction.apply(null, call.argsList)
                }
            },
            eventHandlers: [],
            removeAllHandlersOnTarget: function(target, eventTypeString) {
                for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
                    if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
                        JSEvents._removeHandler(i--)
                    }
                }
            },
            _removeHandler: function(i) {
                var h = JSEvents.eventHandlers[i];
                h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
                JSEvents.eventHandlers.splice(i, 1)
            },
            registerOrRemoveHandler: function(eventHandler) {
                var jsEventHandler = function jsEventHandler(event) {
                    ++JSEvents.inEventHandler;
                    JSEvents.currentEventHandler = eventHandler;
                    JSEvents.runDeferredCalls();
                    eventHandler.handlerFunc(event);
                    JSEvents.runDeferredCalls();
                    --JSEvents.inEventHandler
                };
                if (eventHandler.callbackfunc) {
                    eventHandler.eventListenerFunc = jsEventHandler;
                    eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
                    JSEvents.eventHandlers.push(eventHandler);
                    JSEvents.registerRemoveEventListeners()
                } else {
                    for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
                        if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
                            JSEvents._removeHandler(i--)
                        }
                    }
                }
            },
            getNodeNameForTarget: function(target) {
                if (!target)
                    return "";
                if (target == window)
                    return "#window";
                if (target == screen)
                    return "#screen";
                return target && target.nodeName ? target.nodeName : ""
            },
            fullscreenEnabled: function() {
                return document.fullscreenEnabled || document.webkitFullscreenEnabled
            }
        };
        function maybeCStringToJsString(cString) {
            return cString > 2 ? UTF8ToString(cString) : cString
        }
        var specialHTMLTargets = [0, typeof document != "undefined" ? document : 0, typeof window != "undefined" ? window : 0];
        function findEventTarget(target) {
            target = maybeCStringToJsString(target);
            var domElement = specialHTMLTargets[target] || (typeof document != "undefined" ? document.querySelector(target) : undefined);
            return domElement
        }
        function findCanvasEventTarget(target) {
            return findEventTarget(target)
        }
        function _emscripten_get_canvas_element_size(target, width, height) {
            var canvas = findCanvasEventTarget(target);
            if (!canvas)
                return -4;
            HEAP32[width >> 2] = canvas.width;
            HEAP32[height >> 2] = canvas.height
        }
        var _emscripten_get_now;
        if (ENVIRONMENT_IS_NODE) {
            _emscripten_get_now = () => {
                var t = process["hrtime"]();
                return t[0] * 1e3 + t[1] / 1e6
            }
        } else
            _emscripten_get_now = () => performance.now();
        function _emscripten_memcpy_big(dest, src, num) {
            HEAPU8.copyWithin(dest, src, src + num)
        }
        function getHeapMax() {
            return 2147483648
        }
        function emscripten_realloc_buffer(size) {
            try {
                wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
                updateGlobalBufferAndViews(wasmMemory.buffer);
                return 1
            } catch (e) {}
        }
        function _emscripten_resize_heap(requestedSize) {
            var oldSize = HEAPU8.length;
            requestedSize = requestedSize >>> 0;
            var maxHeapSize = getHeapMax();
            if (requestedSize > maxHeapSize) {
                return false
            }
            let alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
            for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
                var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
                overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
                var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
                var replacement = emscripten_realloc_buffer(newSize);
                if (replacement) {
                    return true
                }
            }
            return false
        }
        function handleException(e) {
            if (e instanceof ExitStatus || e == "unwind") {
                return EXITSTATUS
            }
            quit_(1, e)
        }
        function callUserCallback(func) {
            if (ABORT) {
                return
            }
            try {
                func()
            } catch (e) {
                handleException(e)
            }
        }
        function safeSetTimeout(func, timeout) {
            return setTimeout(function() {
                callUserCallback(func)
            }, timeout)
        }
        function warnOnce(text) {
            if (!warnOnce.shown)
                warnOnce.shown = {};
            if (!warnOnce.shown[text]) {
                warnOnce.shown[text] = 1;
                if (ENVIRONMENT_IS_NODE)
                    text = "warning: " + text;
                err(text)
            }
        }
        var Browser = {
            mainLoop: {
                running: false,
                scheduler: null,
                method: "",
                currentlyRunningMainloop: 0,
                func: null,
                arg: 0,
                timingMode: 0,
                timingValue: 0,
                currentFrameNumber: 0,
                queue: [],
                pause: function() {
                    Browser.mainLoop.scheduler = null;
                    Browser.mainLoop.currentlyRunningMainloop++
                },
                resume: function() {
                    Browser.mainLoop.currentlyRunningMainloop++;
                    var timingMode = Browser.mainLoop.timingMode;
                    var timingValue = Browser.mainLoop.timingValue;
                    var func = Browser.mainLoop.func;
                    Browser.mainLoop.func = null;
                    setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
                    _emscripten_set_main_loop_timing(timingMode, timingValue);
                    Browser.mainLoop.scheduler()
                },
                updateStatus: function() {
                    if (Module["setStatus"]) {
                        var message = Module["statusMessage"] || "Please wait...";
                        var remaining = Browser.mainLoop.remainingBlockers;
                        var expected = Browser.mainLoop.expectedBlockers;
                        if (remaining) {
                            if (remaining < expected) {
                                Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")")
                            } else {
                                Module["setStatus"](message)
                            }
                        } else {
                            Module["setStatus"]("")
                        }
                    }
                },
                runIter: function(func) {
                    if (ABORT)
                        return;
                    if (Module["preMainLoop"]) {
                        var preRet = Module["preMainLoop"]();
                        if (preRet === false) {
                            return
                        }
                    }
                    callUserCallback(func);
                    if (Module["postMainLoop"])
                        Module["postMainLoop"]()
                }
            },
            isFullscreen: false,
            pointerLock: false,
            moduleContextCreatedCallbacks: [],
            workers: [],
            init: function() {
                if (!Module["preloadPlugins"])
                    Module["preloadPlugins"] = [];
                if (Browser.initted)
                    return;
                Browser.initted = true;
                try {
                    new Blob;
                    Browser.hasBlobConstructor = true
                } catch (e) {
                    Browser.hasBlobConstructor = false;
                    err("warning: no blob constructor, cannot create blobs with mimetypes")
                }
                Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? err("warning: no BlobBuilder") : null;
                Browser.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;
                if (!Module.noImageDecoding && typeof Browser.URLObject == "undefined") {
                    err("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
                    Module.noImageDecoding = true
                }
                var imagePlugin = {};
                imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
                    return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name)
                }
                ;
                imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
                    var b = null;
                    if (Browser.hasBlobConstructor) {
                        try {
                            b = new Blob([byteArray],{
                                type: Browser.getMimetype(name)
                            });
                            if (b.size !== byteArray.length) {
                                b = new Blob([new Uint8Array(byteArray).buffer],{
                                    type: Browser.getMimetype(name)
                                })
                            }
                        } catch (e) {
                            warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder")
                        }
                    }
                    if (!b) {
                        var bb = new Browser.BlobBuilder;
                        bb.append(new Uint8Array(byteArray).buffer);
                        b = bb.getBlob()
                    }
                    var url = Browser.URLObject.createObjectURL(b);
                    var img = new Image;
                    img.onload = () => {
                        assert(img.complete, "Image " + name + " could not be decoded");
                        var canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                        preloadedImages[name] = canvas;
                        Browser.URLObject.revokeObjectURL(url);
                        if (onload)
                            onload(byteArray)
                    }
                    ;
                    img.onerror = event => {
                        out("Image " + url + " could not be decoded");
                        if (onerror)
                            onerror()
                    }
                    ;
                    img.src = url
                }
                ;
                Module["preloadPlugins"].push(imagePlugin);
                var audioPlugin = {};
                audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
                    return !Module.noAudioDecoding && name.substr(-4)in {
                        ".ogg": 1,
                        ".wav": 1,
                        ".mp3": 1
                    }
                }
                ;
                audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
                    var done = false;
                    function finish(audio) {
                        if (done)
                            return;
                        done = true;
                        preloadedAudios[name] = audio;
                        if (onload)
                            onload(byteArray)
                    }
                    function fail() {
                        if (done)
                            return;
                        done = true;
                        preloadedAudios[name] = new Audio;
                        if (onerror)
                            onerror()
                    }
                    if (Browser.hasBlobConstructor) {
                        try {
                            var b = new Blob([byteArray],{
                                type: Browser.getMimetype(name)
                            })
                        } catch (e) {
                            return fail()
                        }
                        var url = Browser.URLObject.createObjectURL(b);
                        var audio = new Audio;
                        audio.addEventListener("canplaythrough", () => finish(audio), false);
                        audio.onerror = function audio_onerror(event) {
                            if (done)
                                return;
                            err("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");
                            function encode64(data) {
                                var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                                var PAD = "=";
                                var ret = "";
                                var leftchar = 0;
                                var leftbits = 0;
                                for (var i = 0; i < data.length; i++) {
                                    leftchar = leftchar << 8 | data[i];
                                    leftbits += 8;
                                    while (leftbits >= 6) {
                                        var curr = leftchar >> leftbits - 6 & 63;
                                        leftbits -= 6;
                                        ret += BASE[curr]
                                    }
                                }
                                if (leftbits == 2) {
                                    ret += BASE[(leftchar & 3) << 4];
                                    ret += PAD + PAD
                                } else if (leftbits == 4) {
                                    ret += BASE[(leftchar & 15) << 2];
                                    ret += PAD
                                }
                                return ret
                            }
                            audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
                            finish(audio)
                        }
                        ;
                        audio.src = url;
                        safeSetTimeout(function() {
                            finish(audio)
                        }, 1e4)
                    } else {
                        return fail()
                    }
                }
                ;
                Module["preloadPlugins"].push(audioPlugin);
                function pointerLockChange() {
                    Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"]
                }
                var canvas = Module["canvas"];
                if (canvas) {
                    canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || ( () => {}
                    );
                    canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || ( () => {}
                    );
                    canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
                    document.addEventListener("pointerlockchange", pointerLockChange, false);
                    document.addEventListener("mozpointerlockchange", pointerLockChange, false);
                    document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
                    document.addEventListener("mspointerlockchange", pointerLockChange, false);
                    if (Module["elementPointerLock"]) {
                        canvas.addEventListener("click", ev => {
                            if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
                                Module["canvas"].requestPointerLock();
                                ev.preventDefault()
                            }
                        }
                        , false)
                    }
                }
            },
            handledByPreloadPlugin: function(byteArray, fullname, finish, onerror) {
                Browser.init();
                var handled = false;
                Module["preloadPlugins"].forEach(function(plugin) {
                    if (handled)
                        return;
                    if (plugin["canHandle"](fullname)) {
                        plugin["handle"](byteArray, fullname, finish, onerror);
                        handled = true
                    }
                });
                return handled
            },
            createContext: function(canvas, useWebGL, setInModule, webGLContextAttributes) {
                if (useWebGL && Module.ctx && canvas == Module.canvas)
                    return Module.ctx;
                var ctx;
                var contextHandle;
                if (useWebGL) {
                    var contextAttributes = {
                        antialias: false,
                        alpha: false,
                        majorVersion: typeof WebGL2RenderingContext != "undefined" ? 2 : 1
                    };
                    if (webGLContextAttributes) {
                        for (var attribute in webGLContextAttributes) {
                            contextAttributes[attribute] = webGLContextAttributes[attribute]
                        }
                    }
                    if (typeof GL != "undefined") {
                        contextHandle = GL.createContext(canvas, contextAttributes);
                        if (contextHandle) {
                            ctx = GL.getContext(contextHandle).GLctx
                        }
                    }
                } else {
                    ctx = canvas.getContext("2d")
                }
                if (!ctx)
                    return null;
                if (setInModule) {
                    if (!useWebGL)
                        assert(typeof GLctx == "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
                    Module.ctx = ctx;
                    if (useWebGL)
                        GL.makeContextCurrent(contextHandle);
                    Module.useWebGL = useWebGL;
                    Browser.moduleContextCreatedCallbacks.forEach(function(callback) {
                        callback()
                    });
                    Browser.init()
                }
                return ctx
            },
            destroyContext: function(canvas, useWebGL, setInModule) {},
            fullscreenHandlersInstalled: false,
            lockPointer: undefined,
            resizeCanvas: undefined,
            requestFullscreen: function(lockPointer, resizeCanvas) {
                Browser.lockPointer = lockPointer;
                Browser.resizeCanvas = resizeCanvas;
                if (typeof Browser.lockPointer == "undefined")
                    Browser.lockPointer = true;
                if (typeof Browser.resizeCanvas == "undefined")
                    Browser.resizeCanvas = false;
                var canvas = Module["canvas"];
                function fullscreenChange() {
                    Browser.isFullscreen = false;
                    var canvasContainer = canvas.parentNode;
                    if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
                        canvas.exitFullscreen = Browser.exitFullscreen;
                        if (Browser.lockPointer)
                            canvas.requestPointerLock();
                        Browser.isFullscreen = true;
                        if (Browser.resizeCanvas) {
                            Browser.setFullscreenCanvasSize()
                        } else {
                            Browser.updateCanvasDimensions(canvas)
                        }
                    } else {
                        canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
                        canvasContainer.parentNode.removeChild(canvasContainer);
                        if (Browser.resizeCanvas) {
                            Browser.setWindowedCanvasSize()
                        } else {
                            Browser.updateCanvasDimensions(canvas)
                        }
                    }
                    if (Module["onFullScreen"])
                        Module["onFullScreen"](Browser.isFullscreen);
                    if (Module["onFullscreen"])
                        Module["onFullscreen"](Browser.isFullscreen)
                }
                if (!Browser.fullscreenHandlersInstalled) {
                    Browser.fullscreenHandlersInstalled = true;
                    document.addEventListener("fullscreenchange", fullscreenChange, false);
                    document.addEventListener("mozfullscreenchange", fullscreenChange, false);
                    document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
                    document.addEventListener("MSFullscreenChange", fullscreenChange, false)
                }
                var canvasContainer = document.createElement("div");
                canvas.parentNode.insertBefore(canvasContainer, canvas);
                canvasContainer.appendChild(canvas);
                canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
                canvasContainer.requestFullscreen()
            },
            exitFullscreen: function() {
                if (!Browser.isFullscreen) {
                    return false
                }
                var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function() {}
                ;
                CFS.apply(document, []);
                return true
            },
            nextRAF: 0,
            fakeRequestAnimationFrame: function(func) {
                var now = Date.now();
                if (Browser.nextRAF === 0) {
                    Browser.nextRAF = now + 1e3 / 60
                } else {
                    while (now + 2 >= Browser.nextRAF) {
                        Browser.nextRAF += 1e3 / 60
                    }
                }
                var delay = Math.max(Browser.nextRAF - now, 0);
                setTimeout(func, delay)
            },
            requestAnimationFrame: function(func) {
                if (typeof requestAnimationFrame == "function") {
                    requestAnimationFrame(func);
                    return
                }
                var RAF = Browser.fakeRequestAnimationFrame;
                RAF(func)
            },
            safeSetTimeout: function(func, timeout) {
                return safeSetTimeout(func, timeout)
            },
            safeRequestAnimationFrame: function(func) {
                return Browser.requestAnimationFrame(function() {
                    callUserCallback(func)
                })
            },
            getMimetype: function(name) {
                return {
                    "jpg": "image/jpeg",
                    "jpeg": "image/jpeg",
                    "png": "image/png",
                    "bmp": "image/bmp",
                    "ogg": "audio/ogg",
                    "wav": "audio/wav",
                    "mp3": "audio/mpeg"
                }[name.substr(name.lastIndexOf(".") + 1)]
            },
            getUserMedia: function(func) {
                if (!window.getUserMedia) {
                    window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"]
                }
                window.getUserMedia(func)
            },
            getMovementX: function(event) {
                return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0
            },
            getMovementY: function(event) {
                return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0
            },
            getMouseWheelDelta: function(event) {
                var delta = 0;
                switch (event.type) {
                case "DOMMouseScroll":
                    delta = event.detail / 3;
                    break;
                case "mousewheel":
                    delta = event.wheelDelta / 120;
                    break;
                case "wheel":
                    delta = event.deltaY;
                    switch (event.deltaMode) {
                    case 0:
                        delta /= 100;
                        break;
                    case 1:
                        delta /= 3;
                        break;
                    case 2:
                        delta *= 80;
                        break;
                    default:
                        throw "unrecognized mouse wheel delta mode: " + event.deltaMode
                    }
                    break;
                default:
                    throw "unrecognized mouse wheel event: " + event.type
                }
                return delta
            },
            mouseX: 0,
            mouseY: 0,
            mouseMovementX: 0,
            mouseMovementY: 0,
            touches: {},
            lastTouches: {},
            calculateMouseEvent: function(event) {
                if (Browser.pointerLock) {
                    if (event.type != "mousemove" && "mozMovementX"in event) {
                        Browser.mouseMovementX = Browser.mouseMovementY = 0
                    } else {
                        Browser.mouseMovementX = Browser.getMovementX(event);
                        Browser.mouseMovementY = Browser.getMovementY(event)
                    }
                    if (typeof SDL != "undefined") {
                        Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
                        Browser.mouseY = SDL.mouseY + Browser.mouseMovementY
                    } else {
                        Browser.mouseX += Browser.mouseMovementX;
                        Browser.mouseY += Browser.mouseMovementY
                    }
                } else {
                    var rect = Module["canvas"].getBoundingClientRect();
                    var cw = Module["canvas"].width;
                    var ch = Module["canvas"].height;
                    var scrollX = typeof window.scrollX != "undefined" ? window.scrollX : window.pageXOffset;
                    var scrollY = typeof window.scrollY != "undefined" ? window.scrollY : window.pageYOffset;
                    if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
                        var touch = event.touch;
                        if (touch === undefined) {
                            return
                        }
                        var adjustedX = touch.pageX - (scrollX + rect.left);
                        var adjustedY = touch.pageY - (scrollY + rect.top);
                        adjustedX = adjustedX * (cw / rect.width);
                        adjustedY = adjustedY * (ch / rect.height);
                        var coords = {
                            x: adjustedX,
                            y: adjustedY
                        };
                        if (event.type === "touchstart") {
                            Browser.lastTouches[touch.identifier] = coords;
                            Browser.touches[touch.identifier] = coords
                        } else if (event.type === "touchend" || event.type === "touchmove") {
                            var last = Browser.touches[touch.identifier];
                            if (!last)
                                last = coords;
                            Browser.lastTouches[touch.identifier] = last;
                            Browser.touches[touch.identifier] = coords
                        }
                        return
                    }
                    var x = event.pageX - (scrollX + rect.left);
                    var y = event.pageY - (scrollY + rect.top);
                    x = x * (cw / rect.width);
                    y = y * (ch / rect.height);
                    Browser.mouseMovementX = x - Browser.mouseX;
                    Browser.mouseMovementY = y - Browser.mouseY;
                    Browser.mouseX = x;
                    Browser.mouseY = y
                }
            },
            resizeListeners: [],
            updateResizeListeners: function() {
                var canvas = Module["canvas"];
                Browser.resizeListeners.forEach(function(listener) {
                    listener(canvas.width, canvas.height)
                })
            },
            setCanvasSize: function(width, height, noUpdates) {
                var canvas = Module["canvas"];
                Browser.updateCanvasDimensions(canvas, width, height);
                if (!noUpdates)
                    Browser.updateResizeListeners()
            },
            windowedWidth: 0,
            windowedHeight: 0,
            setFullscreenCanvasSize: function() {
                if (typeof SDL != "undefined") {
                    var flags = HEAPU32[SDL.screen >> 2];
                    flags = flags | 8388608;
                    HEAP32[SDL.screen >> 2] = flags
                }
                Browser.updateCanvasDimensions(Module["canvas"]);
                Browser.updateResizeListeners()
            },
            setWindowedCanvasSize: function() {
                if (typeof SDL != "undefined") {
                    var flags = HEAPU32[SDL.screen >> 2];
                    flags = flags & ~8388608;
                    HEAP32[SDL.screen >> 2] = flags
                }
                Browser.updateCanvasDimensions(Module["canvas"]);
                Browser.updateResizeListeners()
            },
            updateCanvasDimensions: function(canvas, wNative, hNative) {
                if (wNative && hNative) {
                    canvas.widthNative = wNative;
                    canvas.heightNative = hNative
                } else {
                    wNative = canvas.widthNative;
                    hNative = canvas.heightNative
                }
                var w = wNative;
                var h = hNative;
                if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
                    if (w / h < Module["forcedAspectRatio"]) {
                        w = Math.round(h * Module["forcedAspectRatio"])
                    } else {
                        h = Math.round(w / Module["forcedAspectRatio"])
                    }
                }
                if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
                    var factor = Math.min(screen.width / w, screen.height / h);
                    w = Math.round(w * factor);
                    h = Math.round(h * factor)
                }
                if (Browser.resizeCanvas) {
                    if (canvas.width != w)
                        canvas.width = w;
                    if (canvas.height != h)
                        canvas.height = h;
                    if (typeof canvas.style != "undefined") {
                        canvas.style.removeProperty("width");
                        canvas.style.removeProperty("height")
                    }
                } else {
                    if (canvas.width != wNative)
                        canvas.width = wNative;
                    if (canvas.height != hNative)
                        canvas.height = hNative;
                    if (typeof canvas.style != "undefined") {
                        if (w != wNative || h != hNative) {
                            canvas.style.setProperty("width", w + "px", "important");
                            canvas.style.setProperty("height", h + "px", "important")
                        } else {
                            canvas.style.removeProperty("width");
                            canvas.style.removeProperty("height")
                        }
                    }
                }
            }
        };
        function _emscripten_set_main_loop_timing(mode, value) {
            Browser.mainLoop.timingMode = mode;
            Browser.mainLoop.timingValue = value;
            if (!Browser.mainLoop.func) {
                return 1
            }
            if (!Browser.mainLoop.running) {
                Browser.mainLoop.running = true
            }
            if (mode == 0) {
                Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
                    var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
                    setTimeout(Browser.mainLoop.runner, timeUntilNextTick)
                }
                ;
                Browser.mainLoop.method = "timeout"
            } else if (mode == 1) {
                Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
                    Browser.requestAnimationFrame(Browser.mainLoop.runner)
                }
                ;
                Browser.mainLoop.method = "rAF"
            } else if (mode == 2) {
                if (typeof setImmediate == "undefined") {
                    var setImmediates = [];
                    var emscriptenMainLoopMessageId = "setimmediate";
                    var Browser_setImmediate_messageHandler = event => {
                        if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                            event.stopPropagation();
                            setImmediates.shift()()
                        }
                    }
                    ;
                    addEventListener("message", Browser_setImmediate_messageHandler, true);
                    setImmediate = function Browser_emulated_setImmediate(func) {
                        setImmediates.push(func);
                        if (ENVIRONMENT_IS_WORKER) {
                            if (Module["setImmediates"] === undefined)
                                Module["setImmediates"] = [];
                            Module["setImmediates"].push(func);
                            postMessage({
                                target: emscriptenMainLoopMessageId
                            })
                        } else
                            postMessage(emscriptenMainLoopMessageId, "*")
                    }
                }
                Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
                    setImmediate(Browser.mainLoop.runner)
                }
                ;
                Browser.mainLoop.method = "immediate"
            }
            return 0
        }
        var PATH = {
            isAbs: path => path.charAt(0) === "/",
            splitPath: filename => {
                var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                return splitPathRe.exec(filename).slice(1)
            }
            ,
            normalizeArray: (parts, allowAboveRoot) => {
                var up = 0;
                for (var i = parts.length - 1; i >= 0; i--) {
                    var last = parts[i];
                    if (last === ".") {
                        parts.splice(i, 1)
                    } else if (last === "..") {
                        parts.splice(i, 1);
                        up++
                    } else if (up) {
                        parts.splice(i, 1);
                        up--
                    }
                }
                if (allowAboveRoot) {
                    for (; up; up--) {
                        parts.unshift("..")
                    }
                }
                return parts
            }
            ,
            normalize: path => {
                var isAbsolute = PATH.isAbs(path)
                  , trailingSlash = path.substr(-1) === "/";
                path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
                if (!path && !isAbsolute) {
                    path = "."
                }
                if (path && trailingSlash) {
                    path += "/"
                }
                return (isAbsolute ? "/" : "") + path
            }
            ,
            dirname: path => {
                var result = PATH.splitPath(path)
                  , root = result[0]
                  , dir = result[1];
                if (!root && !dir) {
                    return "."
                }
                if (dir) {
                    dir = dir.substr(0, dir.length - 1)
                }
                return root + dir
            }
            ,
            basename: path => {
                if (path === "/")
                    return "/";
                path = PATH.normalize(path);
                path = path.replace(/\/$/, "");
                var lastSlash = path.lastIndexOf("/");
                if (lastSlash === -1)
                    return path;
                return path.substr(lastSlash + 1)
            }
            ,
            join: function() {
                var paths = Array.prototype.slice.call(arguments);
                return PATH.normalize(paths.join("/"))
            },
            join2: (l, r) => {
                return PATH.normalize(l + "/" + r)
            }
        };
        function getRandomDevice() {
            if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
                var randomBuffer = new Uint8Array(1);
                return () => {
                    crypto.getRandomValues(randomBuffer);
                    return randomBuffer[0]
                }
            } else if (ENVIRONMENT_IS_NODE) {
                try {
                    var crypto_module = require("crypto");
                    return () => crypto_module["randomBytes"](1)[0]
                } catch (e) {}
            }
            return () => abort("randomDevice")
        }
        var PATH_FS = {
            resolve: function() {
                var resolvedPath = ""
                  , resolvedAbsolute = false;
                for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                    var path = i >= 0 ? arguments[i] : FS.cwd();
                    if (typeof path != "string") {
                        throw new TypeError("Arguments to path.resolve must be strings")
                    } else if (!path) {
                        return ""
                    }
                    resolvedPath = path + "/" + resolvedPath;
                    resolvedAbsolute = PATH.isAbs(path)
                }
                resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
                return (resolvedAbsolute ? "/" : "") + resolvedPath || "."
            },
            relative: (from, to) => {
                from = PATH_FS.resolve(from).substr(1);
                to = PATH_FS.resolve(to).substr(1);
                function trim(arr) {
                    var start = 0;
                    for (; start < arr.length; start++) {
                        if (arr[start] !== "")
                            break
                    }
                    var end = arr.length - 1;
                    for (; end >= 0; end--) {
                        if (arr[end] !== "")
                            break
                    }
                    if (start > end)
                        return [];
                    return arr.slice(start, end - start + 1)
                }
                var fromParts = trim(from.split("/"));
                var toParts = trim(to.split("/"));
                var length = Math.min(fromParts.length, toParts.length);
                var samePartsLength = length;
                for (var i = 0; i < length; i++) {
                    if (fromParts[i] !== toParts[i]) {
                        samePartsLength = i;
                        break
                    }
                }
                var outputParts = [];
                for (var i = samePartsLength; i < fromParts.length; i++) {
                    outputParts.push("..")
                }
                outputParts = outputParts.concat(toParts.slice(samePartsLength));
                return outputParts.join("/")
            }
        };
        function intArrayFromString(stringy, dontAddNull, length) {
            var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
            var u8array = new Array(len);
            var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
            if (dontAddNull)
                u8array.length = numBytesWritten;
            return u8array
        }
        var TTY = {
            ttys: [],
            init: function() {},
            shutdown: function() {},
            register: function(dev, ops) {
                TTY.ttys[dev] = {
                    input: [],
                    output: [],
                    ops: ops
                };
                FS.registerDevice(dev, TTY.stream_ops)
            },
            stream_ops: {
                open: function(stream) {
                    var tty = TTY.ttys[stream.node.rdev];
                    if (!tty) {
                        throw new FS.ErrnoError(43)
                    }
                    stream.tty = tty;
                    stream.seekable = false
                },
                close: function(stream) {
                    stream.tty.ops.fsync(stream.tty)
                },
                fsync: function(stream) {
                    stream.tty.ops.fsync(stream.tty)
                },
                read: function(stream, buffer, offset, length, pos) {
                    if (!stream.tty || !stream.tty.ops.get_char) {
                        throw new FS.ErrnoError(60)
                    }
                    var bytesRead = 0;
                    for (var i = 0; i < length; i++) {
                        var result;
                        try {
                            result = stream.tty.ops.get_char(stream.tty)
                        } catch (e) {
                            throw new FS.ErrnoError(29)
                        }
                        if (result === undefined && bytesRead === 0) {
                            throw new FS.ErrnoError(6)
                        }
                        if (result === null || result === undefined)
                            break;
                        bytesRead++;
                        buffer[offset + i] = result
                    }
                    if (bytesRead) {
                        stream.node.timestamp = Date.now()
                    }
                    return bytesRead
                },
                write: function(stream, buffer, offset, length, pos) {
                    if (!stream.tty || !stream.tty.ops.put_char) {
                        throw new FS.ErrnoError(60)
                    }
                    try {
                        for (var i = 0; i < length; i++) {
                            stream.tty.ops.put_char(stream.tty, buffer[offset + i])
                        }
                    } catch (e) {
                        throw new FS.ErrnoError(29)
                    }
                    if (length) {
                        stream.node.timestamp = Date.now()
                    }
                    return i
                }
            },
            default_tty_ops: {
                get_char: function(tty) {
                    if (!tty.input.length) {
                        var result = null;
                        if (ENVIRONMENT_IS_NODE) {
                            var BUFSIZE = 256;
                            var buf = Buffer.alloc(BUFSIZE);
                            var bytesRead = 0;
                            try {
                                bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1)
                            } catch (e) {
                                if (e.toString().includes("EOF"))
                                    bytesRead = 0;
                                else
                                    throw e
                            }
                            if (bytesRead > 0) {
                                result = buf.slice(0, bytesRead).toString("utf-8")
                            } else {
                                result = null
                            }
                        } else if (typeof window != "undefined" && typeof window.prompt == "function") {
                            result = window.prompt("Input: ");
                            if (result !== null) {
                                result += "\n"
                            }
                        } else if (typeof readline == "function") {
                            result = readline();
                            if (result !== null) {
                                result += "\n"
                            }
                        }
                        if (!result) {
                            return null
                        }
                        tty.input = intArrayFromString(result, true)
                    }
                    return tty.input.shift()
                },
                put_char: function(tty, val) {
                    if (val === null || val === 10) {
                        out(UTF8ArrayToString(tty.output, 0));
                        tty.output = []
                    } else {
                        if (val != 0)
                            tty.output.push(val)
                    }
                },
                fsync: function(tty) {
                    if (tty.output && tty.output.length > 0) {
                        out(UTF8ArrayToString(tty.output, 0));
                        tty.output = []
                    }
                }
            },
            default_tty1_ops: {
                put_char: function(tty, val) {
                    if (val === null || val === 10) {
                        err(UTF8ArrayToString(tty.output, 0));
                        tty.output = []
                    } else {
                        if (val != 0)
                            tty.output.push(val)
                    }
                },
                fsync: function(tty) {
                    if (tty.output && tty.output.length > 0) {
                        err(UTF8ArrayToString(tty.output, 0));
                        tty.output = []
                    }
                }
            }
        };
        function mmapAlloc(size) {
            abort()
        }
        var MEMFS = {
            ops_table: null,
            mount: function(mount) {
                return MEMFS.createNode(null, "/", 16384 | 511, 0)
            },
            createNode: function(parent, name, mode, dev) {
                if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
                    throw new FS.ErrnoError(63)
                }
                if (!MEMFS.ops_table) {
                    MEMFS.ops_table = {
                        dir: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                                lookup: MEMFS.node_ops.lookup,
                                mknod: MEMFS.node_ops.mknod,
                                rename: MEMFS.node_ops.rename,
                                unlink: MEMFS.node_ops.unlink,
                                rmdir: MEMFS.node_ops.rmdir,
                                readdir: MEMFS.node_ops.readdir,
                                symlink: MEMFS.node_ops.symlink
                            },
                            stream: {
                                llseek: MEMFS.stream_ops.llseek
                            }
                        },
                        file: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr
                            },
                            stream: {
                                llseek: MEMFS.stream_ops.llseek,
                                read: MEMFS.stream_ops.read,
                                write: MEMFS.stream_ops.write,
                                allocate: MEMFS.stream_ops.allocate,
                                mmap: MEMFS.stream_ops.mmap,
                                msync: MEMFS.stream_ops.msync
                            }
                        },
                        link: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                                readlink: MEMFS.node_ops.readlink
                            },
                            stream: {}
                        },
                        chrdev: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr
                            },
                            stream: FS.chrdev_stream_ops
                        }
                    }
                }
                var node = FS.createNode(parent, name, mode, dev);
                if (FS.isDir(node.mode)) {
                    node.node_ops = MEMFS.ops_table.dir.node;
                    node.stream_ops = MEMFS.ops_table.dir.stream;
                    node.contents = {}
                } else if (FS.isFile(node.mode)) {
                    node.node_ops = MEMFS.ops_table.file.node;
                    node.stream_ops = MEMFS.ops_table.file.stream;
                    node.usedBytes = 0;
                    node.contents = null
                } else if (FS.isLink(node.mode)) {
                    node.node_ops = MEMFS.ops_table.link.node;
                    node.stream_ops = MEMFS.ops_table.link.stream
                } else if (FS.isChrdev(node.mode)) {
                    node.node_ops = MEMFS.ops_table.chrdev.node;
                    node.stream_ops = MEMFS.ops_table.chrdev.stream
                }
                node.timestamp = Date.now();
                if (parent) {
                    parent.contents[name] = node;
                    parent.timestamp = node.timestamp
                }
                return node
            },
            getFileDataAsTypedArray: function(node) {
                if (!node.contents)
                    return new Uint8Array(0);
                if (node.contents.subarray)
                    return node.contents.subarray(0, node.usedBytes);
                return new Uint8Array(node.contents)
            },
            expandFileStorage: function(node, newCapacity) {
                var prevCapacity = node.contents ? node.contents.length : 0;
                if (prevCapacity >= newCapacity)
                    return;
                var CAPACITY_DOUBLING_MAX = 1024 * 1024;
                newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
                if (prevCapacity != 0)
                    newCapacity = Math.max(newCapacity, 256);
                var oldContents = node.contents;
                node.contents = new Uint8Array(newCapacity);
                if (node.usedBytes > 0)
                    node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
            },
            resizeFileStorage: function(node, newSize) {
                if (node.usedBytes == newSize)
                    return;
                if (newSize == 0) {
                    node.contents = null;
                    node.usedBytes = 0
                } else {
                    var oldContents = node.contents;
                    node.contents = new Uint8Array(newSize);
                    if (oldContents) {
                        node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
                    }
                    node.usedBytes = newSize
                }
            },
            node_ops: {
                getattr: function(node) {
                    var attr = {};
                    attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
                    attr.ino = node.id;
                    attr.mode = node.mode;
                    attr.nlink = 1;
                    attr.uid = 0;
                    attr.gid = 0;
                    attr.rdev = node.rdev;
                    if (FS.isDir(node.mode)) {
                        attr.size = 4096
                    } else if (FS.isFile(node.mode)) {
                        attr.size = node.usedBytes
                    } else if (FS.isLink(node.mode)) {
                        attr.size = node.link.length
                    } else {
                        attr.size = 0
                    }
                    attr.atime = new Date(node.timestamp);
                    attr.mtime = new Date(node.timestamp);
                    attr.ctime = new Date(node.timestamp);
                    attr.blksize = 4096;
                    attr.blocks = Math.ceil(attr.size / attr.blksize);
                    return attr
                },
                setattr: function(node, attr) {
                    if (attr.mode !== undefined) {
                        node.mode = attr.mode
                    }
                    if (attr.timestamp !== undefined) {
                        node.timestamp = attr.timestamp
                    }
                    if (attr.size !== undefined) {
                        MEMFS.resizeFileStorage(node, attr.size)
                    }
                },
                lookup: function(parent, name) {
                    throw FS.genericErrors[44]
                },
                mknod: function(parent, name, mode, dev) {
                    return MEMFS.createNode(parent, name, mode, dev)
                },
                rename: function(old_node, new_dir, new_name) {
                    if (FS.isDir(old_node.mode)) {
                        var new_node;
                        try {
                            new_node = FS.lookupNode(new_dir, new_name)
                        } catch (e) {}
                        if (new_node) {
                            for (var i in new_node.contents) {
                                throw new FS.ErrnoError(55)
                            }
                        }
                    }
                    delete old_node.parent.contents[old_node.name];
                    old_node.parent.timestamp = Date.now();
                    old_node.name = new_name;
                    new_dir.contents[new_name] = old_node;
                    new_dir.timestamp = old_node.parent.timestamp;
                    old_node.parent = new_dir
                },
                unlink: function(parent, name) {
                    delete parent.contents[name];
                    parent.timestamp = Date.now()
                },
                rmdir: function(parent, name) {
                    var node = FS.lookupNode(parent, name);
                    for (var i in node.contents) {
                        throw new FS.ErrnoError(55)
                    }
                    delete parent.contents[name];
                    parent.timestamp = Date.now()
                },
                readdir: function(node) {
                    var entries = [".", ".."];
                    for (var key in node.contents) {
                        if (!node.contents.hasOwnProperty(key)) {
                            continue
                        }
                        entries.push(key)
                    }
                    return entries
                },
                symlink: function(parent, newname, oldpath) {
                    var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
                    node.link = oldpath;
                    return node
                },
                readlink: function(node) {
                    if (!FS.isLink(node.mode)) {
                        throw new FS.ErrnoError(28)
                    }
                    return node.link
                }
            },
            stream_ops: {
                read: function(stream, buffer, offset, length, position) {
                    var contents = stream.node.contents;
                    if (position >= stream.node.usedBytes)
                        return 0;
                    var size = Math.min(stream.node.usedBytes - position, length);
                    if (size > 8 && contents.subarray) {
                        buffer.set(contents.subarray(position, position + size), offset)
                    } else {
                        for (var i = 0; i < size; i++)
                            buffer[offset + i] = contents[position + i]
                    }
                    return size
                },
                write: function(stream, buffer, offset, length, position, canOwn) {
                    if (buffer.buffer === HEAP8.buffer) {
                        canOwn = false
                    }
                    if (!length)
                        return 0;
                    var node = stream.node;
                    node.timestamp = Date.now();
                    if (buffer.subarray && (!node.contents || node.contents.subarray)) {
                        if (canOwn) {
                            node.contents = buffer.subarray(offset, offset + length);
                            node.usedBytes = length;
                            return length
                        } else if (node.usedBytes === 0 && position === 0) {
                            node.contents = buffer.slice(offset, offset + length);
                            node.usedBytes = length;
                            return length
                        } else if (position + length <= node.usedBytes) {
                            node.contents.set(buffer.subarray(offset, offset + length), position);
                            return length
                        }
                    }
                    MEMFS.expandFileStorage(node, position + length);
                    if (node.contents.subarray && buffer.subarray) {
                        node.contents.set(buffer.subarray(offset, offset + length), position)
                    } else {
                        for (var i = 0; i < length; i++) {
                            node.contents[position + i] = buffer[offset + i]
                        }
                    }
                    node.usedBytes = Math.max(node.usedBytes, position + length);
                    return length
                },
                llseek: function(stream, offset, whence) {
                    var position = offset;
                    if (whence === 1) {
                        position += stream.position
                    } else if (whence === 2) {
                        if (FS.isFile(stream.node.mode)) {
                            position += stream.node.usedBytes
                        }
                    }
                    if (position < 0) {
                        throw new FS.ErrnoError(28)
                    }
                    return position
                },
                allocate: function(stream, offset, length) {
                    MEMFS.expandFileStorage(stream.node, offset + length);
                    stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
                },
                mmap: function(stream, length, position, prot, flags) {
                    if (!FS.isFile(stream.node.mode)) {
                        throw new FS.ErrnoError(43)
                    }
                    var ptr;
                    var allocated;
                    var contents = stream.node.contents;
                    if (!(flags & 2) && contents.buffer === buffer) {
                        allocated = false;
                        ptr = contents.byteOffset
                    } else {
                        if (position > 0 || position + length < contents.length) {
                            if (contents.subarray) {
                                contents = contents.subarray(position, position + length)
                            } else {
                                contents = Array.prototype.slice.call(contents, position, position + length)
                            }
                        }
                        allocated = true;
                        ptr = mmapAlloc(length);
                        if (!ptr) {
                            throw new FS.ErrnoError(48)
                        }
                        HEAP8.set(contents, ptr)
                    }
                    return {
                        ptr: ptr,
                        allocated: allocated
                    }
                },
                msync: function(stream, buffer, offset, length, mmapFlags) {
                    MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
                    return 0
                }
            }
        };
        function asyncLoad(url, onload, onerror, noRunDep) {
            var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
            readAsync(url, arrayBuffer => {
                assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
                onload(new Uint8Array(arrayBuffer));
                if (dep)
                    removeRunDependency(dep)
            }
            , event => {
                if (onerror) {
                    onerror()
                } else {
                    throw 'Loading data file "' + url + '" failed.'
                }
            }
            );
            if (dep)
                addRunDependency(dep)
        }
        var FS = {
            root: null,
            mounts: [],
            devices: {},
            streams: [],
            nextInode: 1,
            nameTable: null,
            currentPath: "/",
            initialized: false,
            ignorePermissions: true,
            ErrnoError: null,
            genericErrors: {},
            filesystems: null,
            syncFSRequests: 0,
            lookupPath: (path, opts={}) => {
                path = PATH_FS.resolve(path);
                if (!path)
                    return {
                        path: "",
                        node: null
                    };
                var defaults = {
                    follow_mount: true,
                    recurse_count: 0
                };
                opts = Object.assign(defaults, opts);
                if (opts.recurse_count > 8) {
                    throw new FS.ErrnoError(32)
                }
                var parts = path.split("/").filter(p => !!p);
                var current = FS.root;
                var current_path = "/";
                for (var i = 0; i < parts.length; i++) {
                    var islast = i === parts.length - 1;
                    if (islast && opts.parent) {
                        break
                    }
                    current = FS.lookupNode(current, parts[i]);
                    current_path = PATH.join2(current_path, parts[i]);
                    if (FS.isMountpoint(current)) {
                        if (!islast || islast && opts.follow_mount) {
                            current = current.mounted.root
                        }
                    }
                    if (!islast || opts.follow) {
                        var count = 0;
                        while (FS.isLink(current.mode)) {
                            var link = FS.readlink(current_path);
                            current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                            var lookup = FS.lookupPath(current_path, {
                                recurse_count: opts.recurse_count + 1
                            });
                            current = lookup.node;
                            if (count++ > 40) {
                                throw new FS.ErrnoError(32)
                            }
                        }
                    }
                }
                return {
                    path: current_path,
                    node: current
                }
            }
            ,
            getPath: node => {
                var path;
                while (true) {
                    if (FS.isRoot(node)) {
                        var mount = node.mount.mountpoint;
                        if (!path)
                            return mount;
                        return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path
                    }
                    path = path ? node.name + "/" + path : node.name;
                    node = node.parent
                }
            }
            ,
            hashName: (parentid, name) => {
                var hash = 0;
                for (var i = 0; i < name.length; i++) {
                    hash = (hash << 5) - hash + name.charCodeAt(i) | 0
                }
                return (parentid + hash >>> 0) % FS.nameTable.length
            }
            ,
            hashAddNode: node => {
                var hash = FS.hashName(node.parent.id, node.name);
                node.name_next = FS.nameTable[hash];
                FS.nameTable[hash] = node
            }
            ,
            hashRemoveNode: node => {
                var hash = FS.hashName(node.parent.id, node.name);
                if (FS.nameTable[hash] === node) {
                    FS.nameTable[hash] = node.name_next
                } else {
                    var current = FS.nameTable[hash];
                    while (current) {
                        if (current.name_next === node) {
                            current.name_next = node.name_next;
                            break
                        }
                        current = current.name_next
                    }
                }
            }
            ,
            lookupNode: (parent, name) => {
                var errCode = FS.mayLookup(parent);
                if (errCode) {
                    throw new FS.ErrnoError(errCode,parent)
                }
                var hash = FS.hashName(parent.id, name);
                for (var node = FS.nameTable[hash]; node; node = node.name_next) {
                    var nodeName = node.name;
                    if (node.parent.id === parent.id && nodeName === name) {
                        return node
                    }
                }
                return FS.lookup(parent, name)
            }
            ,
            createNode: (parent, name, mode, rdev) => {
                var node = new FS.FSNode(parent,name,mode,rdev);
                FS.hashAddNode(node);
                return node
            }
            ,
            destroyNode: node => {
                FS.hashRemoveNode(node)
            }
            ,
            isRoot: node => {
                return node === node.parent
            }
            ,
            isMountpoint: node => {
                return !!node.mounted
            }
            ,
            isFile: mode => {
                return (mode & 61440) === 32768
            }
            ,
            isDir: mode => {
                return (mode & 61440) === 16384
            }
            ,
            isLink: mode => {
                return (mode & 61440) === 40960
            }
            ,
            isChrdev: mode => {
                return (mode & 61440) === 8192
            }
            ,
            isBlkdev: mode => {
                return (mode & 61440) === 24576
            }
            ,
            isFIFO: mode => {
                return (mode & 61440) === 4096
            }
            ,
            isSocket: mode => {
                return (mode & 49152) === 49152
            }
            ,
            flagModes: {
                "r": 0,
                "r+": 2,
                "w": 577,
                "w+": 578,
                "a": 1089,
                "a+": 1090
            },
            modeStringToFlags: str => {
                var flags = FS.flagModes[str];
                if (typeof flags == "undefined") {
                    throw new Error("Unknown file open mode: " + str)
                }
                return flags
            }
            ,
            flagsToPermissionString: flag => {
                var perms = ["r", "w", "rw"][flag & 3];
                if (flag & 512) {
                    perms += "w"
                }
                return perms
            }
            ,
            nodePermissions: (node, perms) => {
                if (FS.ignorePermissions) {
                    return 0
                }
                if (perms.includes("r") && !(node.mode & 292)) {
                    return 2
                } else if (perms.includes("w") && !(node.mode & 146)) {
                    return 2
                } else if (perms.includes("x") && !(node.mode & 73)) {
                    return 2
                }
                return 0
            }
            ,
            mayLookup: dir => {
                var errCode = FS.nodePermissions(dir, "x");
                if (errCode)
                    return errCode;
                if (!dir.node_ops.lookup)
                    return 2;
                return 0
            }
            ,
            mayCreate: (dir, name) => {
                try {
                    var node = FS.lookupNode(dir, name);
                    return 20
                } catch (e) {}
                return FS.nodePermissions(dir, "wx")
            }
            ,
            mayDelete: (dir, name, isdir) => {
                var node;
                try {
                    node = FS.lookupNode(dir, name)
                } catch (e) {
                    return e.errno
                }
                var errCode = FS.nodePermissions(dir, "wx");
                if (errCode) {
                    return errCode
                }
                if (isdir) {
                    if (!FS.isDir(node.mode)) {
                        return 54
                    }
                    if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                        return 10
                    }
                } else {
                    if (FS.isDir(node.mode)) {
                        return 31
                    }
                }
                return 0
            }
            ,
            mayOpen: (node, flags) => {
                if (!node) {
                    return 44
                }
                if (FS.isLink(node.mode)) {
                    return 32
                } else if (FS.isDir(node.mode)) {
                    if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
                        return 31
                    }
                }
                return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
            }
            ,
            MAX_OPEN_FDS: 4096,
            nextfd: (fd_start=0, fd_end=FS.MAX_OPEN_FDS) => {
                for (var fd = fd_start; fd <= fd_end; fd++) {
                    if (!FS.streams[fd]) {
                        return fd
                    }
                }
                throw new FS.ErrnoError(33)
            }
            ,
            getStream: fd => FS.streams[fd],
            createStream: (stream, fd_start, fd_end) => {
                if (!FS.FSStream) {
                    FS.FSStream = function() {
                        this.shared = {}
                    }
                    ;
                    FS.FSStream.prototype = {};
                    Object.defineProperties(FS.FSStream.prototype, {
                        object: {
                            get: function() {
                                return this.node
                            },
                            set: function(val) {
                                this.node = val
                            }
                        },
                        isRead: {
                            get: function() {
                                return (this.flags & 2097155) !== 1
                            }
                        },
                        isWrite: {
                            get: function() {
                                return (this.flags & 2097155) !== 0
                            }
                        },
                        isAppend: {
                            get: function() {
                                return this.flags & 1024
                            }
                        },
                        flags: {
                            get: function() {
                                return this.shared.flags
                            },
                            set: function(val) {
                                this.shared.flags = val
                            }
                        },
                        position: {
                            get: function() {
                                return this.shared.position
                            },
                            set: function(val) {
                                this.shared.position = val
                            }
                        }
                    })
                }
                stream = Object.assign(new FS.FSStream, stream);
                var fd = FS.nextfd(fd_start, fd_end);
                stream.fd = fd;
                FS.streams[fd] = stream;
                return stream
            }
            ,
            closeStream: fd => {
                FS.streams[fd] = null
            }
            ,
            chrdev_stream_ops: {
                open: stream => {
                    var device = FS.getDevice(stream.node.rdev);
                    stream.stream_ops = device.stream_ops;
                    if (stream.stream_ops.open) {
                        stream.stream_ops.open(stream)
                    }
                }
                ,
                llseek: () => {
                    throw new FS.ErrnoError(70)
                }
            },
            major: dev => dev >> 8,
            minor: dev => dev & 255,
            makedev: (ma, mi) => ma << 8 | mi,
            registerDevice: (dev, ops) => {
                FS.devices[dev] = {
                    stream_ops: ops
                }
            }
            ,
            getDevice: dev => FS.devices[dev],
            getMounts: mount => {
                var mounts = [];
                var check = [mount];
                while (check.length) {
                    var m = check.pop();
                    mounts.push(m);
                    check.push.apply(check, m.mounts)
                }
                return mounts
            }
            ,
            syncfs: (populate, callback) => {
                if (typeof populate == "function") {
                    callback = populate;
                    populate = false
                }
                FS.syncFSRequests++;
                if (FS.syncFSRequests > 1) {
                    err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work")
                }
                var mounts = FS.getMounts(FS.root.mount);
                var completed = 0;
                function doCallback(errCode) {
                    FS.syncFSRequests--;
                    return callback(errCode)
                }
                function done(errCode) {
                    if (errCode) {
                        if (!done.errored) {
                            done.errored = true;
                            return doCallback(errCode)
                        }
                        return
                    }
                    if (++completed >= mounts.length) {
                        doCallback(null)
                    }
                }
                mounts.forEach(mount => {
                    if (!mount.type.syncfs) {
                        return done(null)
                    }
                    mount.type.syncfs(mount, populate, done)
                }
                )
            }
            ,
            mount: (type, opts, mountpoint) => {
                var root = mountpoint === "/";
                var pseudo = !mountpoint;
                var node;
                if (root && FS.root) {
                    throw new FS.ErrnoError(10)
                } else if (!root && !pseudo) {
                    var lookup = FS.lookupPath(mountpoint, {
                        follow_mount: false
                    });
                    mountpoint = lookup.path;
                    node = lookup.node;
                    if (FS.isMountpoint(node)) {
                        throw new FS.ErrnoError(10)
                    }
                    if (!FS.isDir(node.mode)) {
                        throw new FS.ErrnoError(54)
                    }
                }
                var mount = {
                    type: type,
                    opts: opts,
                    mountpoint: mountpoint,
                    mounts: []
                };
                var mountRoot = type.mount(mount);
                mountRoot.mount = mount;
                mount.root = mountRoot;
                if (root) {
                    FS.root = mountRoot
                } else if (node) {
                    node.mounted = mount;
                    if (node.mount) {
                        node.mount.mounts.push(mount)
                    }
                }
                return mountRoot
            }
            ,
            unmount: mountpoint => {
                var lookup = FS.lookupPath(mountpoint, {
                    follow_mount: false
                });
                if (!FS.isMountpoint(lookup.node)) {
                    throw new FS.ErrnoError(28)
                }
                var node = lookup.node;
                var mount = node.mounted;
                var mounts = FS.getMounts(mount);
                Object.keys(FS.nameTable).forEach(hash => {
                    var current = FS.nameTable[hash];
                    while (current) {
                        var next = current.name_next;
                        if (mounts.includes(current.mount)) {
                            FS.destroyNode(current)
                        }
                        current = next
                    }
                }
                );
                node.mounted = null;
                var idx = node.mount.mounts.indexOf(mount);
                node.mount.mounts.splice(idx, 1)
            }
            ,
            lookup: (parent, name) => {
                return parent.node_ops.lookup(parent, name)
            }
            ,
            mknod: (path, mode, dev) => {
                var lookup = FS.lookupPath(path, {
                    parent: true
                });
                var parent = lookup.node;
                var name = PATH.basename(path);
                if (!name || name === "." || name === "..") {
                    throw new FS.ErrnoError(28)
                }
                var errCode = FS.mayCreate(parent, name);
                if (errCode) {
                    throw new FS.ErrnoError(errCode)
                }
                if (!parent.node_ops.mknod) {
                    throw new FS.ErrnoError(63)
                }
                return parent.node_ops.mknod(parent, name, mode, dev)
            }
            ,
            create: (path, mode) => {
                mode = mode !== undefined ? mode : 438;
                mode &= 4095;
                mode |= 32768;
                return FS.mknod(path, mode, 0)
            }
            ,
            mkdir: (path, mode) => {
                mode = mode !== undefined ? mode : 511;
                mode &= 511 | 512;
                mode |= 16384;
                return FS.mknod(path, mode, 0)
            }
            ,
            mkdirTree: (path, mode) => {
                var dirs = path.split("/");
                var d = "";
                for (var i = 0; i < dirs.length; ++i) {
                    if (!dirs[i])
                        continue;
                    d += "/" + dirs[i];
                    try {
                        FS.mkdir(d, mode)
                    } catch (e) {
                        if (e.errno != 20)
                            throw e
                    }
                }
            }
            ,
            mkdev: (path, mode, dev) => {
                if (typeof dev == "undefined") {
                    dev = mode;
                    mode = 438
                }
                mode |= 8192;
                return FS.mknod(path, mode, dev)
            }
            ,
            symlink: (oldpath, newpath) => {
                if (!PATH_FS.resolve(oldpath)) {
                    throw new FS.ErrnoError(44)
                }
                var lookup = FS.lookupPath(newpath, {
                    parent: true
                });
                var parent = lookup.node;
                if (!parent) {
                    throw new FS.ErrnoError(44)
                }
                var newname = PATH.basename(newpath);
                var errCode = FS.mayCreate(parent, newname);
                if (errCode) {
                    throw new FS.ErrnoError(errCode)
                }
                if (!parent.node_ops.symlink) {
                    throw new FS.ErrnoError(63)
                }
                return parent.node_ops.symlink(parent, newname, oldpath)
            }
            ,
            rename: (old_path, new_path) => {
                var old_dirname = PATH.dirname(old_path);
                var new_dirname = PATH.dirname(new_path);
                var old_name = PATH.basename(old_path);
                var new_name = PATH.basename(new_path);
                var lookup, old_dir, new_dir;
                lookup = FS.lookupPath(old_path, {
                    parent: true
                });
                old_dir = lookup.node;
                lookup = FS.lookupPath(new_path, {
                    parent: true
                });
                new_dir = lookup.node;
                if (!old_dir || !new_dir)
                    throw new FS.ErrnoError(44);
                if (old_dir.mount !== new_dir.mount) {
                    throw new FS.ErrnoError(75)
                }
                var old_node = FS.lookupNode(old_dir, old_name);
                var relative = PATH_FS.relative(old_path, new_dirname);
                if (relative.charAt(0) !== ".") {
                    throw new FS.ErrnoError(28)
                }
                relative = PATH_FS.relative(new_path, old_dirname);
                if (relative.charAt(0) !== ".") {
                    throw new FS.ErrnoError(55)
                }
                var new_node;
                try {
                    new_node = FS.lookupNode(new_dir, new_name)
                } catch (e) {}
                if (old_node === new_node) {
                    return
                }
                var isdir = FS.isDir(old_node.mode);
                var errCode = FS.mayDelete(old_dir, old_name, isdir);
                if (errCode) {
                    throw new FS.ErrnoError(errCode)
                }
                errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
                if (errCode) {
                    throw new FS.ErrnoError(errCode)
                }
                if (!old_dir.node_ops.rename) {
                    throw new FS.ErrnoError(63)
                }
                if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
                    throw new FS.ErrnoError(10)
                }
                if (new_dir !== old_dir) {
                    errCode = FS.nodePermissions(old_dir, "w");
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                }
                FS.hashRemoveNode(old_node);
                try {
                    old_dir.node_ops.rename(old_node, new_dir, new_name)
                } catch (e) {
                    throw e
                } finally {
                    FS.hashAddNode(old_node)
                }
            }
            ,
            rmdir: path => {
                var lookup = FS.lookupPath(path, {
                    parent: true
                });
                var parent = lookup.node;
                var name = PATH.basename(path);
                var node = FS.lookupNode(parent, name);
                var errCode = FS.mayDelete(parent, name, true);
                if (errCode) {
                    throw new FS.ErrnoError(errCode)
                }
                if (!parent.node_ops.rmdir) {
                    throw new FS.ErrnoError(63)
                }
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(10)
                }
                parent.node_ops.rmdir(parent, name);
                FS.destroyNode(node)
            }
            ,
            readdir: path => {
                var lookup = FS.lookupPath(path, {
                    follow: true
                });
                var node = lookup.node;
                if (!node.node_ops.readdir) {
                    throw new FS.ErrnoError(54)
                }
                return node.node_ops.readdir(node)
            }
            ,
            unlink: path => {
                var lookup = FS.lookupPath(path, {
                    parent: true
                });
                var parent = lookup.node;
                if (!parent) {
                    throw new FS.ErrnoError(44)
                }
                var name = PATH.basename(path);
                var node = FS.lookupNode(parent, name);
                var errCode = FS.mayDelete(parent, name, false);
                if (errCode) {
                    throw new FS.ErrnoError(errCode)
                }
                if (!parent.node_ops.unlink) {
                    throw new FS.ErrnoError(63)
                }
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(10)
                }
                parent.node_ops.unlink(parent, name);
                FS.destroyNode(node)
            }
            ,
            readlink: path => {
                var lookup = FS.lookupPath(path);
                var link = lookup.node;
                if (!link) {
                    throw new FS.ErrnoError(44)
                }
                if (!link.node_ops.readlink) {
                    throw new FS.ErrnoError(28)
                }
                return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link))
            }
            ,
            stat: (path, dontFollow) => {
                var lookup = FS.lookupPath(path, {
                    follow: !dontFollow
                });
                var node = lookup.node;
                if (!node) {
                    throw new FS.ErrnoError(44)
                }
                if (!node.node_ops.getattr) {
                    throw new FS.ErrnoError(63)
                }
                return node.node_ops.getattr(node)
            }
            ,
            lstat: path => {
                return FS.stat(path, true)
            }
            ,
            chmod: (path, mode, dontFollow) => {
                var node;
                if (typeof path == "string") {
                    var lookup = FS.lookupPath(path, {
                        follow: !dontFollow
                    });
                    node = lookup.node
                } else {
                    node = path
                }
                if (!node.node_ops.setattr) {
                    throw new FS.ErrnoError(63)
                }
                node.node_ops.setattr(node, {
                    mode: mode & 4095 | node.mode & ~4095,
                    timestamp: Date.now()
                })
            }
            ,
            lchmod: (path, mode) => {
                FS.chmod(path, mode, true)
            }
            ,
            fchmod: (fd, mode) => {
                var stream = FS.getStream(fd);
                if (!stream) {
                    throw new FS.ErrnoError(8)
                }
                FS.chmod(stream.node, mode)
            }
            ,
            chown: (path, uid, gid, dontFollow) => {
                var node;
                if (typeof path == "string") {
                    var lookup = FS.lookupPath(path, {
                        follow: !dontFollow
                    });
                    node = lookup.node
                } else {
                    node = path
                }
                if (!node.node_ops.setattr) {
                    throw new FS.ErrnoError(63)
                }
                node.node_ops.setattr(node, {
                    timestamp: Date.now()
                })
            }
            ,
            lchown: (path, uid, gid) => {
                FS.chown(path, uid, gid, true)
            }
            ,
            fchown: (fd, uid, gid) => {
                var stream = FS.getStream(fd);
                if (!stream) {
                    throw new FS.ErrnoError(8)
                }
                FS.chown(stream.node, uid, gid)
            }
            ,
            truncate: (path, len) => {
                if (len < 0) {
                    throw new FS.ErrnoError(28)
                }
                var node;
                if (typeof path == "string") {
                    var lookup = FS.lookupPath(path, {
                        follow: true
                    });
                    node = lookup.node
                } else {
                    node = path
                }
                if (!node.node_ops.setattr) {
                    throw new FS.ErrnoError(63)
                }
                if (FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(31)
                }
                if (!FS.isFile(node.mode)) {
                    throw new FS.ErrnoError(28)
                }
                var errCode = FS.nodePermissions(node, "w");
                if (errCode) {
                    throw new FS.ErrnoError(errCode)
                }
                node.node_ops.setattr(node, {
                    size: len,
                    timestamp: Date.now()
                })
            }
            ,
            ftruncate: (fd, len) => {
                var stream = FS.getStream(fd);
                if (!stream) {
                    throw new FS.ErrnoError(8)
                }
                if ((stream.flags & 2097155) === 0) {
                    throw new FS.ErrnoError(28)
                }
                FS.truncate(stream.node, len)
            }
            ,
            utime: (path, atime, mtime) => {
                var lookup = FS.lookupPath(path, {
                    follow: true
                });
                var node = lookup.node;
                node.node_ops.setattr(node, {
                    timestamp: Math.max(atime, mtime)
                })
            }
            ,
            open: (path, flags, mode) => {
                if (path === "") {
                    throw new FS.ErrnoError(44)
                }
                flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags;
                mode = typeof mode == "undefined" ? 438 : mode;
                if (flags & 64) {
                    mode = mode & 4095 | 32768
                } else {
                    mode = 0
                }
                var node;
                if (typeof path == "object") {
                    node = path
                } else {
                    path = PATH.normalize(path);
                    try {
                        var lookup = FS.lookupPath(path, {
                            follow: !(flags & 131072)
                        });
                        node = lookup.node
                    } catch (e) {}
                }
                var created = false;
                if (flags & 64) {
                    if (node) {
                        if (flags & 128) {
                            throw new FS.ErrnoError(20)
                        }
                    } else {
                        node = FS.mknod(path, mode, 0);
                        created = true
                    }
                }
                if (!node) {
                    throw new FS.ErrnoError(44)
                }
                if (FS.isChrdev(node.mode)) {
                    flags &= ~512
                }
                if (flags & 65536 && !FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(54)
                }
                if (!created) {
                    var errCode = FS.mayOpen(node, flags);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                }
                if (flags & 512 && !created) {
                    FS.truncate(node, 0)
                }
                flags &= ~(128 | 512 | 131072);
                var stream = FS.createStream({
                    node: node,
                    path: FS.getPath(node),
                    flags: flags,
                    seekable: true,
                    position: 0,
                    stream_ops: node.stream_ops,
                    ungotten: [],
                    error: false
                });
                if (stream.stream_ops.open) {
                    stream.stream_ops.open(stream)
                }
                if (Module["logReadFiles"] && !(flags & 1)) {
                    if (!FS.readFiles)
                        FS.readFiles = {};
                    if (!(path in FS.readFiles)) {
                        FS.readFiles[path] = 1
                    }
                }
                return stream
            }
            ,
            close: stream => {
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8)
                }
                if (stream.getdents)
                    stream.getdents = null;
                try {
                    if (stream.stream_ops.close) {
                        stream.stream_ops.close(stream)
                    }
                } catch (e) {
                    throw e
                } finally {
                    FS.closeStream(stream.fd)
                }
                stream.fd = null
            }
            ,
            isClosed: stream => {
                return stream.fd === null
            }
            ,
            llseek: (stream, offset, whence) => {
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8)
                }
                if (!stream.seekable || !stream.stream_ops.llseek) {
                    throw new FS.ErrnoError(70)
                }
                if (whence != 0 && whence != 1 && whence != 2) {
                    throw new FS.ErrnoError(28)
                }
                stream.position = stream.stream_ops.llseek(stream, offset, whence);
                stream.ungotten = [];
                return stream.position
            }
            ,
            read: (stream, buffer, offset, length, position) => {
                if (length < 0 || position < 0) {
                    throw new FS.ErrnoError(28)
                }
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8)
                }
                if ((stream.flags & 2097155) === 1) {
                    throw new FS.ErrnoError(8)
                }
                if (FS.isDir(stream.node.mode)) {
                    throw new FS.ErrnoError(31)
                }
                if (!stream.stream_ops.read) {
                    throw new FS.ErrnoError(28)
                }
                var seeking = typeof position != "undefined";
                if (!seeking) {
                    position = stream.position
                } else if (!stream.seekable) {
                    throw new FS.ErrnoError(70)
                }
                var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
                if (!seeking)
                    stream.position += bytesRead;
                return bytesRead
            }
            ,
            write: (stream, buffer, offset, length, position, canOwn) => {
                if (length < 0 || position < 0) {
                    throw new FS.ErrnoError(28)
                }
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8)
                }
                if ((stream.flags & 2097155) === 0) {
                    throw new FS.ErrnoError(8)
                }
                if (FS.isDir(stream.node.mode)) {
                    throw new FS.ErrnoError(31)
                }
                if (!stream.stream_ops.write) {
                    throw new FS.ErrnoError(28)
                }
                if (stream.seekable && stream.flags & 1024) {
                    FS.llseek(stream, 0, 2)
                }
                var seeking = typeof position != "undefined";
                if (!seeking) {
                    position = stream.position
                } else if (!stream.seekable) {
                    throw new FS.ErrnoError(70)
                }
                var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
                if (!seeking)
                    stream.position += bytesWritten;
                return bytesWritten
            }
            ,
            allocate: (stream, offset, length) => {
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8)
                }
                if (offset < 0 || length <= 0) {
                    throw new FS.ErrnoError(28)
                }
                if ((stream.flags & 2097155) === 0) {
                    throw new FS.ErrnoError(8)
                }
                if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
                    throw new FS.ErrnoError(43)
                }
                if (!stream.stream_ops.allocate) {
                    throw new FS.ErrnoError(138)
                }
                stream.stream_ops.allocate(stream, offset, length)
            }
            ,
            mmap: (stream, length, position, prot, flags) => {
                if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
                    throw new FS.ErrnoError(2)
                }
                if ((stream.flags & 2097155) === 1) {
                    throw new FS.ErrnoError(2)
                }
                if (!stream.stream_ops.mmap) {
                    throw new FS.ErrnoError(43)
                }
                return stream.stream_ops.mmap(stream, length, position, prot, flags)
            }
            ,
            msync: (stream, buffer, offset, length, mmapFlags) => {
                if (!stream.stream_ops.msync) {
                    return 0
                }
                return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
            }
            ,
            munmap: stream => 0,
            ioctl: (stream, cmd, arg) => {
                if (!stream.stream_ops.ioctl) {
                    throw new FS.ErrnoError(59)
                }
                return stream.stream_ops.ioctl(stream, cmd, arg)
            }
            ,
            readFile: (path, opts={}) => {
                opts.flags = opts.flags || 0;
                opts.encoding = opts.encoding || "binary";
                if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
                    throw new Error('Invalid encoding type "' + opts.encoding + '"')
                }
                var ret;
                var stream = FS.open(path, opts.flags);
                var stat = FS.stat(path);
                var length = stat.size;
                var buf = new Uint8Array(length);
                FS.read(stream, buf, 0, length, 0);
                if (opts.encoding === "utf8") {
                    ret = UTF8ArrayToString(buf, 0)
                } else if (opts.encoding === "binary") {
                    ret = buf
                }
                FS.close(stream);
                return ret
            }
            ,
            writeFile: (path, data, opts={}) => {
                opts.flags = opts.flags || 577;
                var stream = FS.open(path, opts.flags, opts.mode);
                if (typeof data == "string") {
                    var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
                    var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
                    FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
                } else if (ArrayBuffer.isView(data)) {
                    FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
                } else {
                    throw new Error("Unsupported data type")
                }
                FS.close(stream)
            }
            ,
            cwd: () => FS.currentPath,
            chdir: path => {
                var lookup = FS.lookupPath(path, {
                    follow: true
                });
                if (lookup.node === null) {
                    throw new FS.ErrnoError(44)
                }
                if (!FS.isDir(lookup.node.mode)) {
                    throw new FS.ErrnoError(54)
                }
                var errCode = FS.nodePermissions(lookup.node, "x");
                if (errCode) {
                    throw new FS.ErrnoError(errCode)
                }
                FS.currentPath = lookup.path
            }
            ,
            createDefaultDirectories: () => {
                FS.mkdir("/tmp");
                FS.mkdir("/home");
                FS.mkdir("/home/web_user")
            }
            ,
            createDefaultDevices: () => {
                FS.mkdir("/dev");
                FS.registerDevice(FS.makedev(1, 3), {
                    read: () => 0,
                    write: (stream, buffer, offset, length, pos) => length
                });
                FS.mkdev("/dev/null", FS.makedev(1, 3));
                TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
                TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
                FS.mkdev("/dev/tty", FS.makedev(5, 0));
                FS.mkdev("/dev/tty1", FS.makedev(6, 0));
                var random_device = getRandomDevice();
                FS.createDevice("/dev", "random", random_device);
                FS.createDevice("/dev", "urandom", random_device);
                FS.mkdir("/dev/shm");
                FS.mkdir("/dev/shm/tmp")
            }
            ,
            createSpecialDirectories: () => {
                FS.mkdir("/proc");
                var proc_self = FS.mkdir("/proc/self");
                FS.mkdir("/proc/self/fd");
                FS.mount({
                    mount: () => {
                        var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
                        node.node_ops = {
                            lookup: (parent, name) => {
                                var fd = +name;
                                var stream = FS.getStream(fd);
                                if (!stream)
                                    throw new FS.ErrnoError(8);
                                var ret = {
                                    parent: null,
                                    mount: {
                                        mountpoint: "fake"
                                    },
                                    node_ops: {
                                        readlink: () => stream.path
                                    }
                                };
                                ret.parent = ret;
                                return ret
                            }
                        };
                        return node
                    }
                }, {}, "/proc/self/fd")
            }
            ,
            createStandardStreams: () => {
                if (Module["stdin"]) {
                    FS.createDevice("/dev", "stdin", Module["stdin"])
                } else {
                    FS.symlink("/dev/tty", "/dev/stdin")
                }
                if (Module["stdout"]) {
                    FS.createDevice("/dev", "stdout", null, Module["stdout"])
                } else {
                    FS.symlink("/dev/tty", "/dev/stdout")
                }
                if (Module["stderr"]) {
                    FS.createDevice("/dev", "stderr", null, Module["stderr"])
                } else {
                    FS.symlink("/dev/tty1", "/dev/stderr")
                }
                var stdin = FS.open("/dev/stdin", 0);
                var stdout = FS.open("/dev/stdout", 1);
                var stderr = FS.open("/dev/stderr", 1)
            }
            ,
            ensureErrnoError: () => {
                if (FS.ErrnoError)
                    return;
                FS.ErrnoError = function ErrnoError(errno, node) {
                    this.node = node;
                    this.setErrno = function(errno) {
                        this.errno = errno
                    }
                    ;
                    this.setErrno(errno);
                    this.message = "FS error"
                }
                ;
                FS.ErrnoError.prototype = new Error;
                FS.ErrnoError.prototype.constructor = FS.ErrnoError;
                [44].forEach(code => {
                    FS.genericErrors[code] = new FS.ErrnoError(code);
                    FS.genericErrors[code].stack = "<generic error, no stack>"
                }
                )
            }
            ,
            staticInit: () => {
                FS.ensureErrnoError();
                FS.nameTable = new Array(4096);
                FS.mount(MEMFS, {}, "/");
                FS.createDefaultDirectories();
                FS.createDefaultDevices();
                FS.createSpecialDirectories();
                FS.filesystems = {
                    "MEMFS": MEMFS
                }
            }
            ,
            init: (input, output, error) => {
                FS.init.initialized = true;
                FS.ensureErrnoError();
                Module["stdin"] = input || Module["stdin"];
                Module["stdout"] = output || Module["stdout"];
                Module["stderr"] = error || Module["stderr"];
                FS.createStandardStreams()
            }
            ,
            quit: () => {
                FS.init.initialized = false;
                for (var i = 0; i < FS.streams.length; i++) {
                    var stream = FS.streams[i];
                    if (!stream) {
                        continue
                    }
                    FS.close(stream)
                }
            }
            ,
            getMode: (canRead, canWrite) => {
                var mode = 0;
                if (canRead)
                    mode |= 292 | 73;
                if (canWrite)
                    mode |= 146;
                return mode
            }
            ,
            findObject: (path, dontResolveLastLink) => {
                var ret = FS.analyzePath(path, dontResolveLastLink);
                if (!ret.exists) {
                    return null
                }
                return ret.object
            }
            ,
            analyzePath: (path, dontResolveLastLink) => {
                try {
                    var lookup = FS.lookupPath(path, {
                        follow: !dontResolveLastLink
                    });
                    path = lookup.path
                } catch (e) {}
                var ret = {
                    isRoot: false,
                    exists: false,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: false,
                    parentPath: null,
                    parentObject: null
                };
                try {
                    var lookup = FS.lookupPath(path, {
                        parent: true
                    });
                    ret.parentExists = true;
                    ret.parentPath = lookup.path;
                    ret.parentObject = lookup.node;
                    ret.name = PATH.basename(path);
                    lookup = FS.lookupPath(path, {
                        follow: !dontResolveLastLink
                    });
                    ret.exists = true;
                    ret.path = lookup.path;
                    ret.object = lookup.node;
                    ret.name = lookup.node.name;
                    ret.isRoot = lookup.path === "/"
                } catch (e) {
                    ret.error = e.errno
                }
                return ret
            }
            ,
            createPath: (parent, path, canRead, canWrite) => {
                parent = typeof parent == "string" ? parent : FS.getPath(parent);
                var parts = path.split("/").reverse();
                while (parts.length) {
                    var part = parts.pop();
                    if (!part)
                        continue;
                    var current = PATH.join2(parent, part);
                    try {
                        FS.mkdir(current)
                    } catch (e) {}
                    parent = current
                }
                return current
            }
            ,
            createFile: (parent, name, properties, canRead, canWrite) => {
                var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
                var mode = FS.getMode(canRead, canWrite);
                return FS.create(path, mode)
            }
            ,
            createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
                var path = name;
                if (parent) {
                    parent = typeof parent == "string" ? parent : FS.getPath(parent);
                    path = name ? PATH.join2(parent, name) : parent
                }
                var mode = FS.getMode(canRead, canWrite);
                var node = FS.create(path, mode);
                if (data) {
                    if (typeof data == "string") {
                        var arr = new Array(data.length);
                        for (var i = 0, len = data.length; i < len; ++i)
                            arr[i] = data.charCodeAt(i);
                        data = arr
                    }
                    FS.chmod(node, mode | 146);
                    var stream = FS.open(node, 577);
                    FS.write(stream, data, 0, data.length, 0, canOwn);
                    FS.close(stream);
                    FS.chmod(node, mode)
                }
                return node
            }
            ,
            createDevice: (parent, name, input, output) => {
                var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
                var mode = FS.getMode(!!input, !!output);
                if (!FS.createDevice.major)
                    FS.createDevice.major = 64;
                var dev = FS.makedev(FS.createDevice.major++, 0);
                FS.registerDevice(dev, {
                    open: stream => {
                        stream.seekable = false
                    }
                    ,
                    close: stream => {
                        if (output && output.buffer && output.buffer.length) {
                            output(10)
                        }
                    }
                    ,
                    read: (stream, buffer, offset, length, pos) => {
                        var bytesRead = 0;
                        for (var i = 0; i < length; i++) {
                            var result;
                            try {
                                result = input()
                            } catch (e) {
                                throw new FS.ErrnoError(29)
                            }
                            if (result === undefined && bytesRead === 0) {
                                throw new FS.ErrnoError(6)
                            }
                            if (result === null || result === undefined)
                                break;
                            bytesRead++;
                            buffer[offset + i] = result
                        }
                        if (bytesRead) {
                            stream.node.timestamp = Date.now()
                        }
                        return bytesRead
                    }
                    ,
                    write: (stream, buffer, offset, length, pos) => {
                        for (var i = 0; i < length; i++) {
                            try {
                                output(buffer[offset + i])
                            } catch (e) {
                                throw new FS.ErrnoError(29)
                            }
                        }
                        if (length) {
                            stream.node.timestamp = Date.now()
                        }
                        return i
                    }
                });
                return FS.mkdev(path, mode, dev)
            }
            ,
            forceLoadFile: obj => {
                if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
                    return true;
                if (typeof XMLHttpRequest != "undefined") {
                    throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")
                } else if (read_) {
                    try {
                        obj.contents = intArrayFromString(read_(obj.url), true);
                        obj.usedBytes = obj.contents.length
                    } catch (e) {
                        throw new FS.ErrnoError(29)
                    }
                } else {
                    throw new Error("Cannot load without read() or XMLHttpRequest.")
                }
            }
            ,
            createLazyFile: (parent, name, url, canRead, canWrite) => {
                function LazyUint8Array() {
                    this.lengthKnown = false;
                    this.chunks = []
                }
                LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
                    if (idx > this.length - 1 || idx < 0) {
                        return undefined
                    }
                    var chunkOffset = idx % this.chunkSize;
                    var chunkNum = idx / this.chunkSize | 0;
                    return this.getter(chunkNum)[chunkOffset]
                }
                ;
                LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
                    this.getter = getter
                }
                ;
                LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
                    var xhr = new XMLHttpRequest;
                    xhr.open("HEAD", url, false);
                    xhr.send(null);
                    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                        throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                    var datalength = Number(xhr.getResponseHeader("Content-length"));
                    var header;
                    var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
                    var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
                    var chunkSize = 1024 * 1024;
                    if (!hasByteServing)
                        chunkSize = datalength;
                    var doXHR = (from, to) => {
                        if (from > to)
                            throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                        if (to > datalength - 1)
                            throw new Error("only " + datalength + " bytes available! programmer error!");
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", url, false);
                        if (datalength !== chunkSize)
                            xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                        xhr.responseType = "arraybuffer";
                        if (xhr.overrideMimeType) {
                            xhr.overrideMimeType("text/plain; charset=x-user-defined")
                        }
                        xhr.send(null);
                        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                            throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                        if (xhr.response !== undefined) {
                            return new Uint8Array(xhr.response || [])
                        }
                        return intArrayFromString(xhr.responseText || "", true)
                    }
                    ;
                    var lazyArray = this;
                    lazyArray.setDataGetter(chunkNum => {
                        var start = chunkNum * chunkSize;
                        var end = (chunkNum + 1) * chunkSize - 1;
                        end = Math.min(end, datalength - 1);
                        if (typeof lazyArray.chunks[chunkNum] == "undefined") {
                            lazyArray.chunks[chunkNum] = doXHR(start, end)
                        }
                        if (typeof lazyArray.chunks[chunkNum] == "undefined")
                            throw new Error("doXHR failed!");
                        return lazyArray.chunks[chunkNum]
                    }
                    );
                    if (usesGzip || !datalength) {
                        chunkSize = datalength = 1;
                        datalength = this.getter(0).length;
                        chunkSize = datalength;
                        out("LazyFiles on gzip forces download of the whole file when length is accessed")
                    }
                    this._length = datalength;
                    this._chunkSize = chunkSize;
                    this.lengthKnown = true
                }
                ;
                if (typeof XMLHttpRequest != "undefined") {
                    if (!ENVIRONMENT_IS_WORKER)
                        throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var lazyArray = new LazyUint8Array;
                    Object.defineProperties(lazyArray, {
                        length: {
                            get: function() {
                                if (!this.lengthKnown) {
                                    this.cacheLength()
                                }
                                return this._length
                            }
                        },
                        chunkSize: {
                            get: function() {
                                if (!this.lengthKnown) {
                                    this.cacheLength()
                                }
                                return this._chunkSize
                            }
                        }
                    });
                    var properties = {
                        isDevice: false,
                        contents: lazyArray
                    }
                } else {
                    var properties = {
                        isDevice: false,
                        url: url
                    }
                }
                var node = FS.createFile(parent, name, properties, canRead, canWrite);
                if (properties.contents) {
                    node.contents = properties.contents
                } else if (properties.url) {
                    node.contents = null;
                    node.url = properties.url
                }
                Object.defineProperties(node, {
                    usedBytes: {
                        get: function() {
                            return this.contents.length
                        }
                    }
                });
                var stream_ops = {};
                var keys = Object.keys(node.stream_ops);
                keys.forEach(key => {
                    var fn = node.stream_ops[key];
                    stream_ops[key] = function forceLoadLazyFile() {
                        FS.forceLoadFile(node);
                        return fn.apply(null, arguments)
                    }
                }
                );
                function writeChunks(stream, buffer, offset, length, position) {
                    var contents = stream.node.contents;
                    if (position >= contents.length)
                        return 0;
                    var size = Math.min(contents.length - position, length);
                    if (contents.slice) {
                        for (var i = 0; i < size; i++) {
                            buffer[offset + i] = contents[position + i]
                        }
                    } else {
                        for (var i = 0; i < size; i++) {
                            buffer[offset + i] = contents.get(position + i)
                        }
                    }
                    return size
                }
                stream_ops.read = (stream, buffer, offset, length, position) => {
                    FS.forceLoadFile(node);
                    return writeChunks(stream, buffer, offset, length, position)
                }
                ;
                stream_ops.mmap = (stream, length, position, prot, flags) => {
                    FS.forceLoadFile(node);
                    var ptr = mmapAlloc(length);
                    if (!ptr) {
                        throw new FS.ErrnoError(48)
                    }
                    writeChunks(stream, HEAP8, ptr, length, position);
                    return {
                        ptr: ptr,
                        allocated: true
                    }
                }
                ;
                node.stream_ops = stream_ops;
                return node
            }
            ,
            createPreloadedFile: (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
                var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
                var dep = getUniqueRunDependency("cp " + fullname);
                function processData(byteArray) {
                    function finish(byteArray) {
                        if (preFinish)
                            preFinish();
                        if (!dontCreateFile) {
                            FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
                        }
                        if (onload)
                            onload();
                        removeRunDependency(dep)
                    }
                    if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
                        if (onerror)
                            onerror();
                        removeRunDependency(dep)
                    }
                    )) {
                        return
                    }
                    finish(byteArray)
                }
                addRunDependency(dep);
                if (typeof url == "string") {
                    asyncLoad(url, byteArray => processData(byteArray), onerror)
                } else {
                    processData(url)
                }
            }
            ,
            indexedDB: () => {
                return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
            }
            ,
            DB_NAME: () => {
                return "EM_FS_" + window.location.pathname
            }
            ,
            DB_VERSION: 20,
            DB_STORE_NAME: "FILE_DATA",
            saveFilesToDB: (paths, onload, onerror) => {
                onload = onload || ( () => {}
                );
                onerror = onerror || ( () => {}
                );
                var indexedDB = FS.indexedDB();
                try {
                    var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
                } catch (e) {
                    return onerror(e)
                }
                openRequest.onupgradeneeded = () => {
                    out("creating db");
                    var db = openRequest.result;
                    db.createObjectStore(FS.DB_STORE_NAME)
                }
                ;
                openRequest.onsuccess = () => {
                    var db = openRequest.result;
                    var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
                    var files = transaction.objectStore(FS.DB_STORE_NAME);
                    var ok = 0
                      , fail = 0
                      , total = paths.length;
                    function finish() {
                        if (fail == 0)
                            onload();
                        else
                            onerror()
                    }
                    paths.forEach(path => {
                        var putRequest = files.put(FS.analyzePath(path).object.contents, path);
                        putRequest.onsuccess = () => {
                            ok++;
                            if (ok + fail == total)
                                finish()
                        }
                        ;
                        putRequest.onerror = () => {
                            fail++;
                            if (ok + fail == total)
                                finish()
                        }
                    }
                    );
                    transaction.onerror = onerror
                }
                ;
                openRequest.onerror = onerror
            }
            ,
            loadFilesFromDB: (paths, onload, onerror) => {
                onload = onload || ( () => {}
                );
                onerror = onerror || ( () => {}
                );
                var indexedDB = FS.indexedDB();
                try {
                    var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
                } catch (e) {
                    return onerror(e)
                }
                openRequest.onupgradeneeded = onerror;
                openRequest.onsuccess = () => {
                    var db = openRequest.result;
                    try {
                        var transaction = db.transaction([FS.DB_STORE_NAME], "readonly")
                    } catch (e) {
                        onerror(e);
                        return
                    }
                    var files = transaction.objectStore(FS.DB_STORE_NAME);
                    var ok = 0
                      , fail = 0
                      , total = paths.length;
                    function finish() {
                        if (fail == 0)
                            onload();
                        else
                            onerror()
                    }
                    paths.forEach(path => {
                        var getRequest = files.get(path);
                        getRequest.onsuccess = () => {
                            if (FS.analyzePath(path).exists) {
                                FS.unlink(path)
                            }
                            FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
                            ok++;
                            if (ok + fail == total)
                                finish()
                        }
                        ;
                        getRequest.onerror = () => {
                            fail++;
                            if (ok + fail == total)
                                finish()
                        }
                    }
                    );
                    transaction.onerror = onerror
                }
                ;
                openRequest.onerror = onerror
            }
        };
        var SYSCALLS = {
            DEFAULT_POLLMASK: 5,
            calculateAt: function(dirfd, path, allowEmpty) {
                if (PATH.isAbs(path)) {
                    return path
                }
                var dir;
                if (dirfd === -100) {
                    dir = FS.cwd()
                } else {
                    var dirstream = SYSCALLS.getStreamFromFD(dirfd);
                    dir = dirstream.path
                }
                if (path.length == 0) {
                    if (!allowEmpty) {
                        throw new FS.ErrnoError(44)
                    }
                    return dir
                }
                return PATH.join2(dir, path)
            },
            doStat: function(func, path, buf) {
                try {
                    var stat = func(path)
                } catch (e) {
                    if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
                        return -54
                    }
                    throw e
                }
                HEAP32[buf >> 2] = stat.dev;
                HEAP32[buf + 8 >> 2] = stat.ino;
                HEAP32[buf + 12 >> 2] = stat.mode;
                HEAPU32[buf + 16 >> 2] = stat.nlink;
                HEAP32[buf + 20 >> 2] = stat.uid;
                HEAP32[buf + 24 >> 2] = stat.gid;
                HEAP32[buf + 28 >> 2] = stat.rdev;
                tempI64 = [stat.size >>> 0, (tempDouble = stat.size,
                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                HEAP32[buf + 40 >> 2] = tempI64[0],
                HEAP32[buf + 44 >> 2] = tempI64[1];
                HEAP32[buf + 48 >> 2] = 4096;
                HEAP32[buf + 52 >> 2] = stat.blocks;
                var atime = stat.atime.getTime();
                var mtime = stat.mtime.getTime();
                var ctime = stat.ctime.getTime();
                tempI64 = [Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3),
                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                HEAP32[buf + 56 >> 2] = tempI64[0],
                HEAP32[buf + 60 >> 2] = tempI64[1];
                HEAPU32[buf + 64 >> 2] = atime % 1e3 * 1e3;
                tempI64 = [Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3),
                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                HEAP32[buf + 72 >> 2] = tempI64[0],
                HEAP32[buf + 76 >> 2] = tempI64[1];
                HEAPU32[buf + 80 >> 2] = mtime % 1e3 * 1e3;
                tempI64 = [Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3),
                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                HEAP32[buf + 88 >> 2] = tempI64[0],
                HEAP32[buf + 92 >> 2] = tempI64[1];
                HEAPU32[buf + 96 >> 2] = ctime % 1e3 * 1e3;
                tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino,
                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                HEAP32[buf + 104 >> 2] = tempI64[0],
                HEAP32[buf + 108 >> 2] = tempI64[1];
                return 0
            },
            doMsync: function(addr, stream, len, flags, offset) {
                if (!FS.isFile(stream.node.mode)) {
                    throw new FS.ErrnoError(43)
                }
                if (flags & 2) {
                    return 0
                }
                var buffer = HEAPU8.slice(addr, addr + len);
                FS.msync(stream, buffer, offset, len, flags)
            },
            varargs: undefined,
            get: function() {
                SYSCALLS.varargs += 4;
                var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
                return ret
            },
            getStr: function(ptr) {
                var ret = UTF8ToString(ptr);
                return ret
            },
            getStreamFromFD: function(fd) {
                var stream = FS.getStream(fd);
                if (!stream)
                    throw new FS.ErrnoError(8);
                return stream
            }
        };
        function _proc_exit(code) {
            EXITSTATUS = code;
            if (!keepRuntimeAlive()) {
                if (Module["onExit"])
                    Module["onExit"](code);
                ABORT = true
            }
            quit_(code, new ExitStatus(code))
        }
        function exitJS(status, implicit) {
            EXITSTATUS = status;
            _proc_exit(status)
        }
        var _exit = exitJS;
        function maybeExit() {}
        function setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) {
            assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
            Browser.mainLoop.func = browserIterationFunc;
            Browser.mainLoop.arg = arg;
            var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
            function checkIsRunning() {
                if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
                    maybeExit();
                    return false
                }
                return true
            }
            Browser.mainLoop.running = false;
            Browser.mainLoop.runner = function Browser_mainLoop_runner() {
                if (ABORT)
                    return;
                if (Browser.mainLoop.queue.length > 0) {
                    var start = Date.now();
                    var blocker = Browser.mainLoop.queue.shift();
                    blocker.func(blocker.arg);
                    if (Browser.mainLoop.remainingBlockers) {
                        var remaining = Browser.mainLoop.remainingBlockers;
                        var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
                        if (blocker.counted) {
                            Browser.mainLoop.remainingBlockers = next
                        } else {
                            next = next + .5;
                            Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9
                        }
                    }
                    out('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
                    Browser.mainLoop.updateStatus();
                    if (!checkIsRunning())
                        return;
                    setTimeout(Browser.mainLoop.runner, 0);
                    return
                }
                if (!checkIsRunning())
                    return;
                Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
                if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
                    Browser.mainLoop.scheduler();
                    return
                } else if (Browser.mainLoop.timingMode == 0) {
                    Browser.mainLoop.tickStartTime = _emscripten_get_now()
                }
                Browser.mainLoop.runIter(browserIterationFunc);
                if (!checkIsRunning())
                    return;
                if (typeof SDL == "object" && SDL.audio && SDL.audio.queueNewAudioData)
                    SDL.audio.queueNewAudioData();
                Browser.mainLoop.scheduler()
            }
            ;
            if (!noSetTiming) {
                if (fps && fps > 0)
                    _emscripten_set_main_loop_timing(0, 1e3 / fps);
                else
                    _emscripten_set_main_loop_timing(1, 1);
                Browser.mainLoop.scheduler()
            }
            if (simulateInfiniteLoop) {
                throw "unwind"
            }
        }
        var wasmTableMirror = [];
        function getWasmTableEntry(funcPtr) {
            var func = wasmTableMirror[funcPtr];
            if (!func) {
                if (funcPtr >= wasmTableMirror.length)
                    wasmTableMirror.length = funcPtr + 1;
                wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr)
            }
            return func
        }
        function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
            var browserIterationFunc = getWasmTableEntry(func);
            setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop)
        }
        function _emscripten_webgl_do_commit_frame() {
            if (!GL.currentContext || !GL.currentContext.GLctx) {
                return -3
            }
            if (!GL.currentContext.attributes.explicitSwapControl) {
                return -3
            }
            return 0
        }
        var _emscripten_webgl_commit_frame = _emscripten_webgl_do_commit_frame;
        function __webgl_enable_ANGLE_instanced_arrays(ctx) {
            var ext = ctx.getExtension("ANGLE_instanced_arrays");
            if (ext) {
                ctx["vertexAttribDivisor"] = function(index, divisor) {
                    ext["vertexAttribDivisorANGLE"](index, divisor)
                }
                ;
                ctx["drawArraysInstanced"] = function(mode, first, count, primcount) {
                    ext["drawArraysInstancedANGLE"](mode, first, count, primcount)
                }
                ;
                ctx["drawElementsInstanced"] = function(mode, count, type, indices, primcount) {
                    ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount)
                }
                ;
                return 1
            }
        }
        function __webgl_enable_OES_vertex_array_object(ctx) {
            var ext = ctx.getExtension("OES_vertex_array_object");
            if (ext) {
                ctx["createVertexArray"] = function() {
                    return ext["createVertexArrayOES"]()
                }
                ;
                ctx["deleteVertexArray"] = function(vao) {
                    ext["deleteVertexArrayOES"](vao)
                }
                ;
                ctx["bindVertexArray"] = function(vao) {
                    ext["bindVertexArrayOES"](vao)
                }
                ;
                ctx["isVertexArray"] = function(vao) {
                    return ext["isVertexArrayOES"](vao)
                }
                ;
                return 1
            }
        }
        function __webgl_enable_WEBGL_draw_buffers(ctx) {
            var ext = ctx.getExtension("WEBGL_draw_buffers");
            if (ext) {
                ctx["drawBuffers"] = function(n, bufs) {
                    ext["drawBuffersWEBGL"](n, bufs)
                }
                ;
                return 1
            }
        }
        function __webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(ctx) {
            return !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"))
        }
        function __webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(ctx) {
            return !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"))
        }
        function __webgl_enable_WEBGL_multi_draw(ctx) {
            return !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"))
        }
        var GL = {
            counter: 1,
            buffers: [],
            programs: [],
            framebuffers: [],
            renderbuffers: [],
            textures: [],
            shaders: [],
            vaos: [],
            contexts: [],
            offscreenCanvases: {},
            queries: [],
            samplers: [],
            transformFeedbacks: [],
            syncs: [],
            stringCache: {},
            stringiCache: {},
            unpackAlignment: 4,
            recordError: function recordError(errorCode) {
                if (!GL.lastError) {
                    GL.lastError = errorCode
                }
            },
            getNewId: function(table) {
                var ret = GL.counter++;
                for (var i = table.length; i < ret; i++) {
                    table[i] = null
                }
                return ret
            },
            getSource: function(shader, count, string, length) {
                var source = "";
                for (var i = 0; i < count; ++i) {
                    var len = length ? HEAP32[length + i * 4 >> 2] : -1;
                    source += UTF8ToString(HEAP32[string + i * 4 >> 2], len < 0 ? undefined : len)
                }
                return source
            },
            createContext: function(canvas, webGLContextAttributes) {
                if (!canvas.getContextSafariWebGL2Fixed) {
                    canvas.getContextSafariWebGL2Fixed = canvas.getContext;
                    function fixedGetContext(ver, attrs) {
                        var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
                        return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null
                    }
                    canvas.getContext = fixedGetContext
                }
                var ctx = webGLContextAttributes.majorVersion > 1 ? canvas.getContext("webgl2", webGLContextAttributes) : canvas.getContext("webgl", webGLContextAttributes);
                if (!ctx)
                    return 0;
                var handle = GL.registerContext(ctx, webGLContextAttributes);
                return handle
            },
            registerContext: function(ctx, webGLContextAttributes) {
                var handle = GL.getNewId(GL.contexts);
                var context = {
                    handle: handle,
                    attributes: webGLContextAttributes,
                    version: webGLContextAttributes.majorVersion,
                    GLctx: ctx
                };
                if (ctx.canvas)
                    ctx.canvas.GLctxObject = context;
                GL.contexts[handle] = context;
                if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
                    GL.initExtensions(context)
                }
                return handle
            },
            makeContextCurrent: function(contextHandle) {
                GL.currentContext = GL.contexts[contextHandle];
                Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx;
                return !(contextHandle && !GLctx)
            },
            getContext: function(contextHandle) {
                return GL.contexts[contextHandle]
            },
            deleteContext: function(contextHandle) {
                if (GL.currentContext === GL.contexts[contextHandle])
                    GL.currentContext = null;
                if (typeof JSEvents == "object")
                    JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
                if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas)
                    GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
                GL.contexts[contextHandle] = null
            },
            initExtensions: function(context) {
                if (!context)
                    context = GL.currentContext;
                if (context.initExtensionsDone)
                    return;
                context.initExtensionsDone = true;
                var GLctx = context.GLctx;
                __webgl_enable_ANGLE_instanced_arrays(GLctx);
                __webgl_enable_OES_vertex_array_object(GLctx);
                __webgl_enable_WEBGL_draw_buffers(GLctx);
                __webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
                __webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
                if (context.version >= 2) {
                    GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2")
                }
                if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
                    GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query")
                }
                __webgl_enable_WEBGL_multi_draw(GLctx);
                var exts = GLctx.getSupportedExtensions() || [];
                exts.forEach(function(ext) {
                    if (!ext.includes("lose_context") && !ext.includes("debug")) {
                        GLctx.getExtension(ext)
                    }
                })
            }
        };
        var __emscripten_webgl_power_preferences = ["default", "low-power", "high-performance"];
        function _emscripten_webgl_do_create_context(target, attributes) {
            var a = attributes >> 2;
            var powerPreference = HEAP32[a + (24 >> 2)];
            var contextAttributes = {
                "alpha": !!HEAP32[a + (0 >> 2)],
                "depth": !!HEAP32[a + (4 >> 2)],
                "stencil": !!HEAP32[a + (8 >> 2)],
                "antialias": !!HEAP32[a + (12 >> 2)],
                "premultipliedAlpha": !!HEAP32[a + (16 >> 2)],
                "preserveDrawingBuffer": !!HEAP32[a + (20 >> 2)],
                "powerPreference": __emscripten_webgl_power_preferences[powerPreference],
                "failIfMajorPerformanceCaveat": !!HEAP32[a + (28 >> 2)],
                majorVersion: HEAP32[a + (32 >> 2)],
                minorVersion: HEAP32[a + (36 >> 2)],
                enableExtensionsByDefault: HEAP32[a + (40 >> 2)],
                explicitSwapControl: HEAP32[a + (44 >> 2)],
                proxyContextToMainThread: HEAP32[a + (48 >> 2)],
                renderViaOffscreenBackBuffer: HEAP32[a + (52 >> 2)]
            };
            var canvas = findCanvasEventTarget(target);
            if (!canvas) {
                return 0
            }
            if (contextAttributes.explicitSwapControl) {
                return 0
            }
            var contextHandle = GL.createContext(canvas, contextAttributes);
            return contextHandle
        }
        var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;
        function _emscripten_webgl_init_context_attributes(attributes) {
            var a = attributes >> 2;
            for (var i = 0; i < 56 >> 2; ++i) {
                HEAP32[a + i] = 0
            }
            HEAP32[a + (0 >> 2)] = HEAP32[a + (4 >> 2)] = HEAP32[a + (12 >> 2)] = HEAP32[a + (16 >> 2)] = HEAP32[a + (32 >> 2)] = HEAP32[a + (40 >> 2)] = 1
        }
        function _emscripten_webgl_make_context_current(contextHandle) {
            var success = GL.makeContextCurrent(contextHandle);
            return success ? 0 : -5
        }
        var ENV = {};
        function getExecutableName() {
            return thisProgram || "./this.program"
        }
        function getEnvStrings() {
            if (!getEnvStrings.strings) {
                var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
                var env = {
                    "USER": "web_user",
                    "LOGNAME": "web_user",
                    "PATH": "/",
                    "PWD": "/",
                    "HOME": "/home/web_user",
                    "LANG": lang,
                    "_": getExecutableName()
                };
                for (var x in ENV) {
                    if (ENV[x] === undefined)
                        delete env[x];
                    else
                        env[x] = ENV[x]
                }
                var strings = [];
                for (var x in env) {
                    strings.push(x + "=" + env[x])
                }
                getEnvStrings.strings = strings
            }
            return getEnvStrings.strings
        }
        function writeAsciiToMemory(str, buffer, dontAddNull) {
            for (var i = 0; i < str.length; ++i) {
                HEAP8[buffer++ >> 0] = str.charCodeAt(i)
            }
            if (!dontAddNull)
                HEAP8[buffer >> 0] = 0
        }
        function _environ_get(__environ, environ_buf) {
            var bufSize = 0;
            getEnvStrings().forEach(function(string, i) {
                var ptr = environ_buf + bufSize;
                HEAPU32[__environ + i * 4 >> 2] = ptr;
                writeAsciiToMemory(string, ptr);
                bufSize += string.length + 1
            });
            return 0
        }
        function _environ_sizes_get(penviron_count, penviron_buf_size) {
            var strings = getEnvStrings();
            HEAPU32[penviron_count >> 2] = strings.length;
            var bufSize = 0;
            strings.forEach(function(string) {
                bufSize += string.length + 1
            });
            HEAPU32[penviron_buf_size >> 2] = bufSize;
            return 0
        }
        function _fd_close(fd) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                FS.close(stream);
                return 0
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno
            }
        }
        function doReadv(stream, iov, iovcnt, offset) {
            var ret = 0;
            for (var i = 0; i < iovcnt; i++) {
                var ptr = HEAPU32[iov >> 2];
                var len = HEAPU32[iov + 4 >> 2];
                iov += 8;
                var curr = FS.read(stream, HEAP8, ptr, len, offset);
                if (curr < 0)
                    return -1;
                ret += curr;
                if (curr < len)
                    break
            }
            return ret
        }
        function _fd_read(fd, iov, iovcnt, pnum) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var num = doReadv(stream, iov, iovcnt);
                HEAPU32[pnum >> 2] = num;
                return 0
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno
            }
        }
        var MAX_INT53 = 9007199254740992;
        var MIN_INT53 = -9007199254740992;
        function bigintToI53Checked(num) {
            return num < MIN_INT53 || num > MAX_INT53 ? NaN : Number(num)
        }
        function _fd_seek(fd, offset, whence, newOffset) {
            try {
                offset = bigintToI53Checked(offset);
                if (isNaN(offset))
                    return 61;
                var stream = SYSCALLS.getStreamFromFD(fd);
                FS.llseek(stream, offset, whence);
                tempI64 = [stream.position >>> 0, (tempDouble = stream.position,
                +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
                HEAP32[newOffset >> 2] = tempI64[0],
                HEAP32[newOffset + 4 >> 2] = tempI64[1];
                if (stream.getdents && offset === 0 && whence === 0)
                    stream.getdents = null;
                return 0
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno
            }
        }
        function doWritev(stream, iov, iovcnt, offset) {
            var ret = 0;
            for (var i = 0; i < iovcnt; i++) {
                var ptr = HEAPU32[iov >> 2];
                var len = HEAPU32[iov + 4 >> 2];
                iov += 8;
                var curr = FS.write(stream, HEAP8, ptr, len, offset);
                if (curr < 0)
                    return -1;
                ret += curr
            }
            return ret
        }
        function _fd_write(fd, iov, iovcnt, pnum) {
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var num = doWritev(stream, iov, iovcnt);
                HEAPU32[pnum >> 2] = num;
                return 0
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno
            }
        }
        function _glActiveTexture(x0) {
            GLctx["activeTexture"](x0)
        }
        function _glAttachShader(program, shader) {
            GLctx.attachShader(GL.programs[program], GL.shaders[shader])
        }
        function _glBindBuffer(target, buffer) {
            if (target == 35051) {
                GLctx.currentPixelPackBufferBinding = buffer
            } else if (target == 35052) {
                GLctx.currentPixelUnpackBufferBinding = buffer
            }
            GLctx.bindBuffer(target, GL.buffers[buffer])
        }
        function _glBindFramebuffer(target, framebuffer) {
            GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer])
        }
        function _glBindRenderbuffer(target, renderbuffer) {
            GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer])
        }
        function _glBindTexture(target, texture) {
            GLctx.bindTexture(target, GL.textures[texture])
        }
        function _glBindVertexArray(vao) {
            GLctx["bindVertexArray"](GL.vaos[vao])
        }
        function _glBufferData(target, size, data, usage) {
            if (GL.currentContext.version >= 2) {
                if (data && size) {
                    GLctx.bufferData(target, HEAPU8, usage, data, size)
                } else {
                    GLctx.bufferData(target, size, usage)
                }
            } else {
                GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage)
            }
        }
        function _glCheckFramebufferStatus(x0) {
            return GLctx["checkFramebufferStatus"](x0)
        }
        function _glClear(x0) {
            GLctx["clear"](x0)
        }
        function _glClearColor(x0, x1, x2, x3) {
            GLctx["clearColor"](x0, x1, x2, x3)
        }
        function _glCompileShader(shader) {
            GLctx.compileShader(GL.shaders[shader])
        }
        function _glCreateProgram() {
            var id = GL.getNewId(GL.programs);
            var program = GLctx.createProgram();
            program.name = id;
            program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
            program.uniformIdCounter = 1;
            GL.programs[id] = program;
            return id
        }
        function _glCreateShader(shaderType) {
            var id = GL.getNewId(GL.shaders);
            GL.shaders[id] = GLctx.createShader(shaderType);
            return id
        }
        function _glDeleteShader(id) {
            if (!id)
                return;
            var shader = GL.shaders[id];
            if (!shader) {
                GL.recordError(1281);
                return
            }
            GLctx.deleteShader(shader);
            GL.shaders[id] = null
        }
        function _glDepthFunc(x0) {
            GLctx["depthFunc"](x0)
        }
        function _glDrawArrays(mode, first, count) {
            GLctx.drawArrays(mode, first, count)
        }
        var tempFixedLengthArray = [];
        function _glDrawBuffers(n, bufs) {
            var bufArray = tempFixedLengthArray[n];
            for (var i = 0; i < n; i++) {
                bufArray[i] = HEAP32[bufs + i * 4 >> 2]
            }
            GLctx["drawBuffers"](bufArray)
        }
        function _glDrawElements(mode, count, type, indices) {
            GLctx.drawElements(mode, count, type, indices)
        }
        function _glEnable(x0) {
            GLctx["enable"](x0)
        }
        function _glEnableVertexAttribArray(index) {
            GLctx.enableVertexAttribArray(index)
        }
        function _glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
            GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer])
        }
        function _glFramebufferTexture2D(target, attachment, textarget, texture, level) {
            GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level)
        }
        function _glFrontFace(x0) {
            GLctx["frontFace"](x0)
        }
        function __glGenObject(n, buffers, createFunction, objectTable) {
            for (var i = 0; i < n; i++) {
                var buffer = GLctx[createFunction]();
                var id = buffer && GL.getNewId(objectTable);
                if (buffer) {
                    buffer.name = id;
                    objectTable[id] = buffer
                } else {
                    GL.recordError(1282)
                }
                HEAP32[buffers + i * 4 >> 2] = id
            }
        }
        function _glGenBuffers(n, buffers) {
            __glGenObject(n, buffers, "createBuffer", GL.buffers)
        }
        function _glGenFramebuffers(n, ids) {
            __glGenObject(n, ids, "createFramebuffer", GL.framebuffers)
        }
        function _glGenRenderbuffers(n, renderbuffers) {
            __glGenObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers)
        }
        function _glGenTextures(n, textures) {
            __glGenObject(n, textures, "createTexture", GL.textures)
        }
        function _glGenVertexArrays(n, arrays) {
            __glGenObject(n, arrays, "createVertexArray", GL.vaos)
        }
        function _glGenerateMipmap(x0) {
            GLctx["generateMipmap"](x0)
        }
        function _glGetAttribLocation(program, name) {
            return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name))
        }
        function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
            var log = GLctx.getProgramInfoLog(GL.programs[program]);
            if (log === null)
                log = "(unknown error)";
            var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
            if (length)
                HEAP32[length >> 2] = numBytesWrittenExclNull
        }
        function _glGetProgramiv(program, pname, p) {
            if (!p) {
                GL.recordError(1281);
                return
            }
            if (program >= GL.counter) {
                GL.recordError(1281);
                return
            }
            program = GL.programs[program];
            if (pname == 35716) {
                var log = GLctx.getProgramInfoLog(program);
                if (log === null)
                    log = "(unknown error)";
                HEAP32[p >> 2] = log.length + 1
            } else if (pname == 35719) {
                if (!program.maxUniformLength) {
                    for (var i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
                        program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length + 1)
                    }
                }
                HEAP32[p >> 2] = program.maxUniformLength
            } else if (pname == 35722) {
                if (!program.maxAttributeLength) {
                    for (var i = 0; i < GLctx.getProgramParameter(program, 35721); ++i) {
                        program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length + 1)
                    }
                }
                HEAP32[p >> 2] = program.maxAttributeLength
            } else if (pname == 35381) {
                if (!program.maxUniformBlockNameLength) {
                    for (var i = 0; i < GLctx.getProgramParameter(program, 35382); ++i) {
                        program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length + 1)
                    }
                }
                HEAP32[p >> 2] = program.maxUniformBlockNameLength
            } else {
                HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname)
            }
        }
        function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
            var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
            if (log === null)
                log = "(unknown error)";
            var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
            if (length)
                HEAP32[length >> 2] = numBytesWrittenExclNull
        }
        function _glGetShaderiv(shader, pname, p) {
            if (!p) {
                GL.recordError(1281);
                return
            }
            if (pname == 35716) {
                var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
                if (log === null)
                    log = "(unknown error)";
                var logLength = log ? log.length + 1 : 0;
                HEAP32[p >> 2] = logLength
            } else if (pname == 35720) {
                var source = GLctx.getShaderSource(GL.shaders[shader]);
                var sourceLength = source ? source.length + 1 : 0;
                HEAP32[p >> 2] = sourceLength
            } else {
                HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname)
            }
        }
        function stringToNewUTF8(jsString) {
            var length = lengthBytesUTF8(jsString) + 1;
            var cString = _malloc(length);
            stringToUTF8(jsString, cString, length);
            return cString
        }
        function _glGetString(name_) {
            var ret = GL.stringCache[name_];
            if (!ret) {
                switch (name_) {
                case 7939:
                    var exts = GLctx.getSupportedExtensions() || [];
                    exts = exts.concat(exts.map(function(e) {
                        return "GL_" + e
                    }));
                    ret = stringToNewUTF8(exts.join(" "));
                    break;
                case 7936:
                case 7937:
                case 37445:
                case 37446:
                    var s = GLctx.getParameter(name_);
                    if (!s) {
                        GL.recordError(1280)
                    }
                    ret = s && stringToNewUTF8(s);
                    break;
                case 7938:
                    var glVersion = GLctx.getParameter(7938);
                    if (GL.currentContext.version >= 2)
                        glVersion = "OpenGL ES 3.0 (" + glVersion + ")";
                    else {
                        glVersion = "OpenGL ES 2.0 (" + glVersion + ")"
                    }
                    ret = stringToNewUTF8(glVersion);
                    break;
                case 35724:
                    var glslVersion = GLctx.getParameter(35724);
                    var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
                    var ver_num = glslVersion.match(ver_re);
                    if (ver_num !== null) {
                        if (ver_num[1].length == 3)
                            ver_num[1] = ver_num[1] + "0";
                        glslVersion = "OpenGL ES GLSL ES " + ver_num[1] + " (" + glslVersion + ")"
                    }
                    ret = stringToNewUTF8(glslVersion);
                    break;
                default:
                    GL.recordError(1280)
                }
                GL.stringCache[name_] = ret
            }
            return ret
        }
        function jstoi_q(str) {
            return parseInt(str)
        }
        function webglGetLeftBracePos(name) {
            return name.slice(-1) == "]" && name.lastIndexOf("[")
        }
        function webglPrepareUniformLocationsBeforeFirstUse(program) {
            var uniformLocsById = program.uniformLocsById, uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, i, j;
            if (!uniformLocsById) {
                program.uniformLocsById = uniformLocsById = {};
                program.uniformArrayNamesById = {};
                for (i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
                    var u = GLctx.getActiveUniform(program, i);
                    var nm = u.name;
                    var sz = u.size;
                    var lb = webglGetLeftBracePos(nm);
                    var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
                    var id = program.uniformIdCounter;
                    program.uniformIdCounter += sz;
                    uniformSizeAndIdsByName[arrayName] = [sz, id];
                    for (j = 0; j < sz; ++j) {
                        uniformLocsById[id] = j;
                        program.uniformArrayNamesById[id++] = arrayName
                    }
                }
            }
        }
        function _glGetUniformLocation(program, name) {
            name = UTF8ToString(name);
            if (program = GL.programs[program]) {
                webglPrepareUniformLocationsBeforeFirstUse(program);
                var uniformLocsById = program.uniformLocsById;
                var arrayIndex = 0;
                var uniformBaseName = name;
                var leftBrace = webglGetLeftBracePos(name);
                if (leftBrace > 0) {
                    arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
                    uniformBaseName = name.slice(0, leftBrace)
                }
                var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
                if (sizeAndId && arrayIndex < sizeAndId[0]) {
                    arrayIndex += sizeAndId[1];
                    if (uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name)) {
                        return arrayIndex
                    }
                }
            } else {
                GL.recordError(1281)
            }
            return -1
        }
        function _glLinkProgram(program) {
            program = GL.programs[program];
            GLctx.linkProgram(program);
            program.uniformLocsById = 0;
            program.uniformSizeAndIdsByName = {}
        }
        function computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
            function roundedToNextMultipleOf(x, y) {
                return x + y - 1 & -y
            }
            var plainRowSize = width * sizePerPixel;
            var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
            return height * alignedRowSize
        }
        function __colorChannelsInGlTextureFormat(format) {
            var colorChannels = {
                5: 3,
                6: 4,
                8: 2,
                29502: 3,
                29504: 4,
                26917: 2,
                26918: 2,
                29846: 3,
                29847: 4
            };
            return colorChannels[format - 6402] || 1
        }
        function heapObjectForWebGLType(type) {
            type -= 5120;
            if (type == 0)
                return HEAP8;
            if (type == 1)
                return HEAPU8;
            if (type == 2)
                return HEAP16;
            if (type == 4)
                return HEAP32;
            if (type == 6)
                return HEAPF32;
            if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782)
                return HEAPU32;
            return HEAPU16
        }
        function heapAccessShiftForWebGLHeap(heap) {
            return 31 - Math.clz32(heap.BYTES_PER_ELEMENT)
        }
        function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
            var heap = heapObjectForWebGLType(type);
            var shift = heapAccessShiftForWebGLHeap(heap);
            var byteSize = 1 << shift;
            var sizePerPixel = __colorChannelsInGlTextureFormat(format) * byteSize;
            var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
            return heap.subarray(pixels >> shift, pixels + bytes >> shift)
        }
        function _glReadPixels(x, y, width, height, format, type, pixels) {
            if (GL.currentContext.version >= 2) {
                if (GLctx.currentPixelPackBufferBinding) {
                    GLctx.readPixels(x, y, width, height, format, type, pixels)
                } else {
                    var heap = heapObjectForWebGLType(type);
                    GLctx.readPixels(x, y, width, height, format, type, heap, pixels >> heapAccessShiftForWebGLHeap(heap))
                }
                return
            }
            var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
            if (!pixelData) {
                GL.recordError(1280);
                return
            }
            GLctx.readPixels(x, y, width, height, format, type, pixelData)
        }
        function _glRenderbufferStorage(x0, x1, x2, x3) {
            GLctx["renderbufferStorage"](x0, x1, x2, x3)
        }
        function _glShaderSource(shader, count, string, length) {
            var source = GL.getSource(shader, count, string, length);
            GLctx.shaderSource(GL.shaders[shader], source)
        }
        function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
            if (GL.currentContext.version >= 2) {
                if (GLctx.currentPixelUnpackBufferBinding) {
                    GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels)
                } else if (pixels) {
                    var heap = heapObjectForWebGLType(type);
                    GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, pixels >> heapAccessShiftForWebGLHeap(heap))
                } else {
                    GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, null)
                }
                return
            }
            GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null)
        }
        function _glTexParameteri(x0, x1, x2) {
            GLctx["texParameteri"](x0, x1, x2)
        }
        function _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
            if (GL.currentContext.version >= 2) {
                if (GLctx.currentPixelUnpackBufferBinding) {
                    GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels)
                } else if (pixels) {
                    var heap = heapObjectForWebGLType(type);
                    GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, heap, pixels >> heapAccessShiftForWebGLHeap(heap))
                } else {
                    GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, null)
                }
                return
            }
            var pixelData = null;
            if (pixels)
                pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0);
            GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData)
        }
        function webglGetUniformLocation(location) {
            var p = GLctx.currentProgram;
            if (p) {
                var webglLoc = p.uniformLocsById[location];
                if (typeof webglLoc == "number") {
                    p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? "[" + webglLoc + "]" : ""))
                }
                return webglLoc
            } else {
                GL.recordError(1282)
            }
        }
        function _glUniform1f(location, v0) {
            GLctx.uniform1f(webglGetUniformLocation(location), v0)
        }
        var miniTempWebGLFloatBuffers = [];
        function _glUniform1fv(location, count, value) {
            if (GL.currentContext.version >= 2) {
                count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count);
                return
            }
            if (count <= 288) {
                var view = miniTempWebGLFloatBuffers[count - 1];
                for (var i = 0; i < count; ++i) {
                    view[i] = HEAPF32[value + 4 * i >> 2]
                }
            } else {
                var view = HEAPF32.subarray(value >> 2, value + count * 4 >> 2)
            }
            GLctx.uniform1fv(webglGetUniformLocation(location), view)
        }
        function _glUniform1i(location, v0) {
            GLctx.uniform1i(webglGetUniformLocation(location), v0)
        }
        function _glUniform3fv(location, count, value) {
            if (GL.currentContext.version >= 2) {
                count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 3);
                return
            }
            if (count <= 96) {
                var view = miniTempWebGLFloatBuffers[3 * count - 1];
                for (var i = 0; i < 3 * count; i += 3) {
                    view[i] = HEAPF32[value + 4 * i >> 2];
                    view[i + 1] = HEAPF32[value + (4 * i + 4) >> 2];
                    view[i + 2] = HEAPF32[value + (4 * i + 8) >> 2]
                }
            } else {
                var view = HEAPF32.subarray(value >> 2, value + count * 12 >> 2)
            }
            GLctx.uniform3fv(webglGetUniformLocation(location), view)
        }
        function _glUniformMatrix4fv(location, count, transpose, value) {
            if (GL.currentContext.version >= 2) {
                count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 16);
                return
            }
            if (count <= 18) {
                var view = miniTempWebGLFloatBuffers[16 * count - 1];
                var heap = HEAPF32;
                value >>= 2;
                for (var i = 0; i < 16 * count; i += 16) {
                    var dst = value + i;
                    view[i] = heap[dst];
                    view[i + 1] = heap[dst + 1];
                    view[i + 2] = heap[dst + 2];
                    view[i + 3] = heap[dst + 3];
                    view[i + 4] = heap[dst + 4];
                    view[i + 5] = heap[dst + 5];
                    view[i + 6] = heap[dst + 6];
                    view[i + 7] = heap[dst + 7];
                    view[i + 8] = heap[dst + 8];
                    view[i + 9] = heap[dst + 9];
                    view[i + 10] = heap[dst + 10];
                    view[i + 11] = heap[dst + 11];
                    view[i + 12] = heap[dst + 12];
                    view[i + 13] = heap[dst + 13];
                    view[i + 14] = heap[dst + 14];
                    view[i + 15] = heap[dst + 15]
                }
            } else {
                var view = HEAPF32.subarray(value >> 2, value + count * 64 >> 2)
            }
            GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view)
        }
        function _glUseProgram(program) {
            program = GL.programs[program];
            GLctx.useProgram(program);
            GLctx.currentProgram = program
        }
        function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
            GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
        }
        function _glViewport(x0, x1, x2, x3) {
            GLctx["viewport"](x0, x1, x2, x3)
        }
        function __isLeapYear(year) {
            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
        }
        function __arraySum(array, index) {
            var sum = 0;
            for (var i = 0; i <= index; sum += array[i++]) {}
            return sum
        }
        var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function __addDays(date, days) {
            var newDate = new Date(date.getTime());
            while (days > 0) {
                var leap = __isLeapYear(newDate.getFullYear());
                var currentMonth = newDate.getMonth();
                var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
                if (days > daysInCurrentMonth - newDate.getDate()) {
                    days -= daysInCurrentMonth - newDate.getDate() + 1;
                    newDate.setDate(1);
                    if (currentMonth < 11) {
                        newDate.setMonth(currentMonth + 1)
                    } else {
                        newDate.setMonth(0);
                        newDate.setFullYear(newDate.getFullYear() + 1)
                    }
                } else {
                    newDate.setDate(newDate.getDate() + days);
                    return newDate
                }
            }
            return newDate
        }
        function writeArrayToMemory(array, buffer) {
            HEAP8.set(array, buffer)
        }
        function _strftime(s, maxsize, format, tm) {
            var tm_zone = HEAP32[tm + 40 >> 2];
            var date = {
                tm_sec: HEAP32[tm >> 2],
                tm_min: HEAP32[tm + 4 >> 2],
                tm_hour: HEAP32[tm + 8 >> 2],
                tm_mday: HEAP32[tm + 12 >> 2],
                tm_mon: HEAP32[tm + 16 >> 2],
                tm_year: HEAP32[tm + 20 >> 2],
                tm_wday: HEAP32[tm + 24 >> 2],
                tm_yday: HEAP32[tm + 28 >> 2],
                tm_isdst: HEAP32[tm + 32 >> 2],
                tm_gmtoff: HEAP32[tm + 36 >> 2],
                tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
            };
            var pattern = UTF8ToString(format);
            var EXPANSION_RULES_1 = {
                "%c": "%a %b %d %H:%M:%S %Y",
                "%D": "%m/%d/%y",
                "%F": "%Y-%m-%d",
                "%h": "%b",
                "%r": "%I:%M:%S %p",
                "%R": "%H:%M",
                "%T": "%H:%M:%S",
                "%x": "%m/%d/%y",
                "%X": "%H:%M:%S",
                "%Ec": "%c",
                "%EC": "%C",
                "%Ex": "%m/%d/%y",
                "%EX": "%H:%M:%S",
                "%Ey": "%y",
                "%EY": "%Y",
                "%Od": "%d",
                "%Oe": "%e",
                "%OH": "%H",
                "%OI": "%I",
                "%Om": "%m",
                "%OM": "%M",
                "%OS": "%S",
                "%Ou": "%u",
                "%OU": "%U",
                "%OV": "%V",
                "%Ow": "%w",
                "%OW": "%W",
                "%Oy": "%y"
            };
            for (var rule in EXPANSION_RULES_1) {
                pattern = pattern.replace(new RegExp(rule,"g"), EXPANSION_RULES_1[rule])
            }
            var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            function leadingSomething(value, digits, character) {
                var str = typeof value == "number" ? value.toString() : value || "";
                while (str.length < digits) {
                    str = character[0] + str
                }
                return str
            }
            function leadingNulls(value, digits) {
                return leadingSomething(value, digits, "0")
            }
            function compareByDay(date1, date2) {
                function sgn(value) {
                    return value < 0 ? -1 : value > 0 ? 1 : 0
                }
                var compare;
                if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
                    if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
                        compare = sgn(date1.getDate() - date2.getDate())
                    }
                }
                return compare
            }
            function getFirstWeekStartDate(janFourth) {
                switch (janFourth.getDay()) {
                case 0:
                    return new Date(janFourth.getFullYear() - 1,11,29);
                case 1:
                    return janFourth;
                case 2:
                    return new Date(janFourth.getFullYear(),0,3);
                case 3:
                    return new Date(janFourth.getFullYear(),0,2);
                case 4:
                    return new Date(janFourth.getFullYear(),0,1);
                case 5:
                    return new Date(janFourth.getFullYear() - 1,11,31);
                case 6:
                    return new Date(janFourth.getFullYear() - 1,11,30)
                }
            }
            function getWeekBasedYear(date) {
                var thisDate = __addDays(new Date(date.tm_year + 1900,0,1), date.tm_yday);
                var janFourthThisYear = new Date(thisDate.getFullYear(),0,4);
                var janFourthNextYear = new Date(thisDate.getFullYear() + 1,0,4);
                var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
                var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
                if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
                    if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                        return thisDate.getFullYear() + 1
                    }
                    return thisDate.getFullYear()
                }
                return thisDate.getFullYear() - 1
            }
            var EXPANSION_RULES_2 = {
                "%a": function(date) {
                    return WEEKDAYS[date.tm_wday].substring(0, 3)
                },
                "%A": function(date) {
                    return WEEKDAYS[date.tm_wday]
                },
                "%b": function(date) {
                    return MONTHS[date.tm_mon].substring(0, 3)
                },
                "%B": function(date) {
                    return MONTHS[date.tm_mon]
                },
                "%C": function(date) {
                    var year = date.tm_year + 1900;
                    return leadingNulls(year / 100 | 0, 2)
                },
                "%d": function(date) {
                    return leadingNulls(date.tm_mday, 2)
                },
                "%e": function(date) {
                    return leadingSomething(date.tm_mday, 2, " ")
                },
                "%g": function(date) {
                    return getWeekBasedYear(date).toString().substring(2)
                },
                "%G": function(date) {
                    return getWeekBasedYear(date)
                },
                "%H": function(date) {
                    return leadingNulls(date.tm_hour, 2)
                },
                "%I": function(date) {
                    var twelveHour = date.tm_hour;
                    if (twelveHour == 0)
                        twelveHour = 12;
                    else if (twelveHour > 12)
                        twelveHour -= 12;
                    return leadingNulls(twelveHour, 2)
                },
                "%j": function(date) {
                    return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3)
                },
                "%m": function(date) {
                    return leadingNulls(date.tm_mon + 1, 2)
                },
                "%M": function(date) {
                    return leadingNulls(date.tm_min, 2)
                },
                "%n": function() {
                    return "\n"
                },
                "%p": function(date) {
                    if (date.tm_hour >= 0 && date.tm_hour < 12) {
                        return "AM"
                    }
                    return "PM"
                },
                "%S": function(date) {
                    return leadingNulls(date.tm_sec, 2)
                },
                "%t": function() {
                    return "\t"
                },
                "%u": function(date) {
                    return date.tm_wday || 7
                },
                "%U": function(date) {
                    var days = date.tm_yday + 7 - date.tm_wday;
                    return leadingNulls(Math.floor(days / 7), 2)
                },
                "%V": function(date) {
                    var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
                    if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
                        val++
                    }
                    if (!val) {
                        val = 52;
                        var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
                        if (dec31 == 4 || dec31 == 5 && __isLeapYear(date.tm_year % 400 - 1)) {
                            val++
                        }
                    } else if (val == 53) {
                        var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
                        if (jan1 != 4 && (jan1 != 3 || !__isLeapYear(date.tm_year)))
                            val = 1
                    }
                    return leadingNulls(val, 2)
                },
                "%w": function(date) {
                    return date.tm_wday
                },
                "%W": function(date) {
                    var days = date.tm_yday + 7 - (date.tm_wday + 6) % 7;
                    return leadingNulls(Math.floor(days / 7), 2)
                },
                "%y": function(date) {
                    return (date.tm_year + 1900).toString().substring(2)
                },
                "%Y": function(date) {
                    return date.tm_year + 1900
                },
                "%z": function(date) {
                    var off = date.tm_gmtoff;
                    var ahead = off >= 0;
                    off = Math.abs(off) / 60;
                    off = off / 60 * 100 + off % 60;
                    return (ahead ? "+" : "-") + String("0000" + off).slice(-4)
                },
                "%Z": function(date) {
                    return date.tm_zone
                },
                "%%": function() {
                    return "%"
                }
            };
            pattern = pattern.replace(/%%/g, "\0\0");
            for (var rule in EXPANSION_RULES_2) {
                if (pattern.includes(rule)) {
                    pattern = pattern.replace(new RegExp(rule,"g"), EXPANSION_RULES_2[rule](date))
                }
            }
            pattern = pattern.replace(/\0\0/g, "%");
            var bytes = intArrayFromString(pattern, false);
            if (bytes.length > maxsize) {
                return 0
            }
            writeArrayToMemory(bytes, s);
            return bytes.length - 1
        }
        function _strftime_l(s, maxsize, format, tm, loc) {
            return _strftime(s, maxsize, format, tm)
        }
        embind_init_charCodes();
        BindingError = Module["BindingError"] = extendError(Error, "BindingError");
        InternalError = Module["InternalError"] = extendError(Error, "InternalError");
        init_emval();
        Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas) {
            Browser.requestFullscreen(lockPointer, resizeCanvas)
        }
        ;
        Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
            Browser.requestAnimationFrame(func)
        }
        ;
        Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
            Browser.setCanvasSize(width, height, noUpdates)
        }
        ;
        Module["pauseMainLoop"] = function Module_pauseMainLoop() {
            Browser.mainLoop.pause()
        }
        ;
        Module["resumeMainLoop"] = function Module_resumeMainLoop() {
            Browser.mainLoop.resume()
        }
        ;
        Module["getUserMedia"] = function Module_getUserMedia() {
            Browser.getUserMedia()
        }
        ;
        Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
            return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes)
        }
        ;
        var preloadedImages = {};
        var preloadedAudios = {};
        var FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
                parent = this
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev
        };
        var readMode = 292 | 73;
        var writeMode = 146;
        Object.defineProperties(FSNode.prototype, {
            read: {
                get: function() {
                    return (this.mode & readMode) === readMode
                },
                set: function(val) {
                    val ? this.mode |= readMode : this.mode &= ~readMode
                }
            },
            write: {
                get: function() {
                    return (this.mode & writeMode) === writeMode
                },
                set: function(val) {
                    val ? this.mode |= writeMode : this.mode &= ~writeMode
                }
            },
            isFolder: {
                get: function() {
                    return FS.isDir(this.mode)
                }
            },
            isDevice: {
                get: function() {
                    return FS.isChrdev(this.mode)
                }
            }
        });
        FS.FSNode = FSNode;
        FS.staticInit();
        var GLctx;
        for (var i = 0; i < 32; ++i)
            tempFixedLengthArray.push(new Array(i));
        var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
        for (var i = 0; i < 288; ++i) {
            miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i + 1)
        }
        var asmLibraryArg = {
            "__assert_fail": ___assert_fail,
            "__cxa_throw": ___cxa_throw,
            "_embind_register_bigint": __embind_register_bigint,
            "_embind_register_bool": __embind_register_bool,
            "_embind_register_emval": __embind_register_emval,
            "_embind_register_float": __embind_register_float,
            "_embind_register_integer": __embind_register_integer,
            "_embind_register_memory_view": __embind_register_memory_view,
            "_embind_register_std_string": __embind_register_std_string,
            "_embind_register_std_wstring": __embind_register_std_wstring,
            "_embind_register_void": __embind_register_void,
            "_emscripten_get_now_is_monotonic": __emscripten_get_now_is_monotonic,
            "abort": _abort,
            "emscripten_asm_const_int": _emscripten_asm_const_int,
            "emscripten_date_now": _emscripten_date_now,
            "emscripten_get_canvas_element_size": _emscripten_get_canvas_element_size,
            "emscripten_get_now": _emscripten_get_now,
            "emscripten_memcpy_big": _emscripten_memcpy_big,
            "emscripten_resize_heap": _emscripten_resize_heap,
            "emscripten_set_main_loop": _emscripten_set_main_loop,
            "emscripten_webgl_commit_frame": _emscripten_webgl_commit_frame,
            "emscripten_webgl_create_context": _emscripten_webgl_create_context,
            "emscripten_webgl_init_context_attributes": _emscripten_webgl_init_context_attributes,
            "emscripten_webgl_make_context_current": _emscripten_webgl_make_context_current,
            "environ_get": _environ_get,
            "environ_sizes_get": _environ_sizes_get,
            "exit": _exit,
            "fd_close": _fd_close,
            "fd_read": _fd_read,
            "fd_seek": _fd_seek,
            "fd_write": _fd_write,
            "glActiveTexture": _glActiveTexture,
            "glAttachShader": _glAttachShader,
            "glBindBuffer": _glBindBuffer,
            "glBindFramebuffer": _glBindFramebuffer,
            "glBindRenderbuffer": _glBindRenderbuffer,
            "glBindTexture": _glBindTexture,
            "glBindVertexArray": _glBindVertexArray,
            "glBufferData": _glBufferData,
            "glCheckFramebufferStatus": _glCheckFramebufferStatus,
            "glClear": _glClear,
            "glClearColor": _glClearColor,
            "glCompileShader": _glCompileShader,
            "glCreateProgram": _glCreateProgram,
            "glCreateShader": _glCreateShader,
            "glDeleteShader": _glDeleteShader,
            "glDepthFunc": _glDepthFunc,
            "glDrawArrays": _glDrawArrays,
            "glDrawBuffers": _glDrawBuffers,
            "glDrawElements": _glDrawElements,
            "glEnable": _glEnable,
            "glEnableVertexAttribArray": _glEnableVertexAttribArray,
            "glFramebufferRenderbuffer": _glFramebufferRenderbuffer,
            "glFramebufferTexture2D": _glFramebufferTexture2D,
            "glFrontFace": _glFrontFace,
            "glGenBuffers": _glGenBuffers,
            "glGenFramebuffers": _glGenFramebuffers,
            "glGenRenderbuffers": _glGenRenderbuffers,
            "glGenTextures": _glGenTextures,
            "glGenVertexArrays": _glGenVertexArrays,
            "glGenerateMipmap": _glGenerateMipmap,
            "glGetAttribLocation": _glGetAttribLocation,
            "glGetProgramInfoLog": _glGetProgramInfoLog,
            "glGetProgramiv": _glGetProgramiv,
            "glGetShaderInfoLog": _glGetShaderInfoLog,
            "glGetShaderiv": _glGetShaderiv,
            "glGetString": _glGetString,
            "glGetUniformLocation": _glGetUniformLocation,
            "glLinkProgram": _glLinkProgram,
            "glReadPixels": _glReadPixels,
            "glRenderbufferStorage": _glRenderbufferStorage,
            "glShaderSource": _glShaderSource,
            "glTexImage2D": _glTexImage2D,
            "glTexParameteri": _glTexParameteri,
            "glTexSubImage2D": _glTexSubImage2D,
            "glUniform1f": _glUniform1f,
            "glUniform1fv": _glUniform1fv,
            "glUniform1i": _glUniform1i,
            "glUniform3fv": _glUniform3fv,
            "glUniformMatrix4fv": _glUniformMatrix4fv,
            "glUseProgram": _glUseProgram,
            "glVertexAttribPointer": _glVertexAttribPointer,
            "glViewport": _glViewport,
            "strftime_l": _strftime_l
        };
        var asm = createWasm();
        var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
            return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["__wasm_call_ctors"]).apply(null, arguments)
        }
        ;
        var _malloc = Module["_malloc"] = function() {
            return (_malloc = Module["_malloc"] = Module["asm"]["malloc"]).apply(null, arguments)
        }
        ;
        var _processSecret = Module["_processSecret"] = function() {
            return (_processSecret = Module["_processSecret"] = Module["asm"]["processSecret"]).apply(null, arguments)
        }
        ;
        var _getPixelData = Module["_getPixelData"] = function() {
            return (_getPixelData = Module["_getPixelData"] = Module["asm"]["getPixelData"]).apply(null, arguments)
        }
        ;
        var _setAudioBuffer = Module["_setAudioBuffer"] = function() {
            return (_setAudioBuffer = Module["_setAudioBuffer"] = Module["asm"]["setAudioBuffer"]).apply(null, arguments)
        }
        ;
        var _getAudioVad = Module["_getAudioVad"] = function() {
            return (_getAudioVad = Module["_getAudioVad"] = Module["asm"]["getAudioVad"]).apply(null, arguments)
        }
        ;
        var _clearAudio = Module["_clearAudio"] = function() {
            return (_clearAudio = Module["_clearAudio"] = Module["asm"]["clearAudio"]).apply(null, arguments)
        }
        ;
        var _inputImage = Module["_inputImage"] = function() {
            return (_inputImage = Module["_inputImage"] = Module["asm"]["inputImage"]).apply(null, arguments)
        }
        ;
        var ___errno_location = Module["___errno_location"] = function() {
            return (___errno_location = Module["___errno_location"] = Module["asm"]["__errno_location"]).apply(null, arguments)
        }
        ;
        var _main = Module["_main"] = function() {
            return (_main = Module["_main"] = Module["asm"]["main"]).apply(null, arguments)
        }
        ;
        var _free = Module["_free"] = function() {
            return (_free = Module["_free"] = Module["asm"]["free"]).apply(null, arguments)
        }
        ;
        var ___getTypeName = Module["___getTypeName"] = function() {
            return (___getTypeName = Module["___getTypeName"] = Module["asm"]["__getTypeName"]).apply(null, arguments)
        }
        ;
        var __embind_initialize_bindings = Module["__embind_initialize_bindings"] = function() {
            return (__embind_initialize_bindings = Module["__embind_initialize_bindings"] = Module["asm"]["_embind_initialize_bindings"]).apply(null, arguments)
        }
        ;
        var stackSave = Module["stackSave"] = function() {
            return (stackSave = Module["stackSave"] = Module["asm"]["stackSave"]).apply(null, arguments)
        }
        ;
        var stackRestore = Module["stackRestore"] = function() {
            return (stackRestore = Module["stackRestore"] = Module["asm"]["stackRestore"]).apply(null, arguments)
        }
        ;
        var stackAlloc = Module["stackAlloc"] = function() {
            return (stackAlloc = Module["stackAlloc"] = Module["asm"]["stackAlloc"]).apply(null, arguments)
        }
        ;
        var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = function() {
            return (___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = Module["asm"]["__cxa_is_pointer_type"]).apply(null, arguments)
        }
        ;
        Module["UTF16ToString"] = UTF16ToString;
        Module["stringToUTF16"] = stringToUTF16;
        Module["JSEvents"] = JSEvents;
        Module["specialHTMLTargets"] = specialHTMLTargets;
        Module["FS"] = FS;
        var calledRun;
        dependenciesFulfilled = function runCaller() {
            if (!calledRun)
                run();
            if (!calledRun)
                dependenciesFulfilled = runCaller
        }
        ;
        function callMain(args) {
            var entryFunction = Module["_main"];
            var argc = 0;
            var argv = 0;
            try {
                var ret = entryFunction(argc, argv);
                exitJS(ret, true);
                return ret
            } catch (e) {
                return handleException(e)
            }
        }
        function run(args) {
            args = args || arguments_;
            if (runDependencies > 0) {
                return
            }
            preRun();
            if (runDependencies > 0) {
                return
            }
            function doRun() {
                if (calledRun)
                    return;
                calledRun = true;
                Module["calledRun"] = true;
                if (ABORT)
                    return;
                initRuntime();
                preMain();
                readyPromiseResolve(Module);
                if (Module["onRuntimeInitialized"])
                    Module["onRuntimeInitialized"]();
                if (shouldRunNow)
                    callMain(args);
                postRun()
            }
            if (Module["setStatus"]) {
                Module["setStatus"]("Running...");
                setTimeout(function() {
                    setTimeout(function() {
                        Module["setStatus"]("")
                    }, 1);
                    doRun()
                }, 1)
            } else {
                doRun()
            }
        }
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
                Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
                Module["preInit"].pop()()
            }
        }
        var shouldRunNow = true;
        if (Module["noInitialRun"])
            shouldRunNow = false;
        run();

        return createQtAppInstance.ready
    }
    );
}
)();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = createQtAppInstance;
else if (typeof define === 'function' && define['amd'])
    define([], function() {
        return createQtAppInstance;
    });
else if (typeof exports === 'object')
    exports["createQtAppInstance"] = createQtAppInstance;
