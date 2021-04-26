const Quill = require("quill")
const Parchment = Quill.import('parchment');
const Inline = Quill.import('blots/inline');
class Track extends Inline {
    static create(value) {
        if (!value) return super.create(false);

        let node = super.create(value);
        console.log(value)
        node.setAttribute('data-name', value.name);
        node.setAttribute('data-uid', value.uid);
        node.setAttribute('data-cid', value.cid);

        if(value.group === 1) {
            node.classList.add('highlight-1');
        }
        else if (value.group === 2) {
            node.classList.add('highlight-2');
        }
        // else if...

        return node;
    }
    // Overriding this method, in this particular case,
    // is what causes the Delta returned as content by 
    // Quill to have the desired information.
    static formats(domNode) {
        if (domNode.getAttribute('data-cid') &&
            domNode.getAttribute('data-uid') &&
            domNode.getAttribute('data-name')) {
            return { 
                'name': domNode.getAttribute('data-name') , 
                'cid': domNode.getAttribute('data-cid') ,
                'uid': domNode.getAttribute('data-uid')
            };
        }
        else {
            return super.formats(domNode);
        }
    }

    formats() {
        // Returns the formats list this class (this format).
        let formats = super.formats();

        // Inline has the domNode reference, which in this 
        // case represents the SPAN, result defined in tagName.
        formats['track'] = Track.formats(this.domNode);

        // In the code above, it is as if we are adding this new format.
        return formats;
    }
}
Track.tagName = 'P';
Track.blotName = 'track';