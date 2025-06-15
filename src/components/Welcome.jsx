import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  FileText, 
  Phone, 
  CreditCard, 
  Search,
  CheckCircle,
  Star,
  ArrowLeft,
  Mail,
  User,
  Settings
} from 'lucide-react';
import './Welcome.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInThunk } from '../redux/slices/logInThunk';
import { editPassword, editUsername } from '../redux/slices/userSlice';

// Debug - הוסף זה זמנית
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
const Welcome = ({ onLogin, onRegister, onSystemAccess }) => {
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);
    const failed = useSelector(state => state.user.failed);
    const loading = useSelector(state => state.user.loading);
    const dispatch = useDispatch();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [currentFeature, setCurrentFeature] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    
    const features = [
        {
            icon: <Calendar className="feature-icon" />,
            title: "לוח שנה חודשי ושבועי",
            description: "ניהול מועדים בשני הלוחות עם סנכרון מלא"
        },
        {
            icon: <Users className="feature-icon" />,
            title: "ניהול שיחות ותורים",
            description: "תיעוד שיחות עם הורים ואנשי צוות כולל מעקב התחייבויות"
        },
        {
            icon: <FileText className="feature-icon" />,
            title: "דוחות ומשימות",
            description: "יצירת דוחות ביניים, סיכומי טיפול ומעקב משימות"
        },
        {
            icon: <CheckCircle className="feature-icon" />,
            title: "מעקב טיפולים",
            description: "מספור סידורי לטיפולים ומעקב סדרות טיפול"
        },
        {
            icon: <CreditCard className="feature-icon" />,
            title: "ניהול תשלומים",
            description: "מעקב תשלומים וקבלות עם אפשרות התאמת סכומים"
        },
        {
            icon: <Search className="feature-icon" />,
            title: "חיפוש מתקדם",
            description: "חיפוש במשימות, טיפולים ומידע כללי"
        }
    ];


    useEffect(() => {
        if (!showLoginModal && !showRegisterModal) {
            const interval = setInterval(() => {
                setCurrentFeature((prev) => (prev + 1) % features.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [showLoginModal, showRegisterModal]);

   
    useEffect(() => {
        if (token && token !== -1) {
            setShowLoginModal(false);
            navigate('/calendar');
        }
    }, [token, navigate]);

  
    useEffect(() => {
        if (failed && showLoginModal) {
            setLoginError("שם משתמש או סיסמה שגויים");
        }
    }, [failed, showLoginModal]);

    const handleLogin = async () => {
        if (!username || !password) {
            setLoginError("אנא מלא את כל השדות");
            return;
        }

        setLoginError("");
        const details = { username, password };
        try {
            dispatch(logInThunk(details));
            dispatch(editUsername(details.username));
            dispatch(editPassword(details.password));
        } catch (error) {
            setLoginError("שגיאה בהתחברות");
        }
    };

    const handleSystemAccess = () => {
        navigate('/calendar');
    };

    // 🔥 פונקציות פשוטות לטיפול במודלים
    const openLoginModal = () => {
        setShowLoginModal(true);
        setLoginError("");
       setUsername("");setPassword("");;
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
        setLoginError("");
       setUsername("");setPassword("");;
    };

    // 🔥 הגדר את המודלים כפונקציות רגילות - לא useMemo!
    const LoginModal = () => (
        <AnimatePresence>
            {showLoginModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-backdrop"
                    onClick={closeLoginModal}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h3 className="modal-title">התחברות</h3>
                            <button
                                onClick={closeLoginModal}
                                className="modal-close"
                            >
                                <ArrowLeft className="icon-sm" />
                            </button>
                        </div>
                        <form className="modal-form">
                            {loginError && (
                                <div style={{
                                    color: 'red',
                                    textAlign: 'center',
                                    marginBottom: '10px',
                                    padding: '10px',
                                    backgroundColor: '#ffe6e6',
                                    borderRadius: '5px'
                                }}>
                                    {loginError}
                                </div>
                            )}
                            
                            <div className="form-group">
                                <label className="form-label">שם משתמש</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="הכנס שם משתמש"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername( e.target.value);
                                        if (loginError) setLoginError(""); // נקה שגיאה רק אם יש
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">סיסמה</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="הכנס סיסמה"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword( e.target.value );
                                        if (loginError) setLoginError("");
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-full"
                                disabled={loading}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogin();
                                }}
                            >
                                {loading ? "מתחבר..." : "התחבר"}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    const RegisterModal = () => (
        <AnimatePresence>
            {showRegisterModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-backdrop"
                    onClick={() => setShowRegisterModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h3 className="modal-title">הרשמה</h3>
                            <button
                                onClick={() => setShowRegisterModal(false)}
                                className="modal-close"
                            >
                                <ArrowLeft className="icon-sm" />
                            </button>
                        </div>
                        <div className="register-content">
                            <Mail className="register-icon" />
                            <p className="register-text">
                                לקבלת גישה למערכת, אנא שלח מייל עם פרטיך ונחזור אליך בהקדם
                            </p>
                            <a
                                href="mailto:your-email@example.com?subject=בקשה להרשמה למערכת הלוח"
                                className="btn btn-primary"
                            >
                                <Mail className="icon-sm" />
                                שלח מייל להרשמה
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="welcome-container">
            {/* Header */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="header"
            >
                <div className="container">
                    <div className="header-content">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="logo"
                        >
                            <div className="logo-icon">
                                <Calendar className="icon-md" />
                            </div>
                            <h1 className="logo-text">CliniClick</h1>
                        </motion.div>
                        <div className="header-buttons">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={openLoginModal}
                                className="btn btn-secondary"
                            >
                                התחברות
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSystemAccess}
                                className="btn btn-primary"
                            >
                                כניסה למערכת
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <motion.h2
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{fontSize: '40px'}}
                            className="hero-title"
                        >
                            <h1 className="logo-text" style={{fontSize: '50px'}}>
                                ברוכים הבאים ל
                                <Calendar className="icon-lg" />
                                CliniClick
                            </h1>  
                            מערכת ניהול הלו"ז המתקדמת שלנו
                        </motion.h2>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="hero-description"
                        >
                            מערכת ניהול מפותחת ומתאמת אישית לטיפולים, שיחות, דוחות ומשימות עם ממשק חדשני ונוח לשימוש
                        </motion.p>
                    </div>

                    {/* Features Showcase */}
                    <div className="features-showcase">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="features-list"
                        >
                            <h3 className="features-title">יכולות המערכת</h3>
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                    className={`feature-item ${currentFeature === index ? 'active' : ''}`}
                                >
                                    <div className="feature-icon-wrapper">
                                        {feature.icon}
                                    </div>
                                    <div className="feature-content">
                                        <h4 className="feature-title">{feature.title}</h4>
                                        <p className="feature-description">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="feature-showcase"
                        >
                       
                            <div className="showcase-card">
                                <div className="showcase-decoration"></div>
                                <div className="showcase-content">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentFeature}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                            className="showcase-feature"
                                        >
                                            <div className="showcase-icon">
                                                {features[currentFeature].icon}
                                            </div>
                                            <h4 className="showcase-title">
                                                {features[currentFeature].title}
                                            </h4>
                                            <p className="showcase-description">
                                                {features[currentFeature].description}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="action-section"
                    >
                        <h3 className="action-title">התחל עכשיו</h3>
                        <div className="action-buttons">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={openLoginModal}
                                className="btn btn-primary btn-large"
                            >
                                <User className="icon-sm" />
                                התחבר כלקוח רשום
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowRegisterModal(true)}
                                className="btn btn-secondary btn-large"
                            >
                                <Mail className="icon-sm" />
                                הירשם למערכת
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSystemAccess}
                                className="btn btn-dark btn-large"
                            >
                                <Settings className="icon-sm" />
                                כניסה לביקור במערכת 
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="stats-section"
            >
                <div className="container">
                    <div className="stats-grid">
                        {[
                            { number: "500+", label: "לקוחות מרוצים", icon: <Users className="icon-lg" /> },
                            { number: "10,000+", label: "טיפולים נוהלו", icon: <CheckCircle className="icon-lg" /> },
                            { number: "99%", label: "שביעות רצון", icon: <Star className="icon-lg" /> }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="stat-card"
                            >
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="footer-logo">
                                <div className="footer-logo-icon">
                                    <Calendar className="icon-md" />
                                </div>
                                <h3 className="footer-logo-text">מערכת הלוח</h3>
                            </div>
                            <p className="footer-description">
                                המערכת המתקדמת לניהול טיפולים ומעקב לקוחות
                            </p>
                        </div>
                        <div className="footer-section">
                            <h4 className="footer-title">יכולות עיקריות</h4>
                            <ul className="footer-list">
                                <li>• ניהול לוח שנה כפול</li>
                                <li>• מעקב טיפולים ותשלומים</li>
                                <li>• דוחות ומשימות</li>
                                <li>• ממשק חדשני ונוח</li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4 className="footer-title">צור קשר</h4>
                            <div className="footer-contact">
                                <p>📧 info@mycalendar.com</p>
                                <p>📱 0556750905</p>
                                <p>🌐 www.mycalendar.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 מערכת myCalendar. כל הזכויות שמורות.</p>
                    </div>
                </div>
            </footer>

            {/* Modals */}
            <LoginModal />
            <RegisterModal />

            {/* Floating Animation Elements */}
            <div className="floating-elements">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="floating-dot"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -100, 0],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${20 + i * 10}%`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
Welcome.whyDidYouRender = true;
export default Welcome;
