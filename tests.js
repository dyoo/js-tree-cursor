// FILL ME IN

describe('tests',
         {
             'simple test' : function() {
                 var aPath = TreePath.domToPath($('<p>Hello world</p>').get(0));
                 value_of(aPath.node.nodeName).should_be("P");
             },
             
             'going down' : function() {
                 var aPath = TreePath.domToPath($('<p><ul><li>item one</li><li>item two</li></ul></p>').get(0));
                 aPath.down();
                 //value_of(aPath.down().node.nodeName.should_be("ul"));
             },




         });