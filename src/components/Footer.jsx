import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      <footer>
        <section>
          <div className="footer-text">
            <h3>Adress</h3>
            <p>Småstadsvägen 1</p>
            <p>222 22, Småstad</p>
          </div>
        </section>
        <section>
          <div className="footer-text">
            <h3>Öppettider</h3>
            <p>Alla dagar:</p>
            <p>10:00 - 23:00</p>
          </div>
        </section>
        <section>
          <div className="footer-text">
            <h3 className="fix">Kontakt</h3>
            <a href="tel:046-1234567" rel="nofollow">046-2222222</a>
            <a href="mailto:bio@småstad.se" rel="nofollow">
              bio@småstad.se</a>
          </div>
        </section>
        <section>
          <div className="footer-text">
            <h3 className="fix">Följ oss</h3>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </section>
      </footer>
    )
  }
}
export default Footer;
