/* Login client for the JGS Admin Portal */
(function () {
  const roleRoutes = {
    Principal: "admin-dashboard.html",
    HOD: "hod-dashboard.html",
    Registrar: "registrar-dashboard.html",
    Accounts: "accounts-dashboard.html"
  };

  function getBackendUrl() {
    return (window.JGS_CONFIG && window.JGS_CONFIG.backendUrl || "").replace(/\/$/, "");
  }

  function demoModeAllowed() {
    return location.protocol === "file:" || ["localhost", "127.0.0.1"].includes(location.hostname) || localStorage.getItem("jgs_demo_mode") === "true";
  }

  function setError(field, message) {
    const node = document.querySelector(`[data-error-for="${field}"]`);
    if (node) node.textContent = message || "";
  }

  function clearErrors() {
    document.querySelectorAll("[data-error-for]").forEach((node) => {
      node.textContent = "";
    });
  }

  function validate(form) {
    clearErrors();
    let ok = true;
    const adminId = form.adminId.value.trim();
    const password = form.password.value;
    const role = form.adminRole.value;

    if (!adminId) {
      setError("adminId", "Admin ID is required.");
      ok = false;
    }
    if (!password) {
      setError("password", "Password is required.");
      ok = false;
    }
    if (!role) {
      setError("adminRole", "Select a management role.");
      ok = false;
    }
    return ok;
  }

  async function postLogin(payload) {
    const backendUrl = getBackendUrl();
    if (!backendUrl) {
      if (demoModeAllowed()) return { name: payload.adminId, mode: "demo" };
      throw new Error("Management portal backend is not configured. Contact IT Support.");
    }

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Login failed. Check your credentials or contact IT Support.");
      return response.json();
    } catch (error) {
      if (!demoModeAllowed()) throw error;
      console.warn("Backend login unavailable; continuing with demo admin session.", error);
      return { name: payload.adminId, mode: "demo" };
    }
  }

  function saveSession(form, user) {
    const role = form.adminRole.value;
    const adminId = form.adminId.value.trim();
    const displayName = user.name || user.adminName || `${role} Admin`;
    localStorage.setItem("jgs_role", "admin");
    localStorage.setItem("jgs_admin_name", displayName);
    localStorage.setItem("jgs_admin_role", role);
    localStorage.setItem("jgs_admin_id", adminId);
    if (user.token) localStorage.setItem("jgs_token", user.token);
  }

  function initLoginPage() {
    const form = document.querySelector("[data-login-form]");
    const toggle = document.querySelector("[data-toggle-password]");
    const password = document.querySelector("#password");
    if (!form) return;

    toggle?.addEventListener("click", () => {
      const showing = password.type === "text";
      password.type = showing ? "password" : "text";
      toggle.textContent = showing ? "Show" : "Hide";
      toggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!validate(form)) return;
      const button = form.querySelector("button[type='submit']");
      const status = document.querySelector("[data-login-status]");
      button.disabled = true;
      button.textContent = "Signing in...";
      status.textContent = "";

      try {
        const payload = {
          adminId: form.adminId.value.trim(),
          password: form.password.value,
          role: form.adminRole.value
        };
        const user = await postLogin(payload);
        saveSession(form, user);
        window.location.href = roleRoutes[payload.role] || "admin-dashboard.html";
      } catch (error) {
        status.textContent = error.message;
      } finally {
        button.disabled = false;
        button.textContent = "Login";
      }
    });
  }

  window.JGSAuthClient = { initLoginPage };
})();
