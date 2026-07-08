import { supabase } from './supabaseClient.js'
import './style.css'

const app = document.querySelector('#app')

let authMode = 'signin'

function renderAuth() {
  app.innerHTML = `
    <main class="app-shell">
      <section class="welcome-screen">
        <div class="logo-mark">∞</div>
        <p class="eyebrow">THE CONNECTION JOURNEY</p>

        <h1>${authMode === 'signin' ? 'Welcome Back' : 'Create Account'}</h1>

        <p class="subtitle">
          A private space for couples to reflect, understand each other,
          and grow closer one step at a time.
        </p>

        <div class="welcome-card">
          <label>Email</label>
          <input id="email" type="email" placeholder="you@example.com" />

          <label>Password</label>
          <input id="password" type="password" placeholder="Password" />

          <button id="authButton">
            ${authMode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          <button id="switchMode" class="secondary-button">
            ${authMode === 'signin'
              ? 'Need an account? Create one'
              : 'Already have an account? Sign in'}
          </button>

          <p id="message" class="status-message"></p>
        </div>
      </section>
    </main>
  `

  document.querySelector('#switchMode').addEventListener('click', () => {
    authMode = authMode === 'signin' ? 'signup' : 'signin'
    renderAuth()
  })

  document.querySelector('#authButton').addEventListener('click', handleAuth)
}

async function handleAuth() {
  const email = document.querySelector('#email').value.trim()
  const password = document.querySelector('#password').value
  const message = document.querySelector('#message')

  message.textContent = 'Working...'

  if (!email || !password) {
    message.textContent = 'Please enter your email and password.'
    return
  }

  const result =
    authMode === 'signin'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

  if (result.error) {
    message.textContent = result.error.message
    return
  }

  if (authMode === 'signup') {
    message.textContent = 'Account created. Check your email if confirmation is required.'
    return
  }

  renderHome()
}

async function renderHome() {
  const { data } = await supabase.auth.getUser()
  const email = data?.user?.email || 'Partner'

  app.innerHTML = `
    <main class="app-shell">
      <section class="welcome-screen">
        <div class="logo-mark">∞</div>
        <p class="eyebrow">TODAY'S JOURNEY</p>

        <h1>Welcome</h1>

        <p class="subtitle">
          Signed in as ${email}
        </p>

        <div class="welcome-card">
          <p class="card-label">DAY 1</p>
          <h2>What Helps Me Feel Safe</h2>
          <p>
            What helps me feel safe enough to be honest with my partner?
          </p>
        </div>

        <button id="signOutButton">Sign Out</button>
      </section>
    </main>
  `

  document.querySelector('#signOutButton').addEventListener('click', async () => {
    await supabase.auth.signOut()
    renderAuth()
  })
}

async function startApp() {
  const { data } = await supabase.auth.getSession()

  if (data.session) {
    renderHome()
  } else {
    renderAuth()
  }
}

startApp()
