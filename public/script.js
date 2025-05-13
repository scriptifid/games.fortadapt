// Initialize canvas and game elements
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
const confettiContainer = document.getElementById("confetti-container")
const progressBar = document.getElementById("progress-bar")
const currentScoreDisplay = document.getElementById("current-score")
const questionNumberDisplay = document.getElementById("question-number")
const highScoreDisplay = document.getElementById("high-score")
const difficultySelector = document.getElementById("difficulty-selector")
const gameContent = document.getElementById("game-content")
const difficultyDescription = document.getElementById("difficulty-description")
const mainMenu = document.getElementById("main-menu")
const multiplayerSetup = document.getElementById("multiplayer-setup")
const versusScreen = document.getElementById("versus-screen")
const playerIndicator = document.getElementById("player-indicator")
const playerScores = document.getElementById("player-scores")
const singlePlayerScore = document.getElementById("single-player-score")
const tutorialModal = document.getElementById("tutorial-modal")

// Leaderboard elements
const leaderboardModal = document.getElementById("leaderboard-modal")
const leaderboardList = document.getElementById("leaderboard-list")
const nameInputModal = document.getElementById("name-input-modal")
const nameInputForm = document.getElementById("name-input-form")

// Achievements elements
const achievementsModal = document.getElementById("achievements-modal")
const achievementsGrid = document.getElementById("achievements-grid")

// Audio elements
const correctSound = document.getElementById("correct-sound")
const wrongSound = document.getElementById("wrong-sound")
const gameOverSound = document.getElementById("game-over-sound")
const highScoreSound = document.getElementById("high-score-sound")
const shootSound = document.getElementById("shoot-sound")
const explosionSound = document.getElementById("explosion-sound")
const clickSound = document.getElementById("click-sound")
const powerupSound = document.getElementById("powerup-sound")
const achievementSound = document.getElementById("achievement-sound")
const backgroundMusic = document.getElementById("background-music")

// Sound control
let soundEnabled = true
let musicEnabled = false
const soundToggle = document.getElementById("sound-toggle")
const soundIcon = document.getElementById("sound-icon")
const musicToggle = document.getElementById("music-toggle")
const musicIcon = document.getElementById("music-icon")

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled
  soundIcon.textContent = soundEnabled ? "🔊" : "🔇"
  soundToggle.classList.toggle("muted", !soundEnabled)

  // Play click sound if sound is enabled
  if (soundEnabled) {
    playSound(clickSound, 0.3)
  }

  // Save sound preference
  localStorage.setItem("mathGameSoundEnabled", soundEnabled)
})

musicToggle.addEventListener("click", () => {
  musicEnabled = !musicEnabled
  musicIcon.textContent = musicEnabled ? "🎵" : "🔇"
  musicToggle.classList.toggle("muted", !musicEnabled)

  if (musicEnabled) {
    backgroundMusic.volume = 0.2
    backgroundMusic.play().catch((e) => console.log("Audio play error:", e))
    playSound(clickSound, 0.3)
  } else {
    backgroundMusic.pause()
    backgroundMusic.currentTime = 0
  }

  // Save music preference
  localStorage.setItem("mathGameMusicEnabled", musicEnabled)
})

// Load sound preferences
function loadSoundPreferences() {
  const savedSound = localStorage.getItem("mathGameSoundEnabled")
  const savedMusic = localStorage.getItem("mathGameMusicEnabled")

  if (savedSound !== null) {
    soundEnabled = savedSound === "true"
    soundIcon.textContent = soundEnabled ? "🔊" : "🔇"
    soundToggle.classList.toggle("muted", !soundEnabled)
  }

  if (savedMusic !== null) {
    musicEnabled = savedMusic === "true"
    musicIcon.textContent = musicEnabled ? "🎵" : "🔇"
    musicToggle.classList.toggle("muted", !musicEnabled)

    if (musicEnabled) {
      backgroundMusic.volume = 0.2
      backgroundMusic.play().catch((e) => console.log("Audio play error:", e))
    }
  }
}

// Function to play sounds
function playSound(sound, volume = 0.5) {
  if (soundEnabled) {
    sound.volume = volume
    sound.currentTime = 0
    sound.play().catch((e) => console.log("Audio play error:", e))
  }
}

// Game state variables
const ship = {
  x: canvas.width / 2 - 10,
  y: canvas.height - 30,
  width: 20,
  height: 20,
  color: "#2979ff",
}
const keys = {}
let bullets = [],
  aliens = [],
  boss = null,
  powerupDrops = []
