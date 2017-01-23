(function ($, window) {
    var tree;

    function createNode(index) {
        var curr = {
            lv: tree[index],
            icons: []
        };
        tree[index] = curr;
        if (curr.lv == 0) { //顶级菜单
            return curr;
        }

        for (var i = 0; i < (curr.lv - 1); i++) {
            curr.icons.push(0);
        }

        if (tree.length == index + 1) { //最后一个菜单
            curr.icons.push(2);
            return curr;
        }

        var next = tree[index + 1];
        var diff = next.lv - curr.lv;

        var copyIcons = function (count) {
            count = Math.min(count, next.icons.length);
            for (var i = 0; i < count; i++) {
                curr.icons[i] = (next.icons[i] == 0) ? 0 : 1;
            }
        };

        switch (diff) {
            case 0:
                copyIcons(curr.lv - 1);
                curr.icons.push(3);
                break;
            case 1:
                copyIcons(curr.lv - 1);
                var icon = next.icons.slice(-2, -1)[0];
                switch (icon) {
                    case 0:
                        curr.icons.push(2);
                        break;
                    case 1:
                        curr.icons.push(3);
                        break;
                    case 2:
                        curr.icons.push(1);
                        break;
                    case 3:
                        curr.icons.push(3);
                        break;
                    default:
                        break;
                }
                break;
            case -1:
                copyIcons(curr.lv - 2);
                if (next.lv > 0) {
                    curr.icons.pop();
                    curr.icons.push(1);
                }
                curr.icons.push(2);
                break;
            default:
                copyIcons(curr.lv - 1);
                curr.icons.push(2);
                break;
        }
        return curr;
    }

    $.fn.extend({
        createTree: function () {
            var table = $(this);
            var tds = table.find("td[level]");
            tree = $.map(tds, function (n) {
                return parseInt($(n).attr("level"));
            });

            for (var i = tree.length - 1; i >= 0; i--) {
                var td = $(tds[i]);
                var node = createNode(i);
                if (node.lv == 0) {
                    continue;
                }
                var txt = td.html();
                td.empty();
                for (var j in node.icons) {
                    switch (node.icons[j]) {
                        case 0:
                            td.append('<div class="line_none fl">');
                            break;
                        case 1:
                            td.append('<div class="line_conn fl">');
                            break;
                        case 2:
                            td.append('<div class="line_bottom fl">');
                            break;
                        case 3:
                            td.append('<div class="line_center fl">');
                            break;
                        default:
                            break;
                    }
                }
                td.find("div:last-child").html(txt);
            }
        }
    });
}(jQuery, this));
