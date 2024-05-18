import Link from 'next/link'
import s from './styles.module.css'

export default function Component() {
    return (
        <div className={s.footerWrapper}>
            <footer className={s.footer}>
                <p>Copyright &copy; FreeDDoS.pw 2022-{new Date().getFullYear()}</p>
                <p>Powered by <Link href='https://about.serverdown.cc/'>serverdown.cc</Link></p>
            </footer>
        </div>
    )
}