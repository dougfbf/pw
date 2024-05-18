import Link from 'next/link'
import Image from 'next/image'
import Rocket from '@/icons/Rocket'

import s from './styles.module.css'

export default function Component() {
    return (
        <div className={s.container}>
            <div className={s.header}>
                <div className={s.label}>
                    <Rocket />
                    <h2 className={s.label}>FreeDDoS.pw</h2>
                </div>
            </div>
            <div className={s.body}>
                <p>{`FreeDDoS.pw is a free, easy-to-use IP stresser that doesn't require registration. Feel free to start using our panel!`}</p>
                <Link href="https://t.me/freeddospw" className={s.telegram}>
                    <div className={s.img}>
                        <Image
                            fill={true}
                            src='/telegram.png'
                            alt='Telegram icon' />
                    </div>
                    <p>Join us on Telegram!</p>
                </Link>
            </div>
        </div>
    )
}