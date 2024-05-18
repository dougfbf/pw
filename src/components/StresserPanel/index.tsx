'use client'

import { useAPI } from '@/hooks/useAPI'
import { useToast } from '@/hooks/useToast'
import { ChangeEvent, useState } from 'react'

import type { Method } from '@/types'

import Bolt from '@/icons/Bolt'
import Panel from '@/icons/Panel'
import Selector from '@/components/Selector'
import LoadingIcon from '@/components/LoadingIcon'


import s from './styles.module.css'

const methods: Method[] = [
    {
        method: 'UDP-DNS',
        label: 'UDP-DNS (Reflection Flood - BEST)'
    },
    {
        method: 'TCP-AMP',
        label: 'TCP-AMP (SYN-ACK/RST Reflection)'
    },
    {
        method: 'TCP-SYN',
        label: 'TCP-SYN (TCP flood with options)'
    }
]

type FormDataType = {
    method: string
    address: string
    port: string
    duration: string
}

export default function Component() {
    const { showToast } = useToast()
    const { sendAttack, stresserPanel } = useAPI()
    const [selected, setSelected] = useState(methods[0])
    const [formData, setFormData] = useState<FormDataType>({
        method: selected.label,
        address: '',
        port: '',
        duration: ''
    })

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target
        let newValue: number | string
        if (id === 'port' || id === 'duration') {
            newValue = value.replace(/[^\d]/g, '')
        } else {
            newValue = value
        }
        setFormData(prev => ({
            ...prev,
            [id]: newValue
        }))
    }

    function handleSend(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (formData.address === '' || !formData.duration) {
            showToast({
                type: 'error',
                title: 'Stresser Panel',
                content: 'Please fill all the required fields.'
            })
            return
        }
        sendAttack({
            method: selected.method,
            target: formData.address,
            port: !formData.port ? 0 : parseInt(formData.port),
            duration: parseInt(formData.duration)
        })
    }
    return (
        <section className={s.container}>
            <div className={s.header}>
                <div className={s.label}>
                    <Panel />
                    <h2 className={s.label}>Stresser Panel</h2>
                </div>
            </div>
            <div className={s.body}>
                <span className={s.field}>
                    <span className={s.label}>Method</span>
                    <Selector methods={methods} selected={selected} setSelected={setSelected} />
                </span>
                <form
                    onSubmit={handleSend}
                    className={s.form}>
                    <div className={s.horizontalGroup}>
                        <span className={s.field} style={{ width: '60%' }}>
                            <span className={s.label}>Host</span>
                            <input
                                id='address'
                                type='text'
                                autoComplete='off'
                                placeholder='0.0.0.0'
                                value={formData.address}
                                onChange={handleInputChange}
                                disabled={stresserPanel.isLoading}
                            />
                        </span>
                        <span className={s.field} style={{ width: '40%' }}>
                            <span className={s.label}>Port</span>
                            <input
                                id='port'
                                type='text'
                                autoComplete='off'
                                value={formData.port ? formData.port.toString() : ''}
                                onChange={handleInputChange}
                                placeholder={`default: 0`}
                                disabled={stresserPanel.isLoading}
                            />
                        </span>
                    </div>
                    <span className={s.field}>
                        <span className={s.label}>{`Duration (in seconds)`}</span>
                        <input
                            id='duration'
                            type='text'
                            autoComplete='off'
                            value={formData.duration ? formData.duration : ''}
                            onChange={handleInputChange}
                            placeholder='min: 10, max: 300'
                            disabled={stresserPanel.isLoading}
                        />
                    </span>
                    <button
                        type='submit'
                        className={s.sendButton}
                        disabled={stresserPanel.isLoading}
                    >
                        {
                            stresserPanel.isLoading
                                ? <LoadingIcon />
                                : <Bolt />
                        }
                        <span>START ATTACK</span>
                    </button>
                </form>
            </div>
        </section>
    )
}