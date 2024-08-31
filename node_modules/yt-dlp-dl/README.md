# yt-dlp-dl

[![Build Status][ci-image]][ci-url]
[![NPM version][npm-image]][npm-url]
[![Prettier][prettier-image]][prettier-url]
[![License][license-image]][license-url]

Downloads the latest version of [yt-dlp](https://github.com/yt-dlp/yt-dlp) and keeps it updated.

Currently supports Windows, Linux, and macOS. _yt-dlp-dl_ can also be used as a library.

## Usage

### CLI

Install _yt-dlp-dl_ with either of the following, depending on your preferred package manager:

- `yarn global add yt-dlp-dl`
- `npm install --global yt-dlp-dl`

Then use it like so:

```console
$ yt-dlp-dl             # Download to the current directory
Downloading yt-dlp...
yt-dlp download complete

$ yt-dlp-dl ~/bin       # Download to a specific directory
Downloading yt-dlp...
yt-dlp download complete


$ yt-dlp-dl             # Checking for updates
Updating yt-dlp...
yt-dlp download complete

$ yt-dlp-dl
yt-dlp is already up to date
```

To uninstall, do one of the following, depending on how you installed it:

- `yarn global remove yt-dlp-dl`
- `npm uninstall --global yt-dlp-dl`

### API

#### downloadYtDlp(directory, [logger=console])

Downloads the latest version of `yt-dlp` to the specified directory. The downloaded file will be either `yt-dlp` or `yt-dlp.exe` depending on the platform.

If the file already exists, the download will only occur if the existing version is older than the latest version.

Returns a promise which resolves with `true` if the download was attempted and completed, or `false` if the latest version is already present.

Progress will be logged to the console by default. Alternatively, provide your own logger which implements the `ILogger` interface, or `null` to disable logging.

[ci-image]: https://img.shields.io/github/workflow/status/Shingyx/yt-dlp-dl/Node.js%20CI/master?style=flat-square
[ci-url]: https://github.com/Shingyx/yt-dlp-dl/actions?query=branch%3Amaster
[npm-image]: https://img.shields.io/npm/v/yt-dlp-dl?style=flat-square
[npm-url]: https://www.npmjs.com/package/yt-dlp-dl
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[license-image]: https://img.shields.io/github/license/Shingyx/yt-dlp-dl?style=flat-square
[license-url]: https://github.com/Shingyx/yt-dlp-dl/blob/master/LICENSE
