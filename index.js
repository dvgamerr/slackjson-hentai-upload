import { readdir } from 'fs'
import request from 'request'

const dirname = './json-data/'

let api = request.defaults({
  method: 'POST',
  baseUrl: `http://localhost:8080/v2`,
  timeout: 5000,
  json: true,
  headers: { 'X-Token': 'JJpeNu1VAXuHk505.app-exhentai' }
})
let apiTouno = (url, body) => new Promise((resolve, reject) => {
  api({ url, body, headers: { 'X-Access': +new Date() } }, (error, response, body) => {
    if (response.statusCode === 200 && !error) {
      resolve(response.body)
    } else {
      reject(error || response.statusCode)
    }
  })
})

readdir(dirname, async (err, files) => {
  if (err) throw err
  let mangaCount = 0
  for (let i = 0; i < files.length; i++) {
    const data = require(`${dirname}${files[i]}`)
    console.log(`Reading... '${files[i]}'`)
    for (let l = 0; l < data.length; l++) {
      const msg = data[l]
      if (msg.attachments) {
        let raw = /\*(?<name>.*?)\*\n(?<lang>.*?) -- Size: (?<size>.*?) \((?<page>.*?) p.*\n<(?<link>.*?)>/ig.exec(msg.text)
        if (raw) {
          mangaCount++
          let manga = Object.assign(raw.groups, {
            user_id: 'g_845dfa74f0',
            cover: (msg.attachments || [{}])[0].image_url || null
          })
          let res = await apiTouno('/exhentai/manga/new', manga)
          if (res.error) console.log(res)
        }
      }
    }
  }
  console.log(`Manga Object: ${mangaCount}`)
})
