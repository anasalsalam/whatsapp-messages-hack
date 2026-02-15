const Site = require('../../js/site.js');

describe('Site helpers', () => {
  test('normalizePhone strips non-digits but preserves leading +', () => {
    expect(Site.normalizePhone('+1 (555) 123-4567')).toBe('+15551234567');
    expect(Site.normalizePhone('0555-999')).toBe('0555999');
    expect(Site.normalizePhone('')).toBe('');
  });

  test('buildWhatsAppHref produces a wa.me link with stripped phone', () => {
    const href = Site.buildWhatsAppHref('+15551234567');
    expect(href).toMatch(/wa\.me\/15551234567/);
    expect(href).toContain('?text=');
  });

  test('hidePreloader hides .preload element', () => {
    document.body.innerHTML = '<div class="preload" style="display:block"></div>';
    const el = document.querySelector('.preload');
    expect(getComputedStyle(el).display).not.toBe('none');

    Site.hidePreloader();
    expect(el.style.display === 'none' || getComputedStyle(el).display === 'none').toBeTruthy();
  });
});
