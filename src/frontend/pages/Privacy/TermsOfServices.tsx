import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const TermsOfServices = () => {
  const { toggle } = useContext(ThemeContext);

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center h1 mb-5" style={{color: toggle ? 'white' : '#161c24'}}>TERMS OF SERVICE</h1>
      <p style={{color: toggle ? 'white' : '#161c24'}}>
<b>Terms of Service</b>

<b>1. Introduction</b>
Welcome to Dint, a revolutionary new social media platform. Dint is a referral-based, monetized social media platform with a multilevel marketing structure powered by smart contracts. These terms of service (the "Terms") govern your use of the Dint platform and website, including the Dint mobile application (the "App"). By using Dint, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Dint platform or App.

<b>2. Eligibility</b>
You must be at least 18 years of age to use Dint. By using Dint, you represent and warrant that you are at least 18 years of age. Dint is not intended for children under 18.

<b>3. Accounts</b>
In order to use Dint, you must create an account. You are responsible for maintaining the confidentiality of your account and password, and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account or password.

<b>4. User Content</b>
As a user of Dint, you may submit, post, upload, publish, or otherwise make available on the platform or App (collectively, "submit") content, including but not limited to text, photos, videos, and audio (collectively, "User Content"). You are solely responsible for the User Content that you submit to Dint. By submitting User Content, you represent and warrant that you have the right to do so and that the User Content does not violate any laws or rights of any third party, including but not limited to intellectual property rights and privacy rights.

<b>5. Referral System</b>
Dint offers a unique referral system that allows users to earn a commission by referring their friends to join the platform. The platform also has a multilevel marketing structure, where users can earn commissions from the activity of users they have referred, as well as those referred by those users.

<b>6. Monetization</b>
Dint offers a feature where users can send tips to other users and create subscription pages, allowing them to earn money for creating content. Dint also provides every user with his or her own crypto wallet where they have their tokens. Dint tokens are on the Polygon network. Users can click the cash-out button on their wallet to automatically sell the tokens and have the funds deposited directly into their bank account. Users can buy the Dint token on the App for $1 each and then sell it for $1 each.

<b>7. Termination</b>
Dint reserves the right, in its sole discretion, to terminate or suspend your access to all or part of the platform or App, with or without notice, for any reason or no reason, including but not limited to violation of these Terms.

<b>8. Disclaimer of Warranties</b>
Dint is provided on an "as is" and "as available" basis. Dint makes no representations or warranties of any kind, express or implied, as to the operation of the platform or App or the information, content, materials, or products included on the platform or App. Dint does not warrant that the platform or App will be uninterrupted or error-free, and Dint will not be liable for any interruptions or errors.

<b>9. Limitation of Liability</b>
In no event shall Dint be liable for any damages whatsoever (including, without limitation, incidental and consequential damages, lost profits, or damages resulting from lost data or business interruption) resulting from the use or inability to use the platform or App, whether based on warranty, contract, tort, or any other legal theory, and whether or not Dint is advised of the possibility of such damages.
      </p>
    </div>
  );
};
export default TermsOfServices;
