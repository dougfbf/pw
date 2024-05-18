'use client'

import { useNews } from '@/hooks/useNews'
import s from './styles.module.css'

function timeAgo(date: string) {
    const now = new Date().getTime();
    const newDate = new Date(date).getTime();
    const diff = Math.abs(now - newDate);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
        return rtf.format(-seconds, 'second');
    }

    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) {
        return rtf.format(-minutes, 'minute');
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) {
        return rtf.format(-hours, 'hour');
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 30) {
        return rtf.format(-days, 'day');
    }

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    if (months < 12) {
        return rtf.format(-months, 'month');
    }

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));
    return rtf.format(-years, 'year');
}

type NewRendererProps = {
    title: string
    message: string
    release_date: string
}

function NewRender({
    title,
    message,
    release_date }: NewRendererProps) {
    return (
        <div className={s.newsContainer}>
            <div className={s.head}>
                <span className={s.title}>{title}</span>
                <span className={s.date}>{timeAgo(release_date)}</span>
            </div>
            <p className={s.newsContent}>{message}</p>
        </div>
    )
}

export default function NewsRenderer() {
    const { news } = useNews()
    return (
        <>
            {
                news.map((item, index) => (
                    <NewRender
                        key={index}
                        title={item.title}
                        message={item.message}
                        release_date={item.release_date}
                    />
                ))
            }
        </>
    )
}