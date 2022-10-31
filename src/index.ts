import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
import path from "path";

/**
 * Checks whether FFMPEG is installed on the machine or not.
 * @returns boolean
 */
const checkFfmpeg = (): FFMPEG_Check | null => {
  if (ffmpegPath)
    return {
      found: true,
      path: ffmpegPath,
    };
  else {
    return null;
  }
};

/**
 * Used to convert youtube videos to mp3 files
 * @returns DownloadProcess
 */
const audioConverter = async (
  url: string,
  options: ConverterOptions
): Promise<ffmpeg.FfmpegCommand | undefined> => {
  const NON_ALLOWED_CHARS = /\\|\/|:|\*|\?|\"|<|>|\|/g;
  if (typeof options == "undefined") options = {};
  if (typeof options.outPath == "undefined") options.outPath = "./";
  if (typeof options.audioQuality == "undefined") options.audioQuality = 128;
  if (typeof options.filePrefix == "undefined") options.filePrefix = "";
  if (typeof options.outFilename == "undefined")
    options.outFilename = String(Math.floor(Math.random() * 10 ** 5));

  if (!checkFfmpeg()) {
    throw new Error("FFMPEG isn't installed");
  }

  options.outFilename = removeNonAllowedChars(options.outFilename, NON_ALLOWED_CHARS);
  options.filePrefix = removeNonAllowedChars(options.filePrefix, NON_ALLOWED_CHARS);

  try {
    const stream = ytdl(url, { filter: "audioonly" });
    const pathname = path.resolve(
      options.outPath,
      options.filePrefix + options.outFilename + ".mp3"
    );

    const dlProcess = ffmpeg(stream)
      .audioBitrate(options.audioQuality)
      .withAudioCodec("libmp3lame")
      .toFormat("mp3")
      .saveToFile(pathname);

    return dlProcess;
  } catch (error) {
    return undefined;
  }
};

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

function removeNonAllowedChars(filename: string, chars: RegExp) {
  return filename.replace(chars, "");
}
