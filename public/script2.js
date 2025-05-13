

// Clean up confetti after animation
setTimeout(() => {
  confettiContainer.innerHTML = ""
}, 3500)

// Questions array
const questions = [
  {
    question: "3.53159 + 0.15621",
    answers: ["3.6878", "3.58102", "3.19205", "3.676553"],
  },
  {
    question: "5.32 x 6.1",
    answers: ["32.452", "12.42", "62.242", "523.42"],
  },
  {
    question: "x - 1/6 = 9/3",
    answers: ["3 1/6", "91.442", "3.1515", "2 5/6"],
  },
  {
    question: "29y = 145",
    answers: ["5", "4205", "5.8", "4.5"],
  },
  {
    question: "6.5392 > 6.549563",
    answers: ["FALSE", "TRUE", "EQUAL", "UNKNOWN"],
  },
  {
    question: "x > 392",
    answers: ["395", "333", "391", "392"],
  },
  {
    question: "3^5 = x",
    answers: ["243", "133", "125", "225"],
  },
  {
    question: "2^x=2×2×2×2×2×2",
    answers: ["6", "3", "12", "64"],
  },
  {
    question: "5(3^2)5-206/2",
    answers: ["122", "144", "97", "103"],
  },
  {
    question: "1/3(2)(210)+2/1+2",
    answers: ["144", "2/3", "633", "420"],
  },
  {
    question: "1 2/3 to improper",
    answers: ["5/3", "1 5/3", "3/5", "8/3"],
  },
  {
    question: "9/5 to mixed",
    answers: ["1 4/5", "4 1/5", "1 5/4", "5/9"],
  },
  {
    question: "5, 1, 5, 6, 5, 5, 3, 9, 12, 5, 9, 9  Mode?",
    answers: ["5", "1", "6", "9"],
  },
  {
    question: "1, 3, 6, 2, 3, 9, 13, 5, 9  Mean?",
    answers: ["5.2", "5.4", "63", "52"],
  },
  {
    question: "Quadrant of (6, -3)?",
    answers: ["IV", "I", "III", "II"],
  },
  {
    question: "What shape does (6,-3), (-6, -3), (-6, 3), (6, 3) make?",
    answers: ["Rectangle", "Triangle", "Pentagon", "Trapezoid"],
  },
  {
    question: "6/5 = x/30",
    answers: ["36", "30", "60", "5"],
  },
  {
    question: "72/31 = 36/x",
    answers: ["15.5", "62", "72", "18"],
  },
  {
    question: "Is this statistical: How many cars are in the parking lot?",
    answers: ["No", "Yes", "Maybe", "Depends"],
  },
  {
    question: "Is this statistical: How many leaves are on the tree on Thursdays?",
    answers: ["Yes", "No", "Maybe", "Depends"],
  },
  {
    question: "Amy says this is false. Do you agree? x > 5.235   x = 6",
    answers: ["No", "Yes", "Cannot determine", "Need more info"],
  },
  {
    question: "0.593265 < 5.5265",
    answers: ["TRUE", "FALSE", "EQUAL", "UNKNOWN"],
  },
  {
    question: "Area of a rectangle that has the length of 5 and height of 6?",
    answers: ["30", "12", "11", "36"],
  },
  {
    question: "Area of a triangle that has the length of 23 and height of 5?",
    answers: ["57.5", "28", "57.3", "115"],
  },
  {
    question: "Surface area of a rectangular prism with 2 length, 9 width, and 6 height?",
    answers: ["168", "108", "63", "42"],
  },
  {
    question: "Surface area of a rectangular prism with 2 length, 193 width, and 4 height?",
    answers: ["2332", "1544", "154.4", "233.2"],
  },
  {
    question: "5/8 ÷ 4/2  Simplify.",
    answers: ["5/16", "2.55/8.5", "10/32", "5.5/16"],
  },
  {
    question: "6/9 - 4/18",
    answers: ["4/9", "2/4", "1/2", "6/9"],
  },
  {
    question: "How many inches are in 63 cm (2.54 cm = 1 inch and round to the tenths)",
    answers: ["24.8", "25.4", "32.5", "24.7"],
  },
  {
    question: "How many centimeters are 64 in? (1 in = 2.54 cm and round to the tenths)",
    answers: ["162.6", "164.2", "164.3", "164"],
  },
  {
    question: "What is one angle of an equilateral triangle?",
    answers: ["60", "90", "180", "45"],
  },
  {
    question: "If a parallelogram has two angles of 125 degrees, how much are the other two (separate)?",
    answers: ["55", "53", "54", "62.5"],
  },
  {
    question: "Solve for x: 3x + 7 = 22",
    answers: ["5", "4", "6", "7"],
  },
  {
    question: "What is the square root of 144?",
    answers: ["12", "14", "10", "16"],
  },
]

