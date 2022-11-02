### asidar-lib
<div>
	<img src="https://img.shields.io/bundlephobia/min/asidar-lib" />
	<img src="https://img.shields.io/bundlephobia/minzip/asidar-lib" />
</div>

##  Installation

via npm

```
npm install asidar@latest
```
via yarn
```
yarn add asidar
```
#  Basic Usage

```js
const asidar =  require("../dist/index.js");

asidar.audioConverter("https://www.youtube.com/watch?v=WNeLUngb-Xg")
  .then(proc =>  {
    proc.on("end",  ()  =>  {
      console.log("finished at "  +  new  Date())
    })
  })
```

#  API
- `checkFfmpeg()`
checks whether <a  href="https://ffmpeg.org/">FFMPEG</a> is installed or not.
returns:
```ts
{
	found:  boolean,
	path:  string,
}
```
- `audioConverter(url, options)`
 Attempts to download a video from the given `url: string`,  `options` can have the following:
```ts
{
	audioQuality?:  number,
	outPath?:  string,
	outFilename?:  string,
	filePrefix?:  string,
}
```
returns `FfmpegCommand`
