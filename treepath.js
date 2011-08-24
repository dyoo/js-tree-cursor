(function() {
    "use strict";

    // See Functional Pearl: The Zipper, by G\'erard Huet
    // J. Functional Programming 7 (5): 549--554 Sepember 1997
    var TreePath = function(parent, node, prevs, nexts) {
        this.parent = parent; // Parent can be the top (undefined), or a TreePath
        this.node = node;
        this.prevs = prevs;
        this.nexts = nexts;
    };

    TreePath.prototype.down = function() {
        var children = node.children();
        return new TreePath(this, node[0], [], children.slice(1));
    };

    TreePath.prototype.up = function() {
        var parent = this.parent;
        return new TreePath(parent.parent,
                            ...,
                            parent.prevs,
                            parent.nexts)
    };

    TreePath.prototype.left = function() {
        if (this.prevs.length === 0) { throw new Error("left of first"); }
        return new TreePath(this.parent,
                            this.prevs[this.prevs.length - 1],
                            this.prevs.slice(0, this.prevs.length - 1),
                            [this.node].concat(this.nexts));
    };

    TreePath.prototype.right = function() {
        if (this.nexts.length === 0) { throw new Error("right of last"); }
        return new TreePath(this.parent,
                            this.nexts[0],
                            this.prevs.concat([this.node]),
                            this.nexts.slice(1));
    };
    
    // TreePath.prototype.succ = function() {
    // };

    // TreePath.prototype.pred = function() {
    // };


});