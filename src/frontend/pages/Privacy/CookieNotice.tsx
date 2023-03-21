import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const CookieNotice = () => {
  // @ts-ignore
  const { toggle } = useContext(ThemeContext);

  return (
    <>
    <div
      className="container"
      style={{
        position: "sticky",
        top: "60px",
        left: 0,
        zIndex: 2,
        width: "100vw",
      }}
    >
      <h1
        // className="text-center mb-5"
        style={{
          color: toggle ? "white" : "black",
          padding: "20px 0",
          backgroundColor: toggle ? "#161c24" : "white",
        }}
      >
        COOKIE NOTICE
      </h1>
    </div>
    <div className="container pt-5">
      {/* <h1 className="text-center h1 mb-5" style={{color: toggle ? 'white' : '#161c24'}}>COOKIE NOTICE</h1> */}
      <p style={{color: toggle ? 'white' : '#161c24'}}>
<b>Effective: Feb 2023</b> 
 <br />
<br />
<span className="notranslate">Dint</span> (collectively referred to as "<span className="notranslate">Dint</span>," "we," "us," "our") values your privacy and is dedicated to protecting the personal data we hold about you. By using our website located at www.dint.com (the "Services") with your browser set to accept cookies, you consent to our use of cookies and other technologies as described in this notice and in our Privacy Notice. For more information regarding cookies and pixel tags, including their purpose, how to opt out, manage, or delete them, please review this Cookie Notice.
<br /><br />
<b>WHAT ARE COOKIES?</b>
<br /><br />
"Cookies" are small pieces of text or computer code stored on your device locally, which enable us, ad networks, and our third-party service providers to identify your browser and/or device as you navigate the internet. Our Services or other websites or services that recognize a specific cookie can place, read, and/or write to these cookies. This allows the website to "remember" or "recognize" your browser or device and store information about it in some cases.
<br /><br />
Certain types of cookies or cookie-like functionalities can be placed or activated through browser extensions, such as Adobe Flash, among others. Although stored differently, their purpose and functionality are similar to other cookies.
<br /><br />
For further information on cookies, please visit www.allaboutcookies.org.
<br /><br />
<b>HOW LONG ARE COOKIES STORED ON MY DEVICE?</b>
<br /><br />
<b>Session Cookies: </b>"Session cookies" are stored temporarily and are deleted when you close your browser.
<br /><br />
<b>Persistent Cookies:</b> "Persistent cookies" are stored for a set period of time, usually ranging from 90 days to two years, depending on the application. These cookies are not deleted when you close your browser.
<br /><br />
Your choices may impact our use of session or persistent cookies for a particular application. For instance, if you choose "Remember Me," your two-step verification status will be stored on a persistent cookie for 30 days to remember the device from which you signed in.
<br /><br />
<b>AT COOKIES DO WE USE AND FOR WHAT PURPOSE?</b>
<br /><br />
<b>Necessary Cookies:</b> Some cookies are necessary for you to browse the Services and access specific pages. These necessary cookies are required for the proper functioning of the Services (or certain features on the Services), and we do not use them to gather personal data about you.
<br /><br />
<b>Cookie Name:  More Information</b>
auth_id:      Authenticates user ID
auth_uid_43:  Hashes to remember two-factor authentication.
<br /><br />
Disabling or deleting these cookies typically does not impact the functionality or performance of the Services.
<br /><br />
<b>Functionality Cookies:</b> We use functionality cookies to store information you have provided or choices you have made on the Services, such as remembering your logged-in status or website preferences. This enables us to offer a more personalized and convenient browsing experience.
<br /><br />
Disabling or deleting these cookies may make using the Services less convenient or may stop certain features from functioning correctly.
<br /><br />
<b>Third-Party Functionality: </b>We do not have access to or control over cookies or other technologies used by third-party sites, and these sites' information practices are not governed by our Privacy Notice or this Cookie Notice. For additional information on how Stripe and Securion gather and utilize information about your activities, please review their corresponding terms of service and privacy policies.
<br /><br />
<b>HOW DO I CONTROL OR MAKE CHOICES ABOUT COOKIES AND TRACKING TECHNOLOGIES?</b>
<br /><br />
<b>Managing Cookies:</b> Most browsers accept cookies by default, but you can change your device and browser settings to block or delete some or all cookies, or to receive notifications when you receive a new cookie. You can find more information about how to do this by checking the "Help," "Tools," or "Preferences" menus on your browser or the documentation for your device. However, blocking or deleting certain cookies may negatively impact your user experience.
<br /><br />
You can also usually disable or delete cookies placed and used by browser add-ons, such as Adobe Flash cookies, by changing the add-on settings or visiting the provider's website. Information on how to manage Adobe Flash cookies can be found on this page: https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager.html
<br /><br />
Please note that disabling Adobe Flash cookies or similar technologies may limit your access to certain features and services, such as consistent volume settings for videos, which enhance your online experience.
</p>
    </div>
    </>
  );
};

export default CookieNotice;
