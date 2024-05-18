'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react'
import { useAPI } from '@/hooks/useAPI'

import type { Attack } from '@/types'

import Bolt from '@/icons/Bolt'
import Block from '@/icons/Block'

import s from './styles.module.css'

export default function Component() {
    const { attacks, stopAttack, runningPanel } = useAPI()

    function Timer({ attack }: { attack: Attack }) {
        const [timeLeft, setTimeLeft] = useState(() => {
            const attackStartTime = new Date(attack.date_sent)
            return Math.floor(((attackStartTime.getTime() + (attack.duration)) - (Date.now() / 1000)))
        });

        useEffect(() => {
            const intervalId = setInterval(() => {
                if (timeLeft > 0) {
                    setTimeLeft(prevTime => prevTime - 1)
                }
            }, 1000);

            return () => clearInterval(intervalId)
        }, [attack, timeLeft])

        if (timeLeft >= 0) {
            return <span>{timeLeft}s</span>
        }
    }

    return (
        <div className={s.container}>
            <div className={s.header}>
                <div className={s.label}>
                    <Bolt />
                    <h2 className={s.label}>Running</h2>
                </div>
            </div>
            <div className={s.body}>
                {
                    attacks.length === 0 &&
                    <div className={s.emptyBoots}>
                        <Image
                            width={125}
                            height={125}
                            src='/no_data.webp'
                            alt='No data image' />
                        <p>No attacks running.</p>
                    </div>
                }
                {
                    attacks.length > 0 &&
                    <div className={s.tableBody}>
                        <table>
                            <thead>
                                <tr>
                                    <th>TARGET</th>
                                    <th>METHOD</th>
                                    <th>TIME LEFT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    attacks.map((attack, index) => (
                                        <tr key={index}>
                                            <td>{attack.target}</td>
                                            <td>{attack.method}</td>
                                            <td>
                                                <button
                                                    onClick={() => stopAttack(attack.id)}
                                                    disabled={runningPanel.isLoading}
                                                    className={s.stopButton}
                                                >
                                                    <Block />
                                                    <Timer attack={attack} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}