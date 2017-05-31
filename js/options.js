$(function(){
    function releativeForm(type) {
        switch (type) {
            case 'url':
                $("#image_url_form").show();
                $("#keyword_form").hide();
                break;
            case 'keyword':
                $("#image_url_form").hide();
                $("#keyword_form").show();
                break;
            case 'default':
            default:
                $("#image_url_form").hide();
                $("#keyword_form").hide();
                break;
        }
    }

    $("#save").click(function () {
        localStorage["type"]      = $("#type").val();
        localStorage["image_url"] = $("#image_url").val();
        localStorage["keyword"]   = $("#keyword").val();
        localStorage["bg_type"]   = $("#bg_type").val();
    });

    $("#type").change(function (e) {
        releativeForm($(this).val());
        $("#image_url").val('');
        $("#keyword").val('');
    });

    var type = '';
    if (localStorage["type"]) {
        type = localStorage["type"];
        $("#type").val(localStorage["type"]);
    }
    releativeForm(type);

    if (localStorage["image_url"]) {
        $("#image_url").val(localStorage["image_url"]);
    }
    if (localStorage["keyword"]) {
        $("#keyword").val(localStorage["keyword"]);
    }
    if (localStorage["bg_type"]) {
        $("#bg_type").val(localStorage["bg_type"]);
    }
});
