window.addEventListener("DOMContentLoaded", function () {
    lazyLoad();
    // slider_js();
    //slider_menu_js();
    // tooltipHover();
    // load_wishlist_cookies();
    $('input#input-search__mb').on('keyup', function () {
        let empty = false;
        $('input#input-search__mb').each(function () {
            empty = $(this).val().length == 0;
        });

        if (empty) {
            $('#btn_search__mb').attr('disabled', 'disabled');
        } else {
            $('#btn_search__mb').attr('disabled', false);
            $("#input-search__mb").on('keyup', function (e) {
                if (e.keyCode === 13) {
                    window.location.replace("/search?q=" + $("#input-search__mb").val());
                }
                $("#btn_search__mb").on('click', function () {
                    window.location.replace("/search?q=" + $("#input-search__mb").val());
                });
            });
        }

    });
    var btn = $('#back-to-top');
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });
    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '300');
    });

    $(".scrollTo").on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-target');// Lay gia tri attribute id
        let id_target = $('#' + target); // ghep thanh #id_target
        $('html, body').animate({
            scrollTop: (id_target.offset().top)
        }, 500, 'swing');
    });
    $('.fullsceen_big').click(function () {
        open_fullscreen()
    })
    $('#btn_arrow__mb').click(function () {
        if ($('.menu_child_list').hasClass('open')) {
            $('.menu_child_list').hide().removeClass('open')
        } else {
            $('.menu_child_list').show().addClass('open')
        }
    })


    menu_header();
    hide_show_content();
    // add_iframe();
    // change_theme();
    // show_content();
    search();
    nav_menu_mb();
	  game_share();
    add_module()
    delete_menu_mb();
});

var gameShare = document.querySelectorAll('._game-share');
gameShare.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        if (navigator.share) {
            navigator.share({
                title: document.title, url: location.href
            }).then(function () {
            })['catch'](console.error);
        } else {
        }
    });
});

function add_module() {
    if (!id_game && !url_game) {
        return
    }
    let url = "/add-module.ajax";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            id_game: id_game,
            url_game: url_game
        },
        success: function (response) {
            if (response) {
                let data = JSON.parse(response);

                $("#rate-area").html(data.rate);
                $("#comment-area").html(data.comment);
            }
        }
    })
}

function game_share() {
    close_popup();
    $("._share_btn").click(function () {
        open_popup();
    })
    $(".popup-close").click(function () {
        close_popup();
    })
    $(".popup-bg").click(function () {
        close_popup();
    })
}

function open_popup() {
    $(".popup-bg").show();
    $(".popup-share").show();
    $('.share_social_list').find('.st-btn').addBack().show();
    $("html").css("overflow", "hidden")
}

function close_popup() {
    $(".popup-bg").hide();
    $(".popup-share").hide();
    $("html").css("overflow", "");
}

function nav_menu_mb() {
    $('.navbar_mb').click(function () {
        $(".Menu").css('display', 'flex');
    })
}

function delete_menu_mb() {
    $('.menu_mb_delete').click(function () {
        $('.menu_mb').hide();
        resize_window_mb()
    })
}

function resize_window_mb() {
    $(window).on("resize", function (event) {
        var width = $(document).width();
        if (width > 1050) {
            $('.menu_mb').attr("style", "display: flex !important");
        } else {
            $('.menu_mb').attr("style", "display: none !important");
        }
    })
}


function search() {
    let search__input = $('#search_info')
    let search__button = $('.btn_search')
    let keywords = ''

    search__input.on('keyup', function () {
        let search_text = $(this).val()
        $('.pss-results__searchbar__input').val(search_text)
        empty = false;
        if (search__input.val().trim().length < 3) {
            search__button.attr('disabled', 'disabled')
        } else {
            search__button.attr('disabled', false)
        }

        if (empty) {
            search__button.attr('disabled', 'disabled')
        } else {
            keywords = $(this).val()
            search__button.click(function () {
                window.location.replace('/search?q=' + keywords)
            })
            if (search__input.val().trim().length > 0) {
                search__input.keypress(function (e) {
                    if (e.which == 13) {
                        window.location.replace('/search?q=' + keywords)
                    }
                })
            }

        }
    });
}

