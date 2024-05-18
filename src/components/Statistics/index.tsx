import { useAPI } from '@/hooks/useAPI'

import Users from '@/icons/Users'
import Bolt from '@/icons/Bolt'
import Clock from '@/icons/Clock'
import ServerStack from '@/icons/ServerStack'

import s from './styles.module.css'

function Statistic({ label, count, icon }: { label: string, count: number, icon?: React.ReactNode }) {
    return (
        <div className={s.statistic}>
            <div className={s.info}>
                <span className={s.label}>{label}</span>
                <span className={s.count}>{count}</span>
            </div>
            <div className={s.icon}>
                {icon && icon}
            </div>
        </div>
    )
}

export default function Component() {
    const { stats } = useAPI()
    return (
        <div className={s.container}>
            <Statistic label='Online users' count={stats ? stats.online_users : 0} icon={<Users />} />
            <Statistic label='Running attacks' count={stats ? stats.running_attacks : 0} icon={<Bolt />} />
            <Statistic label='Attacks today' count={stats ? stats.attacks_today : 0} icon={<Clock />} />
            <Statistic label='Total attacks' count={stats ? stats.total_attacks : 0} icon={<ServerStack />} />
        </div>
    )
}