/* Настройки независимы; ошибки localStorage не блокируют интерфейс. */
const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const densityIndicator = document.querySelector('#density-indicator');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');
const themes = ['auto', 'light', 'dark'];
const densities = ['normal', 'compact'];
function loadChoice(key, allowed, fallback) {
  try { const saved = localStorage.getItem(key); return allowed.includes(saved) ? saved : fallback; }
  catch { return fallback; }
}
function saveChoice(key, value) { try { localStorage.setItem(key, value); } catch { /* private mode */ } }
function applyTheme(choice) {
  const value = themes.includes(choice) ? choice : 'auto';
  if (value === 'auto') root.removeAttribute('data-theme');
  else root.dataset.theme = value;
  themeSelect.value = value;
}
function applyDensity(choice) {
  const value = densities.includes(choice) ? choice : 'normal';
  if (value === 'compact') root.dataset.density = 'compact';
  else root.removeAttribute('data-density');
  densitySelect.value = value;
  if (densityIndicator) densityIndicator.textContent = value === 'compact' ? 'Компактная плотность включена' : 'Обычная плотность';
}
applyTheme(loadChoice('atlas-theme', themes, 'auto'));
applyDensity(loadChoice('atlas-density', densities, 'normal'));
themeSelect.addEventListener('change', () => { applyTheme(themeSelect.value); saveChoice('atlas-theme', themeSelect.value); });
densitySelect.addEventListener('change', () => { applyDensity(densitySelect.value); saveChoice('atlas-density', densitySelect.value); });
demoAction.addEventListener('click', () => {
  demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
});
