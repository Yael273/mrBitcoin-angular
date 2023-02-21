import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})

export class UserService {
    public getUser() {
        return this.user
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
    
}

