//counts the number of substrings in a string
export function substrCount(str, substr) {
    let count = 0;
    let index = 0;
    while (str.includes(substr, index)) {
        count += 1;
        index = str.indexOf(substr, index) + substr.length + 1;
    }
    return count;
}

//counts the number of a char in a string
export function charCount(str, char) {
    let count = 0;
    for (c of str) {
        if (c == char) count += 1;
    }
    return count;
}