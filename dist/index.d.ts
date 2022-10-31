import ffmpeg from "fluent-ffmpeg";
/**
 * Checks whether FFMPEG is installed on the machine or not.
 * @returns boolean
 */
declare const checkFfmpeg: () => FFMPEG_Check | null;
/**
 * Used to convert youtube videos to mp3 files
 * @returns DownloadProcess
 */
declare const audioConverter: (url: string, options: ConverterOptions) => Promise<ffmpeg.FfmpegCommand | undefined>;
export { checkFfmpeg, audioConverter };
interface ConverterOptions {
    audioQuality?: number;
    outPath?: string;
    outFilename?: string;
    filePrefix?: string;
}
interface FFMPEG_Check {
    found: boolean;
    path: string;
}
