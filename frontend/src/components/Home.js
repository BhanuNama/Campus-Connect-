import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={styles.homeContainer}>
      {/* Modern Navigation */}
      <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
        <div className={styles.navBrand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
          <div className={styles.brandIcon}>
            <img src="/images/Logo.jpg" alt="Campus Connect Logo" width="32" height="32" style={{ borderRadius: '4px', objectFit: 'cover' }} />
          </div>
          <h1 className={styles.brandTitle}>CampusConnect</h1>
        </div>

        <ul className={styles.navLinks}>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
          <li><a href="#analytics" onClick={(e) => { e.preventDefault(); scrollToSection('analytics'); }}>Analytics</a></li>
          <li><Link to="/login" className={styles.loginBtn}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Login Portal
          </Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTag}>
              <span className={styles.tagIcon}>🚀</span>
              Next-Generation Campus Management
            </div>
            <h1 className={styles.heroTitle}>
              Revolutionize Your <br />
              <span className={styles.highlight}>Educational Institution</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Experience the future of campus management with AI-powered analytics, 
              seamless integrations, and intuitive design that puts students and faculty first.
            </p>
            <div className={styles.heroActions}>
              <Link to="/login" className={styles.ctaButton}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832L14 10.202a1 1 0 000-1.664l-4.445-2.37z" clipRule="evenodd" />
                </svg>
                Start Free Trial
              </Link>
              <button className={styles.secondaryButton} onClick={() => scrollToSection('features')}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Explore Platform
              </button>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.dashboardPreview}>
              <div className={styles.previewHeader}>
                <div className={styles.previewControls}>
                  <span className={styles.control}></span>
                  <span className={styles.control}></span>
                  <span className={styles.control}></span>
                </div>
                <div className={styles.previewTime}>{formatTime()}</div>
              </div>
              
              <div className={styles.previewContent}>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardHeader}>
                    <div className={styles.miniIcon}>📊</div>
                    <span>Analytics</span>
                  </div>
                  <div className={styles.miniChart}>
                    <div className={styles.chartBar} style={{ height: '60%' }}></div>
                    <div className={styles.chartBar} style={{ height: '80%' }}></div>
                    <div className={styles.chartBar} style={{ height: '40%' }}></div>
                    <div className={styles.chartBar} style={{ height: '90%' }}></div>
                  </div>
                </div>
                
                <div className={styles.miniCard}>
                  <div className={styles.miniCardHeader}>
                    <div className={styles.miniIcon}>👥</div>
                    <span>Active Users</span>
                  </div>
                  <div className={styles.userCount}>2,847</div>
                </div>
                
                <div className={styles.miniCard}>
                  <div className={styles.miniCardHeader}>
                    <div className={styles.miniIcon}>📚</div>
                    <span>Courses</span>
                  </div>
                  <div className={styles.courseProgress}>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill}></div>
                    </div>
                    <span>156 Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced Bento Grid */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Comprehensive Campus Ecosystem</h2>
          <p className={styles.sectionSubtitle}>Integrated solutions for modern educational institutions</p>
        </div>

        <div className={styles.bentoGrid}>
          {/* Smart Attendance - Large Card */}
          <div className={`${styles.featureCard} ${styles.featureLarge}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={styles.cardBadge}>AI-Powered</div>
              </div>
              <h3 className={styles.cardTitle}>Smart Attendance System</h3>
              <p className={styles.cardDescription}>
                Revolutionary attendance tracking with facial recognition, geofencing, and predictive analytics 
                to ensure accurate monitoring and improve student engagement.
              </p>
              <div className={styles.attendanceDemo}>
                <div className={styles.attendanceStats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>96.8%</span>
                    <span className={styles.statLabel}>Accuracy</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>2.3s</span>
                    <span className={styles.statLabel}>Check-in Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Analytics */}
          <div className={`${styles.featureCard} ${styles.featureMedium}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>
                <svg width="28" height="28" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Student Analytics</h3>
              <p className={styles.cardDescription}>Real-time insights into student performance and engagement patterns.</p>
            </div>
          </div>

          {/* Course Management */}
          <div className={`${styles.featureCard} ${styles.featureMedium}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>
                <svg width="28" height="28" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Course Management</h3>
              <p className={styles.cardDescription}>Streamlined course creation, scheduling, and curriculum management.</p>
              <div className={styles.courseGrid}>
                <div className={styles.courseItem}>Computer Science</div>
                <div className={styles.courseItem}>Mathematics</div>
                <div className={styles.courseItem}>Physics</div>
              </div>
            </div>
          </div>

          {/* Fee Management */}
          <div className={`${styles.featureCard} ${styles.featureSmall}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Digital Payments</h3>
              <p className={styles.cardDescription}>Secure fee collection and financial tracking.</p>
              <div className={styles.paymentStatus}>✓ Payment Secure</div>
            </div>
          </div>

          {/* Communication Hub */}
          <div className={`${styles.featureCard} ${styles.featureSmall}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Communication</h3>
              <p className={styles.cardDescription}>Instant messaging and announcements.</p>
              <div className={styles.messageIndicator}>
                <span className={styles.messageDot}></span>
                <span>5 New Messages</span>
              </div>
            </div>
          </div>

          {/* Exam Center */}
          <div className={`${styles.featureCard} ${styles.featureSmall}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Digital Exams</h3>
              <p className={styles.cardDescription}>Online examination and automated grading.</p>
              <div className={styles.examProgress}>
                <div className={styles.progressRing}>
                  <span>85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section id="analytics" className={styles.analyticsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Real-Time Analytics Dashboard</h2>
          <p className={styles.sectionSubtitle}>Data-driven insights for better decision making</p>
        </div>

        <div className={styles.dashboardShowcase}>
          <div className={styles.showcaseCard}>
            <div className={styles.showcaseHeader}>
              <h4>Live Campus Activity</h4>
              <div className={styles.liveIndicator}>
                <span className={styles.liveDot}></span>
                Live
              </div>
            </div>
            <div className={styles.activityFeed}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>👨‍🎓</div>
                <span>125 students checked in</span>
                <span className={styles.activityTime}>2 min ago</span>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>📝</div>
                <span>New assignment submitted</span>
                <span className={styles.activityTime}>5 min ago</span>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>💰</div>
                <span>Fee payment processed</span>
                <span className={styles.activityTime}>8 min ago</span>
              </div>
            </div>
          </div>

          <div className={styles.showcaseCard}>
            <div className={styles.showcaseHeader}>
              <h4>Performance Metrics</h4>
              <select className={styles.timeSelector}>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className={styles.metricsGrid}>
              <div className={styles.metric}>
                <div className={styles.metricValue}>94.2%</div>
                <div className={styles.metricLabel}>Attendance Rate</div>
                <div className={`${styles.metricTrend} ${styles.trendUp}`}>↗ +2.1%</div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricValue}>87.5</div>
                <div className={styles.metricLabel}>Avg Grade</div>
                <div className={`${styles.metricTrend} ${styles.trendUp}`}>↗ +1.3</div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricValue}>156</div>
                <div className={styles.metricLabel}>Active Courses</div>
                <div className={`${styles.metricTrend} ${styles.trendFlat}`}>→ 0%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Educational Leaders Choose Us</h2>
          <p className={styles.sectionSubtitle}>Trusted by 500+ institutions worldwide</p>
        </div>

        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className={styles.serviceTitle}>Lightning Performance</h3>
            <p className={styles.serviceDescription}>
              Sub-second response times with optimized infrastructure and real-time synchronization across all devices.
            </p>
            <div className={styles.serviceMetric}>
              <span className={styles.metricNumber}>0.3s</span>
              <span className={styles.metricText}>Average Load Time</span>
            </div>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className={styles.serviceTitle}>Bank-Grade Security</h3>
            <p className={styles.serviceDescription}>
              Military-grade encryption, FERPA compliance, and comprehensive audit trails protect sensitive student data.
            </p>
            <div className={styles.serviceMetric}>
              <span className={styles.metricNumber}>99.99%</span>
              <span className={styles.metricText}>Uptime Guaranteed</span>
            </div>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className={styles.serviceTitle}>Infinite Scalability</h3>
            <p className={styles.serviceDescription}>
              From small schools to large universities, our platform grows with your institution seamlessly.
            </p>
            <div className={styles.serviceMetric}>
              <span className={styles.metricNumber}>100K+</span>
              <span className={styles.metricText}>Students Supported</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Transform Your Campus Today</h2>
          <p className={styles.ctaDescription}>
            Join the educational revolution. Start your 30-day free trial and experience 
            the future of campus management.
          </p>
          <div className={styles.ctaActions}>
            <Link to="/login" className={styles.ctaButton}>
              Start Free Trial
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <div className={styles.ctaFeatures}>
              <span>✓ 30-day free trial</span>
              <span>✓ No credit card required</span>
              <span>✓ Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
            <div className={styles.brandIcon}>
              <img src="/images/Logo.jpg" alt="Campus Connect Logo" width="28" height="28" style={{ borderRadius: '4px', objectFit: 'cover' }} />
            </div>
            <h3>CampusConnect</h3>
          </div>
          <p className={styles.footerText}>
            © 2024 CampusConnect. Empowering the next generation of educational excellence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
