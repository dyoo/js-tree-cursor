// FILL ME IN

describe('tests',
         {
             'simple test' : function() {
                 var aPath = TreePath.domToPath($('<div>Hello world</div>').get(0));
                 value_of(aPath.node.nodeName).should_be("DIV");
             },
             
             'going down' : function() {
                 var aPath = TreePath.domToPath($('<div><ul><li>item one</li><li>item two</li></ul></div>').get(0));
                 console.log(aPath);
                 aPath.down();
                 //value_of(aPath.down().node.nodeName.should_be("ul"));
             },




         });