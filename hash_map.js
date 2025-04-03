// if (index < 0 || index >= buckets.length) {
    //   throw new Error("Trying to access index out of bounds");
    // }

    import { LinkedList } from "./linked_list.js";

    class HashMap {
      constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(capacity);
      }

      hash(key) { 
        let hashCode = 0;
        const primeNum = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNum * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
      }

      set(key, value) {
        let index = this.hash(key);
        if (!this.buckets[index]) {
          this.buckets[index] = new LinkedList();
        }
        if (!this.has(key)) {
          this.buckets[index].append(key, value);
        } else {
          let current = this.buckets[index].head;
          let listIndex = this.buckets[index].find(key);   
          let count = 0;
          while (current) {
            if (count === listIndex) {
              current.value = value;
            }
            count++;
            current = current.nextNode;
          }
        }
        let product = this.capacity * this.loadFactor;
        if (product < (this.length())) {
          this.grow();
        } 
      }

      get(key) {
        let index = this.hash(key);
        let listIndex = this.buckets[index].find(key);
        if (this.buckets[index] !== undefined && this.buckets[index].contains(key) !== false) {
          return this.buckets[index].at(listIndex);
        }
        return null;
      }

      has(key) {
        if (this.get(key)) {
          return true;
        } else {
          return false;
        }
      }

      remove(key) {
        let index = this.hash(key);
        if (this.buckets[index] !== undefined && this.buckets[index].contains(key) !== false) {
          let listIndex = this.buckets[index].find(key);
          this.buckets[index].removeAt(listIndex);
          return true;
        }
        return false;
      }

      length() {
        let length = 0;
        for (let bucket of this.buckets) {
          if (bucket === undefined) {
            continue;
          } else {
            length += bucket.size();
          }
        }
        return length;
      }

      clear() {
        this.buckets = new Array(this.capacity);
      }

      keys() {
        let keysArray = [];
        for (let bucket of this.buckets) {
          if (bucket === undefined) {
            continue;
          } else {
            let current = bucket.head;
            while (current !== null) {
              keysArray.push(current.key);
              current = current.nextNode;
            }
          }
        }
        return keysArray;
      }

      values() {
        let valuesArray = [];
        for (let bucket of this.buckets) {
          if (bucket === undefined) {
            continue;
          } else {
            let current = bucket.head;
            while (current !== null) {
              valuesArray.push(current.value);
              current = current.nextNode;
            }
          }
        }
        return valuesArray;
      }

      entries() {
        let entriesArray = [];
        for (let bucket of this.buckets) {
          if (bucket === undefined) {
            continue;
          } else {
            let current = bucket.head;
            while (current !== null) {
              entriesArray.push([current.key, current.value]);
              current = current.nextNode;
            }
          }
        }
        return entriesArray;
      }

      grow() {
        let entries = this.entries();
        this.capacity = this.capacity * 2;
        this.buckets = new Array(this.capacity);
        entries.forEach(entry => {
          this.set(entry[0], entry[1]);
        });
      }
    }
      
    export { HashMap };