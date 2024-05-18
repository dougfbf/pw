import NewsRenderer from '@/components/NewsRenderer'
import Newspaper from '@/icons/Newspaper'
import s from './styles.module.css'

export default function Component() {
    return (
        <section className={s.container}>
            <div className={s.header}>
                <div className={s.label}>
                    <Newspaper />
                    <h2 className={s.label}>News</h2>
                </div>
            </div>
            <div className={s.body}>
                <NewsRenderer />
            </div>
        </section>
    )
}