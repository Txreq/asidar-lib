"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioConverter = exports.checkFfmpeg = void 0;
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const path_1 = __importDefault(require("path"));
/**
 * Checks whether FFMPEG is installed on the machine or not.
 * @returns boolean
 */
const checkFfmpeg = () => {
    if (ffmpeg_static_1.default)
        return {
            found: true,
            path: ffmpeg_static_1.default,
        };
    else {
        return null;
    }
};
exports.checkFfmpeg = checkFfmpeg;
/**
 * Used to convert youtube videos to mp3 files
 * @returns DownloadProcess
 */
const audioConverter = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    const NON_ALLOWED_CHARS = /\\|\/|:|\*|\?|\"|<|>|\|/g;
    if (typeof options == "undefined")
        options = {};
    if (typeof options.outPath == "undefined")
        options.outPath = "./";
    if (typeof options.audioQuality == "undefined")
        options.audioQuality = 128;
    if (typeof options.filePrefix == "undefined")
        options.filePrefix = "";
    if (typeof options.outFilename == "undefined")
        options.outFilename = String(Math.floor(Math.random() * 10 ** 5));
    if (!checkFfmpeg()) {
        throw new Error("FFMPEG isn't installed");
    }
    options.outFilename = removeNonAllowedChars(options.outFilename, NON_ALLOWED_CHARS);
    options.filePrefix = removeNonAllowedChars(options.filePrefix, NON_ALLOWED_CHARS);
    try {
        const stream = (0, ytdl_core_1.default)(url, { filter: "audioonly" });
        const pathname = path_1.default.resolve(options.outPath, options.filePrefix + options.outFilename + ".mp3");
        const dlProcess = (0, fluent_ffmpeg_1.default)(stream)
            .audioBitrate(options.audioQuality)
            .withAudioCodec("libmp3lame")
            .toFormat("mp3")
            .saveToFile(pathname);
        return dlProcess;
    }
    catch (error) {
        return undefined;
    }
});
exports.audioConverter = audioConverter;
function removeNonAllowedChars(filename, chars) {
    return filename.replace(chars, "");
}
