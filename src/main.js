import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="app-shell">
    <section class="welcome-screen">
      <div class="logo-mark">∞</div>

      <p class="eyebrow">A SPACE FOR US</p>

      <h1>The Connection<br>Journey</h1>

      <p class="subtitle">
        A private space to reconnect, understand each other,
        and grow together — one small step at a time.
      </p>

      <div class="welcome-card">
        <p class="card-label">OUR JOURNEY</p>

        <h2>Connection starts with feeling safe.</h2>

        <p>
          There is nothing to solve right now. No perfect answer
          to give. Just a place to slow down, be honest, and learn
          more about each other.
        </p>
      </div>

      <button id="beginButton">
        Begin Our Journey
      </button>

      <p class="footer-message">
        No pressure. No scorekeeping. Just connection.
      </p>
    </section>
  </main>
`

document
  .querySelector('#beginButton')
  .addEventListener('click', () => {
    alert('Our journey begins here ❤️')
  })
