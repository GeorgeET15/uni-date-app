import React from "react";

function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString("en-GB");

  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>
        Welcome to UniDate! Your privacy is important to us, and we are
        committed to protecting your personal information. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your data when you
        use our dating app.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you register and use UniDate, we may collect the following
        information:
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Age</li>
          <li>Gender</li>
          <li>Branch of study</li>
          <li>About information</li>
          <li>Current academic year</li>
        </ul>
      </p>

      <h2>How We Use Your Information</h2>
      <p>
        We use the collected information for various purposes, including:
        <ul>
          <li>Creating and managing user accounts</li>
          <li>Providing personalized user experiences</li>
          <li>Matching users based on compatibility</li>
          <li>Communicating with you about the app</li>
          <li>Improving our services</li>
        </ul>
      </p>

      <h2>Sharing Your Information</h2>
      <p>
        We may share your information with third parties under the following
        circumstances:
        <ul>
          <li>
            With your consent or at your direction, such as when you choose to
            connect with other users.
          </li>
          <li>
            To comply with legal obligations or respond to legal requests.
          </li>
          <li>
            To protect the rights, property, or safety of UniCorp, our users, or
            others.
          </li>
        </ul>
      </p>

      <h2>Security</h2>
      <p>
        We prioritize the security of your personal information and employ
        reasonable measures to protect it from unauthorized access or
        disclosure.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about our Privacy Policy, please
        contact us at unidate2024@gmail.com.
      </p>

      <p>
        This Privacy Policy is effective as of {currentDate} and may be updated
        from time to time. Please review this policy periodically for any
        changes.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
