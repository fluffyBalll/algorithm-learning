mobx-react 定义一个 class 来存储状态和reducer,这个类
```javascript
    class StateStore {
     someState = 0;
     constructor() {
         makeAutoObservable(this);//import { makeAutoObservable } from "mobx";
     }
   reducer() {
        // 
   }
 
}


 //使用，mobx没有控制状态的传递方式，需要自己传递，可以通过常规的状态流来使用（父子组件通信，context）
//先创建一个context,将这个状态放入context中

const stores = createContext({
    counter: new Counter(),
})

然后在组件中使用context
const state = useContext(stores)