// Shuffle questions
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }
}

function loadQuestion() {
  // Update progress bar
  progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`

  // Update question number display
  questionNumberDisplay.textContent = `${currentQuestionIndex + 1}/${questions.length}`

  const q = questions[currentQuestionIndex]
  document.getElementById("question").textContent = q.question
  document.getElementById("question").classList.add("typing-animation")

  // Reset typing animation
  setTimeout(() => {
    document.getElementById("question").classList.remove("typing-animation")
  }, 1000)

  // Clear previous images
  const imageContainer = document.getElementById("question-image-container")
  imageContainer.innerHTML = ""

  // Add images if available
  if (q.images && q.images.length > 0) {
    q.images.forEach((imgUrl, index) => {
      const imgWrapper = document.createElement("div")
      imgWrapper.style.position = "relative"

      const img = document.createElement("img")
      img.src = imgUrl
      img.alt = `Option ${index + 1}`
      img.className = "question-image"

      // Add option number label
      const label = document.createElement("div")
      label.textContent = `Option ${index + 1}`
      label.style.position = "absolute"
      label.style.bottom = "10px"
      label.style.left = "10px"
      label.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
      label.style.color = "white"
      label.style.padding = "5px 10px"
      label.style.borderRadius = "4px"
      label.style.fontSize = "14px"

      imgWrapper.appendChild(img)
      imgWrapper.appendChild(label)
      imageContainer.appendChild(imgWrapper)
    })
  }

  const opts = document.getElementById("answer-options")
  opts.innerHTML = ""

  const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5)

  shuffledAnswers.forEach((option, index) => {
    if (option !== "") {
      const btn = document.createElement("button")
      btn.textContent = option
      btn.classList.add("button-3d")
      btn.style.animationDelay = `${index * 100}ms`
      btn.onclick = () => {
        playSound(clickSound, 0.3)
        checkAnswer(option)
      }
      opts.appendChild(btn)
    }
  })

  startTimer()

  // Remove shield indicator if present
  const shieldIndicator = document.getElementById("shield-indicator")
  if (shieldIndicator) {
    shieldIndicator.remove()
  }
}

function startTimer() {
  clearInterval(timer)
  // Set time based on difficulty
  timeLeft = difficultySettings[currentDifficulty].timeLimit
  const timerEl = document.getElementById("timer")
  timerEl.textContent = `Time: ${timeLeft}s`
  timerEl.style.backgroundColor = "rgba(255, 23, 68, 0.1)"
  timerEl.style.color = "var(--danger)"
  timerEl.style.animation = "pulse 2s infinite"

  timer = setInterval(() => {
    timeLeft--
    timerEl.textContent = `Time: ${timeLeft}s`

    // Update multiplier indicator if active
    const multiplierIndicator = document.getElementById("multiplier-indicator")
    if (multiplierIndicator) {
      multiplierIndicator.textContent = `2x Score Multiplier: ${multiplierTimeLeft}s`
    }

    // Add urgency effect when time is running low
    if (timeLeft <= 10) {
      timerEl.style.animation = "pulse 0.5s infinite"
      if (timeLeft <= 5 && soundEnabled) {
        // Play tick sound for last 5 seconds
        playSound(clickSound, 0.1)
      }
    } else {
      timerEl.style.animation = "pulse 2s infinite"
    }

    if (timeLeft <= 0) {
      clearInterval(timer)
      playSound(wrongSound, 0.5)

      if (isMultiplayer) {
        switchPlayer()
      } else {
        showResult()
      }
    }
  }, 1000)
}

function checkAnswer(selected) {
  clearInterval(timer)
  const q = questions[currentQuestionIndex]
  const buttons = document.querySelectorAll("#answer-options button")
  const correctAnswer = q.answers[0]
  let isCorrect = selected === correctAnswer

  totalQuestions++

  buttons.forEach((btn) => {
    btn.disabled = true

    if (btn.textContent === selected) {
      if (isCorrect) {
        btn.classList.add("correct-answer")
        playSound(correctSound, 0.5)
        createConfetti() // Add confetti for correct answers

        // Update achievements
        updateAchievement("first_correct")
        if (timeLeft > 30) {
          updateAchievement("speed_demon")
        }
      } else {
        // Check if shield is active
        if (shieldActive) {
          // Shield absorbs the wrong answer
          btn.classList.add("correct-answer")
          playSound(powerupSound, 0.5)
          createConfetti()
          isCorrect = true

          // Remove shield indicator
          const shieldIndicator = document.getElementById("shield-indicator")
          if (shieldIndicator) {
            shieldIndicator.remove()
          }

          // Disable shield
          shieldActive = false
        } else {
          btn.classList.add("incorrect-answer")
          playSound(wrongSound, 0.5)
        }
      }
    } else if (btn.textContent === correctAnswer && !isCorrect) {
      // Highlight the correct answer
      setTimeout(() => {
        btn.classList.add("correct-answer")
      }, 500)
    }
  })

  if (isCorrect) {
    const elapsed = difficultySettings[currentDifficulty].timeLimit - timeLeft
    const timeBonus = Math.max(0, 30 - elapsed) * 10
    // Apply difficulty multiplier
    const difficultyMultiplier = difficultySettings[currentDifficulty].scoreMultiplier
    const pointsEarned = Math.floor((100 + timeBonus) * difficultyMultiplier * activeMultiplier)

    // Update score based on player
    if (isMultiplayer) {
      if (currentPlayer === 1) {
        player1Score += pointsEarned
        player1Correct++
        document.querySelector("#player1-score-display .player-points").textContent = player1Score
      } else {
        player2Score += pointsEarned
        player2Correct++
        document.querySelector("#player2-score-display .player-points").textContent = player2Score
      }
    } else {
      score += pointsEarned
      currentScoreDisplay.textContent = score
      updateAchievement("high_score_1000", score, true)
    }

    // Show floating score animation
    const floatingScore = document.createElement("div")
    floatingScore.textContent = `+${pointsEarned}`
    floatingScore.style.position = "absolute"
    floatingScore.style.color = "#00c853"
    floatingScore.style.fontWeight = "bold"
    floatingScore.style.fontSize = "1.5rem"
    floatingScore.style.top = "50%"
    floatingScore.style.left = "50%"
    floatingScore.style.transform = "translate(-50%, -50%)"
    floatingScore.style.animation = "floatUp 1.5s forwards"
    floatingScore.style.zIndex = "100"
    document.querySelector(".game-container").appendChild(floatingScore)

    setTimeout(() => {
      floatingScore.remove()
    }, 1500)

    allowPlay = true
    startGameLoop()

    // Random chance to get a power-up
    if (Math.random() < 0.3) {
      const powerupTypes = ["shield", "multishot", "time", "multiplier"]
      const randomType = powerupTypes[Math.floor(Math.random() * powerupTypes.length)]
      powerups[randomType]++
      updatePowerupDisplay()

      // Show power-up notification
      const notification = document.createElement("div")
      notification.className = "achievement-notification"
      notification.style.background =
        randomType === "shield"
          ? "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-600))"
          : randomType === "multishot"
            ? "linear-gradient(135deg, var(--color-red-500), var(--color-red-600))"
            : randomType === "time"
              ? "linear-gradient(135deg, var(--color-green-500), var(--color-green-600))"
              : "linear-gradient(135deg, var(--color-yellow-500), var(--color-yellow-600))"

      const icon =
        randomType === "shield" ? "🛡️" : randomType === "multishot" ? "🔫" : randomType === "time" ? "⏱️" : "✨"

      notification.innerHTML = `
                <div class="achievement-notification-icon">${icon}</div>
                <div class="achievement-notification-text">
                    <div class="achievement-notification-title">Power-up Acquired!</div>
                    <div class="achievement-notification-description">${randomType.charAt(0).toUpperCase() + randomType.slice(1)}</div>
                </div>
            `

      document.body.appendChild(notification)

      // Remove notification after animation
      setTimeout(() => {
        notification.remove()
      }, 3000)
    }
  } else {
    allowPlay = false
    setTimeout(() => {
      if (isMultiplayer) {
        switchPlayer()
      } else {
        endGameSession()
      }
    }, 1500)
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1

  // Update player indicator
  playerIndicator.textContent = currentPlayer === 1 ? `${player1Name}'s Turn` : `${player2Name}'s Turn`

  // Update active player display
  document.getElementById("player1-score-display").classList.toggle("active", currentPlayer === 1)
  document.getElementById("player2-score-display").classList.toggle("active", currentPlayer === 2)

  // Check if game is over
  if (currentQuestionIndex >= questions.length - 1) {
    showMultiplayerResult()
  } else {
    // Load next question
    currentQuestionIndex++
    loadQuestion()
  }
}

function showMultiplayerResult() {
  // Update versus screen
  document.getElementById("versus-player1-name").textContent = player1Name
  document.getElementById("versus-player1-score").textContent = player1Score
  document.getElementById("versus-player2-name").textContent = player2Name
  document.getElementById("versus-player2-score").textContent = player2Score

  // Determine winner
  let resultText
  if (player1Score > player2Score) {
    resultText = `${player1Name} Wins!`
    updateAchievement("multiplayer_champion")
  } else if (player2Score > player1Score) {
    resultText = `${player2Name} Wins!`
  } else {
    resultText = "It's a Tie!"
  }

  document.getElementById("versus-result").textContent = resultText

  // Hide game content, show versus screen
  gameContent.style.display = "none"
  versusScreen.style.display = "block"

  // Play sound
  playSound(highScoreSound, 0.5)
}

function showResult() {
  isGameOver = true
  document.getElementById("game").style.display = "none"
  document.querySelector(".canvas-container").style.display = "none"
  document.getElementById("result").style.display = "block"
  document.getElementById("score").textContent = score

  playSound(gameOverSound, 0.5)

  // Check for perfect score achievement
  if (currentQuestionIndex === questions.length - 1) {
    updateAchievement("perfect_score")
  }

  // Update high score if needed
  if (score > highScore) {
    highScore = score
    localStorage.setItem("mathGameHighScore", highScore)
    highScoreDisplay.textContent = highScore

    // Play high score sound
    playSound(highScoreSound, 0.5)

    // Add celebration for new high score
    const highScoreBanner = document.createElement("div")
    highScoreBanner.className = "high-score-banner"
    highScoreBanner.innerHTML =
      '<span class="trophy-icon">🏆</span> NEW HIGH SCORE! <span class="trophy-icon">🏆</span>'

    // Insert after the score display but before the play again button
    const scoreElement = document.getElementById("score").parentNode
    document.getElementById("result").insertBefore(highScoreBanner, document.getElementById("result-buttons"))
  }

  // Stop background music
  backgroundMusic.pause()
  backgroundMusic.currentTime = 0
}

function startGameLoop() {
  if (!allowPlay) return
  gameRunning = true
  const startTime = Date.now()

  function loop() {
    if (!gameRunning) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    updateShip()
    drawShip()
    updateBullets()
    drawBullets()
    boss ? (updateBoss(), drawBoss()) : (updateAliens(), drawAliens())
    updatePowerupDrops()
    drawPowerupDrops()

    frameCount++

    if (Date.now() - startTime >= 15000) {
      endGameSession()
      return
    }

    requestAnimationFrame(loop)
  }

  loop()
}

function updateShip() {
  if (keys["ArrowLeft"] && ship.x > 0) ship.x -= 4
  if (keys["ArrowRight"] && ship.x < canvas.width - ship.width) ship.x += 4
}

function drawShip() {
  // Draw ship with gradient
  const shipGradient = ctx.createLinearGradient(ship.x, ship.y, ship.x + ship.width, ship.y + ship.height)
  shipGradient.addColorStop(0, "#2979ff")
  shipGradient.addColorStop(1, "#00c853")

  ctx.fillStyle = shipGradient
  ctx.shadowColor = "#2979ff"
  ctx.shadowBlur = 10
  ctx.fillRect(ship.x, ship.y, ship.width, ship.height)
  ctx.shadowBlur = 0

  // Add thruster effect
  ctx.fillStyle = "#ffea00"
  ctx.beginPath()
  ctx.moveTo(ship.x + ship.width / 2, ship.y + ship.height)
  ctx.lineTo(ship.x + ship.width / 2 - 5, ship.y + ship.height + 5 + Math.random() * 5)
  ctx.lineTo(ship.x + ship.width / 2 + 5, ship.y + ship.height + 5 + Math.random() * 5)
  ctx.closePath()
  ctx.fill()
}

function shoot() {
  if (allowPlay) {
    const bulletCount = multishotActive ? 3 : 1
    for (let i = 0; i < bulletCount; i++) {
      const offsetX = (i - 1) * 7 // Spread bullets
      bullets.push({
        x: ship.x + ship.width / 2 - 2.5 + offsetX,
        y: ship.y,
        width: 5,
        height: 10,
        color: "#00e5ff",
      })
    }

    // Play shoot sound
    playSound(shootSound, 0.2)

    // Add shooting sound effect (visual only)
    const flash = document.createElement("div")
    flash.style.position = "absolute"
    flash.style.width = "100%"
    flash.style.height = "100%"
    flash.style.backgroundColor = "rgba(0, 229, 255, 0.1)"
    flash.style.top = "0"
    flash.style.left = "0"
    flash.style.zIndex = "1"
    flash.style.pointerEvents = "none"
    flash.style.animation = "flash 0.2s forwards"

    document.querySelector(".canvas-container").appendChild(flash)

    setTimeout(() => {
      flash.remove()
    }, 200)
  }
}

function updateBullets() {
  bullets = bullets.filter((b) => {
    b.y -= 6
    if (b.y < 0) return false

    for (let i = 0; i < aliens.length; i++) {
      const a = aliens[i]
      if (b.x < a.x + a.width && b.x + b.width > a.x && b.y < a.y + a.height && b.y + b.height > a.y) {
        // Create explosion effect
        createExplosion(a.x + a.width / 2, a.y + a.height / 2)
        playSound(explosionSound, 0.3)
        aliens.splice(i, 1)
        updateScore(50)
        updateAchievement("alien_hunter")

        // Drop power-up
        if (Math.random() < 0.1) {
          dropPowerup(a.x, a.y)
        }

        return false
      }
    }

    if (
      boss &&
      b.x < boss.x + boss.width &&
      b.x + b.width > boss.x &&
      b.y < boss.y + boss.height &&
      b.y + b.height > boss.y
    ) {
      boss.hp -= 10
      // Create hit effect
      createHitEffect(b.x, b.y)
      playSound(explosionSound, 0.2)
      if (boss.hp <= 0) {
        // Create big explosion for boss
        createExplosion(boss.x + boss.width / 2, boss.y + boss.height / 2, true)
        playSound(explosionSound, 0.5)
        boss = null
        updateAchievement("boss_slayer")
        updateScore(500)
        endGameSession()
      }
      return false
    }

    return true
  })
}

function updateScore(points) {
  if (isMultiplayer) {
    if (currentPlayer === 1) {
      player1Score += points * activeMultiplier
      document.querySelector("#player1-score-display .player-points").textContent = player1Score
    } else {
      player2Score += points * activeMultiplier
      document.querySelector("#player2-score-display .player-points").textContent = player2Score
    }
  } else {
    score += points * activeMultiplier
    currentScoreDisplay.textContent = score
    updateAchievement("high_score_1000", score, true)
  }
}

function createExplosion(x, y, isBoss = false) {
  const size = isBoss ? 50 : 20
  const colors = ["#ff1744", "#ffea00", "#ff9100"]

  for (let i = 0; i < (isBoss ? 30 : 10); i++) {
    const particle = {
      x: x,
      y: y,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      },
      alpha: 1,
    }

    const update = () => {
      if (particle.alpha <= 0) return

      ctx.save()
      ctx.globalAlpha = particle.alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      particle.velocity.x *= 0.99
      particle.velocity.y *= 0.99
      particle.x += particle.velocity.x
      particle.y += particle.velocity.y
      particle.alpha -= 0.02

      requestAnimationFrame(update)
    }

    update()
  }
}

function createHitEffect(x, y) {
  ctx.fillStyle = "#ffffff"
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI * 2)
  ctx.fill()

  setTimeout(() => {
    ctx.clearRect(x - 10, y - 10, 20, 20)
  }, 50)
}

function drawBullets() {
  bullets.forEach((b) => {
    // Create gradient for bullets
    const bulletGradient = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.height)
    bulletGradient.addColorStop(0, b.color || "#00e5ff")
    bulletGradient.addColorStop(1, "#ffffff")

    ctx.fillStyle = bulletGradient
    ctx.shadowColor = b.color || "#00e5ff"
    ctx.shadowBlur = 5
    ctx.fillRect(b.x, b.y, b.width, b.height)
    ctx.shadowBlur = 0
  })
}

function createAliens() {
  aliens = []
  const count = 5 + wave * 2
  for (let i = 0; i < count; i++) {
    aliens.push({
      x: (i % 6) * 40 + 10,
      y: Math.floor(i / 6) * 30 + 10,
      width: 15,
      height: 15,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    })
  }
}

function updateAliens() {
  if (frameCount % (30 - wave * 2) === 0) {
    aliens.forEach((a) => {
      a.y += 4 + wave
      a.x += Math.sin(frameCount / 30) * (4 + wave)
      if (a.y + a.height > canvas.height) {
        endGameSession()
        wave = 1
        aliens = []
      }
    })
  }

  if (aliens.length === 0 && !boss) {
    wave++
    wave <= 20 ? createAliens() : spawnBoss()
  }
}

function drawAliens() {
  aliens.forEach((a) => {
    // Create gradient for aliens
    const alienGradient = ctx.createRadialGradient(
      a.x + a.width / 2,
      a.y + a.height / 2,
      0,
      a.x + a.width / 2,
      a.y + a.height / 2,
      a.width,
    )
    alienGradient.addColorStop(0, a.color || "#ff1744")
    alienGradient.addColorStop(1, "#aa00ff")

    ctx.fillStyle = alienGradient
    ctx.shadowColor = a.color || "#ff1744"
    ctx.shadowBlur = 5
    ctx.fillRect(a.x, a.y, a.width, a.height)
    ctx.shadowBlur = 0

    // Add pulsating effect
    if (frameCount % 30 < 15) {
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      ctx.strokeRect(a.x - 1, a.y - 1, a.width + 2, a.height + 2)
    }
  })
}

function dropPowerup(x, y) {
  const powerupTypes = ["shield", "multishot", "time", "multiplier"]
  const randomType = powerupTypes[Math.floor(Math.random() * powerupTypes.length)]

  powerupDrops.push({
    x: x,
    y: y,
    type: randomType,
    color:
      randomType === "shield"
        ? "var(--color-blue-500)"
        : randomType === "multishot"
          ? "var(--color-red-500)"
          : randomType === "time"
            ? "var(--color-green-500)"
            : "var(--color-yellow-500)",
  })
}

function updatePowerupDrops() {
  powerupDrops = powerupDrops.filter((drop) => {
    drop.y += 3

    if (drop.y > ship.y && drop.x > ship.x && drop.x < ship.x + ship.width) {
      // Collect powerup
      powerups[drop.type]++
      updatePowerupDisplay()
      updateAchievement("powerup_collector")
      playSound(powerupSound, 0.3)
      return false
    }

    return drop.y < canvas.height
  })
}

function drawPowerupDrops() {
  powerupDrops.forEach((drop) => {
    ctx.fillStyle = drop.color
    ctx.beginPath()
    ctx.arc(drop.x, drop.y, 10, 0, Math.PI * 2)
    ctx.fill()
  })
}

function spawnBoss() {
  boss = {
    x: 80,
    y: 20,
    width: 80,
    height: 30,
    hp: 150,
    color: "#aa00ff",
  }
}

function updateBoss() {
  if (frameCount % 20 === 0) {
    boss.y += Math.sin(frameCount / 60) * 5
    boss.x += Math.cos(frameCount / 40) * 10

    // Keep boss in bounds
    if (boss.x < 0) boss.x = 0
    if (boss.x + boss.width > canvas.width) boss.x = canvas.width - boss.width
    if (boss.y < 0) boss.y = 0
    if (boss.y + boss.height > canvas.height) endGameSession()
  }
}

function drawBoss() {
  // Create gradient for boss
  const bossGradient = ctx.createLinearGradient(boss.x, boss.y, boss.x + boss.width, boss.y + boss.height)
  bossGradient.addColorStop(0, boss.color)
  bossGradient.addColorStop(0.5, "#ff1744")
  bossGradient.addColorStop(1, "#aa00ff")

  ctx.fillStyle = bossGradient
  ctx.shadowColor = boss.color
  ctx.shadowBlur = 10
  ctx.fillRect(boss.x, boss.y, boss.width, boss.height)
  ctx.shadowBlur = 0

  // Add glowing text
  ctx.font = "bold 16px 'Inter', sans-serif"
  ctx.fillStyle = "#ffffff"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("BOSS", boss.x + boss.width / 2, boss.y + boss.height / 2)

  // Draw health bar with gradient
  const healthGradient = ctx.createLinearGradient(boss.x, boss.y - 10, boss.x + boss.width, boss.y - 10)
  healthGradient.addColorStop(0, "#ff1744")
  healthGradient.addColorStop(0.5, "#ffea00")
  healthGradient.addColorStop(1, "#00c853")

  ctx.fillStyle = healthGradient
  ctx.fillRect(boss.x, boss.y - 10, boss.width * (boss.hp / 150), 5)

  // Add health bar border
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 1
  ctx.strokeRect(boss.x, boss.y - 10, boss.width, 5)

  // Add pulsating effect
  if (frameCount % 30 < 15) {
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.strokeRect(boss.x - 2, boss.y - 2, boss.width + 4, boss.height + 4)
  }
}

function endGameSession() {
  gameRunning = false
  allowPlay = false
  currentQuestionIndex++

  if (currentQuestionIndex < questions.length) {
    setTimeout(loadQuestion, 500)
  } else {
    if (isMultiplayer) {
      showMultiplayerResult()
    } else {
      showResult()
    }
  }
}

// Initialize the game
window.addEventListener("DOMContentLoaded", () => {
  init()
  createAliens()
})
