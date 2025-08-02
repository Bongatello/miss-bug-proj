import fs from 'fs'


export function readJsonFile(path) {
    const json = fs.readFileSync(path, 'utf8')
    const data = JSON.parse(json)
    return data
}

export function writeJsonFile(path, data) {
    return new Promise((resolve, reject) => {
        const jsonData = JSON.stringify(data, null, 2)

        fs.writeFile(path, jsonData, (err) => {
            if (err) return reject(err)
                resolve()
        })
    })
}

export function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}