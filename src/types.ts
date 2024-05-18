export interface Method {
    method: 'UDP-DNS' | 'TCP-AMP' | 'TCP-SYN'
    label: string
}

export type New = {
    title: string
    message: string
    release_date: string
}

export interface Attack {
    id: number
    target: string
    method: string
    duration: number
    date_sent: number
}

export interface StatsResponse {
    status: string
    data: {
        online_users: number
        user_attacks: number
        attacks_today: number
        total_attacks: number
        running_attacks: number
    }
}

export type ApiStore = {
    misc: {
        isLoading: boolean
        initializationError: boolean
    }

    stats: {
        online_users: number
        attacks_today: number
        total_attacks: number
        running_attacks: number
    } | null

    stresserPanel: {
        isLoading: boolean
    }

    runningPanel: {
        isLoading: boolean
    }

    attacks: Attack[]

    verify: () => Promise<void>

    getStats: () => Promise<void>

    initialize: () => Promise<void>

    getAttacks: () => Promise<void>

    sendAttack: ({ method, target, port, duration }: {
        method: 'UDP-DNS' | 'TCP-AMP' | 'TCP-SYN'
        target: string
        port: number
        duration: number
    }) => Promise<void>

    stopAttack: (id: number) => Promise<void>

    removeAttack: (id: number) => void
}