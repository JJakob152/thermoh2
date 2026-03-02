(function () {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  
    const toggleBtn = document.querySelector(".nav-toggle");
    const navLinks = document.getElementById("navlinks");
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
        toggleBtn.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
      });
  
      navLinks.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          navLinks.classList.remove("open");
          toggleBtn.setAttribute("aria-expanded", "false");
          toggleBtn.setAttribute("aria-label", "Menü öffnen");
        });
      });
    }
  
    const videoToggle = document.getElementById("videoToggle");
    const videoWrap = document.getElementById("videoWrap");
    if (videoToggle && videoWrap) {
      videoToggle.addEventListener("click", () => {
        const mode = videoWrap.getAttribute("data-mode");
  
        if (mode === "file") {
          videoWrap.setAttribute("data-mode", "embed");
          videoWrap.innerHTML = `
            <iframe
              class="video"
              src="https://www.youtube-nocookie.com/embed/DEIN_VIDEO_ID"
              title="ThermoH2 Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          `;
        } else {
          videoWrap.setAttribute("data-mode", "file");
          videoWrap.innerHTML = `
            <video class="video" controls preload="metadata" poster="assets/hero-poster.jpg">
              <source src="assets/thermoh2.mp4" type="video/mp4" />
              Dein Browser unterstützt das Video Tag nicht.
            </video>
          `;
        }
      });
    }
  
    const costModal = document.getElementById("costModal");
    const openCosts = document.getElementById("openCosts");
    const closeCosts = document.getElementById("closeCosts");
  
    if (costModal && openCosts && closeCosts) {
      openCosts.addEventListener("click", () => costModal.showModal());
      closeCosts.addEventListener("click", () => costModal.close());
      costModal.addEventListener("click", (e) => {
        const rect = costModal.getBoundingClientRect();
        const inDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;
  
        if (!inDialog) costModal.close();
      });
    }
  
    const donateButton = document.getElementById("donateButton");
    if (donateButton) {
      donateButton.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Hier später euren echten Spendenlink einfügen, zum Beispiel PayPal.me oder Betterplace.");
      });
    }
  
    const mailFallback = document.getElementById("mailFallback");
    const contactForm = document.getElementById("contactForm");
  
    if (mailFallback && contactForm) {
      mailFallback.addEventListener("click", () => {
        const name = document.getElementById("name")?.value || "";
        const email = document.getElementById("email")?.value || "";
        const subject = document.getElementById("subject")?.value || "ThermoH2 Anfrage";
        const message = document.getElementById("message")?.value || "";
  
        const body = [
          `Name: ${name}`,
          `E-Mail: ${email}`,
          "",
          message
        ].join("\n");
  
        const mailto = `mailto:thermoh2@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      });
    }
  
    const currentValue = document.getElementById("currentValue");
    const goalValue = document.getElementById("goalValue");
    const progressBar = document.getElementById("progressBar");
  
    function parseEuro(text) {
      const cleaned = (text || "").replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "");
      const num = Number(cleaned);
      return Number.isFinite(num) ? num : 0;
    }
  
    function updateProgress() {
      if (!currentValue || !goalValue || !progressBar) return;
      const current = parseEuro(currentValue.textContent);
      const goal = parseEuro(goalValue.textContent);
      const pct = goal > 0 ? Math.max(0, Math.min(100, (current / goal) * 100)) : 0;
      progressBar.style.width = `${pct}%`;
    }
  
    updateProgress();
  })();