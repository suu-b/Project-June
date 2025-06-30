class TTLMap {
    constructor(){
        this.map = new Map();
    }

    set(key, value, ttlMs) {
    this.map.set(key, value);
    setTimeout(() => this.map.delete(key), ttlMs);
   }

   get(key) {
    return this.map.get(key);
   }

   clear() {
    this.map.clear();
  }

  size() {
    return this.map.size;
  }

  delete(key) {
    return this.map.delete(key);
  }

}

module.exports = TTLMap;