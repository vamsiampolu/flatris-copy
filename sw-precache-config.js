module.exports = {
  stripPrefix: 'build',
  staticFileGlobs: [
    'build/*.html',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  dontCacheUrlsMatching: /\.\w{8}/,
  swFilePath: 'build/service-worker.js'
}
