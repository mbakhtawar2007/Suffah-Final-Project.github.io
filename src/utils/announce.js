// Simple accessible announcer helper. Ensures a single live region is present
export function announce(message) {
  if (!message) return;
  try {
    let region = document.getElementById('app-live-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'app-live-region';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.style.position = 'absolute';
      region.style.left = '-9999px';
      region.style.width = '1px';
      region.style.height = '1px';
      region.style.overflow = 'hidden';
      document.body.appendChild(region);
    }
    // Clear and set to trigger announce
    region.textContent = '';
    setTimeout(() => { region.textContent = message; }, 50);
  } catch (e) {
    // ignore DOM errors during SSR or test contexts
  }
}
