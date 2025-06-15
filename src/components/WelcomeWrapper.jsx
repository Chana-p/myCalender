import React from 'react';
import Welcome from './Welcome';
import './Welcome.css';

const WelcomeWrapper = ({ onNavigateToCalendar }) => {
  const handleLogin = () => {
    // כאן תוכלי להוסיף לוגיקת התחברות
    console.log('Login clicked');
    onNavigateToCalendar();
  };

  const handleRegister = () => {
    // כאן תוכלי להוסיף לוגיקת הרשמה
    console.log('Register clicked');
  };

  const handleSystemAccess = () => {
    // כאן תוכלי להוסיף לוגיקת כניסה למערכת
    console.log('System access clicked');
    onNavigateToCalendar();
  };

  return (
    <Welcome
      onLogin={handleLogin}
      onRegister={handleRegister}
      onSystemAccess={handleSystemAccess}
    />
  );
};

export default WelcomeWrapper;
