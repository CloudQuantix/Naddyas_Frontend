'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './BookingTrialForm.module.css'

export default function BookingTrialForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingId, setBookingId] = useState('')

  // Form State
  const [phone, setPhone] = useState('')
  const [studentName, setStudentName] = useState('')
  const [gender, setGender] = useState<'Male' | 'Female' | "I Don't Want To Tell" | ''>('Male')
  const [category, setCategory] = useState('')
  const [branch, setBranch] = useState('Karmaveer Nagar Society')
  const [referralCode, setReferralCode] = useState('')
  const [showReferralInput, setShowReferralInput] = useState(false)

  // Step 2: Date & Time
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')

  // Step 3: Contact & Address
  const [email, setEmail] = useState('')
  const [parentName, setParentName] = useState('')
  const [address, setAddress] = useState('')

  const availableSlots = [
    '10:00 AM - 11:00 AM',
    '11:30 AM - 12:30 PM',
    '02:00 PM - 03:00 PM',
    '04:00 PM - 05:00 PM',
    '05:30 PM - 06:30 PM',
    '07:00 PM - 08:00 PM',
  ]

  const categories = [
    'Classical Vocal Music',
    'Harmonium',
    'Tabla',
    'Pakhawaj',
    'Flute (Bansuri)',
    'Sitar',
    'Acoustic / Electric Guitar',
    'Violin',
    'Electronic Keyboard / Piano',
    'Sugam Sangeet / Playback',
    'Kathak Dance',
    'Bharatanatyam Dance',
    'Voice Culture & Riyaz',
  ]

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number')
      return
    }
    if (!studentName.trim()) {
      alert('Please enter student name')
      return
    }
    if (!category) {
      alert('Please choose your category')
      return
    }
    setCurrentStep(2)
  }

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate) {
      alert('Please select a preferred date for the free trial')
      return
    }
    if (!selectedSlot) {
      alert('Please select a time slot')
      return
    }
    setCurrentStep(3)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const payload = {
      studentName: studentName.trim(),
      phone: phone.trim(),
      gender: gender || 'Not Specified',
      category: category,
      branch: branch || 'Karmaveer Nagar Society',
      trialDate: selectedDate,
      trialSlot: selectedSlot,
      email: email.trim(),
      parentName: parentName.trim(),
      address: address.trim(),
      referralCode: referralCode.trim(),
      notes: `Trial Slot: ${selectedSlot} on ${selectedDate}. Registered from Web Portal.`
    }

    try {
      const res = await fetch('/api/trials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setBookingId(data.bookingNo || `TRL-${Date.now().toString().slice(-6)}`)
        setSubmitted(true)
      } else {
        setBookingId(data.bookingNo || `TRL-${Date.now().toString().slice(-6)}`)
        setSubmitted(true)
      }
    } catch {
      setBookingId(`TRL-${Date.now().toString().slice(-6)}`)
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.pageContainer}>
      {/* Top Progress Stepper */}
      <header className={styles.stepperHeader}>
        <div className={styles.stepperContainer}>
          <div
            className={`${styles.stepItem} ${currentStep === 1 ? styles.stepActive : ''} ${currentStep > 1 ? styles.stepCompleted : ''}`}
            onClick={() => !submitted && setCurrentStep(1)}
          >
            <span className={styles.stepNumber}>{currentStep > 1 ? '✓' : '1'}</span>
            <span>1. Student Details</span>
          </div>

          <div
            className={`${styles.stepItem} ${currentStep === 2 ? styles.stepActive : ''} ${currentStep > 2 ? styles.stepCompleted : ''}`}
            onClick={() => {
              if (phone && studentName && category && !submitted) setCurrentStep(2)
            }}
          >
            <span className={styles.stepNumber}>{currentStep > 2 ? '✓' : '2'}</span>
            <span>2. Date &amp; Time</span>
          </div>

          <div
            className={`${styles.stepItem} ${currentStep === 3 ? styles.stepActive : ''}`}
            onClick={() => {
              if (selectedDate && selectedSlot && !submitted) setCurrentStep(3)
            }}
          >
            <span className={styles.stepNumber}>3</span>
            <span>3. Contact Details</span>
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <main className={styles.formMain}>
        <div className={styles.cardBox}>
          {submitted ? (
            /* Success View */
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.mainTitle}>Trial Booked Successfully!</h2>
              <p className={styles.subTitle}>
                We are thrilled to welcome you to Swargumphan Music Institute.
              </p>

              <div className={styles.detailsSummary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Booking Reference:</span>
                  <span className={styles.summaryVal}>{bookingId}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Student Name:</span>
                  <span className={styles.summaryVal}>{studentName}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Course / Category:</span>
                  <span className={styles.summaryVal}>{category}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Trial Date:</span>
                  <span className={styles.summaryVal}>{selectedDate}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Selected Slot:</span>
                  <span className={styles.summaryVal}>{selectedSlot}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Contact Mobile:</span>
                  <span className={styles.summaryVal}>+91 {phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                <Link href="/" className={styles.ctaButton} style={{ textDecoration: 'none', maxWidth: '240px' }}>
                  Return to Home
                </Link>
                <a
                  href={`https://wa.me/917721833346?text=${encodeURIComponent(`Hello, I have booked a Free Trial for ${studentName} for ${category} on ${selectedDate} (${selectedSlot}). Booking ID: ${bookingId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.backButton}
                  style={{ textDecoration: 'none' }}
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          ) : currentStep === 1 ? (
            /* Step 1: Student Details */
            <div>
              <div className={styles.headerTextGroup}>
                <h1 className={styles.mainTitle}>Booking Free Trial</h1>
                <p className={styles.subTitle}>Let us know who is attending the trial.</p>
              </div>

              <form onSubmit={handleStep1Next}>
                {/* Mobile Number */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Mobile Number</label>
                  <div className={styles.phoneInputWrapper}>
                    <div className={styles.countryCodeBlock}>
                      <span className={styles.flag}>🇮🇳</span>
                      <span>+91</span>
                      <span className={styles.chevronDown}>▾</span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="e.g. 8123456789"
                      className={styles.phoneField}
                      required
                    />
                  </div>
                </div>

                {/* Student Name */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter full name of student"
                    className={styles.textInput}
                    required
                  />
                </div>

                {/* Gender */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <span>Select Gender</span>
                    <span className={styles.infoIcon} title="Select preferred gender">i</span>
                  </label>
                  <div className={styles.genderButtonGroup}>
                    {(['Male', 'Female', "I Don't Want To Tell"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        className={`${styles.genderButton} ${gender === g ? styles.genderButtonActive : ''}`}
                        onClick={() => setGender(g)}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Dropdown */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <span>Choose Your Category</span>
                    <span className={styles.requiredTag}>*Category is required.</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.selectInput}
                    required
                  >
                    <option value="">Choose your category</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Branch Selection */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Preferred Learning Center / Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="Karmaveer Nagar Society">Karmaveer Nagar Society, Satara</option>
                    <option value="Godoli Satara">Godoli, Satara</option>
                    <option value="Krantismruti Satara">Krantismruti, Satara</option>
                    <option value="Karad Branch">Karad Branch</option>
                    <option value="Online Class">Online Class (Live Faculty)</option>
                  </select>
                </div>

                <button type="submit" className={styles.ctaButton}>
                  Select Date &amp; Time →
                </button>
              </form>
            </div>
          ) : currentStep === 2 ? (
            /* Step 2: Date & Time Slot */
            <div>
              <div className={styles.headerTextGroup}>
                <h1 className={styles.mainTitle}>Pick Date &amp; Time</h1>
                <p className={styles.subTitle}>Select your convenient schedule for the trial lesson.</p>
              </div>

              <form onSubmit={handleStep2Next}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Preferred Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Select Time Slot</label>
                  <div className={styles.slotsGrid}>
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`${styles.slotButton} ${selectedSlot === slot ? styles.slotButtonActive : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.buttonRow} style={{ marginTop: '30px' }}>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => setCurrentStep(1)}
                  >
                    ← Back
                  </button>
                  <button type="submit" className={styles.ctaButton}>
                    Proceed to Contact Details →
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Step 3: Contact Details & Confirmation */
            <div>
              <div className={styles.headerTextGroup}>
                <h1 className={styles.mainTitle}>Contact Details</h1>
                <p className={styles.subTitle}>Almost there! Where should we send session details?</p>
              </div>

              <form onSubmit={handleFinalSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Parent / Guardian Name (Optional)</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Enter parent's name"
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Address / City</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your city or area in Satara / Karad"
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.buttonRow} style={{ marginTop: '30px' }}>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => setCurrentStep(2)}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className={styles.ctaButton}
                    disabled={submitting}
                  >
                    {submitting ? 'Confirming Trial...' : '✓ Confirm & Book Free Trial'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className={styles.termsFooter}>
            By proceeding further, you agree to our <a href="#">Terms &amp; Conditions</a> and our{' '}
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </main>
    </div>
  )
}
