var makeDate = function() {
    var d = new Date();
    var formattedDate = "";
    
    formattedDate += (d.getMonth() + 1) + "_";   // Why does this have paranthesis but other 2 do not?
    formattedDate += d.getDate() + "_";
    formattedDate += d.getFullYear();

    return formattedDate;
};

module.exports = makeDate;