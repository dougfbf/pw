import { useNews } from '@/hooks/useNews'
import { create } from 'zustand'
import { env } from '@/config'

import { useToast } from '@/hooks/useToast'
import type { ApiStore, Attack, StatsResponse } from '@/types'

function hasExpired(attack: Attack) {
    const expires_in = attack.date_sent + (attack.duration)
    return expires_in <= Math.floor(Date.now() / 1000)
}

function removeAttackWhenDone(attack: Attack) {
    const expires_in = attack.date_sent + attack.duration
    const time_remaining = expires_in - Math.floor(Date.now() / 1000)
    setTimeout(() => {
        useAPI.getState().removeAttack(attack.id)
    }, time_remaining * 1000)
}

export const useAPI = create<ApiStore>((set, get) => ({
    misc: {
        isLoading: true,
        initializationError: false
    },

    stats: null,

    stresserPanel: {
        isLoading: false
    },

    runningPanel: {
        isLoading: false
    },

    attacks: [],

    initialize: async () => {
        const { verify, getStats, getAttacks } = get()
        await verify()
        await getStats()
        await getAttacks()
        await useNews.getState().getNews()
    },

    verify: async () => {
        try {
            await fetch(`${env.API}/verify`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            return
        }
    },

    getStats: async () => {
        const { misc, getStats } = get()
        try {
            const request = await fetch(`${env.API}/stats`, {
                method: 'GET',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' }
            })
            const response: StatsResponse = await request.json()
            if (response.status === 'success') {
                const { online_users, attacks_today, total_attacks, running_attacks } = response.data
                set({
                    misc: {
                        ...misc,
                        isLoading: false
                    },
                    stats: {
                        online_users,
                        attacks_today,
                        total_attacks,
                        running_attacks
                    }
                })
                setTimeout(() => { getStats() }, 3000)
                return
            }
            set({
                misc: {
                    isLoading: false,
                    initializationError: true
                }
            })
            return
        } catch (error) {
            set({
                misc: {
                    ...misc,
                    isLoading: false,
                    initializationError: true
                }
            })
        }
    },

    getAttacks: async () => {
        const { misc } = get()
        try {
            const request = await fetch(`${env.API}/attacks`, {
                method: 'GET',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
            })
            const response = await request.json()
            if (response.status === 'error') {
                set({
                    misc: {
                        ...misc,
                        isLoading: false,
                        initializationError: true
                    }
                })
                return
            }
            const unexpired_attacks = response.rows.filter((attack: Attack) => !hasExpired(attack));
            set({
                attacks: unexpired_attacks.map((attack: Attack) => {
                    removeAttackWhenDone(attack)
                    return attack
                })
            })
        } catch (error: any) {
            set({
                misc: {
                    ...misc,
                    isLoading: false,
                    initializationError: true
                }
            })
        }
    },

    sendAttack: async ({ method, target, port, duration }) => {
        const { getAttacks } = get()
        set({
            stresserPanel: {
                isLoading: true
            }
        })
        try {
            const request = await fetch(`${env.API}/attack`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    target: target,
                    dst_port: port,
                    duration: duration,
                    method: method
                })
            })
            const response = await request.json()
            if (response.status === 'error') {
                useToast.getState().showToast({
                    type: 'error',
                    title: 'Stresser Panel',
                    content: response.data ? response.data : 'Unable to start this attack. Refresh the page or try again later.'
                })
                set({
                    stresserPanel: {
                        isLoading: false
                    }
                })
                return
            }
            useToast.getState().showToast({
                type: 'success',
                title: 'Stresser Panel',
                content: response.data ? response.data : 'Attack started successfully!'
            })
            set({
                stresserPanel: {
                    isLoading: false
                }
            })
            getAttacks()
        } catch (error: any) {
            useToast.getState().showToast({
                type: 'error',
                title: 'Stresser Panel',
                content: 'Unable to start this attack. Refresh the page or try again later.'
            })
            set({
                stresserPanel: {
                    isLoading: false
                }
            })
        }
    },

    stopAttack: async (id) => {
        const { removeAttack } = get()
        try {
            set({
                runningPanel: {
                    isLoading: true
                }
            })
            const request = await fetch(`${env.API}/stop`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            const response = await request.json()
            if (response.status === 'error') {
                useToast.getState().showToast({
                    type: 'error',
                    title: 'Stresser Panel',
                    content: response.data ? response.data : 'Something wrong happened while stopping this attack. Please try again later.'
                })
                set({
                    runningPanel: {
                        isLoading: false
                    }
                })
                return
            }
            useToast.getState().showToast({
                type: 'success',
                title: 'Attacks',
                content: 'Attack stopped successfully!'
            })
            removeAttack(id)
            set({
                runningPanel: {
                    isLoading: false
                }
            })
            return
        } catch (error: any) {
            console.log(error.message)
            useToast.getState().showToast({
                type: 'error',
                title: 'Stresser Panel',
                content: 'Unable to stop this attack. Refresh the page or try again later.'
            })
            set({
                runningPanel: {
                    isLoading: false
                }
            })
        }
    },

    removeAttack: (id) => {
        const { attacks } = get()
        set({
            attacks: attacks.filter(attack => attack.id !== id)
        })
    },
}))