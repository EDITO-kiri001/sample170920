(function () {
var tapClass = "";
var hoverClass = "";
var Hover = window.Hover = function (ele) {
return new Hover.fn.init(ele);
};
Hover.fn = {
//Hover Instance
init : function (ele) {
this.prop = ele;
}
, bind : function (_hoverClass, _tapClass) {
hoverClass = _hoverClass;
tapClass = _tapClass;
$(window).bind("touchstart", function(event) {
var target = event.target || window.target;
var bindElement = null;
if (target.tagName == "A" || $(target).hasClass(tapClass)) {
bindElement = $(target);
} else if ($(target).parents("a").length > 0) {
bindElement = $(target).parents("a");
} else if ($(target).parents("." + tapClass).length > 0) {
bindElement = $(target).parents("." + tapClass);
}
if (bindElement != null) {
Hover().touchstartHoverElement(bindElement);
}
});
}
, touchstartHoverElement : function (bindElement) {
bindElement.addClass(hoverClass);
bindElement.unbind("touchmove", Hover().touchmoveHoverElement);
bindElement.bind("touchmove", Hover().touchmoveHoverElement);
bindElement.unbind("touchend", Hover().touchendHoverElement);
bindElement.bind("touchend", Hover().touchendHoverElement);
}
, touchmoveHoverElement : function (event) {
$(this).removeClass(hoverClass);
}
, touchendHoverElement : function (event) {
$(this).removeClass(hoverClass);
}
}
Hover.fn.init.prototype = Hover.fn;
Hover().bind("hover", "tap");
}
)();