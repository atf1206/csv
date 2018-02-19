
// Gets latest courses & makes HTML links
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "csv/courses.csv",
        dataType: "text",
    })
    .done(function(result) {
        processCSV(result.split("\n"));
    });
});

function processCSV(lineArray) {
    var html = "";
    for (var i=0, n=lineArray.length; i < n; i++){
        if (lineArray[i]) {
            var line = lineArray[i].split(",");
            html += "<a href='#'' rel='nofollow'><img src='graphics/cam.gif' border='0'></a>&nbsp;";
            html += "<a href='http://" + line[1] + "' rel='nofollow' class='bl'>" + line[0] + "</a><br>";
            html += "<div class='divider'></div>";
        };
    };
    //console.log(lineArray);
    $(".coursescontent").append(html);
};

// Box 0 - courses from csv
var Courses     = ['coursescontent',  'courses', '', '' ];
var Coursera    = ['courseracontent', 'courses', '', '' ];
var unknown     = ['unknown',         'courses', '', '' ];

// Box 1-1 - news
var nytimes     = ['nytimes',     'news', 10, 'http://www.nytimes.com',               'NYTimes.com'            ];
var reddit      = ['reddit',      'news', 10, 'https://www.reddit.com/',              'Reddit.com'             ];
var reddittop   = ['reddittop',   'news', 8,  'https://www.reddit.com/top',           'Reddit.com/r/top'       ];
var redditworld = ['redditworld', 'news', 8,  'https://www.reddit.com/r/worldnews/',  'Reddit.com/r/worldnews' ];
var reddittech  = ['reddittech',  'news', 8,  'https://www.reddit.com/r/technology/', 'Reddit.com/r/tech'      ];
// Box 1-2 - code
var redditprog   = ['redditprogramming', 'code', 10, 'https://www.reddit.com/r/programming/', 'Reddit.com/r/programming' ];
var redditwebdev = ['redditwebdev',      'code', 10, 'https://www.reddit.com/r/developer/',   'Reddit.com/r/developer'   ];
var hackernews   = ['hackernews',        'code', 10, 'https://hacker-news.firebaseio.com/v0/topstories', 'https://hacker-news.firebaseio.com/v0/item/', 'http://news.ycombinator.com/', 'Hacker News'];
var redditcoding = ['redditcoding',      'code', 10, 'https://www.reddit.com/r/coding/',      'Reddit.com/r/coding'      ];
// Box 1-3 - science
var redditscience = ['redditscience', 'science', 6, 'https://www.reddit.com/r/science/',   'Reddit.com/r/science'];
var newscientist  = ['newscientist',  'science', 6, 'https://www.reddit.com/r/developer/', 'NewScientist.com'];

// 2-1
var learncode = new Array('learncode', 'learn', '', '');
var learncodegames = new Array('learncodegames', 'learn', '', '');
var learndatascience = new Array('learndatascience', 'learn', '', '');
var learnlanguages = new Array('learnlanguages', 'learn', '', '');
var learnjobs = new Array('learnjobs', 'learn', '', '');
// 2-2
var indeed1 = new Array('indeed1', 'jobs', 'results1', '');
var indeed2 = new Array('indeed2', 'jobs', 'results2', '');
// 2-3
var redditpics = new Array('redditpics', 'entertain', 12, 'https://www.reddit.com/r/pics/', 'Reddit.com/r/pics');
var reddittil = new Array('reddittil', 'entertain', 8, 'https://www.reddit.com/r/todayilearned/', 'Reddit.com/r/todayilearned');
var redditask = new Array('redditask', 'entertain', 10, 'https://www.reddit.com/r/askreddit/', 'Reddit.com/r/askreddit');
var redditvideos = new Array('redditvideos', 'entertain', 10, 'https://www.reddit.com/r/videos/', 'Reddit.com/r/videos');
// 2-4
//var intp = new Array('intp', 'mbti', 10, 'http://www.reddit.com/r/intp/');
//var entp = new Array('entp', 'mbti', 10, 'http://www.reddit.com/r/entp/');
//

$(document).ready(function () {
	$('ul.tabs li').click(function() {

        //Get 'data-tab' value of clicked tab
		var tab_id = $(this).attr('data-tab');
		tab_id = window[tab_id];

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

