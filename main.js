const worker = new Worker('worker.js')
const event = new Event('main')
const msg = {
    data:'',
    eventType:'',
    isInit:true,
    id:''
}
const trackEvent = (type,opt)=>{
    switch (type){
        case 'addDom':
            event.emit('addDom',opt)
            break
        case 'changeDom':
            event.emit('changeDom',opt)
            break
        case 'endInit':
            event.emit('endInit',opt)
            break
    }
}
function trick(type,id){
    msg.eventType = type
    msg.id = id.id
    trickPostMsg()
}
//设置dom
function setDom(data){
    const {id,mytemplate} = data
    if(document.getElementById(`${id}`)){
        document.getElementById(`${id}`).innerHTML = mytemplate
    }else{
        const script = document.createElement('script')
        const div = document.createElement('div')
        script.id = id
        div.id = id + '-wraper'
        script.type = 'text/html'
        script.innerHTML = mytemplate
        document.body.appendChild(div)
        document.body.appendChild(script)
    }
    document.getElementById(`${id}-wraper`).innerHTML = template(mytemplate,data.data)
}
event.on('addDom',(dom)=>{
    const app = document.getElementById('app')
    let parser = new DOMParser()
    let doc = parser.parseFromString(dom,"text/xml")//DOMParser 可以将存储在字符串中的 XML 或 HTML 源代码解析为一个 DOM Document。
    let node = doc.getElementsByTagName('div')[0]
    app.appendChild(node)
})
event.on('endInit',(data)=>{
    msg.isInit = false
    data.map(item=>{
        setDom(item)
    })
})
event.on('changeDom',(data)=>{
    setDom(data)
})
// worker.postMessage('我是worker')
worker.onmessage = function(e){
    trackEvent(e.data.type,e.data.opt)
}
function trickPostMsg(){
    worker.postMessage(msg)
}
trickPostMsg()