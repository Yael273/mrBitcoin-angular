export class User {

    public _id?: string = ''
    constructor(
        public name: string = '',
        public coins: number = 100,
        public moves: string[]
        ) {
    }
  
    setId?(id: string = 'u101') {
        this._id = id
    }
  }
  

// export interface User {
//     _id: string
//     name: string
//     coins: number
//     moves: []
// }

// export interface UserFilter {
//     term: string
// }
// // _id: 'p123', name: 'Penrose', age: 2, birthDate: new Date('2020-11-12')