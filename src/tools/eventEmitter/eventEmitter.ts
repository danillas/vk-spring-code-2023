export declare type Listener = (arg: any) => Promise<any> | void;
export declare type DefaultEventMap = { [event in string | symbol]: Listener };

type GetEventDataMap<T extends DefaultEventMap> = {
  [K in keyof T]: { event: K; data: Parameters<T[K]>[0] };
}[keyof T];

export class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> {
  private readonly eventListeners: { [eventName in keyof EventMap]?: Listener[] } = {};

  private subscribes: Array<(event: GetEventDataMap<EventMap>) => void> = [];

  /**
   * Файрит событие
   * @param event событие
   * @param data параметр
   */
  public emit = <EventKey extends keyof EventMap>(event: EventKey, ...data: Parameters<EventMap[EventKey]>) => {
    const eventListeners: Listener[] | undefined = this.eventListeners[event];

    if (eventListeners) {
      eventListeners.forEach((listener) => {
        listener(data[0]);
      });
    }

    this.subscribes.forEach((subscriber) => {
      subscriber({ event, data: data[0] });
    });
  };

  /**
   * Добавляет подписку на одно событие
   * @param event событие
   * @param listener подписчик
   */
  public on = <EventKey extends keyof EventMap>(event: EventKey, listener: EventMap[EventKey]): this => {
    this.eventListeners[event] = this.eventListeners[event] || [];
    const eventListeners = this.eventListeners[event] as Listener[];

    if (!eventListeners.includes(listener)) {
      eventListeners.push(listener);
    }

    return this;
  };

  /**
   * Удаляет подписку с одного события
   * @param event событие
   * @param listener установленный ранее подписчик
   */
  public off = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
    this.eventListeners[event] = this.eventListeners[event] || [];
    const eventListeners = this.eventListeners[event] as Listener[];

    this.eventListeners[event] = eventListeners.filter((eventListener) => eventListener !== listener);

    return this;
  };

  /**
   * Добавляет подписку на любое событие
   * @param subscriber подписчик
   */
  public subscribe = (subscriber: (event: GetEventDataMap<EventMap>) => void): this => {
    if (!this.subscribes.includes(subscriber)) {
      this.subscribes.push(subscriber);
    }

    return this;
  };

  /**
   * Удаляет подписку с любого события
   * @param subscriber подписчик
   */
  public unsubscribe = (subscriber: (event: GetEventDataMap<EventMap>) => void): this => {
    this.subscribes = this.subscribes.filter((subscribeItem) => subscribeItem !== subscriber);

    return this;
  };
}
