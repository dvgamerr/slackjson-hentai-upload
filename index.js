
import { readdir } from 'fs'

const dirname = './json-data/'

readdir(dirname, async (err, files) => {
  if (err) throw err
  let mangaCount = 0
  for (let i = 0; i < files.length; i++) {
    const data = require(`${dirname}${files[i]}`)
    for (let l = 0; l < data.length; l++) {
      const msg = data[l]
      if (msg.attachments) {
        let raw = /\*(?<name>.*?)\*\n(?<lang>.*?) -- Size: (?<size>.*?) \((?<page>.*?) p.*\n<(?<link>.*?)>/ig.exec(msg.text)
        if (raw) {
          mangaCount++
          let { name, lang, size, page, link } = raw.groups
        }
      }
    }
  }
  console.log(`Manga Object: ${mangaCount}`)
})
