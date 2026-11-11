const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

const THEME_KEY = 'atlas-theme';
const DENSITY_KEY = 'atlas-density';

function applyTheme(choice) {
  const validThemes = ['auto', 'light', 'dark'];
  const safeTheme = validThemes.includes(choice) ? choice : 'auto';

  if (safeTheme === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.dataset.theme = safeTheme;
  }

  if (themeSelect) themeSelect.value = safeTheme;
  try { localStorage.setItem(THEME_KEY, safeTheme); } catch (e) { /* noop */ }
}

function applyDensity(choice) {
  const validDensities = ['normal', 'compact'];
  const safeDensity = validDensities.includes(choice) ? choice : 'normal';

  if (safeDensity === 'compact') {
    root.dataset.density = 'compact';
  } else {
    root.removeAttribute('data-density');
  }

  if (densitySelect) densitySelect.value = safeDensity;
  try { localStorage.setItem(DENSITY_KEY, safeDensity); } catch (e) { /* noop */ }
}

document.addEventListener('DOMContentLoaded', () => {
  let savedTheme = 'auto';
  try { savedTheme = localStorage.getItem(THEME_KEY) || 'auto'; } catch (e) {}
  applyTheme(savedTheme);

  let savedDensity = 'normal';
  try { savedDensity = localStorage.getItem(DENSITY_KEY) || 'normal'; } catch (e) {}
  applyDensity(savedDensity);

  if (themeSelect) themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));
  if (densitySelect) densitySelect.addEventListener('change', (e) => applyDensity(e.target.value));

  if (demoAction && demoFeedback) {
    demoAction.addEventListener('click', () => {
      demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
    });
  }
});