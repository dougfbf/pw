import { create } from 'zustand'
import { env } from '@/config'

import type { New } from '@/types'

type NewStore = {
    news: New[]
    getNews: () => Promise<void>
}

export const useNews = create<NewStore>((set, get) => ({
    news: [],
    getNews: async () => {
        try {
            const request = await fetch(`${env.API}/news`, {
                method: 'GET',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' }
            })
            const response = await request.json()
            if (response.status === 'error') { return }
            set({
                news: response.rows
            })
        } catch (error: any) {
            return
        }
    }
}))