// Operations with 2x2 matrices
function Matrix2(m00, m01, m10, m11) {
    this.m00 = m00;
    this.m01 = m01;
    this.m10 = m10;
    this.m11 = m11;
}

// Multiply two matrices
Matrix2.multiply = function (a, b) {
    return new Matrix2(
        a.m00 * b.m00 + a.m01 * b.m10,
        a.m00 * b.m01 + a.m01 * b.m11,
        a.m10 * b.m00 + a.m11 * b.m10,
        a.m10 * b.m01 + a.m11 * b.m11);
}

// Multiply a matrix by a vector
Matrix2.prototype.getX = function(x, y) {
    return this.m00 * x + this.m01 * y;
}

Matrix2.prototype.getY = function(x, y) {
    return this.m10 * x + this.m11 * y;
}

// Useful constant matrices
Matrix2.identity = new Matrix2(1, 0, 0, 1);
Matrix2.rot90    = new Matrix2(0, 1, -1, 0);
Matrix2.symX     = new Matrix2(-1, 0, 0, 1);

// Store multiples of rot90
Matrix2._rots = [Matrix2.identity];
Matrix2._rots.length = 4;
for(var i = 1; i < 4; i++) {
    Matrix2._rots[i] = Matrix2.multiply(Matrix2._rots[i-1], Matrix2.rot90);
}

// Store reflections in X and Y axes and their two bisectors
Matrix2._mirrors = [];
Matrix2._mirrors.length = 4;
for(var i = 0; i < 4; i++) {
    Matrix2._mirrors[i] = Matrix2.multiply(Matrix2._rots[i], Matrix2.symX);
}

// Function to get an element of the dihedral group: (rot90)^i * (symX)^j
Matrix2.d8element = function(rotCount, reflect) {
    return reflect ? Matrix2._mirrors[rotCount] : Matrix2._rots[rotCount];
}
