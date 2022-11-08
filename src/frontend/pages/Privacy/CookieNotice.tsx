import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const CookieNotice = () => {
  // @ts-ignore
  const { toggle } = useContext(ThemeContext);

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center h1 mb-5" style={{color: toggle ? 'white' : '#161c24'}}>Cookie Notice</h1>
      <p style={{color: toggle ? 'white' : '#161c24'}}>
        Effective: Aug 2022
        <br />
        <br />
        Dint Club Inc (collectively, “Dint Club,” “we,” “us,” “our”) respect your privacy and are
        committed to protecting the personal data we hold about you. By using our website located at
        www.dint.com (the “Services”) with your browser set to accept cookies, you consent to our
        use of cookies and other technologies to provide the Services to you as described in this
        notice and in our Privacy Notice. For more information about what cookies and pixel tags
        are, what they do, and how you can opt out of, manage, or delete them, please review this
        Cookie Notice.
        <br />
        <br />
        WHAT ARE COOKIES?
        <br />
        <br />
        “Cookies” are small strings of text or computer code stored locally on your device that
        allow us, ad networks, and our third-party service providers, to identify your browser
        and/or device as you browse the Internet. Cookies can be placed, read, and/or written to by
        our Services, or other websites or services that recognize a particular cookie, which allows
        the website to “remember” or “recognize” a particular browser or device and, in some cases,
        store information about that browser or device.
        <br />
        <br />
        Certain types of cookies or cookie-like functionality may be placed or activated through
        browser add-ons, including, but not limited to, Adobe Flash. While these cookies are stored
        differently, their functionality and purpose is generally similar to other cookies.
        <br />
        <br />
        For more information about cookies, please see www.allaboutcookies.org.
        <br />
        <br />
        HOW LONG ARE COOKIES STORED ON MY SYSTEM?
        <br />
        <br />
        Session Cookies. “Session cookies” are stored for the duration of a browser session; when
        you close the browser, the cookie is deleted. Persistent Cookies. “Persistent cookies” are
        stored for a preset amount of time (often between 90 days and two years, depending on the
        application) and are typically not deleted when a browser session is closed.
        <br />
        <br />
        Your choices may affect whether we use session or persistent cookies for a particular
        application. For example, if you select “Remember Me,” your two-step verification status is
        stored on a persistent cookie for 30 days to remember the device that you signed in from.
        <br />
        <br />
        WHAT COOKIES DO WE USE, AND WHY?
        <br />
        <br />
        Necessary Cookies. Some cookies are necessary to allow you to browse the Services and access
        certain pages. Necessary cookies are required for the Services (or certain functionality on
        the Services) to work properly, and we do not use these cookies to collect personal data
        about you.
        <br />
        <br />
        Cookie Name More Information auth_id authenticate user ID auth_uid_43 hash to remember
        two-factor authentication Disabling or removing these cookies may prevent the Services, or
        certain functionality on the Services, from working correctly or at all.
        <br />
        <br />
        Performance Cookies. We use performance cookies to collect information about how our users
        use and interact with the Services, such as what pages are visited most often, how the
        Services are used and function, or how users navigate the Services. We use this information
        to improve the Services and their content. These cookies only collect aggregate information
        about the use of the Services, and thus do not collect information that can be used to
        identify you personally. Examples include:
        <br />
        <br />
        Cookie Name More Information sess session cookie; contains a unique identifier for your
        device csrf csrf token fp browser fingerprint ref_src source of referral ID ref referral
        user ID Disabling or removing these cookies generally does not interfere with the
        functionality or performance of the Services.
        <br />
        <br />
        Functionality Cookies. We use functionality cookies to remember information that you have
        provided or choices you have made on the Services, such as saving your logged-in status or
        site preferences. This allows us to provide a more personalized and convenient browsing
        experience.
        <br />
        <br />
        Disabling or removing these cookies may make browsing the Services less convenient or may
        prevent certain functionality from working correctly.
        <br />
        <br />
        Third-Party Functionality. We do not have access to or control over cookies or other
        features that third party sites may use, and the information practices of those third party
        websites are not covered by our Privacy Notice or this Cookie Notice. For more information
        about how Stripe and Securion collect and use information about your activities, please
        review their applicable terms of service and privacy policies.
        <br />
        <br />
        HOW DO I CONTROL OR MAKE CHOICES ABOUT COOKIES AND TRACKING TECHNOLOGIES?
        <br />
        <br />
        Managing Cookies. Most browsers automatically accept cookies by default, but you can adjust
        your device and/or browser settings to delete and/or block some or all cookies, or provide
        notifications when you receive a new cookie. Consult the “Help,” “Tools,” or “Preferences”
        menus on your browser, or the documentation for your device, for more information about how
        to do this. Please note, however, that blocking or deleting certain cookies may negatively
        affect your user experience.
        <br />
        <br />
        Additionally, you can generally disable or delete cookies placed and used by browser
        add-ons, such as Adobe Flash cookies, by changing the add-on settings or visiting the
        website of its provider. Information and controls that allow you to manage Adobe Flash
        cookies may be found on this page:
        <br />
        <br />
        https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager.html
        <br />
        <br />
        Note that if you disable Adobe Flash cookies or similar technologies, you may not have
        access to certain features and services (such as consistent volume settings for videos) that
        make your online experience more efficient and/or enjoyable.
      </p>
    </div>
  );
};

export default CookieNotice;
