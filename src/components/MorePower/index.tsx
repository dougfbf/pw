import Link from 'next/link'
import Fire from '@/icons/Fire'

import s from './styles.module.css'

export default function Component() {
    return (
        <section className={s.container}>
            <div className={s.header}>
                <div className={s.label}>
                    <Fire />
                    <h2 className={s.label}>Want more power?</h2>
                </div>
            </div>
            <div className={s.body}>
                <p>Visit <Link href='https://stressers.su'>Stresser US</Link> - your top choice on the DDoS-for-hire market.</p>
            </div>
        </section>
    )
}