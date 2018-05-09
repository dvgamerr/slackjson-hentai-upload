
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
          let manga = Object.assign(raw.groups, {
            user_id: 'g_845dfa74f0',
            cover: (msg.attachments || [{}])[0].image_url || null,
            requested: new Date()
          })
        }
      }
    }
  }
  console.log(`Manga Object: ${mangaCount}`)
})
