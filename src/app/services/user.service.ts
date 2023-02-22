import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { User } from "../models/user.model"

@Injectable({
    providedIn: 'root'
})

export class UserService {

    // private _usersDb: User[] = CONTACTS;
    // private _users$ = new BehaviorSubject<User[]>([])
    // public users$ = this._users$.asObservable()

    STORAGE_KEY = 'userDB'
    STORAGE_KEY_LOGGEDIN = 'loggedinUser'


    public getUser() {
        // return this.user
        return JSON.parse(localStorage.getItem("loggedinUser") || '{}')
    }

    private user = {
        _id: '105',
        name: "Puki Ben David",
        coins: 100,
        moves: [
            {
                toId: "d99e3u2ih329",
                to: "Moshiko",
                at: 2652712571,
                amount: 2
            },
        ]
    }


    // public login({ name }) {
    //     return this.query(this.STORAGE_KEY)
    //         .then(users => {
    //             const user = users.find(user => user.name === name)
    //             if (user) return this._setLoggedinUser(user)
    //             else return Promise.reject('Invalid login')
    //         })
    // }

    public signup({ name }: any) {
        const user = {
            name,
            coins: 100,
            moves: []
        }
        return this.post(this.STORAGE_KEY, user)
            .then(this._setLoggedinUser)
    }

    public update(user: object) {
        return this.put(this.STORAGE_KEY, user).then((user: object) => {
            this._saveLoggedinUser(user)
            // save(user)
            return user
        })
    }

    public getLoggedinUser() {
        return JSON.parse(localStorage.getItem("loggedinUser") || '{}')
    }

    public _saveLoggedinUser(user: object) {
        localStorage.setItem('loggedinUser', JSON.stringify(user))
    }

    public _setLoggedinUser(user: any) {
        const userToSave = {
            name: user.name,
            coins: user.coins,
            moves: user.moves,
            _id: user._id
        }
        localStorage.setItem("loggedinUser", JSON.stringify(userToSave))
        return userToSave
    }

    public getEmptyCredentials() {
        return {
            name: '',
            coins: 100,
            moves: [],
            _id: this._makeId()
            // imgId: 
        }
    }

    public getById(userId: string) {
        return this.get("loggedinUser", userId)
        // return this.get("userDB", userId)
    }

    // public transferFunds(name, amount) {
    //     const loggedInUser = getLoggedinUser()
    //     if (!loggedInUser) return
    //     getById(loggedInUser._id)
    //         .then(user => {
    //             console.log('user:', user)
    //             const transaction = {
    //                 toId: utilService.makeId(),
    //                 to: name,
    //                 at: new Date(),
    //                 amount: amount,
    //             }
    //             user.moves.unshift(transaction)
    //             user.coins -= amount
    //             return update(user)
    //         })
    //         .catch((err) => {
    //             console.error('Cannot add activitie:', err)
    //             throw err
    //         })
    // }

    // async

    private query(entityType: any, delay = 1000) {
        var entities = JSON.parse(localStorage.getItem(entityType) || '[]') || []
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(entities)
            }, delay)
        })
    }

    private get(entityType: any, entityId: string) {
        return this.query(entityType)
            .then((entities: any) => entities.find((entity: any) => entity._id === entityId))
    }
    private post(entityType: any, newEntity: any) {
        newEntity._id = this._makeId()
        return this.query(entityType)
            .then((entities: any) => {
                entities.push(newEntity)
                this._save(entityType, entities)
                return newEntity
            })
    }

    private put(entityType: any, updatedEntity: any) {
        return this.query(entityType)
            .then((entities: any) => {
                const idx = entities.findIndex((entity: any)=> entity._id === updatedEntity._id)
                entities.splice(idx, 1, updatedEntity)
                this._save(entityType, entities)
                return updatedEntity
            })
    }

    private remove(entityType: any, entityId: any) {
        return this.query(entityType)
            .then((entities: any) => {
                const idx = entities.findIndex((entity: any) => entity._id === entityId)
                if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
                entities.splice(idx, 1)
                this._save(entityType, entities)
            })
    }


    private _save(entityType: any, entities: any) {
        localStorage.setItem(entityType, JSON.stringify(entities))
    }

    private _makeId(length = 5) {
        var text = ''
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

}

