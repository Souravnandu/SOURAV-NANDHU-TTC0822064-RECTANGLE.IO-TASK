document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.querySelector(".theme-toggle-btn");


  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme); // Apply saved theme
  }


  themeToggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light"); // Save theme to local storage
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); // Save theme to local storage
    }
  });

  
  const notificationToggleButton = document.querySelector(".notification-toggle-btn");

  
  const savedNotifications = localStorage.getItem("notifications");
  if (savedNotifications) {
    const notificationsEnabled = savedNotifications === "enabled";
    updateNotificationUI(notificationsEnabled);
  }

  
  notificationToggleButton.addEventListener("click", () => {
    const currentNotifications = localStorage.getItem("notifications");
    const newNotificationSetting = currentNotifications === "enabled" ? "disabled" : "enabled";
    localStorage.setItem("notifications", newNotificationSetting); 
    updateNotificationUI(newNotificationSetting === "enabled");
  });


  function updateNotificationUI(isEnabled) {
    const notificationStatusElement = document.querySelector(".notification-status");
    if (isEnabled) {
      notificationStatusElement.textContent = "Notifications are enabled.";
    } else {
      notificationStatusElement.textContent = "Notifications are disabled.";
    }
  }
});
