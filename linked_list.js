import { Node } from "./node.js";

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(key, value) {
    const node = new Node(key, value);
    let current;
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.nextNode = node;
      this.tail = node;
    }
  }

  prepend(value) {
    this.head = new Node(key, value, this.head);
  }

  size() {
    let size = 0;
    let list = this.head;
    while (list) {
      size++;
      list = list.nextNode;
    }
    return size;
  }

  head() {
    return this.head;
  }

  tail() {
    return this.tail;
  }

  at(index) {
    if (index >= this.size() || index < 0) {
      return 'ERROR: index is out of range';
    } else {
      let current = this.head;
      let count = 0;
      while (current) {
        if (count === index) {
          return current.value;
        }
        count++;
        current = current.nextNode;
      }
    }
  }

  pop() {
    let current = this.head;
    let count = 0;
    while (count < this.size() - 2) {
      current = current.nextNode;
      count++;
    }
    this.tail = current;
    this.tail.nextNode = null;
  }

  contains(key) {
    let current = this.head;
    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  find(key) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.key === key) {
        return index;
      }
      current = current.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let current = this.head;
    let string = '';
    while (current) {
      string += `( ${current.value} ) -> `;
      current = current.nextNode;
      if (!current) {
        string += 'null ';
      }
    }
    return string;
  }

  insertAt(key, value, index) {
    if (index < 0 || index > this.size()) {
      return 'ERROR: index is out of range';
    } else if (index === 0) {
      this.head = new Node(key, value, this.head);
      return;
    } else {
      let current;
      let previous;
      current = this.head;
      const node = new Node(key, value, null);
      let count = 0;
      while (count < index) {
        previous = current;
        count++;
        current = current.nextNode;
      }
      node.nextNode = current;
      previous.nextNode = node;
    }
  }

  removeAt(index) {
    let current = this.head;
    let previous;
    if (index < 0 || index > this.size()) {
      return 'ERROR: index is out of range';
    } else if (index === 0) {
      this.head = current.nextNode;
    } else {
      let count = 0;
      while (count < index) {
        count++;
        previous = current;
        current = current.nextNode;
      }
      previous.nextNode = current.nextNode;
    }
  }
}

export { LinkedList };