let currentQuestionIndex = 0,
  score = 0,
  timeLeft = 60,
  timer = null
let wave = 1,
  frameCount = 0
let allowPlay = false,
  gameRunning = false,
  isGameOver = false
let highScore = localStorage.getItem("mathGameHighScore") || 0

// Multiplayer variables
let isMultiplayer = false
let currentPlayer = 1
let player1Score = 0
let player2Score = 0
let player1Name = "Player 1"
let player2Name = "Player 2"
let player1Correct = 0
let player2Correct = 0
let totalQuestions = 0

// Power-up variables
let powerups = {
  shield: 0,
  multishot: 0,
  time: 0,
  multiplier: 0,
}
let activeMultiplier = 1
let multiplierTimeLeft = 0
let shieldActive = false
let multishotActive = false

// Difficulty settings
let currentDifficulty = "medium"
const difficultySettings = {
  easy: {
    timeLimit: 90,
    scoreMultiplier: 0.8,
    description: "More time (90s) to answer each question, but lower score multiplier (0.8x).",
  },
  medium: {
    timeLimit: 60,
    scoreMultiplier: 1.0,
    description: "Standard time (60s) to answer each question with normal scoring (1.0x).",
  },
  hard: {
    timeLimit: 30,
    scoreMultiplier: 1.5,
    description: "Less time (30s) to answer each question, but higher score multiplier (1.5x).",
  },
}

// Achievements system
const achievements = [
  {
    id: "first_correct",
    name: "First Steps",
    description: "Answer your first question correctly",
    icon: "🎯",
    progress: 0,
    target: 1,
    unlocked: false,
  },
  {
    id: "perfect_score",
    name: "Perfect Round",
    description: "Complete a game with 100% correct answers",
    icon: "🏆",
    progress: 0,
    target: 1,
    unlocked: false,
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    description: "Answer 5 questions with more than 30 seconds left",
    icon: "⚡",
    progress: 0,
    target: 5,
    unlocked: false,
  },
  {
    id: "high_score_1000",
    name: "Score Master",
    description: "Reach a score of 1000 points",
    icon: "🌟",
    progress: 0,
    target: 1000,
    unlocked: false,
  },
  {
    id: "alien_hunter",
    name: "Alien Hunter",
    description: "Destroy 50 aliens in the mini-game",
    icon: "👾",
    progress: 0,
    target: 50,
    unlocked: false,
  },
  {
    id: "boss_slayer",
    name: "Boss Slayer",
    description: "Defeat the boss in the mini-game",
    icon: "🐉",
    progress: 0,
    target: 1,
    unlocked: false,
  },
  {
    id: "powerup_collector",
    name: "Power Collector",
    description: "Collect 10 power-ups",
    icon: "🎁",
    progress: 0,
    target: 10,
    unlocked: false,
  },
  {
    id: "multiplayer_champion",
    name: "Multiplayer Champion",
    description: "Win 3 multiplayer games",
    icon: "🏅",
    progress: 0,
    target: 3,
    unlocked: false,
  },
]

// Load achievements from local storage
function loadAchievements() {
  const savedAchievements = localStorage.getItem("mathGameAchievements")
  if (savedAchievements) {
    const parsed = JSON.parse(savedAchievements)
    parsed.forEach((saved) => {
      const achievement = achievements.find((a) => a.id === saved.id)
      if (achievement) {
        achievement.progress = saved.progress
        achievement.unlocked = saved.unlocked
      }
    })
  }
}

// Save achievements to local storage
function saveAchievements() {
  localStorage.setItem("mathGameAchievements", JSON.stringify(achievements))
}

// Update achievement progress
function updateAchievement(id, value = 1, absolute = false) {
  const achievement = achievements.find((a) => a.id === id)
  if (!achievement) return

  if (absolute) {
    achievement.progress = value
  } else {
    achievement.progress += value
  }

  // Check if achievement is unlocked
  if (!achievement.unlocked && achievement.progress >= achievement.target) {
    achievement.unlocked = true
    showAchievementNotification(achievement)
    playSound(achievementSound, 0.5)
  }

  saveAchievements()
}

// Show achievement notification
function showAchievementNotification(achievement) {
  const notification = document.createElement("div")
  notification.className = "achievement-notification"
  notification.innerHTML = `
        <div class="achievement-notification-icon">${achievement.icon}</div>
        <div class="achievement-notification-text">
            <div class="achievement-notification-title">Achievement Unlocked!</div>
            <div class="achievement-notification-description">${achievement.name}</div>
        </div>
    `

  document.body.appendChild(notification)

  // Remove notification after animation
  setTimeout(() => {
    notification.remove()
  }, 5000)
}

