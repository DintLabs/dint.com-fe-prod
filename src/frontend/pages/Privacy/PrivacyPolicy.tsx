import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const PrivacyPolicy = () => {
  // @ts-ignore
  const { toggle } = useContext(ThemeContext);

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center h1 mb-5" style={{color: toggle ? 'white' : '#161c24'}}>Privacy Policy</h1>
      <p style={{color: toggle ? 'white' : '#161c24'}}>
        Last Modified: Feb 2023
        <br />
        <br />
        IMPORTANT POINTS.
        <br />
        <br />
        PRIVACY POLICY
        <br />   <br />
1. Introduction   <br />
At Dint, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our social media platform, website, and mobile application (collectively, the "Service"). By using the Service, you agree to the terms of this Privacy Policy.
2. Information We Collect   <br />
When you use the Service, we may collect the following information about you:
Personal Information: We may collect personal information such as your name, email address, and phone number when you create an account on the Service or contact us for support.
Profile Information: We may collect information about your profile, such as your username, profile picture, and bio, when you create an account on the Service.
Activity Information: We may collect information about your activity on the Service, such as the content you post, the people you follow, and the messages you send.
Device Information: We may collect information about the device you use to access the Service, such as the device's make and model, operating system, and IP address.
3. Use of Information    <br />
We may use the information we collect from you to:
Provide and improve the Service: We may use your information to provide and improve the features and functionality of the Service.
Communicate with you: We may use your information to communicate with you about your account, the Service, and other matters.
Personalize your experience: We may use your information to personalize your experience on the Service, such as by showing you content that is relevant to your interests.
Perform research and analysis: We may use your information to perform research and analysis to improve the Service.
Comply with legal obligations: We may use your information to comply with any legal obligations we have, such as responding to a subpoena or court order.
4. Disclosure of Information    <br />
We may disclose your information to:
Service providers: We may share your information with service providers who perform services on our behalf, such as hosting the Service or providing customer support.
Legal authorities: We may disclose your information to legal authorities if we believe it is necessary to comply with a legal obligation, or to protect the rights, property, or safety of Dint, our users, or others.
Business partners: We may share your information with business partners for joint marketing or other purposes.
Other users: Your profile information, activity information, and device information may be visible to other users of the Service.
5. Data Retention   <br />
We will retain your information for as long as your account is active or as needed to provide you with the Service. We will also retain your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
6. Security    <br />
We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure, so we cannot guarantee its absolute security.
7. Changes to this Privacy Policy   <br />
We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of this policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you an email notification). We encourage you to review this Privacy Policy regularly to stay informed about our collection, use, and disclosure of your information.
8.  Contact Us    <br />
If you have any questions or concerns about this Privacy Policy or our collection,

      </p>
    </div>
  );
};

export default PrivacyPolicy;
