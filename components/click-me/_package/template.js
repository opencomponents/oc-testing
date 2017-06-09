var oc = oc || {};
(oc.components = oc.components || {}), (oc.components[
  '1f33765775759a73224b75af976031d14f50adb6'
] = function(n) {
  var c = [];
  return c.push(
    '<div id="counter">0</div><br/><button class="minus">-</button><button class="plus">+</button><script>window.oc = window.oc || {};\noc.cmd = oc.cmd || [];\n\noc.cmd.push(() => {\n\n  let counter = jQuery(\'#counter\'), c = 0\n\n  const refresh = () => counter.text(c)\n  \n  jQuery(\'.minus\').click(() => {\n    c -= 1\n    refresh()\n  })\n\n  jQuery(\'.plus\').click(() => {\n    c += 1\n    refresh()\n  })\n})</script>'
  ), c.join('');
});
