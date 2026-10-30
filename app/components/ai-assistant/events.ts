/** Lets any component (banner, hero, etc.) open the floating assistant panel. */
export const OPEN_ASSISTANT_EVENT = 'flxware:open-assistant';

export function openAssistant() {
  window.dispatchEvent(new Event(OPEN_ASSISTANT_EVENT));
}
