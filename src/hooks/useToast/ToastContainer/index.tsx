'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/hooks/useToast'
import s from './styles.module.css'

function CloseButton({ onClick }: { onClick: () => void }) {
    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation()
        onClick()
    }
    return (
        <button onClick={handleClick} className={s.closeButton}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 -960 960 960"
                width={24}>
                <path d="M256-200l-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224z" />
            </svg>
        </button>
    )
}

export default function ToastContainer() {
    const { toasts, removeToast } = useToast()
    return (
        <div className={s.toastArea}>
            <AnimatePresence mode='popLayout'>
                {
                    toasts.map((toast) => (
                        <motion.div
                            layout
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            initial={{ opacity: 0, y: -50, scale: 0.3 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: .5, y: 50 }}
                            transition={{ ease: 'linear', duration: .5, type: 'spring' }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 1 }}
                            key={toast.id}
                            className={s.toast}>
                            <div className={`${s.icon} ${toast.type === 'success' ? s.successIcon : s.errorIcon}`}>
                                {
                                    toast.type === 'success'
                                        ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                }
                            </div>
                            <div className={s.content}>
                                <div className={s.heading}>
                                    <p className={`${s.title} ${toast.type === 'success' ? s.successColor : s.warnColor}`}>{toast.title}</p>
                                </div>
                                <p className={s.message}>{toast.content}</p>
                            </div>
                            <CloseButton onClick={() => removeToast(toast.id!)} />
                        </motion.div>
                    ))
                }
            </AnimatePresence>
        </div >
    )
}