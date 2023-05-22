#### zustand 的简单使用

zustand 和 Redux 一样 ，其状态是不可变的(immutabale)，即更新状态必须返回一个新状态，不能更改原有状态

```javascript
const useBearStore = create((set ) => ({
    bear: 0,
    increase: () => {
        set(state => ({...state,state.bear: state.bear++}))
    }
}))
```

新旧状态默认比较方式是引用相等，如果想改变，可以使用 zustand 提供的 shallow

```javascript
const useStore = create((set) => ({
  firstName: "",
  lastName: "",
  updateFirst: (firstName) => {
    set(() => ({ firstName: firstName }));
  },
}));
```

然后在使用 store 的时候传进去
#### 什么时候使用 shallow
两个强关联的状态，但是使用在不同的组件中，当想要更新一个组件而不引起另一个组件更新的时候就需要用到 shallow

```javascript
import {shallow} from 'zustand/shallow';
import useStore from './store';
const MyComponent = () => {
    const [firstName,updateFirst] = useStore((state) => [
    firstName: state.firstName,
    updateFirst: state.updateFirst,
],shallow)
    return(
        <div>
            {/* ui */}
        </div>
    );
}
```

#### 使用immer
zustand 状态是不可变的，如果想要更新嵌套多层的对象很麻烦，可以使用第三方库 immer 来解决
安装
想要在zustand中使用immer中间件,需要先安装immer作为直接依赖（文档这样说的）
```cssharp
npm install immer --save
```
```javascript
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
const useStore = create(immer((set) => ({
    todos: {
      '82471c5f-4207-4b1d-abcb-b98547e01a3e': {
        id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
        title: 'Learn Zustand',
        done: false,
      },
      '354ee16c-bfdd-44d3-afa9-e93679bda367': {
        id: '354ee16c-bfdd-44d3-afa9-e93679bda367',
        title: 'Learn Jotai',
        done: false,
      },
      '771c85c5-46ea-4a11-8fed-36cc2c7be344': {
        id: '771c85c5-46ea-4a11-8fed-36cc2c7be344',
        title: 'Learn Valtio',
        done: false,
      },
      '363a4bac-083f-47f7-a0a2-aeeee153a99c': {
        id: '363a4bac-083f-47f7-a0a2-aeeee153a99c',
        title: 'Learn Signals',
        done: false,
      },
    },
    toggleTodo: (todoId: string) =>
      set((state) => {
        state.todos[todoId].done = !state.todos[todoId].done
      }),
})));
```
ps: 之前看redux文档的时候有一节就讲了这个todos的这种数据组织方式，有什么优点来着？
