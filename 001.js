function getInfo(a, b) {
    a.name = 'mike';
    b = 17;
}

let a = { name: 'Jane' };
let b = 7;

getInfo(a, b);

console.log(a);
console.log(b);

// function a(x) {
//     return function b(y) {
//         console.log(x,y);
//         return x + y;
//     }
// }
// a(2)

// console.log(valueOf([1,2,3]));
console.log(Object.prototype.valueOf.call("primitive"));