// Render achievements in the modal
function renderAchievements() {
  achievementsGrid.innerHTML = ""

  achievements.forEach((achievement) => {
    const achievementEl = document.createElement("div")
    achievementEl.className = `achievement ${achievement.unlocked ? "" : "locked"}`

    const progress = Math.min((achievement.progress / achievement.target) * 100, 100)

    achievementEl.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
                <div class="achievement-progress">
                    <div class="achievement-progress-bar" style="width: ${progress}%"></div>
                </div>
                <div style="font-size: 0.8rem; margin-top: 5px;">${achievement.progress}/${achievement.target}</div>
            </div>
        `

    achievementsGrid.appendChild(achievementEl)
  })
}

// Initialize leaderboard
function initLeaderboard() {
  const leaderboard = getLeaderboard()
  renderLeaderboard(leaderboard, "all")
}

// Get leaderboard from local storage
function getLeaderboard() {
  const leaderboard = localStorage.getItem("mathGameLeaderboard")
  return leaderboard ? JSON.parse(leaderboard) : []
}

// Save score to leaderboard
function saveScoreToLeaderboard(name, score, difficulty) {
  const leaderboard = getLeaderboard()

  leaderboard.push({
    name,
    score,
    difficulty,
    date: new Date().toISOString(),
  })

  // Sort by score (highest first)
  leaderboard.sort((a, b) => b.score - a.score)

  // Keep only top 20
  const topScores = leaderboard.slice(0, 20)

  localStorage.setItem("mathGameLeaderboard", JSON.stringify(topScores))

  return topScores
}

// Render leaderboard
function renderLeaderboard(leaderboard, filter = "all") {
  leaderboardList.innerHTML = ""

  // Filter leaderboard by difficulty if needed
  let filteredLeaderboard = leaderboard
  if (filter !== "all") {
    filteredLeaderboard = leaderboard.filter((entry) => entry.difficulty === filter)
  }

  if (filteredLeaderboard.length === 0) {
    const emptyItem = document.createElement("li")
    emptyItem.className = "leaderboard-empty"
    emptyItem.textContent = "No scores yet. Be the first to set a record!"
    leaderboardList.appendChild(emptyItem)
    return
  }

  filteredLeaderboard.forEach((entry, index) => {
    const item = document.createElement("li")
    item.className = "leaderboard-item"

    const difficultyClass =
      entry.difficulty === "easy"
        ? "color: var(--color-green-500)"
        : entry.difficulty === "medium"
          ? "color: var(--color-blue-500)"
          : "color: var(--color-red-500)"

    const date = new Date(entry.date)
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`

    item.innerHTML = `
            <span class="leaderboard-rank">${index + 1}</span>
            <span class="leaderboard-name">${entry.name}</span>
            <span class="leaderboard-score">${entry.score} <span style="font-size: 0.8rem; ${difficultyClass}">(${entry.difficulty})</span></span>
        `

    // Add tooltip with date
    item.title = `Achieved on: ${formattedDate}`

    leaderboardList.appendChild(item)
  })
}

// Filter leaderboard
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    playSound(clickSound, 0.3)

    // Remove active class from all buttons
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Filter leaderboard
    const filter = btn.dataset.filter
    const leaderboard = getLeaderboard()
    renderLeaderboard(leaderboard, filter)
  })
})

// Initialize the game
function init() {
  // Load saved preferences
  loadSoundPreferences()
  loadAchievements()

  // Update high score display
  highScore = localStorage.getItem("mathGameHighScore") || 0
  highScoreDisplay.textContent = highScore

  // Create background particles
  createParticles()

  // Set up event listeners
  setupEventListeners()

  // Show tutorial on first visit
  const tutorialSeen = localStorage.getItem("mathGameTutorialSeen")
  if (!tutorialSeen) {
    setTimeout(() => {
      tutorialModal.style.display = "block"
      localStorage.setItem("mathGameTutorialSeen", "true")
    }, 1000)
  }
}

