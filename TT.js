/**
 * Created by atimin on 03.01.17.
 */
var TT = {
    Element: function (el) {
        this.el = el;
        // this.events= {
        //     'click': this.event_handler
        // };
        this.children = {
            'my-photo': PhotoWidget,
            'my-list': ListWidget
        };
    },
    extend: function (ChildClass) {
        ChildClass.prototype = Object.create(this.Element.prototype);
        ChildClass.prototype._parent = this.Element.prototype;
        ChildClass.prototype.constructor = ChildClass;
    }
};

TT.Element.prototype.render = function () {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = this.getHtml();
    this.bindEvents(wrapper);

    if (this.children) {
        var child_replaces = [];
        for (var selector in this.children) {
            var elements = wrapper.querySelectorAll(selector);
            for (var elem_idx = 0; elem_idx < elements.length; elem_idx++) {
                var RenderedNode = elements[elem_idx].cloneNode(false);
                var El = new this.children[selector](RenderedNode);
                if (El.children == undefined) {
                    alert('children property should be defined!');
                }
                this.children[selector] = El;
                El.render();
                child_replaces.push({oldNode: elements[elem_idx], newNode: RenderedNode});
            }
        }

        for (var child_idx = 0; child_idx < child_replaces.length; child_idx++) {
            child_replaces[child_idx].oldNode.parentNode.replaceChild(
                child_replaces[child_idx].newNode,
                child_replaces[child_idx].oldNode
            );
        }
    }

    var Node = document.createDocumentFragment();

    while (wrapper.childNodes.length > 0) Node.appendChild(wrapper.childNodes[0]);
    while (this.el.firstChild) this.el.removeChild(this.el.firstChild);

    this.el.appendChild(Node);
};

TT.Element.prototype.getHtml = function () {
    return '<my-list></my-list><my-photo></my-photo><button class="click-alert">Click and see alert()</button>';
};

TT.Element.prototype.bindEvents = function (Node) {
    $(Node).find('.click-alert').click(function () {
        alert('click-alert');
    });
};
