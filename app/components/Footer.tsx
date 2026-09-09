import Image from 'next/image'
import ScrollAnimation from './ScrollAnimation'
import VisitorCounter from './VisitorCounter'
import styles from './Footer.module.css'

const MAP_LINK = 'https://maps.app.goo.gl/eqAYtJ5KEcych9f57?g_st=ac'
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784!2d74.018!3d19.876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc23b17773a6873%3A0x8dd0ba7bdb291a23!2sSWARGUMPHAN%20SANGIT%20VIDYALAYA!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin'

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
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                  aria-label="Open Swargumphan location in Google Maps"
                >
                  <iframe
                    src={MAP_EMBED_SRC}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className={styles.googleMap}
                    title="Swargumphan Music Institute location"
                  />
                </a>
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
