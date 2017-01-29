function PhotoWidget(el) {
    this._parent.constructor(el);
} TT.extend(PhotoWidget);

PhotoWidget.prototype.getHtml = function () {
    return '<img src="https://pp.vk.me/c837229/v837229370/10bf4/qVhipQLa1EU.jpg">'
};

function ListWidget(el) {
    this._parent.constructor(el);

} TT.extend(ListWidget);

ListWidget.prototype.getHtml = function () {
    return '<ul><li>1 item</li><li>2 item</li></ul>'
};
