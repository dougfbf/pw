'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

import ChevronUpDown from '@/icons/ChevronUpDown'

import type { Method } from '@/types'

import s from './styles.module.css'
import { useAPI } from '@/hooks/useAPI'

export default function Selector({ selected, setSelected, methods }: {
    selected: Method,
    methods: Method[],
    setSelected: React.Dispatch<React.SetStateAction<Method>>
}) {
    const [open, setOpen] = useState(false)
    function toggleOpen() { setOpen(prev => !prev) }
    const ref = useRef<HTMLUListElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const { stresserPanel } = useAPI()
    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
                return
            }
            if (ref && ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => { document.removeEventListener('mousedown', handleOutsideClick) }
    }, [ref])
    return (
        <button
            ref={buttonRef}
            onClick={toggleOpen}
            className={`${s.selector} ${open && s.open}`}
            disabled={stresserPanel.isLoading}
        >
            <span>{selected.label}</span>
            <span className={s.upDownChevron}>
                <ChevronUpDown />
            </span>
            <AnimatePresence>
                {
                    open &&
                    <motion.ul
                        ref={ref}
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={s.listOptions}>
                        {
                            methods.map((method, index) => (
                                <li
                                    key={index}
                                    onClick={() => setSelected(method)}
                                    className={s.listOption}
                                >
                                    {method.label}
                                </li>
                            ))
                        }
                    </motion.ul>
                }
            </AnimatePresence>
        </button>
    )
}