function show_content() {
    let height_content = $('.content_height').height();
    if ($('.details-describe').height() < 300) {
        $('.show_more').hide();
        $('.detailDescription').css({'height': 'auto', 'overflow': 'unset'})
    } else {
        $('.show_more').show().addClass('open')
        $('.show_more').click(function () {
            if ($('.show_more').hasClass('open')) {
                $('.show_more').removeClass('open')
                $('.detailDescription').animate({
                    height: height_content + 48 + "px"
                }, {
                    duration: 500, complete: function () {
                        $(this).css({'height': height_content + 48 + 'px', 'overflow': 'unset'})
                        $(this).find(".show_btn").text('Show less')
                    }
                });

            } else {
                $('.detailDescription').animate({
                    height: "550"
                }, {
                    duration: 500, complete: function () {
                        $(this).css({'height': '550px', 'overflow': 'hidden'})
                        $(this).find(".show_btn").text('Show more')
                        $('.show_more').addClass('open')
                    }
                });
            }
        })
    }
}


 

function tooltipHover() {
    $(".describe").hover(function (event) {
        let height_tooltip;
        var titleText = $(this).attr("title");
        $(this).data("tipText", titleText).removeAttr("title");

        $('<div id="tooltip" class="tooltips"></div>').text(titleText)
            .appendTo(this)
        //.fadeIn("slow");
    }, function () {
        $(this).attr("title", $(this).data("tipText"));
        $(".tooltips").remove();
    })
        .mousemove(function (event) {
            $(".tooltips")
                .css("top", "-45px")
                .css("left", "50%");
        });
}


function hide_show_content() {
    let height_content = $('.content-inner .game-description').outerHeight();

    if (height_content <= 497) {
        $('.show_content').css({'display': 'none'})
        // $('.content-inner').css({'padding-bottom': '20px'})
        $('.content-inner').attr('style', 'height:' + height_content + 'px');
    } else {
        $('.content-inner').attr('style', 'height:500px;overflow:hidden');
        $('.show_content').css({'display': 'flex'});
        // $('.game-content-page').css({'padding-bottom': '28px'})
        // $('.game-description').css({'padding-bottom': '20px'})
    }

    $('.ShowMore_button').click(function () {
        if ($('.ShowMore_button').hasClass('more')) {
            $('.ShowMore_button').removeClass('more')
            $('.content-inner').animate({
                'height': height_content + 'px', 'overflow': 'hidden', 'animation': 'height 1000ms ease 0ms'
            }, {
                easing: 'swing', complete: function () {
                    $('.content-inner').attr('style', 'height:auto');
                    $('.ShowMore_button').html('<span>Show less</span> <span class="svg-icon svg-icon--share btn__icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-keyboard_arrow_up"></use> </svg> </span>');
                    $('.ShowMore_button').addClass('less')

                }
            })
        } else {
            $('.ShowMore_button').removeClass('less')
            $('.content-inner').animate({
                'height': '500px', 'overflow': 'hidden', 'animation': 'height 1000ms ease 0ms'
            }, {
                easing: 'swing', complete: function () {
                    $('.content-inner').attr('style', 'height:550px;overflow:hidden');
                    $('.ShowMore_button').html('<span>Show more</span> <span class="svg-icon svg-icon--share btn__icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-keyboard_arrow_down"></use> </svg> </span>');
                    $('.ShowMore_button').addClass('more')
                }
            })

        }

    })

}

function menu_header() {
    $('.js-navbar-toggle').click(function () {
        $(this).toggleClass('active')
        if ($('.js-navbar-toggle').hasClass('active')) {
            $('.js-navbar').addClass('active');
            $('bodd').addClass('menu-opened');
        } else {
            $('.js-navbar').removeClass('active');
            $('bodd').removeClass('menu-opened');

        }
    })

}

function lazyLoad() {
    $('.lazy').Lazy({
        effect: "fadeIn", effectTime: 300,
    });
}

function expandScreen() {
    $('#game-area').addClass('iframe-full');
    $('html').css('overflow', 'hidden');
    $('#close_fullscreen').show();
}

