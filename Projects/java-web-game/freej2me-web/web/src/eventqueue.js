// we can only communicate with java using this queue, can't call anything directly
// the java side will poll for events in a separate thread
export class EventQueue {
    promise = null;
    resolvePromise = null;
    started = false;
    queue = [];

    constructor() {
        this.refreshPromise();
    }

    refreshPromise() {
        this.promise = new Promise(r => {this.resolvePromise = r;});
    }

    queueEvent(evt, skipIfExists=null) {
        if (!this.started) return;
        if (skipIfExists && this.queue.some(skipIfExists)) {
            return;
        }
        this.queue.push(evt);
        if (this.resolvePromise) {
            this.resolvePromise(true);
            this.resolvePromise = null;
        }
    }

    async waitForEvent() {
        this.started = true;
        if (this.queue.length > 1) {
            return this.queue.shift();
        }

        await this.promise;
        this.refreshPromise(); // refresh here
        return this.queue.shift();
    }
}
