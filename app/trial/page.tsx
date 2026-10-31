import BookingTrialForm from '../components/BookingTrialForm'
import Header from '../components/Header'

export default function TrialBookingPage() {
    return (
        <main style={{ minHeight: '100vh', background: '#f4f7fb' }}>
            <Header transparent={false} />
            <BookingTrialForm />
        </main>
    )
}
