
var config = {}

$(document).ready(function() {
    var res = getCSV("csv/courses.csv");
    var html = processCSV(res);
    $(".coursescontent").append(html);
    res = getCSV("csv/boxes.csv")
    config = processCSVConfig(res)
});

function getCSV(relativeURL) {
    $.ajax({
        type: "GET",
        url: relativeURL,
        dataType: "text",
    })
    .done(function(result) {
        return result
    });
}


function processCSVConfig(csvContent) {
    lineArray = csvContent.split("\n")
    var config_dict = {};
    for (var i=0, n=lineArray.length; i < n; i++){
        if (lineArray[i] && (lineArray[i].substring(0,2) != "//")) {
            var line = lineArray[i].split(",");
            config_dict[line[0]] = line.slice(1)
        };
    };
    //console.log(config_dict);
    return config_dict
};


function processCSV(csvContent) {
    lineArray = csvContent.split("\n")
    var html = "";
    for (var i=0, n=lineArray.length; i < n; i++){
        if (lineArray[i]) {
            var line = lineArray[i].split(",");
            html += "<a href='#'' rel='nofollow'><img src='graphics/cam.gif' border='0'></a>&nbsp;";
            html += "<a href='http://" + line[1] + "' rel='nofollow' class='bl'>" + line[0] + "</a><br>";
            html += "<div class='divider'></div>";
        };
    };
    return html
};


$(document).ready(function () {
	$('ul.tabs li').click(function() {

        //Get 'data-tab' value of clicked tab
		var tab_id = $(this).attr('data-tab');
		tab_id = window[tab_id];

        //Remove "current" class from all tabs in that box, add it back to just 1
		$('ul.' +tab_id[1]+ ' li').removeClass('current');
		$(this).addClass('current');
		
		if (tab_id[1] == "learn") {
			$('.learntab').removeClass('current');
			$("."+tab_id[0]).addClass('current');
		}
    
        else if (tab_id[1] == "courses") {
            $('.coursestab').removeClass('current');
            $("."+tab_id[0]).addClass('current');
        }

		else if (tab_id[1] == "jobs") {
			//$('.jobtab').removeClass('current');
			//$("."+tab_id[0]).addClass('current');
			myGetIndeed(tab_id);
		}

		else if (tab_id[0] == "nytimes"){
			myGetNYTimes(tab_id);
		}
        
		else {
			myGetJSON(tab_id);
		}
	});
});
	
function myGetJSON(sourceArray) {
    if(sourceArray[0]=='hackernews') {
        var j = 1;
        $.getJSON(
            sourceArray[3] + ".json?", //"limitToFirst=" +sourceArray[2],
            function parseJSON(data) {
                $("." +sourceArray[1]+ "content").empty();
                $.each(data.slice(0, sourceArray[2]), function (i, post) {
                    hackerAppend(sourceArray, post, j);
                    j += 1;
                });
            }
        );
    }
    else {
        $.getJSON(
            sourceArray[3] + ".json?limitToFirst=5", //jsonp=?
            function parseJSON(data) {
                //console.log("getting");
                $("." +sourceArray[1]+ "content").empty();
                $.each(data.data.children.slice(0, sourceArray[2]), function (i, post) {
                    $("." +sourceArray[1]+ "content").append("<a href='http://www.reddit.com" +post.data.permalink+ "' rel='nofollow'><img src='graphics/cam.gif' border='0'></a>&nbsp; <a href='" +post.data.url+ "' rel='nofollow' class='bl'>" +post.data.title+ "</a><br>");
                    $("." +sourceArray[1]+ "content").append("<div class='divider'></div>");
                });
                $("." +sourceArray[1]+ "content").append("<div class='source'>&nbsp;More at&nbsp;<a href='" +sourceArray[3]+ "' rel='nofollow' class='asource'>" +sourceArray[4]+ "</a></div>");
            }
        );
    };
};

function hackerAppend(sourceArray, post, j) {
    $.getJSON(
        sourceArray[4] +post+ ".json?",
        function parseJSON(data) {
            $("." +sourceArray[1]+ "content").append("<a href='https://news.ycombinator.com/item?id=" +data.id+ "' rel='nofollow'><img src='graphics/cam.gif' border='0'></a>&nbsp; <a href='" +data.url+ "' rel='nofollow' class='bl'>" +data.title+ "</a><br>");
            $("." +sourceArray[1]+ "content").append("<div class='divider'></div>");
            if (j == sourceArray[2]) {
                $("." +sourceArray[1]+ "content").append("<div class='source'>&nbsp;More at&nbsp;<a href='" +sourceArray[4]+ "' rel='nofollow' class='asource'>" +sourceArray[5]+ "</a></div>");
            };
        }
    );
};

function myGetNYTimes(sourceArray) {
    var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    url += '?' + $.param({
        'api-key': "3b20fe86a1714372960f3048fe35b399",
        'limitToFirst': 10
    });
    $.ajax({
        url: url,
        method: 'GET',
        //dataType: 'jsonp'
    })
    .done(function(result) {
        $("." +sourceArray[1]+ "content").empty();
        for (var i = 0; i < sourceArray[2]; i++) {
            //console.log(result["results"][i]["title"]);
            $("." +sourceArray[1]+ "content").append("<a href='" +result["results"][i]["url"]+ "' rel='nofollow'><img src='graphics/cam.gif' border='0'></a>&nbsp; <a href='" +result["results"][i]["url"]+ "' rel='nofollow' class='bl'>" +result["results"][i]["title"]+ "</a><br>");
            $("." +sourceArray[1]+ "content").append("<div class='divider'></div>");
        }
        $("." +sourceArray[1]+ "content").append("<div class='source'>&nbsp;More at&nbsp;<a href='" +sourceArray[2]+ "' rel='nofollow' class='asource'>" +sourceArray[3]+ "</a></div>");
    })
    .fail(function(err) {
        throw err;
    });
};

