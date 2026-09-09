import Header from '../components/Header'

export default function ExaminationLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
