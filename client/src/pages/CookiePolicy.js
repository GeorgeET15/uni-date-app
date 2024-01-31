import React from "react";

function CookiePolicy() {
  const currentDate = new Date().toLocaleDateString("en-GB");

  return (
    <div>
      <h1>Cookie Policy</h1>
      <p>
        This Cookie Policy explains how UniDate uses cookies and similar
        technologies to collect and store information when you use our dating
        app.
      </p>

      <h2>What are Cookies?</h2>
      <p>
        Cookies are small text files that are stored on your device when you
        visit a website or use a mobile app. They are widely used to enhance
        user experience, remember preferences, and provide personalized content.
      </p>

      <h2>How We Use Cookies</h2>
      <p>
        UniDate uses cookies for the following purposes:
        <ul>
          <li>
            <strong>Authentication:</strong> We use cookies to store
            authentication tokens to keep you logged in.
          </li>
          <li>
            <strong>User Identification:</strong> Cookies help us identify you
            and maintain your session.
          </li>
          <li>
            <strong>Analytics:</strong> We may use cookies to collect
            information about how you interact with our app, helping us improve
            and optimize our services.
          </li>
        </ul>
      </p>

      <h2>Your Cookie Choices</h2>
      <p>
        You can control and manage cookies in your browser or device settings.
        If you choose to disable cookies, some features of UniDate may not
        function properly.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about our Cookie Policy, please
        contact us at unidate2024@gmail.com.
      </p>

      <p>
        This Cookie Policy is effective as of {currentDate} and may be updated
        from time to time. Please review this policy periodically for any
        changes.
      </p>
    </div>
  );
}

export default CookiePolicy;
