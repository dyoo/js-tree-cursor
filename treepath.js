/*jslint vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */



// Offers functional views, traversals of the DOM.
// See Functional Pearl: The Zipper, by G\'erard Huet
// J. Functional Programming 7 (5): 549--554 Sepember 1997


var TreePath = (function() {
    "use strict";

    var TreePath = function(parent, node, prevs, nexts, openF, closeF) {
        this.parent = parent; // Parent can be the top (undefined), or a TreePath
        this.node = node;
        this.prevs = prevs;
        this.nexts = nexts;

        // openF: node -> (arrayof node)
        this.openF = openF;

        // closeF: node (arrayof node) -> node
        // Given a node and its array of children, return a new node.
        this.closeF = closeF;
    };


    TreePath.prototype.down = function() {
        var opened = this.openF(this.node);
        if (opened.length === 0) {
            throw new Error("down of empty");
        }
        return new TreePath(this, 
                            opened[0],
                            [],
                            opened.slice(1),
                            this.openF, 
                            this.closeF);
    };

    TreePath.prototype.updateNode = function(f) {
        return new TreePath(this.parent,
                            f(this.node),
                            this.prevs,
                            this.nexts,
                            this.openF,
                            this.closeF);
    };


    TreePath.prototype.up = function() {
        var parent = this.parent;
        return new TreePath(parent.parent,
                            this.closeF(parent.node,
                                        this.prevs.concat([this.node]).concat(this.nexts)),
                            parent.prevs,
                            parent.nexts,
                            this.openF,
                            this.closeF);
    };

    TreePath.prototype.left = function() {
        if (this.prevs.length === 0) { throw new Error("left of first"); }
        return new TreePath(this.parent,
                            this.prevs[this.prevs.length - 1],
                            this.prevs.slice(0, this.prevs.length - 1),
                            [this.node].concat(this.nexts),
                            this.openF,
                            this.closeF);
    };

    TreePath.prototype.right = function() {
        if (this.nexts.length === 0) { throw new Error("right of last"); }
        return new TreePath(this.parent,
                            this.nexts[0],
                            this.prevs.concat([this.node]),
                            this.nexts.slice(1),
                            this.openF, 
                            this.closeF);
    };
  

    TreePath.domToPath = function(dom) {
        var domOpenF = 
            // To go down, just take the children.
            function(n) { 
                return [].slice.call(n.childNodes, 0);
            };
        var domCloseF = 
            // To go back up, take the node, do a shallow cloning, and replace the children.
            function(node, children) { 
                var i;
                var newNode = node.cloneNode(false);
                for (i = 0; i < children.length; i++) {
                    newNode.appendChild(children[i].cloneNode(true));
                }
                return newNode; 
            };
        return new TreePath(undefined,
                            dom.cloneNode(true),
                            [],
                            [],
                            domOpenF,
                            domCloseF);
    };

    return TreePath;
}());