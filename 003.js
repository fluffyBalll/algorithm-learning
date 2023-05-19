// 在使用promise的时候，如何控制并发请求
//有很多promise，可以先将一部分放在一个队列中，前面的promise完成了就从队列中取出一个
class RequestLimit  {
     constructor(limit){
        this.limit = limit;
        this.count = 0;
        this.queue = [];
     }

     async add(fn){
        if(this.count < this.limit) {
            this.count++;
            return fn().finally(() => {
                // 当这个promise执行完成之后，需要从队列中取出一个新的promise
                this.count--;
                this.next();
            })
        } else {
            return new Promise((resolve, reject) => {
                this.queue.push(() => {
                    this.count++;
                    resolve(fn().finally(() => {
                        this.count--;
                        this.next();
                    }))
                })
            })
        }
     }

     next(){
        if(this.count < this.limit && this.queue.length > 0) {
            const fn = this.queue.shift();
            fn();
        }
     }

}

const limit = new RequestLimit(5);
for(let i = 0; i < 10; i++){
    // add 返回promise就可以取到每个promise执行完毕之后的结果，可以对每个promise的结果进行操作
    limit.add(() => fetch('fake url').then(res => res.json()).then(console.log(res)))
}