// Main menu setup
function setupEventListeners() {
  document.getElementById("single-player-btn").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    mainMenu.style.display = "none"
    difficultySelector.style.display = "block"
    isMultiplayer = false
  })

  document.getElementById("multiplayer-btn").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    mainMenu.style.display = "none"
    multiplayerSetup.style.display = "block"
    isMultiplayer = true
  })

  document.getElementById("leaderboard-btn").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    initLeaderboard()
    leaderboardModal.style.display = "block"
  })

  document.getElementById("achievements-btn").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    loadAchievements()
    renderAchievements()
    achievementsModal.style.display = "block"
  })

  // Multiplayer setup
  document.querySelectorAll(".mp-difficulty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      playSound(clickSound, 0.3)

      // Remove selected class from all buttons
      document.querySelectorAll(".mp-difficulty-btn").forEach((b) => b.classList.remove("selected"))

      // Add selected class to clicked button
      btn.classList.add("selected")

      // Set current difficulty
      currentDifficulty = btn.dataset.difficulty

      // Update description
      document.getElementById("mp-difficulty-description").textContent =
        difficultySettings[currentDifficulty].description
    })
  })

  // Trigger click on medium difficulty by default for multiplayer
  document.querySelector(".mp-difficulty-btn.medium").click()

  document.getElementById("start-multiplayer").addEventListener("click", () => {
    playSound(clickSound, 0.3)

    // Get player names
    player1Name = document.getElementById("player1-name").value || "Player 1"
    player2Name = document.getElementById("player2-name").value || "Player 2"

    // Update player names in UI
    document.querySelector("#player1-score-display .player-name").textContent = player1Name
    document.querySelector("#player2-score-display .player-name").textContent = player2Name

    // Reset scores
    player1Score = 0
    player2Score = 0
    player1Correct = 0
    player2Correct = 0
    totalQuestions = 0
    document.querySelector("#player1-score-display .player-points").textContent = "0"
    document.querySelector("#player2-score-display .player-points").textContent = "0"

    // Set current player
    currentPlayer = 1
    playerIndicator.textContent = `${player1Name}'s Turn`

    // Update player score displays
    document.getElementById("player1-score-display").classList.add("active")
    document.getElementById("player2-score-display").classList.remove("active")

    // Start the game
    multiplayerSetup.style.display = "none"
    gameContent.style.display = "block"

    // Show multiplayer UI, hide single player UI
    playerIndicator.style.display = "block"
    playerScores.style.display = "flex"
    singlePlayerScore.style.display = "none"

    // Start the game
    startGame()
  })

  // Set up difficulty selector for single player
  document.querySelectorAll(".difficulty-btn:not(.mp-difficulty-btn)").forEach((btn) => {
    btn.addEventListener("click", () => {
      playSound(clickSound, 0.3)

      // Remove selected class from all buttons
      document
        .querySelectorAll(".difficulty-btn:not(.mp-difficulty-btn)")
        .forEach((b) => b.classList.remove("selected"))

      // Add selected class to clicked button
      btn.classList.add("selected")

      // Set current difficulty
      currentDifficulty = btn.dataset.difficulty

      // Update description
      difficultyDescription.textContent = difficultySettings[currentDifficulty].description

      // Add start button if not already present
      if (!document.getElementById("start-game-btn")) {
        const startBtn = document.createElement("button")
        startBtn.id = "start-game-btn"
        startBtn.className = "next-button button-3d animate-in"
        startBtn.textContent = "Start Game"
        startBtn.style.marginTop = "20px"
        difficultySelector.appendChild(startBtn)

        startBtn.addEventListener("click", () => {
          playSound(clickSound, 0.3)
          startGame()
        })
      }
    })
  })

  // Trigger click on medium difficulty by default for single player
  document.querySelector(".difficulty-btn.medium:not(.mp-difficulty-btn)").click()

  // Power-up setup
  document.querySelectorAll(".powerup").forEach((powerup) => {
    powerup.addEventListener("click", () => {
      const type = powerup.id.split("-")[0]
      const count = Number.parseInt(powerup.dataset.count)

      if (count <= 0 || !gameRunning) return

      playSound(powerupSound, 0.5)

      // Activate power-up
      activatePowerup(type)

      // Update count
      powerup.dataset.count = count - 1
      powerup.querySelector(".powerup-count").textContent = count - 1

      // Update powerups object
      powerups[type]--

      // Add active class
      powerup.classList.add("powerup-active")

      // Remove active class after animation
      setTimeout(() => {
        powerup.classList.remove("powerup-active")
      }, 2000)
    })
  })

  // Play again button
  document.getElementById("play-again").addEventListener("click", () => {
    playSound(clickSound, 0.3)

    // Return to difficulty selector or main menu
    document.getElementById("result").style.display = "none"
    gameContent.style.display = "none"

    if (isMultiplayer) {
      mainMenu.style.display = "block"
    } else {
      difficultySelector.style.display = "block"
    }
  })

  // Save score button
  document.getElementById("save-score").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    nameInputModal.style.display = "block"
  })

  // Name input form
  nameInputForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const playerName = document.getElementById("player-name").value.trim()
    if (playerName) {
      saveScoreToLeaderboard(playerName, score, currentDifficulty)
      nameInputModal.style.display = "none"

      // Show leaderboard
      initLeaderboard()
      leaderboardModal.style.display = "block"
    }
  })

  // Close leaderboard
  document.getElementById("close-leaderboard").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    leaderboardModal.style.display = "none"
  })

  document.getElementById("leaderboard-back").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    leaderboardModal.style.display = "none"
  })

  // Close achievements
  document.getElementById("close-achievements").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    achievementsModal.style.display = "none"
  })

  document.getElementById("achievements-back").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    achievementsModal.style.display = "none"
  })

  // Close tutorial
  document.getElementById("close-tutorial").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    tutorialModal.style.display = "none"
  })

  document.getElementById("tutorial-back").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    tutorialModal.style.display = "none"
  })

  // Versus screen back to menu
  document.getElementById("versus-back-to-menu").addEventListener("click", () => {
    playSound(clickSound, 0.3)
    versusScreen.style.display = "none"
    mainMenu.style.display = "block"
  })

  // Keyboard controls
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true
    if (e.key === " ") {
      shoot()
      e.preventDefault()
    }
  })

  window.addEventListener("keyup", (e) => {
    keys[e.key] = false
  })

  // Add touch controls for mobile
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = canvas.getBoundingClientRect()
    const touchX = touch.clientX - rect.left

    if (touchX < canvas.width / 2) {
      keys["ArrowLeft"] = true
      keys["ArrowRight"] = false
    } else {
      keys["ArrowLeft"] = false
      keys["ArrowRight"] = true
    }

    shoot()
  })

  canvas.addEventListener("touchend", () => {
    keys["ArrowLeft"] = false
    keys["ArrowRight"] = false
  })
}

