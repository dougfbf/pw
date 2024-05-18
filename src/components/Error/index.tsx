import Link from 'next/link'

import Exclamation from '@/icons/Exclamation'

import s from './styles.module.css'

export default function Component() {
    return (
        <main className={s.main}>
            <Exclamation />
            <div className={s.description}>
                <p>Something went wrong while initializing your session.</p>
                <p>Please try refreshing the page or contact <Link className={s.telegram} href='https://t.me/freeddospw'>support</Link> for assistance.</p>
            </div>
        </main>
    )
}