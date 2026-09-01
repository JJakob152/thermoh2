(function () {
  const yearEl = document.getElementById("year")
  if (yearEl) yearEl.textContent = String(new Date().getFullYear())

  const toggleBtn = document.querySelector(".nav-toggle")
  const navLinks = document.getElementById("navlinks")

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open")
      toggleBtn.setAttribute("aria-expanded", String(isOpen))
      toggleBtn.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen")
    })

    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open")
        toggleBtn.setAttribute("aria-expanded", "false")
        toggleBtn.setAttribute("aria-label", "Menü öffnen")
      })
    })
  }

  const costModal = document.getElementById("costModal")
  const openCosts = document.getElementById("openCosts")
  const closeCosts = document.getElementById("closeCosts")

  if (costModal && openCosts && closeCosts) {
    openCosts.addEventListener("click", () => {
      if (typeof costModal.showModal === "function") costModal.showModal()
      else alert("Dein Browser unterstützt dialog nicht")
    })

    closeCosts.addEventListener("click", () => costModal.close())

    costModal.addEventListener("click", (e) => {
      const rect = costModal.getBoundingClientRect()
      const inDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width

      if (!inDialog) costModal.close()
    })
  }

  const donateOpen = document.getElementById("donateOpen")
  const donateModal = document.getElementById("donateModal")
  const donateClose = document.getElementById("donateClose")

  if (donateOpen && donateModal && donateClose) {
    donateOpen.addEventListener("click", () => {
      if (typeof donateModal.showModal === "function") donateModal.showModal()
      else alert("Dein Browser unterstützt dialog nicht")
    })

    donateClose.addEventListener("click", () => donateModal.close())

    donateModal.addEventListener("click", (e) => {
      const rect = donateModal.getBoundingClientRect()
      const inDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width

      if (!inDialog) donateModal.close()
    })

    donateModal.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const selector = btn.getAttribute("data-copy")
        const el = selector ? document.querySelector(selector) : null
        const text = el ? (el.textContent || "").trim() : ""
        if (!text) return

        try {
          await navigator.clipboard.writeText(text)
          const old = btn.textContent
          btn.textContent = "Kopiert"
          setTimeout(() => (btn.textContent = old), 1200)
        } catch {
          alert("Kopieren nicht möglich. Bitte manuell markieren")
        }
      })
    })
  }

  const currentValue = document.getElementById("currentValue")
  const goalValue = document.getElementById("goalValue")
  const progressBar = document.getElementById("progressBar")

  function parseEuro(text) {
    const cleaned = (text || "").replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "")
    const num = Number(cleaned)
    return Number.isFinite(num) ? num : 0
  }

  function updateProgress() {
    if (!currentValue || !goalValue || !progressBar) return
    const current = parseEuro(currentValue.textContent)
    const goal = parseEuro(goalValue.textContent)
    const pct = goal > 0 ? Math.max(0, Math.min(100, (current / goal) * 100)) : 0
    progressBar.style.width = `${pct}%`
  }

  updateProgress()

  const newsTabs = document.querySelectorAll("[data-news-tab]")
  const newsPanels = document.querySelectorAll("[data-news-panel]")

  function activateNewsTab(tab) {
    const target = tab.getAttribute("data-news-tab")
    if (!target) return

    newsTabs.forEach((item) => {
      const isActive = item === tab
      item.classList.toggle("is-active", isActive)
      item.setAttribute("aria-selected", String(isActive))
    })

    newsPanels.forEach((panel) => {
      const isActive = panel.getAttribute("data-news-panel") === target
      panel.classList.toggle("is-active", isActive)
      panel.hidden = !isActive
    })
  }

  newsTabs.forEach((tab) => {
    tab.addEventListener("click", () => activateNewsTab(tab))
  })

  const newsEntries = {
    laborumzug: {
      meta: "Update",
      title: "Laborumzug",
      intro: "Der Laborumzug schafft mehr Platz für Aufbau, Messstrecke, Sicherheitstechnik und Dokumentation.",
      body: [
        "Mit dem neuen Laborbereich kann ThermoH2 geordneter aufgebaut werden: Reaktor, Gasreinigung, Sensorik und Sicherheitskomponenten bekommen klar getrennte Zonen.",
        "Die räumliche Trennung erleichtert sichere Arbeitsabläufe und schafft bessere Bedingungen für reproduzierbare Versuche."
      ],
      images: [
        ["assets/Labor.png", "Laborbereich von ThermoH2", "Der neue Laborbereich"]
      ]
    },
    bert2: {
      meta: "Entwicklung",
      title: "BERT 2",
      intro: "BERT 2 verlagert die Weiterentwicklung des Projekts in Richtung Durchlaufreaktor.",
      body: [
        "Während BERT 1 als Batch-System für Grundlagenversuche dient, soll BERT 2 Kunststoffmaterial kontrollierter durch eine heiße Reaktionszone führen.",
        "Die BERT-2-Seite zeigt Konzept, Prozessablauf, Versuchsplan und den aktuellen Entwicklungsstand."
      ],
      images: [
        ["assets/Bert2.jpg", "BERT 2", "BERT 2"],
        ["assets/bert2-schema.png", "Schema von BERT 2", "Schematischer Aufbau"]
      ],
      link: ["bert2.html", "BERT 2 Seite öffnen"]
    },
    tauschdoch: {
      meta: "Start-up",
      title: "Tausch doch",
      intro: "Tausch doch ist ein auf Nachhaltigkeit ausgerichtetes Start-up, das eine Onlineplattform für den direkten Tausch von Gegenständen entwickelt.",
      body: [
        "Die Idee: Gut erhaltene Dinge wechseln den Besitzer, statt durch Neukäufe ersetzt zu werden. So werden Ressourcen geschont und vermeidbare CO₂-Emissionen reduziert.",
        "Mit dem Projekt sollen zugleich Mittel und Aufmerksamkeit für weitere Forschungsarbeit geschaffen werden. Tausch doch ist ein eigenständiges Nachhaltigkeitsprojekt und nicht auf Kunststoffe ausgerichtet."
      ],
      images: [
        ["assets/tausch_doch_logo.png", "Logo des Start-ups Tausch doch", "Tausch doch"]
      ]
    },
    bruessel: {
      meta: "Reise",
      title: "Ausflug nach Brüssel",
      intro: "ThermoH2 wurde in Brüssel in einer kompakten Projektvorstellung präsentiert.",
      body: [
        "Im Mittelpunkt standen die Idee, schwer recycelbare Kunststoffe als Rohstoff zu betrachten, und die Entwicklung vom ersten Versuchsaufbau bis zu BERT 2.",
        "Der Austausch zeigte, wie eng technische Forschung, Kreislaufwirtschaft und europäische Zukunftsfragen miteinander verbunden sind."
      ],
      images: [
        ["assets/Brüssel.JPG", "ThermoH2 beim Ausflug nach Brüssel", "Eindrücke aus Brüssel"]
      ]
    }
  }

  const newsModal = document.getElementById("newsModal")
  const newsModalClose = document.getElementById("newsModalClose")
  const newsModalMeta = document.getElementById("newsModalMeta")
  const newsModalTitle = document.getElementById("newsModalTitle")
  const newsModalIntro = document.getElementById("newsModalIntro")
  const newsModalGallery = document.getElementById("newsModalGallery")
  const newsModalBody = document.getElementById("newsModalBody")

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  function renderNewsEntry(key) {
    if (!newsModal) return
    const entry = newsEntries[key]
    if (!entry) return

    if (newsModalMeta) newsModalMeta.textContent = entry.meta
    if (newsModalTitle) newsModalTitle.textContent = entry.title
    if (newsModalIntro) newsModalIntro.textContent = entry.intro

    if (newsModalGallery) {
      newsModalGallery.innerHTML = entry.images.map(([src, alt, caption]) => `
        <figure>
          <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" data-fallback-image>
          <figcaption>${escapeHtml(caption)}</figcaption>
        </figure>
      `).join("")
    }

    if (newsModalBody) {
      const paragraphs = entry.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")
      const link = entry.link ? `<p><a class="button primary" href="${escapeHtml(entry.link[0])}">${escapeHtml(entry.link[1])}</a></p>` : ""
      newsModalBody.innerHTML = `${paragraphs}${link}`
    }

    if (typeof newsModal.showModal === "function") newsModal.showModal()
  }

  document.querySelectorAll("[data-news-open]").forEach((item) => {
    item.addEventListener("click", () => {
      renderNewsEntry(item.getAttribute("data-news-open"))
    })
  })

  if (newsModal && newsModalClose) {
    newsModalClose.addEventListener("click", () => newsModal.close())
    newsModal.addEventListener("click", (e) => {
      const rect = newsModal.getBoundingClientRect()
      const inDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width

      if (!inDialog) newsModal.close()
    })
  }

  const legalOpen = document.getElementById("legalOpen")
  const legalModal = document.getElementById("legalModal")
  const legalClose = document.getElementById("legalClose")

  if (legalOpen && legalModal && legalClose) {
    legalOpen.addEventListener("click", () => {
      if (typeof legalModal.showModal === "function") {
        legalModal.showModal()
      }
    })

    legalClose.addEventListener("click", () => {
      legalModal.close()
    })

    legalModal.addEventListener("click", (e) => {
      const rect = legalModal.getBoundingClientRect()
      const inDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width

      if (!inDialog) legalModal.close()
    })
  }
  const modal = document.getElementById("imageModal")
  const modalImg = document.getElementById("imgModalContent")
  const closeBtn = document.querySelector(".img-close")

  if (modal && modalImg) {
    document.querySelectorAll(".zoomable").forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex"
        modalImg.src = img.src
      })
    })
  }

  if(closeBtn){
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none"
    })
  }

  if(modal){
    modal.addEventListener("click", e => {
      if(e.target === modal){
        modal.style.display = "none"
      }
    })
  }

  let cookieBanner = document.getElementById("cookieBanner")

  if (!cookieBanner && localStorage.getItem("thermoh2CounterConsent") === null) {
    cookieBanner = document.createElement("div")
    cookieBanner.id = "cookieBanner"
    cookieBanner.className = "cookie-banner"
    cookieBanner.innerHTML = `
      <div class="cookie-content">
        <div>
          <strong>Datenschutz-Hinweis</strong>
          <p>Diese Website verwendet einen externen Besucherzähler. Dabei können technische Verbindungsdaten verarbeitet werden. Die Erfassung dient nur der Anzeige der Gesamtzahl der Seitenaufrufe.</p>
        </div>
        <div class="cookie-buttons">
          <button id="acceptCounter" class="button primary" type="button">Akzeptieren</button>
          <button id="declineCounter" class="button ghost" type="button">Ablehnen</button>
        </div>
      </div>`
    document.body.append(cookieBanner)
  }

  const acceptCounter = document.getElementById("acceptCounter")
  const declineCounter = document.getElementById("declineCounter")
  const visitorCount = document.getElementById("visitorCount")

  function loadVisitorCounter() {
    if (!visitorCount) return

    visitorCount.textContent = "..."

    const badge = new Image()
    badge.className = "visitor-counter-badge"
    badge.alt = "Anzahl der Seitenaufrufe"
    badge.addEventListener("load", () => visitorCount.replaceChildren(badge), { once: true })
    badge.addEventListener("error", () => {
      visitorCount.textContent = "—"
    }, { once: true })
    badge.src = "https://api.visitorbadge.io/api/visitors?path=www.thermoh2.de&label=Aufrufe&labelColor=%23101522&countColor=%23058f91&style=flat"
  }

  const counterConsent = localStorage.getItem("thermoh2CounterConsent")

  if (counterConsent === "accepted") {
    if (cookieBanner) cookieBanner.style.display = "none"
    loadVisitorCounter()
  }

  if (counterConsent === "declined") {
    if (cookieBanner) cookieBanner.style.display = "none"
    if (visitorCount) visitorCount.textContent = "Zähler deaktiviert"
  }

  if (acceptCounter) {
    acceptCounter.addEventListener("click", () => {
      localStorage.setItem("thermoh2CounterConsent", "accepted")
      if (cookieBanner) cookieBanner.style.display = "none"
      loadVisitorCounter()
    })
  }

  if (declineCounter) {
    declineCounter.addEventListener("click", () => {
      localStorage.setItem("thermoh2CounterConsent", "declined")
      if (cookieBanner) cookieBanner.style.display = "none"
      if (visitorCount) visitorCount.textContent = "Zähler deaktiviert"
    })
  }

  document.addEventListener("error", (e) => {
    const img = e.target
    if (!(img instanceof HTMLImageElement)) return
    if (!img.matches(".bert2-section img, .news-section img, .news-list-card img, [data-fallback-image]")) return
    if (img.dataset.fallbackApplied === "true") return

    img.dataset.fallbackApplied = "true"
    img.src = "assets/placeholder-wide.webp"
    img.alt = "Bild folgt"
    img.classList.add("generated-placeholder")
  }, true)
})();