function closeFullScreen(e) {
    $('#game-area').removeClass('iframe-full');
    $('html').css('overflow', '');
    $(e).hide();
}

var gameShare = document.querySelectorAll('._game-share');
gameShare.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        if (navigator.share) {
            navigator.share({
                title: document.title, url: location.href
            }).then(function () {
            })['catch'](console.error);
        } else {
        }
    });
});

function open_fullscreen() {
    var parent = document.querySelector('.iframe-container');

    let game = parent.querySelector('iframe') || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {

        if (game.requestFullscreen) {
            game.requestFullscreen();
        } else if (game.msRequestFullscreen) {
            game.msRequestFullscreen();
        } else if (game.mozRequestFullScreen) {
            game.mozRequestFullScreen();
        } else if (game.webkitRequestFullscreen) {
            game.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}


function slider_js() {
    var owl = $('.top__items.owl-carousel').owlCarousel({
        loop: true,
        center: false,
        dots: false,
        stagePadding: 50,
        margin: 10,
        nav: false,

        autoplay: false,
        autoplayTimeout: 3000,
        onDrag: onDragGame,
        onDragged: onDraggedGame,
        onTranslate: callback,
        responsive: {
            0: {
                items: 1
            }, 600: {
                items: 3
            }, 1000: {
                items: 7
            }
        }
    });
    $('.js-top-next').click(() => owl.trigger('next.owl.carousel'));
    $('.js-top-prev').click(() => owl.trigger('prev.owl.carousel'));


}

function onDragGame(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'none');
}

function onDraggedGame(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'auto');
}

function slider_menu_js() {
    let lenght_item = $('.navbar__items').children().length;
    var $window = $(window);
    var windowsize = $window.width();
    if (lenght_item > 10 && windowsize > 1024) {
        var owl = $('.navbar__items.owl-carousel').owlCarousel({
            loop: false,
            center: false,
            dots: false,
            margin: 0,
            nav: false,
            autoWidth: true,
            autoplay: false,
            autoplayTimeout: 3000,
            onDrag: onDragSlide,
            onDragged: onDraggedSlide,
            onTranslate: callback,
            responsive: {
                0: {
                    items: 1
                }, 600: {
                    items: 3
                }, 1000: {
                    items: 7
                }
            }
        });
    }

}

function onDragSlide(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'none');
}

function onDraggedSlide(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'auto');
}

function callback(event) {
    lazyLoad();
}

function copyToClipboard(element, e) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $(e).html('COPIED!!');
    setTimeout(function () {
        $(e).html('Copy');
    }, 3000);
    $temp.remove();
}


function favorite(e) {
    var image = $(e).data('image');
    var id = $(e).data('id');
    var slug = $(e).data("slug");
    var name = $(e).data("name");
    var state = $(e).data("state");
    var ratescore = $(e).data("ratescore");
    var favorited;
    if ($(e).hasClass('favorited')) {
        remove_wishlist_cookies(id);
        favorited = true;
        $(e).removeClass('favorited');
    } else {
        save_wishlish_cookies(id, slug, image, name, state, ratescore);
        $(e).addClass('favorited');
        favorited = false;
    }
    notifical_show(id, name, image, slug, favorited, e);
}

function notifical_show(id, name, image, slug, favorited, e) {
    let str = '';
    str += '<span class="svg-icon svg-icon--heart btn__icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-heart"></use> </svg> </span><span class="btn__text add-favorites-label">' + (favorited == true ? "Add" : "Remove") + ' to Favorites</span>';
    $(e).html(str);
    let html = '';
    html += '<div class="wrapper notification-success"> <div class="toastt"> <div class="content"> <div class="icon"><img width="50" height="50" src="' + image + '" class="img-fluid" /></div> <div class="details"> <span>' + (favorited == true ? "Remove" : "Add") + ' Success</span> <p>' + name + '</p> </div> </div> </div> </div>'
    $('body').one("click", e, function () {
        notification(html, 1000)
    })
}

function notification(s, time) {
    $(s).appendTo('body').fadeTo(time, 1, function () {
        $(this).fadeTo(1000, 0, function () {
            $(this).addClass('hide');
            $(this).remove();
        });
    });
}

