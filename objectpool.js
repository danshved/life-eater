// Utility "class" to maintain a pool of objects. To function properly,
// the class requires these user-supplied functions:
// create: the function to create new objects;
// deactivate (optional): what should be called when object returns to the pool.
function ObjectPool(create, createContext) {
    this.pool = [];

    this.create = create;
    this.createContext = createContext || null;
}

ObjectPool.prototype.allocate = function() {
    return this.pool.pop() || this.create.call(this.createContext);
}

ObjectPool.prototype.free = function(obj) {
    this.pool.push(obj);
}
