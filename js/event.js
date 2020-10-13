$('#question').on('click', function () {
    // alert('hi');
    $('.directory .situation').removeClass("active");
    $('.directory .question').addClass("active");
    $('#showposter').show();
});
$('.directory .question').on('click', function () {
    // alert('hi');
    $('.directory .situation').removeClass("active");
    $('.directory .question').addClass("active");
    $('#showposter').show();
    $('input#m-ctrl').prop("checked", false);
});


$('#showposter .close').on('click', function () {
    // alert('hi');
    $('.directory .situation').addClass("active");
    $('.directory .question').removeClass("active");
    $('#showposter').css("display", "none");
});


$('#address').on('click', function () {
    // alert('hi');
    let vale = $('section.Searchbar > .from').attr('class').indexOf("active");
    // console.log(vale)
    if (vale == -1) {
        // alert('hi');
        $('section.Searchbar > .from').addClass("active");
        $('section.Information').hide();
        $('section.SearchResult').hide();
        $('section.itemshow').hide();
        $('footer').hide();
        $('#address').val('');
    } else {
        $('section.Searchbar > .from ul').addClass("trigger");
    }
});


$('a.leftbtn').on('click', function () {
    // alert('hi');
    $('section.Searchbar > .from').removeClass("active");
    $('section.Information').show();
    $('section.SearchResult').show();
    $('section.itemshow').show();
    $('footer').show();
    $('section.Searchbar > .from ul').removeClass("trigger");
});


$('section.Searchbar > .from ul > li > .del').on('click', function () {
    $('section.Searchbar > .from ul').removeClass("trigger");
});