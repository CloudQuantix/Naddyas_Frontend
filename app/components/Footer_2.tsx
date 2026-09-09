import Image from 'next/image'
import ScrollAnimation from './ScrollAnimation'
import VisitorCounter from './VisitorCounter'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <ScrollAnimation animationType="fadeInUp" delay={0.2}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Swargumphan</h3>
              <p className={styles.footerTagline}>Music Institute</p>
              <p className={styles.footerDescription}>
                Live online music classes with expert faculty. Learn Classical, Playback Singing, and more.
              </p>
              <div className={styles.footerLogo}>
                <Image
                  src="/nad_dhyas.png"
                  alt="Nad Dhyas Logo"
                  width={200}
                  height={200}
                  className={styles.logoImage}
                  priority
                  unoptimized
                />
              </div>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Courses</h4>
              <ul className={`${styles.footerLinks} ${styles.coursesLinks}`}>
                <li><a href="#courses">Classical Vocal Music</a></li>
                <li><a href="#courses">Harmonium</a></li>
                <li><a href="#courses">Tabla</a></li>
                <li><a href="#courses">Pakhawaj</a></li>
                <li><a href="#courses">Flute</a></li>
                <li><a href="#courses">Sitar</a></li>
                <li><a href="#courses">Sound Arrangement</a></li>
                <li><a href="#courses">Bhajan</a></li>
                <li><a href="#courses">Light Music</a></li>
                <li><a href="#courses">Bharatanatyam</a></li>
                <li><a href="#courses">Kathak</a></li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Academy</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#about">About Us</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="/admin/login">Admin Login</a></li>
                <li><a href="/branch-manager/login">Branch Manager Login</a></li>
              </ul>
              <div className={styles.counterContainer}>
                <VisitorCounter />
              </div>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Contact Us</h4>
              <p className={styles.contactInfo}>
                <strong>Email:</strong><br />
                swargumphanvidyalaya@gmail.com
                <br />
                nnaddhyass@gmail.com
              </p>
              <p className={styles.contactInfo}>
                <strong>Phone:</strong><br />
                <a
                  href="https://wa.me/917721833346?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20Swargumphan%20Music%20Institute"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappLink}
                >
                  +91 7721833346
                </a>
                <br />
                <a href="tel:+919075960933" className={styles.whatsappLink}>
                  +91 9075960933
                </a>
              </p>
              <div className={styles.mapContainer}>
                <iframe
                  src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=SWARGUMPHAN%20SANGIT%20VIDYALAYA%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%B0%E0%A4%97%E0%A5%81%E0%A4%82%E0%A4%AB%E0%A4%A3%20%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A5%80%E0%A4%A4%20%E0%A4%B5%E0%A4%BF%E0%A4%A6%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%B2%E0%A4%AF&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.googleMap}
                ></iframe>
              </div>
            </div>
          </div>
        </ScrollAnimation>


        <div className={styles.footerBottom}>
          <p>&copy; 2025 Swargumphan Music Institute. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
