#!/usr/bin/env node
const Bundler = require('parcel-bundler')
const Path = require('path')
const { fstat, writeFile } = require('fs')

const entryFile = Path.join(__dirname, '../src/index.pug')
const outDir = Path.join(__dirname, '../homecontrol_frontend/www')
const production = (process.env.NODE_ENV === 'production')

const noCache = [
  'index.html',
  'manifest.webmanifest'
]

const options = {
  outDir,
  publicUrl: '/frontend',
  watch: !production,
  cache: true,
  minify: production,
  scopeHoist: false,
  target: 'browser',
  hmr: true,
  sourceMaps: true,
  detailedReport: production,
  autoInstall: true
}

const bundler = new Bundler(entryFile, options)


bundler.on('bundled', async (bundle) => {
  let bundleFiles = {}
  async function iterBundle(bundle) {
    if (bundle.entryAsset && bundle.entryAsset.options && bundle.entryAsset.options.entryFiles == undefined) {
      return
    }

    let bundleName = bundle.getHashedBundleName(true)
    let hash = bundle.getHash().slice(-8)
    bundleFiles[bundleName] = {
      hash,
      shouldCache: !noCache.includes(bundleName)
    }
    for (let childBundle of bundle.childBundles) {
      await iterBundle(childBundle)
    }
  }
  await iterBundle(bundle)
  bundleFilesJson = JSON.stringify(bundleFiles, null, 4)
  writeFile(Path.join(outDir, "bundle-manifest.json"), bundleFilesJson, (err) => { })
  writeFile(Path.join(outDir, "bundle-manifest.js"), `self.__WB_MANIFEST = ${bundleFilesJson};\n`, (err) => { })

})

bundler.bundle()
