// FILL ME IN

describe('tests',
         {
             'simple test' : function() {
                 var aCursor = TreeCursor.domToCursor($('<div>Hello world</div>').get(0));
                 value_of(aCursor.node.nodeName).should_be("DIV");
             },
             
             'going down' : function() {
                 var aCursor = TreeCursor.domToCursor($('<div><ul><li>item one</li><li>item two</li></ul></div>').get(0));
                 value_of(aCursor.down().node.nodeName).should_be("UL");
             },

             'going down 2' : function() {
                 var aCursor = TreeCursor.domToCursor($('<div><ul><li>item one</li><li>item two</li></ul></div>').get(0));
                 value_of(aCursor.down().down().node.nodeName).should_be("LI");
             },

             'going up' : function() {
                 var aCursor = TreeCursor.domToCursor($('<div><ul><li>item one</li><li>item two</li></ul></div>').get(0));
                 value_of(aCursor.down().down().up().node.nodeName).should_be("UL");
             },

             'going up 2 ' : function() {
                 var aCursor = TreeCursor.domToCursor($('<div><ul><li>item one</li><li>item two</li></ul></div>').get(0));
                 value_of(aCursor.down().down().up().up().node.nodeName).should_be("DIV");
             },


             'going right' : function() {
                 var aCursor = TreeCursor.domToCursor($('<div><span>hi</span><span>world</span></div>').get(0));
                 value_of($(aCursor.down().node).text()).should_be("hi");
                 value_of($(aCursor.down().right().node).text()).should_be("world");
             },

             'going right and left' : function() {
                 var aCursor = TreeCursor.domToCursor($('<div><span>hi</span><span>world</span></div>').get(0));
                 value_of($(aCursor.down().right().left().node).text()).should_be("hi");
             },

             'going right and up' : function() {
                 var aCursor = TreeCursor.domToCursor($('<div><span>hi</span><span>world</span></div>').get(0));
                 value_of(aCursor.down().right().up().node.nodeName).should_be("DIV");
             },


             'going right and up and down' : function() {
                 var aCursor = TreeCursor.domToCursor($('<div><span>hi</span><span>world</span></div>').get(0));
                 value_of($(aCursor.down().right().up().down().node).text()).should_be("hi");
             },



             'array successor' : function() {
                 var path = TreeCursor.arrayToCursor([[1, 2, [3, 4], [5, [[[6]]]], 7]]);
                 value_of(path.canSucc()).should_be(true);

                 value_of(path.succ().succ().node).should_be(1);
                 value_of(path.succ().succ().succ().node).should_be(2);
                 value_of(path.succ().succ().succ().succ().succ().node).should_be(3);
                 value_of(path.succ().succ().succ().succ().succ().succ().node).should_be(4);
                 value_of(path.succ().succ().succ().succ().succ().succ().succ().succ().node).should_be(5);
                 value_of(path.succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().node).should_be(6);
                 value_of(path.succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().node).should_be(7);

                 value_of(path.succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().canSucc()).should_be(false);
                 value_of(path.succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().canSucc()).should_be(true);
             },


             'array predecessor' : function() {
                 var path = TreeCursor.arrayToCursor([[1, 2, [3, 4], [5, [[[6]]]], 7]]);
                 var rightMost = path.succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ().succ();
                 value_of(rightMost.node).should_be(7);
                 value_of(rightMost.pred().node).should_be(6);
                 value_of(rightMost.pred().pred().pred().pred().pred().node).should_be(5);
                 value_of(rightMost.pred().pred().pred().pred().pred().pred().pred().node).should_be(4);
                 value_of(rightMost.pred().pred().pred().pred().pred().pred().pred().pred().node).should_be(3);
                 value_of(rightMost.pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().node).should_be(2);
                 value_of(rightMost.pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().node).should_be(1);
                 
                 value_of(rightMost.pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().canPred()).should_be(true);
                 value_of(rightMost.pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().canPred()).should_be(true);
                 value_of(rightMost.pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().pred().canPred()).should_be(false);
             },


             'updating' : function() {
                 var map = ["zero", "one", "two", "three", "four", "five", "six", "seven"];
                 var cursor = TreeCursor.arrayToCursor([[1, 2, [3, 4], [5, [[[6]]]], 7]]);
                 while (true) {
                     if (typeof(cursor.node) === 'number') {
                         cursor = cursor.updateNode(function(n) { return map[n]; });
                     }
                     if (cursor.canSucc()) { 
                         cursor = cursor.succ();
                     } else {
                         break;
                     }
                 }
                 value_of(cursor.top().node).should_be(
                     [["one", "two", ["three", "four"], ["five", [[["six"]]]], "seven"]]);
             },



             'making sure the update is functional' : function() {
                 var map = ["zero", "one", "two", "three", "four", "five", "six", "seven"];
                 var cursor = TreeCursor.arrayToCursor([[1, 2, [3, 4], [5, [[[6]]]], 7]]);
                 while (true) {
                     if (typeof(cursor.node) === 'number') {
                         // Here, we don't save the cursor, hence nothing should happen!
                         cursor.updateNode(function(n) { return map[n]; });
                     }
                     if (cursor.canSucc()) { 
                         cursor = cursor.succ();
                     } else {
                         break;
                     }
                 }
                 value_of(cursor.top().node).should_be(
                     [[1, 2, [3, 4], [5, [[[6]]]], 7]]);
             }


         });