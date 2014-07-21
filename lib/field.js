'use strict';
var Field = function (/* int */ size) {
    'use strict';
    if (size < 0) {
        throw new RangeError("given size is negative");
    }
    var data = new Uint8Array(((size*size + 7) / 8) | 0);
    //this.size = size;
    this.getSize = function () {
        return size;
    };
    this.get = function (i) {
        return ((data[(i/8)|0] >> (i%8)) & 1);
    };
    this.toggle = function (i) {
        if (i >= size*size || i < 0)
            return;
        data[(i/8)|0] ^= (1 << (i%8));
    };
    this.getNeighbours = function (i) {
        if (i >= size*size || i < 0)
            return [];
        var n = [i];
        if (i >= size) {
            n.push(i-size);
        }
        if (i < size*size-size) {
            n.push(i+size);
        }
        if (i%size !== 0) {
            n.push(i-1);
        }
        if ((i+1)%size !== 0) {
            n.push(i+1);
        }
        return n;
    };
    this.toggleNeighbours = function (i) {
        this.getNeighbours(i).forEach(function (n) {
            this.toggle(n);
        }, this);
    };
    this.isSolved = function () {
        var j;
        for (j=0; j < size*size; j++) {
            if (!this.get(j)) 
                return false;
        }
        return true;
    };
    this.toString = function () {
        var j, str = "";
        for (j=0; j < size*size; j++) {
            str += this.get(j);
            if ((j+1) % size === 0) 
                str += "\n";
        }
        str = str.slice(0, -1);
        return str;
    };
};

if (typeof module !== "undefined") {
    module.exports = Field;
}