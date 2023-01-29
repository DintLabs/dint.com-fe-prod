import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const CookieNotice = () => {
  // @ts-ignore
  const { toggle } = useContext(ThemeContext);

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center h1 mb-5" style={{color: toggle ? 'white' : '#161c24'}}>Cookie Notice</h1>
      <p style={{color: toggle ? 'white' : '#161c24'}}>
        Effective: Jan 2023
        <br />
        <br />
Cookie Notice for Dint  <br />  <br />
Dint ("we", "us", or "our") uses cookies and similar technologies on our website and mobile application (collectively, the "Platform") to provide you with a better, more personalized experience. This Cookie Notice explains what cookies are, how we use them on our Platform, and how you can manage your cookie preferences.  
<br />  <br />

<b>What are cookies? </b><br />
Cookies are small text files that are placed on your device by a website or mobile application when you visit it. They are widely used to make websites and mobile applications work, or work more efficiently, as well as to provide information to the owners of the site or app. Cookies can be either "persistent" cookies or "session" cookies. A persistent cookie remains on your device after you close your browser or mobile application, while a session cookie is deleted as soon as you close your browser or mobile application.
<br />  <br />

<b>How do we use cookies on our Platform?</b>
<br />  
We use cookies on our Platform for various purposes, including:
&bull; Authentication: We use cookies to authenticate you when you log in to our Platform and to keep you logged in as you navigate the Platform.
&bull; Preferences: We use cookies to remember your preferences and settings, such as your language and time zone.
&bull; Security: We use cookies to enhance the security of our Platform, such as by detecting and preventing fraud.
&bull; Analytics: We use cookies to understand how our Platform is being used and to improve it.
<br />  <br />

<b>How can you manage your cookie preferences?</b>
<br /> 
Most web browsers and mobile devices allow you to block or delete cookies. You can typically do this by adjusting the settings in your browser or mobile device. However, please note that if you block or delete cookies, some features of our Platform may not work as intended.
Changes to this Cookie Notice
<br /><br />

We may update this Cookie Notice from time to time to reflect changes to our cookie practices. We will notify you of any changes by posting the updated Cookie Notice on our Platform.
<br />  <br />

Contact Us
If you have any questions about this Cookie Notice, please contact us at info@dint.com.
</p>
    </div>
  );
};

export default CookieNotice;
