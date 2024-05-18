'use client'

import { useEffect } from 'react'
import { useAPI } from '@/hooks/useAPI'

import { motion } from 'framer-motion'

import Error from '@/components/Error'
import Loading from '@/components/Loading'

import FAQ from '@/components/FAQ'
import News from '@/components/News'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Running from '@/components/Running'
import MorePower from '@/components/MorePower'
import MobileNews from '@/components/MobileNews'
import Statistics from '@/components/Statistics'
import StresserPanel from '@/components/StresserPanel'

import s from './page.module.css'

export default function Home() {
    const { initialize, misc } = useAPI()

    useEffect(() => { initialize() }, [initialize])

    if (misc.isLoading) {
        return <Loading />
    }

    if (misc.initializationError) {
        return <Error />
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={s.wrapper}
        >
            <main className={s.main}>
                <Header />
                <Statistics />
                <div className={s.panels}>
                    <StresserPanel />
                    <Running />
                </div>
                <MorePower />
                <MobileNews />
                <FAQ />
                <Footer />
            </main>
            <News />
        </motion.div>
    )
}
