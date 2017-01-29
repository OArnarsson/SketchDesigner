let newspace = {
    "canvases": [
        {
            "drawings": [
                {
                    "gui": {
                        "strokeStyle": "#000000",
                        "lineCap": "round",
                        "lineJoin": "round",
                        "lineWidth": 5,
                        "tool": "pen",
                        "opacity": 100,
                        "hasFill": false,
                        "hasBorder": true,
                        "fillStyle": "#FFFFFF",
                        "textprops": {
                            "fontSize": 30,
                            "allFonts": [
                                "Arial",
                                "Arial Black",
                                "Comic Sans MS",
                                "Impact",
                                "Lucida Sans Unicode",
                                "Tahoma",
                                "Titillium Web",
                                "Trebuchet MS",
                                "Verdana"
                            ],
                            "font": "Titillium Web",
                            "italic": false,
                            "bold": false
                        }
                    },
                    "currPos": {
                        "startX": 0,
                        "endX": 0,
                        "posX": [

                        ],
                        "startY": 0,
                        "endY": 0,
                        "posY": [

                        ],
                        "width": 0,
                        "height": 0
                    }
                }
            ],
            "className": "mobile",
            "height": 441.6,
            "width": 248.4
        }
    ],
    "title": "Untitled",
    "dateModified": '',
    "dateCreated": ''
};

let longDate = () => {
    let d = new Date();
    var datestring = ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + ":" + ("0" + d.getMilliseconds()).slice(-3);
    return datestring;
}

let shortDate = (req) => {
    let d = new Date();
    timeStamp = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    timeString = timeStamp + ' - ' + req.method + ' request - URL: "' + req.originalUrl + '"'
    return timeString;
}

module.exports = {newspace, longDate, shortDate};