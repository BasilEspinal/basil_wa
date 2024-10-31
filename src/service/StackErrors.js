// Stack.js
class StackErrors {
    constructor() {
      this.items = [];
    }
  
    // Add an element to the top of the stack
    push(element) {
      this.items.push(element);
    }
  
    // Remove and return the top element of the stack
    pop() {
      if (this.isEmpty()) {
        throw new Error("Stack is empty");
      }
      return this.items.pop();
    }
  
    // Peek at the top element without removing it
    peek() {
      if (this.isEmpty()) {
        throw new Error("Stack is empty");
      }
      return this.items[this.items.length - 1];
    }
  
    // Check if the stack is empty
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Return the number of elements in the stack
    size() {
      return this.items.length;
    }
  
    // Clear all elements from the stack
    clear() {
      this.items = [];
    }
  }
  
  // Export the Stack class
  export default StackErrors;
  