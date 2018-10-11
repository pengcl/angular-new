/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (!s) {
        return 0
    }
    var length = 1;
    var ns = s[0];
    for (var j = 1; j < s.length; j++) {
        for (var i = 1; i < s.length; i++) {
            if (ns.indexOf(s[i]) === -1) {
                ns = ns + s[i];
                console.log(ns);
                if (ns.length > length) {
                    length = ns.length;
                }
            } else {
                ns = s[i];
                return
            }
        }
    }
    console.log(length);
    return length;
};

var l = lengthOfLongestSubstring("dvdf");