function remove_wishlist_cookies(_id) {
    if (!!jQuery.cookie('favorite_game') && _id !== '') {
        var favorite_array = JSON.parse(jQuery.cookie("favorite_game"));
        jQuery.each(favorite_array, function (key, value) {
            favorite_array = favorite_array.filter(function (element) {
                return element !== undefined;
            });
            if (value.id === _id && key > -1) {

                favorite_array.splice(key, 1);
            }
        });
        jQuery.cookie('favorite_game', JSON.stringify(favorite_array), {expires: 30, path: '/'});
        $(".favorites-add-" + _id).removeClass('favorited');
        $(".favorites-add-" + _id).html('<span class="svg-icon svg-icon--heart btn__icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-heart"></use> </svg> </span> <span class="btn__text add-favorites-label">Add to Favorites</span>')
        load_wishlist_cookies();
    }
}

function save_wishlish_cookies(_id, _slug, _image, _name, _state, _ratescore) {
    var favorites_count = 9;
    if (!!jQuery.cookie('favorite_game') && _slug !== '' && _image !== '' && _id !== '' && _name != '' && _ratescore != '' && _state != '') {
        var favorite_array = JSON.parse(jQuery.cookie("favorite_game"));
        let circle_html = '';
        jQuery.each(favorite_array, function (key, value) {
            if (value !== undefined && value.slug === _slug && key > -1) {
                favorite_array.splice(key, 1);
            }
        });
        favorite_array.push({
            "id": _id, "slug": _slug, "image": _image, "ratescore": _ratescore, "state": _state, "name": _name
        });
        if (favorite_array.length > favorites_count) {
            favorite_array.shift();
        }
        jQuery.cookie('favorite_game', JSON.stringify(favorite_array), {expires: 30, path: '/'});
    } else {
        var data = [];
        data.push({
            "id": _id, "slug": _slug, "image": _image, "ratescore": _ratescore, "state": _state, "name": _name
        });
        jQuery.cookie('favorite_game', JSON.stringify(data), {expires: 30, path: '/'});
    }
    load_wishlist_cookies();
}

function load_wishlist_cookies() {
    if (!!jQuery.cookie('favorite_game')) {
        var favorites = JSON.parse(jQuery.cookie("favorite_game"));
        let circle_html = '';
        if (favorites.length > 0) {
//Load checked compare
            var str_wishlist = '';
            let str = '';
            var $leng = favorites.length;

            var slug_array = [];
            let label_game = '';
            for (var i = $leng - 1; i >= 0; i--) {
                var value = favorites[i];
                slug_array.push(value.slug + "_" + value.kind);
                if (value.state == 'hot') {
                    label_game = 'GameLabel_hot__cd7o3';
                } else if (value.state == 'new') {
                    label_game = 'GameLabel_new__ZOGIJ';
                } else if (value.state == 'trending') {
                    label_game = 'GameLabel_top-rated__etkoJ';
                }
                //str_wishlist += '<a href="/' + value.slug + '" class="card"> <picture> <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="' + value.image + '" alt="' + value.name + '" class="lazy img-fluid"> </picture> <div class="card-body"> <h3>' + value.name + '</h3> </div> </a>'

                if (value.state) {
                    str_wishlist += '<li class="games__item"><div class="snippet"><a href="/' + value.slug + '" title="' + value.name + '" class="snippet__url"><span class="badge badge--' + value.state + '">' + value.state + '</span><span class="snippet__img-wrap" data-index="' + value.id + '"><img class="snippet__img" src="' + value.image + '" width="170" height="134" alt="' + value.slug + '" style=""></span><span class="snippet__name">' + value.name + '</span><span class="snippet-tag--rating info-rate"><span class="svg-icon svg-icon--info-rating snippet-tag__icon" aria-hidden="true"><svg class="svg-icon__link"><use xlink:href="#icon-star-full"></use></svg></span>' + value.ratescore + '</span></a></div></li>';
                } else {
                    str_wishlist += '<li class="games__item"><div class="snippet"><a href="/' + value.slug + '" title="' + value.name + '" class="snippet__url"><span class="snippet__img-wrap" data-index="' + value.id + '"><img class="snippet__img" src="' + value.image + '" width="170" height="134" alt="' + value.slug + '" style=""></span><span class="snippet__name">' + value.name + '</span><span class="snippet-tag--rating info-rate"><span class="svg-icon svg-icon--info-rating snippet-tag__icon" aria-hidden="true"><svg class="svg-icon__link"><use xlink:href="#icon-star-full"></use></svg></span>' + value.ratescore + '</span></a></div></li>';
                }
                if (value.slug === current_slug && !$(".favorites-add-" + value.id).hasClass('favorited')) {
                    $(".favorites-add-" + value.id).addClass("favorited");
                }

            }
            if ($(".favorites_btn").hasClass('favorited')) {
                str = '<span class="svg-icon svg-icon--heart btn__icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-heart"></use> </svg> </span></i> <span class="btn__text add-favorites-label">Remove to Favorites</span>';
            } else {
                str = '<span class="svg-icon svg-icon--heart btn__icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-heart"></use> </svg> </span> <span class="btn__text add-favorites-label">Add to Favorites</span>';
            }
            $(".favorites_btn").html(str);
            if ($leng > 0) {
                circle_html += '<span class="nav-badge favourites_qty">+' + $leng + '</span>';
            }
            if ($('.favorite_link').find('.favourites_qty').length > 0) {
                $('.favorite_link').find('.favourites_qty').remove();
                $('.favorite_link').append(circle_html);
            }
            let html = '';
            if (str_wishlist != "") {
                jQuery("#favoriteGames").html(str_wishlist);

            }
            $(".empty_favorite").hide();
        } else {
            circle_html += '';
            $(".empty_favorite").show();
            $(".empty_favorite").html('<center>No favorite game</center>')
            jQuery("#favoriteGames").html('');
        }

        /*var $listItems = $('#number-favorite > div');

        $listItems.each(function (id) {
            $listItems.eq(id).remove();

        });
        $('#number-favorite').append(circle_html);*/
        jQuery(".favorite-link .count_num").html(circle_html);

    } else {
        $(".empty_favorite").show();
        $(".empty_favorite").html('<center>No favorite game</center>')
        jQuery("#favoriteGames").html('');
    }

}

