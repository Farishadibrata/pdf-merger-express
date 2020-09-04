const express = require('express')
const path = require('path')
const app = express()
const PDFMerger = require('pdf-merger-js');
const fileDirectory = '/files/'
const filesToMerge = ['3100074427_DN_20_08_03_002738.pdf', '2020090330742 Materi Sandhi - BSSN.pdf']

const randomString = function_ => {
    return Math.random().toString(36).substring(7);
}
const mergeFile = function(files){
    return new Promise((resolve,reject) =>{
        let merger = new PDFMerger();
        let random = randomString()
        for(let fileName of files){
            merger.add(path.join(__dirname,`${fileDirectory}${fileName}`))
        }
        merger.save(path.join(__dirname,`/temp/${random}.pdf`)).then(()=>{
            resolve(random)
        }).catch(err => {
            console.log(err)
        })
    })
}

app.get('/', function (req, res) {
    mergeFile(filesToMerge).then(name => {
        res.download(path.join(__dirname,`/temp/${name}.pdf`))
    })
  })

app.listen(8000, function_ => {console.log('Loaded')})