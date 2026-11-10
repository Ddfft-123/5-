/* Переключение темы и плотности без библиотеки.
 * "auto" означает отсутствие атрибута data-theme у <html> —
 * в этом случае тёмную тему применяет CSS media query.
 * Ключи localStorage: "atlas-theme", "atlas-density".
 */
const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

const THEME_KEY = 'atlas-theme';
const DENSITY_KEY = 'atlas-density';
const VALID_THEMES = ['auto', 'light', 'dark'];
const VALID_DENSITIES = ['normal', 'compact'];

/* ---------- Тема ---------- */

function readTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return VALID_THEMES.includes(saved) ? saved : 'auto';
  } catch {
    return 'auto';
  }
}

function applyTheme(choice) {
  const safe = VALID_THEMES.includes(choice) ? choice : 'auto';
  if (safe === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.dataset.theme = safe;
  }
  if (themeSelect) themeSelect.value = safe;
  try { localStorage.setItem(THEME_KEY, safe); } catch { /* интерфейс продолжает работать */ }
}

/* ---------- Плотность ---------- */

function readDensity() {
  try {
    const saved = localStorage.getItem(DENSITY_KEY);
    return VALID_DENSITIES.includes(saved) ? saved : 'normal';
  } catch {
    return 'normal';
  }
}

function applyDensity(choice) {
  const safe = VALID_DENSITIES.includes(choice) ? choice : 'normal';
  if (safe === 'compact') {
    root.dataset.density = 'compact';
  } else {
    root.removeAttribute('data-density');
  }
  if (densitySelect) densitySelect.value = safe;
  try { localStorage.setItem(DENSITY_KEY, safe); } catch { /* интерфейс продолжает работать */ }
}

/* ---------- Инициализация ---------- */

if (themeSelect) {
  applyTheme(readTheme());
  themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));
}

if (densitySelect) {
  applyDensity(readDensity());
  densitySelect.addEventListener('change', (e) => applyDensity(e.target.value));
}

/* Обратная связь от кнопки — уже готова. */
if (demoAction && demoFeedback) {
  demoAction.addEventListener('click', () => {
    demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
  });
}