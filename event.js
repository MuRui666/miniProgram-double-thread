class Event{
    constructor(name){
        this.name = name
        this.observer = {}
        this.on = this.on.bind(this)
    }
    on(type,fn){
        if( this.observer[type]){
            this.observer[type].push[fn]
        }else{
            this.observer[type] = [fn]
        }
        this.observer[type] = [fn]
    }
    emit(type,opt){
        console.log('changeDom',type,this.observer,this.observer[type])
        this.observer[type].map(item=>{
            item(opt)
        })
    }
}

// const myEvent = new Event()
// myEvent.on('buy',(e)=>{
//     console.log('买东西',e.name)
// })
// myEvent.emit('buy',{name:'可乐'})