function change_theme() {
    var dark_theme_css = document.getElementById('dark_theme_css');
    var theme_css_ctrls = document.querySelectorAll('[name="fgbtheme"]');

    function cssThemeSwitcher() {
        var theme = 'light';
        theme_css_ctrls.forEach(function (ctrl) {
            if (ctrl.checked) {
                theme = ctrl.value;
            }
        });
        if ('dark' === theme) {
            dark_theme_css.setAttribute('media', 'all');
        } else {
            dark_theme_css.setAttribute('media', 'none');
        }
    }

    if (dark_theme_css && theme_css_ctrls) {
        theme_css_ctrls.forEach(function (ctrl) {
            ctrl.addEventListener('change', cssThemeSwitcher);
        });
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme_css_ctrls.forEach(function (ctrl) {
                if ('dark' === ctrl.value) {
                    ctrl.checked = true;
                } else {
                    ctrl.checked = false;
                }
            });
        }
    }
}

function toggleAside() {
    document.body.classList.toggle('aside-opened');
}

var asideTriggers = document.querySelectorAll('._aside_trigger');
if (asideTriggers) {
    asideTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', toggleAside);
    });
}

var modals = document.querySelectorAll('.modal-overlay');
var openModals = document.querySelectorAll('._open_modal');
var closeModals = document.querySelectorAll('._close_modal');

function openModalsFn(id) {
    var modal = document.getElementById('modal_' + id);
    if (modal) {
        modal.classList.add('is-opened');
        modal.addEventListener('click', closeModalOverlay);
    }
}

function closeModalOverlay(event) {
    if (event.target.closest('.modal')) {
        return;
    }
    closeModalsFn();
}

function closeModalsFn() {
    modals.forEach(function (modal) {
        modal.classList.remove('is-opened');
        modal.removeEventListener('click', closeModalOverlay);
    });
}

if (openModals) {
    openModals.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            openModalsFn(this.getAttribute('data-modal'));
        });
    });
    closeModals.forEach(function (btn) {
        btn.addEventListener('click', closeModalsFn);
    });
}
