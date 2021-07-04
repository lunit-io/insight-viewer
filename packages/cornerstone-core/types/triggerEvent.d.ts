/**
 * Trigger a CustomEvent
 *
 * @param {EventTarget} el The element or EventTarget to trigger the event upon
 * @param {String} type The event type name
 * @param {Object|null} detail=null The event data to be sent
 * @returns {Boolean} The return value is false if at least one event listener called preventDefault(). Otherwise it returns true.
 */
export default function triggerEvent(el: EventTarget, type: string, detail?: any | null): boolean;
