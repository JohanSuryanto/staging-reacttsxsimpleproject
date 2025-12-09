(() => {
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      const componentName = `pncHideExtensionAlertUntil_${window.__JOTGO__?.user?.email}`;
      const hideUntil = localStorage.getItem(componentName);
      const now = Date.now();
      if (hideUntil && Number(hideUntil) > now) return;

      if (!window.isPncExtensionInstalled) {

        const banner = document.createElement("div");
        banner.innerHTML = `
          <div id="jotgo-alert-banner" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: #35424a;
            color: #fff;
            text-align: center;
            padding: 14px 10px;
            font-family: 'Inter', Arial, sans-serif;
            font-size: 15px;
            font-weight: 500;
            z-index: 99999;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          ">

            <div style="display:flex;align-items:center;gap:10px;">
              ⚠️ JotGo extension is not yet installed in your browser.
              <button id="installBtn" style="
                background: #ffcc00;
                color: #000;
                border: none;
                padding: 6px 12px;
                cursor: pointer;
                font-weight: 600;
                border-radius: 4px;
                transition: background 0.2s;
              ">Add Extension</button>
            </div>

            <div style="display:flex;gap:12px; margin-top:8px;">
              <button id="hideToday" style="
                background: #555;
                color: #fff;
                border:none;
                padding:6px 10px;
                border-radius:4px;
                cursor:pointer;
              ">Do not show for today</button>

              <button id="hide3Days" style="
                background: #555;
                color: #fff;
                border:none;
                padding:6px 10px;
                border-radius:4px;
                cursor:pointer;
              ">Do not show for 3 days</button>

              <button id="closeBanner" style="
                background: #777;
                color:#fff;
                border:none;
                padding:6px 10px;
                border-radius:4px;
                cursor:pointer;
              ">Close</button>
            </div>

          </div>
        `;

        document.body.appendChild(banner);

        // Install Button Browser Logic
        document.getElementById("installBtn").addEventListener("click", () => {
          const browser = detectBrowser();

          let url = "";

          if (browser === "chrome") {
            url = `https://chrome.google.com/webstore/detail/hbblkngijablmgmegmilehbmmkkmkdic`;
          }
          else if (browser === "edge") {
            url = `https://microsoftedge.microsoft.com/addons/detail/hbblkngijablmgmegmilehbmmkkmkdic`;
          }
          else if (browser === "firefox") {
            url = `https://addons.mozilla.org/en-US/firefox/addon/hbblkngijablmgmegmilehbmmkkmkdic`;
          }
          else {
            // Fallback for Safari/Opera/Brave/etc
            alert("Your browser does not support extensions for JotGo.");
            return;
          }

          window.open(url, "_blank");
        });

        // Close banner
        document.getElementById("closeBanner").addEventListener("click", () => {
          document.getElementById("jotgo-alert-banner")?.remove();
        });

        // Hide 24h
        document.getElementById("hideToday").addEventListener("click", () => {
          localStorage.setItem(componentName, (Date.now() + 86400000).toString());
          banner.remove();
        });

        // Hide 72h
        document.getElementById("hide3Days").addEventListener("click", () => {
          localStorage.setItem(componentName, (Date.now() + 259200000).toString());
          banner.remove();
        });

      }

      // Browser detector
      function detectBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes("Firefox/")) return "firefox";
        if (ua.includes("Edg/")) return "edge";
        if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "chrome";
        return "other";
      }

    }, 800);
  });
})();