// Activate power-up
function activatePowerup(type) {
  switch (type) {
    case "shield":
      shieldActive = true
      // Add visual indicator
      const shieldIndicator = document.createElement("div")
      shieldIndicator.id = "shield-indicator"
      shieldIndicator.style.position = "absolute"
      shieldIndicator.style.top = "0"
      shieldIndicator.style.left = "0"
      shieldIndicator.style.width = "100%"
      shieldIndicator.style.height = "100%"
      shieldIndicator.style.border = "3px solid var(--color-blue-500)"
      shieldIndicator.style.borderRadius = "var(--radius-lg)"
      shieldIndicator.style.boxShadow = "0 0 15px var(--color-blue-500)"
      shieldIndicator.style.pointerEvents = "none"
      shieldIndicator.style.zIndex = "5"
      shieldIndicator.style.animation = "pulse 2s infinite"
      document.getElementById("question-container").appendChild(shieldIndicator)
      break

    case "multishot":
      multishotActive = true
      // Visual effect on ship
      ship.color = "#ff1744"
      setTimeout(() => {
        multishotActive = false
        ship.color = "#2979ff"
      }, 15000)
      break

    case "time":
      // Add 15 seconds to timer
      timeLeft += 15
      document.getElementById("timer").textContent = `Time: ${timeLeft}s`

      // Flash timer
      const timerEl = document.getElementById("timer")
      timerEl.style.backgroundColor = "rgba(0, 200, 83, 0.3)"
      timerEl.style.color = "var(--color-green-500)"
      setTimeout(() => {
        timerEl.style.backgroundColor = "rgba(255, 23, 68, 0.1)"
        timerEl.style.color = "var(--danger)"
      }, 1000)
      break

    case "multiplier":
      // Set score multiplier to 2x for 30 seconds
      activeMultiplier = 2
      multiplierTimeLeft = 30

      // Add visual indicator
      const multiplierIndicator = document.createElement("div")
      multiplierIndicator.id = "multiplier-indicator"
      multiplierIndicator.style.position = "fixed"
      multiplierIndicator.style.top = "10px"
      multiplierIndicator.style.left = "50%"
      multiplierIndicator.style.transform = "translateX(-50%)"
      multiplierIndicator.style.background = "linear-gradient(135deg, var(--color-yellow-500), var(--color-yellow-600))"
      multiplierIndicator.style.color = "black"
      multiplierIndicator.style.padding = "5px 10px"
      multiplierIndicator.style.borderRadius = "var(--radius-full)"
      multiplierIndicator.style.fontWeight = "bold"
      multiplierIndicator.style.boxShadow = "var(--shadow-md)"
      multiplierIndicator.style.zIndex = "100"
      multiplierIndicator.textContent = "2x Score Multiplier: 30s"
      document.body.appendChild(multiplierIndicator)

      // Update multiplier timer
      const multiplierTimer = setInterval(() => {
        multiplierTimeLeft--
        if (multiplierTimeLeft <= 0) {
          activeMultiplier = 1
          clearInterval(multiplierTimer)
          multiplierIndicator.remove()
        } else {
          multiplierIndicator.textContent = `2x Score Multiplier: ${multiplierTimeLeft}s`
        }
      }, 1000)
      break
  }
}

