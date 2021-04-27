import {v4 as UUID4} from "uuid"
const Quill = require("quill")
const Parchment = Quill.import('parchment');
const Block = Quill.import('blots/block');
// const Block = Quill.import('blots/inline');
class Track extends Block {
    // constructor(node) {
    //     super(node)
    //     node.setAttribute("id", UUID4())
    // }
    static create(value) {
        let id = value.id
        let element = document.getElementById(value.uid)
        console.log(value)
        console.log(element)
        if (!value) return super.create(false);
        let node = super.create(value);
        if(element != null) {
            node.setAttribute('id', UUID4())
        } else {
            node.setAttribute('id', value.uid)
        }
        
        // else if...

        return node;
    }
    // Overriding this method, in this particular case,
    // is what causes the Delta returned as content by 
    // Quill to have the desired information.
    static formats(domNode) {
        if (domNode.getAttribute('id')) {
            return { 
                'uid': domNode.getAttribute('id')
            };
        }
        else {
            return {
                'uid': UUID4()
            };
        }
    }
}
Block.tagName = 'div'
Track.tagName = 'div';
Track.blotName = 'track';

export default Track;