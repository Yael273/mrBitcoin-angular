import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, switchMap, tap } from 'rxjs/operators'
import { interval, lastValueFrom, of, timer } from 'rxjs';
import axios from 'axios'
import { storageService } from "./storage.service"



@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    constructor(private http: HttpClient) { }

     marketPriceHistory = 'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
     AverageBlockSize = 'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true'


    public getRate() {
        const url = 'https://blockchain.info/tobtc?currency=USD&value=1'
        return this.getResult('RATE', url)
    }

    public getRateStream() {
        return timer(0, 1000 * 60 * 15).pipe(
            switchMap(() => this.getRate())
        )
    }

    async getMarketPrice() {
        let pricesHistory = storageService.load('prices-history')
        if (pricesHistory) return pricesHistory
        try {
            pricesHistory = await axios.get(this.marketPriceHistory)
            storageService.save('pricesHistory', pricesHistory.data)
            return pricesHistory.data
        }
        catch (err: any) {
            throw new Error('Err', err)
        }
    }
    async getAvgBlockSize() {
        let AverageBlock = storageService.load('Average-block')
        if (AverageBlock) return AverageBlock
        try {
            AverageBlock = await axios.get(this.AverageBlockSize)
            storageService.save('AverageBlock', AverageBlock.data)
            return AverageBlock.data
        }
        catch (err: any) {
            throw new Error('Err', err)
        }
    }

    getResult(type: string, url: string) {
        const result = loadFromStorage(type)
        if (result) return of(result)
        return this.http.get<any>(url)
            .pipe(
                tap(res => saveToStorage(type, res)),
            )
    }
}

function saveToStorage(key: string, value: any) {
    const data: any = JSON.stringify(value) || null
    localStorage.setItem(key, data)
}

function loadFromStorage(key: string) {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}




// import axios from 'axios'
// import {storageService} from "./storage.service"

// const urlRate = 'https://blockchain.info/tobtc?currency=USD&value=1'
// const marketPriceHistory = 'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
// const AverageBlockSize = 'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true'
// const  tradeVolumeAPI = 'https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true'

// export const bitcoinService = {
//     getRate,
//     getMarketPriceHistory,
//     getAvgBlockSize,
//     getTradeVolume
// }

// async function getRate() {
//     let rate = storageService.load('rate')
//     if(rate) return rate
//     try {
//         rate = await axios.get(urlRate)
//         storageService.save('rate', rate.data)
//         return rate.data
//     }
//     catch (err: any) {
//         throw new Error('Err', err)
//     }
// }
// async function getMarketPriceHistory() {
//     let pricesHistory = storageService.load('prices-history')
//     if(pricesHistory) return pricesHistory
//     try {
//         pricesHistory = await axios.get(marketPriceHistory)
//         storageService.save('pricesHistory', pricesHistory.data)
//         return pricesHistory.data
//     }
//     catch (err: any) {
//         throw new Error('Err', err)
//     }
// }
// async function getAvgBlockSize() {
//     let AverageBlock = storageService.load('Average-block')
//     if(AverageBlock) return AverageBlock
//     try {
//         AverageBlock = await axios.get(AverageBlockSize)
//         storageService.save('AverageBlock', AverageBlock.data)
//         return AverageBlock.data
//     }
//     catch (err: any) {
//         throw new Error('Err', err)
//     }
// }
// async function getTradeVolume() {
//     let tradeVolume = storageService.load('trade-volume')
//     if(tradeVolume) return tradeVolume
//     try {
//         tradeVolume = await axios.get(tradeVolumeAPI)
//         storageService.save('AverageBlock', tradeVolume.data)
//         return tradeVolume.data
//     }
//     catch (err: any) {
//         throw new Error('Err', err)
//     }
// }