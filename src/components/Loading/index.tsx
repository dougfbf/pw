'use client'

import s from './styles.module.css'

function LoadingIcon() {
    return (
        <div className={s.loading}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}

export default function Component() {
    return (
        <main className={s.main}>
            <LoadingIcon />
            <h3 className={s.scaleIn}>
                FreeDDoS.pw
            </h3>
        </main>
    )
}