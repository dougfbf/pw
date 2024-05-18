import Information from '@/icons/Information'
import s from './styles.module.css'

const faqs = [
    {
        question: `What is an IP Stresser?`,
        answer: `IP stressers flood target IP addresses with data, causing denial of service attacks that take the target offline.\nWhile stressers can be used for legitimate testing purposes, they're often misused to disrupt services and make systems unavailable.`
    },
    {
        question: `How to stress test an IP?`,
        answer: `On the stresser panel, enter your host's address, preferred port (leave empty for a random one), duration, and method.\nOur free service offers a modest flood, not always resulting in a successful attack, but useful for improving your firewall's effectiveness against larger attacks.`
    },
    {
        question: `Are there legitimate uses for it?`,
        answer: `Legitimate uses for IP stressers include testing network resilience, assessing DDoS mitigation, and conducting security audits, but proper authorization and legal compliance are crucial.`,
    }
]

export default function Component() {
    return (
        <section className={s.container}>
            <div className={s.header}>
                <div className={s.label}>
                    <h2 className={s.label}>Frequently Asked Questions</h2>
                </div>
            </div>
            <div className={s.body}>
                {
                    faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={s.faqContainer}
                        >
                            <span className={s.question}>{faq.question}</span>
                            <p className={s.answer}>{faq.answer}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}