// Function to start the game
function startGame() {
  if (isMultiplayer) {
    difficultySelector.style.display = "none"
  } else {
    difficultySelector.style.display = "none"
    singlePlayerScore.style.display = "flex"
  }

  gameContent.style.display = "block"

  // Reset game state
  score = 0
  currentQuestionIndex = 0
  isGameOver = false
  bullets = []
  aliens = []
  boss = null
  wave = 1
  ship.x = canvas.width / 2 - 10
  totalQuestions = 0

  // Reset power-ups
  powerups = {
    shield: 0,
    multishot: 0,
    time: 0,
    multiplier: 0,
  }

  updatePowerupDisplay()

  // Reset score display
  if (!isMultiplayer) {
    currentScoreDisplay.textContent = "0"

    // Update high score display
    highScoreDisplay.textContent = highScore
  }

  // Shuffle questions
  shuffleQuestions()

  // Load first question
  loadQuestion()

  // Start background music if enabled
  if (musicEnabled) {
    backgroundMusic.volume = 0.2
    backgroundMusic.currentTime = 0
    backgroundMusic.play().catch((e) => console.log("Audio play error:", e))
  }
}

// Update power-up display
function updatePowerupDisplay() {
  document.getElementById("shield-powerup").dataset.count = powerups.shield
  document.getElementById("shield-powerup").querySelector(".powerup-count").textContent = powerups.shield

  document.getElementById("multishot-powerup").dataset.count = powerups.multishot
  document.getElementById("multishot-powerup").querySelector(".powerup-count").textContent = powerups.multishot

  document.getElementById("time-powerup").dataset.count = powerups.time
  document.getElementById("time-powerup").querySelector(".powerup-count").textContent = powerups.time

  document.getElementById("multiplier-powerup").dataset.count = powerups.multiplier
  document.getElementById("multiplier-powerup").querySelector(".powerup-count").textContent = powerups.multiplier
}

// Create background particles
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  const colors = [
    "rgba(0, 200, 83, 0.5)",
    "rgba(41, 121, 255, 0.5)",
    "rgba(255, 23, 68, 0.5)",
    "rgba(170, 0, 255, 0.5)",
    "rgba(255, 234, 0, 0.5)",
  ]

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div")
    particle.classList.add("particle")

    // Random properties
    const size = Math.random() * 15 + 5
    const color = colors[Math.floor(Math.random() * colors.length)]

    // Position and style
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.backgroundColor = color
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`

    // Animation
    particle.style.animationDuration = `${Math.random() * 20 + 10}s`
    particle.style.animationDelay = `${Math.random() * 5}s`

    // Add to container
    particlesContainer.appendChild(particle)
  }
}

// Create confetti effect for correct answers
function createConfetti() {
  confettiContainer.innerHTML = ""
  const colors = ["#00c853", "#2979ff", "#aa00ff", "#ffea00", "#00e5ff", "#ff1744"]

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div")
    confetti.classList.add("confetti-piece")

    // Random properties
    const size = Math.random() * 10 + 5
    const color = colors[Math.floor(Math.random() * colors.length)]

    // Position and style
    confetti.style.width = `${size}px`
    confetti.style.height = `${size}px`
    confetti.style.backgroundColor = color
    confetti.style.left = `${Math.random() * 100}%`

    // Animation
    confetti.style.animation = `confetti ${Math.random() * 3 + 1}s forwards`
    confetti.style.animationDelay = `${Math.random() * 0.5}s`

    // Add to container
    confettiContainer.appendChild(confetti)
  }

  // Clean up confetti after animation
  setTimeout(() => {
    confettiContainer.innerHTML = ""
  }, 3000)
}

