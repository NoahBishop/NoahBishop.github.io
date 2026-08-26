;
var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (a) {
  return typeof a
} : function (a) {
  return a && typeof Symbol === 'function' && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a
}

mashiro_global.variables = new function () {
  this.has_bot_ui = false
}()
mashiro_global.ini = new function () {
  this.normalize = function () {
    lazyload()
    social_share()
    mashiro_global.post_list_show_animation.ini()
    copy_code_block()
    if (window.is_app) {
      try {
        setTimeout(function () {
          mashiro_option.app_update(true)
        }, 10000)
      } catch (e) { }
    }
    if ($('div').hasClass('poem-wrap')) {
      get_poem('#poem', '#info')
    }
    $(function () {
      function waveloop1() {
        $('#banner_wave_1').css({
          'left': '-236px'
        }).animate({
          'left': '-1233px'
        }, 25000, 'linear', waveloop1)
      }

      function waveloop2() {
        $('#banner_wave_2').css({
          'left': '0px'
        }).animate({
          'left': '-1009px'
        }, 60000, 'linear', waveloop2)
      }
      if (screen && screen.width > 860) {
        waveloop1()
        waveloop2()
      }
      if (navigator.userAgent.indexOf('AppleWebKit') != -1) {
        $('body').addClass('isWebKit')
      }
      hearthstone_deck_iframe()
    })
  }
  this.pjax = function () {
    pjaxInit()
    social_share()
    mashiro_global.post_list_show_animation.ini()
    copy_code_block()
    if ($('div').hasClass('poem-wrap')) {
      get_poem('#poem', '#info')
    }
    hearthstone_deck_iframe()
  }
}()
mashiro_global.lib = new function () {
  this.removeClass = function (ele, className) {
    var el = document.getElementById(ele)
    if (el.classList) {
      el.classList.remove(className)
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  }
  this.addClass = function (ele, className) {
    var el = document.getElementById(ele)
    if (el.classList) { el.classList.add(className) } else {
      el.className += ' ' + className
    }
  }
  this.hasClass = function (ele, className) {
    var el = document.getElementById(ele)
    if (el.classList) { var e = el.classList.contains(className) } else {
      var e = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
    }
    return e
  }
  this.toggleClass = function (ele, className) {
    var el = document.getElementById(ele)
    if (el.classList) {
      el.classList.toggle(className)
    } else {
      var classes = el.className.split(' ')
      var existingIndex = classes.indexOf(className)
      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1)
      } else { classes.push(className) }
      el.className = classes.join(' ')
    }
  }
  this.saveFile = function (url, file_name) {
    var xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.onload = function () {
      var a = document.createElement('a')
      a.href = window.URL.createObjectURL(xhr.response)
      a.download = file_name
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
    }
    xhr.open('GET', url)
    xhr.send()
  }
}()

function setCookie(name, value, days) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + mashiro_option.cookie_version_control + '=' + (value || '') + expires + '; path=/'
}

function getCookie(name) {
  var nameEQ = name + mashiro_option.cookie_version_control + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function removeCookie(name) {
  document.cookie = name + mashiro_option.cookie_version_control + '=; Max-Age=-99999999;'
}

function jumpTo(url) {
  return mashiro_global.lib.pjax_to_url(url, '#page')
}

function injectStyles(rule) {
  var div = $('<div />', {
    html: '&shy;<style>' + rule + '</style>'
  }).appendTo('body')
}

function imgError(ele, type) {
  switch (type) {
    case 1:
      if (ele.src.includes('https://cn.gravatar.com/avatar')) {
        ele.src = ele.src.replace('https://cn.gravatar.com/avatar/', 'https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/gravatar.jpg')
      } else {
        ele.src = 'https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/default_avatar.jpg'
      }
      break
    case 2:
      ele.src = 'https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/default_gavatar.jpg'
      break
    case 3:

      ele.src = 'https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/image-404.png'
      break
    default:
      ele.src = 'https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/image-404.png'
  }
}
mashiro_global.post_list_show_animation = new function () {
  this.ini = function (ajax) {
    $('article.post-list-thumb').each(function (i) {
      if (ajax) {
        var window_height = $(window).height()
      } else {
        if ($('.headertop').hasClass('headertop-bar')) {
          var window_height = 0
        } else {
          var window_height = $(window).height() - 300
        }
      }
      if (!mashiro_global.landing_at_home) {
        window_height += 300
      }
      var article_height = $('article.post-list-thumb').eq(i).offset().top
      if ($(window).height() + $(window).scrollTop() >= article_height) {
        $('article.post-list-thumb').eq(i).addClass('post-list-show')
      }
      $(window).scroll(function () {
        var scrolltop = $(window).scrollTop()
        if (scrolltop + window_height >= article_height && scrolltop) {
          $('article.post-list-thumb').eq(i).addClass('post-list-show')
        }
      })
    })
  }
}()
mashiro_global.font_control = new function () {
  this.change_font = function () {
    if ($('body').hasClass('serif')) {
      $('body').removeClass('serif')
      $('.control-btn-serif').removeClass('selected')
      $('.control-btn-sans-serif').addClass('selected')
      setCookie('font_family', 'sans-serif', 30)
    } else {
      $('body').addClass('serif')
      $('.control-btn-serif').addClass('selected')
      $('.control-btn-sans-serif').removeClass('selected')
      setCookie('font_family', 'serif', 30)
      if (document.body.clientWidth <= 860) {
        addComment.createButterbar('将从网络加载字体，流量请注意')
      }
    }
  }
  this.ini = function () {
    if (document.body.clientWidth > 860) {
      if (!getCookie('font_family') || getCookie('font_family') == 'serif') { $('body').addClass('serif') }
    }
    if (getCookie('font_family') == 'sans-serif') {
      $('body').removeClass('sans-serif')
      $('.control-btn-serif').removeClass('selected')
      $('.control-btn-sans-serif').addClass('selected')
    }
  }
}()
mashiro_global.font_control.ini()

function code_highlight_style() {
  function gen_top_bar(i) {
    var attributes = {
      'autocomplete': 'off',
      'autocorrect': 'off',
      'autocapitalize': 'off',
      'spellcheck': 'false',
      'contenteditable': 'false',
      'design': 'by hojun'
    }
    var ele_name = $('pre:eq(' + i + ')')[0].children[0].className
    var lang = ele_name.substr(0, ele_name.indexOf(' ')).replace('language-', '')
    if (lang.toLowerCase() == 'hljs') var lang = 'text'
    if (lang.toLowerCase() == 'js') var lang = 'javascript'
    if (lang.toLowerCase() == 'md') var lang = 'markdown'
    if (lang.toLowerCase() == 'py') var lang = 'python'
    $('pre:eq(' + i + ')').addClass('highlight-wrap')
    for (var t in attributes) {
      $('pre:eq(' + i + ')').attr(t, attributes[t])
    }
    $('pre:eq(' + i + ') code').attr('data-rel', lang.toUpperCase())
  }
  $('pre code').each(function (i, block) {
    hljs.highlightBlock(block)
  })
  for (var i = 0; i < $('article pre').length; i++) {
    gen_top_bar(i)
  }
  $('pre').on('click', function (e) {
    if (e.target !== this) return
    $(this).toggleClass('code-block-fullscreen')
    $('html').toggleClass('code-block-fullscreen-html-scroll')
  })
  hljs.initLineNumbersOnLoad()
}
try {
  code_highlight_style()
} catch (e) { }

function copy_code_block() {
  $('pre code').each(function (i, block) {
    $(block).attr({ id: 'hljs-' + i })
    $(this).after('<a class="copy-code" href="javascript:" data-clipboard-target="#hljs-' + i + '" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a>')
  })
  var clipboard = new ClipboardJS('.copy-code')
}

var addComment = {
  clearButterbar: function () {
    if (jQuery('.butterBar').length > 0) {
      jQuery('.butterBar').remove()
    }
  },
  createButterbar: function (message, showtime) {
    var t = this
    t.clearButterbar()
    jQuery('body').append('<div class="butterBar butterBar--center"><p class="butterBar-message">' + message + '</p></div>')
    if (showtime > 0) {
      setTimeout("jQuery('.butterBar').remove()", showtime)
    } else {
      setTimeout("jQuery('.butterBar').remove()", 6000)
    }
  }
}
function headertop_down() {
  var coverOffset = $('#content').offset().top
  $('html,body').animate({
    scrollTop: coverOffset
  }, 600)
}

function scrollBar() {
  if (document.body.clientWidth > 860) {
    $(window).scroll(function () {
      var s = $(window).scrollTop()
      var a = $(document).height()
      var b = $(window).height()
      var result = parseInt(s / (a - b) * 100)
      $('#bar').css('width', result + '%')
      if (false) {
        if (result >= 0 && result <= 19) {
          $('#bar').css('background', '#cccccc')
        }
        if (result >= 20 && result <= 39) { $('#bar').css('background', '#50bcb6') }
        if (result >= 40 && result <= 59) {
          $('#bar').css('background', '#85c440')
        }
        if (result >= 60 && result <= 79) {
          $('#bar').css('background', '#f2b63c')
        }
        if (result >= 80 && result <= 99) { $('#bar').css('background', '#FF0000') }
        if (result == 100) {
          $('#bar').css('background', '#5aaadb')
        }
      } else {
        $('#bar').css('background', 'orange')
      }
      $('.toc-container').css('height', $('.site-content').outerHeight())
    })
  }
}
scrollBar()
'主题切换代码已移除'

function nextBG() {
  bgindex = bgindex + 1
  console.log(bg[Math.abs(bgindex % bg.length)])
  $('.centerbg').css('background-image', 'url("' + bg[Math.abs(bgindex % bg.length)] + '")')
}

function preBG() {
  bgindex = bgindex - 1
  console.log(bg[Math.abs(bgindex % bg.length)])
  $('.centerbg').css('background-image', 'url("' + bg[Math.abs(bgindex % bg.length)] + '")')
}
$(document).ready(function () {
  var bgindex = Math.floor(Math.random() * bg.length)
  $('.centerbg').css('background-image', 'url("' + bg[bgindex] + '")')
  $('#bg-next').click(function () {
    nextBG()
  })
  $('#bg-pre').click(function () {
    preBG()
  })
})
if (document.body.clientWidth <= 860 && !window.is_app) {
  window.onscroll = function () {
    scrollFunction()
  }

  function scrollFunction() {
    const goTopBtn = document.getElementById('moblieGoTop');

    if (!goTopBtn) return;

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      goTopBtn.style.display = 'block';
    } else {
      goTopBtn.style.display = 'none';
    }
  }

  function topFunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}

function reload_show_date_time() {
  BirthDay = new Date('06/02/2017 18:00:00')
  today = new Date()
  timeold = (today.getTime() - BirthDay.getTime())
  sectimeold = timeold / 1000
  secondsold = Math.floor(sectimeold)
  msPerDay = 24 * 60 * 60 * 1000
  e_daysold = timeold / msPerDay
  daysold = Math.floor(e_daysold)
  monitorday.innerHTML = daysold
}

function timeSeriesReload(flag) {
  if (flag == true) {
    $('#archives span.al_mon').click(function () {
      $(this).next().slideToggle(400)
      return false
    })
    lazyload()
  } else {
    (function () {
      $('#al_expand_collapse,#archives span.al_mon').css({
        cursor: 's-resize'
      })
      $('#archives span.al_mon').each(function () {
        var num = $(this).next().children('li').length
        $(this).children('#post-num').text(num)
      })
      var $al_post_list = $('#archives ul.al_post_list'),
        $al_post_list_f = $('#archives ul.al_post_list:first')
      $al_post_list.hide(1, function () {
        $al_post_list_f.show()
      })
      $('#archives span.al_mon').click(function () {
        $(this).next().slideToggle(400)
        return false
      })
      if (document.body.clientWidth > 860) {
        $('#archives li.al_li').mouseover(function () {
          $(this).children('.al_post_list').show(400)
          return false
        })
        if (false) {
          $('#archives li.al_li').mouseout(function () {
            $(this).children('.al_post_list').hide(400)
            return false
          })
        }
      }
      var al_expand_collapse_click = 0
      $('#al_expand_collapse').click(function () {
        if (al_expand_collapse_click == 0) {
          $al_post_list.show()
          al_expand_collapse_click++
        } else if (al_expand_collapse_click == 1) {
          $al_post_list.hide()
          al_expand_collapse_click--
        }
      })
    })()
  }
}
timeSeriesReload()

var pjaxInit = function () {
  mashiro_global.font_control.ini()
  $('p').remove('.head-copyright')
  try {
    code_highlight_style()
  } catch (e) { };
  lazyload()
  try {
    reload_show_date_time()
  } catch (e) { }
  $('.iconflat').css('width', '50px').css('height', '50px')
  $('.openNav').css('height', '50px')
  $('#bg-next').click(function () {
    nextBG()
  })
  $('#bg-pre').click(function () {
    preBG()
  })
  timeSeriesReload()
  add_copyright()
  console.log($('#myscript').text())
}

function show_date_time() {
  BirthDay = new Date('06/02/2017 18:00:00')
  today = new Date()
  timeold = (today.getTime() - BirthDay.getTime())
  sectimeold = timeold / 1000
  secondsold = Math.floor(sectimeold)
  msPerDay = 24 * 60 * 60 * 1000
  e_daysold = timeold / msPerDay
  daysold = Math.floor(e_daysold)
  monitorday.innerHTML = daysold
}
try {
  show_date_time()
} catch (e) { }
POWERMODE.colorful = true
POWERMODE.shake = false
document.body.addEventListener('input', POWERMODE)

function motionSwitch(ele) {
  var motionEles = ['.bili', '.menhera', '.tieba']
  for (var i in motionEles) {
    $(motionEles[i] + '-bar').removeClass('on-hover')
    $(motionEles[i] + '-container').css('display', 'none')
  }
  $(ele + '-bar').addClass('on-hover')
  $(ele + '-container').css('display', 'block')
}

function add_copyright() {
  document.body.addEventListener('copy', function (e) {
    if (!mashiro_global.is_user_logged_in && window.getSelection().toString().length > 1000) {
      setClipboardText(e)
    }
  })

  function setClipboardText(event) {
    event.preventDefault()
    var htmlData = '' + '著作权归作者所有。<br>' + '商业转载请联系作者获得授权，非商业转载请注明出处。<br>' + '作者：' + mashiro_option.author_name + '<br>' + '链接：' + window.location.href + '<br>' + '来源：' + mashiro_option.site_name + '<br><br>' + window.getSelection().toString().replace(/\r\n/g, '<br>')
    var textData = '' + '著作权归作者所有。\n' + '商业转载请联系作者获得授权，非商业转载请注明出处。\n' + '' + mashiro_option.author_name + '\n' + '链接：' + window.location.href + '\n' + '来源：' + mashiro_option.site_name + '\n\n' + window.getSelection().toString().replace(/\r\n/g, '\n')
    if (event.clipboardData) {
      event.clipboardData.setData('text/html', htmlData)
      event.clipboardData.setData('text/plain', textData)
      addComment.createButterbar('复制成功！<br>Copied to clipboard successfully!', 1000)
    } else if (window.clipboardData) {
      return window.clipboardData.setData('text', textData)
    }
  }
}
add_copyright()
function get_poem(poem_ele, info_ele) {
  var poem = document.querySelector(poem_ele)
  var info = document.querySelector(info_ele)
  var xhr = new XMLHttpRequest()
  xhr.open('get', 'https://v2.jinrishici.com/one.json')
  xhr.withCredentials = true
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText)
      poem.innerHTML = data.data.content
      info.innerHTML = '【' + data.data.origin.dynasty + '】' + data.data.origin.author + '《' + data.data.origin.title + '》'
    }
  }
  xhr.send()
}

function hearthstone_deck_iframe() {
  if ($('iframe').hasClass('hearthstone-deck')) {
    $('.hearthstone-deck').each(function () {
      $(this).attr('height', $(this).width() * 5 / 9 + 'px')
    })
    $('.hearthstone-deck-container').each(function () {
      var deck_container_height_fix = $(this).width() * 5 / 9 + 14
      $(this).css('height', deck_container_height_fix + 'px')
    })
  }
}
mashiro_global.ini.normalize()

var home = location.href,
  s = $('#bgvideo')[0],
  Siren = {
    BSZ: function () {
      $.getScript('//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js')
    },
    TOC: function () {
      if ($('.toc').length > 0 && document.body.clientWidth > 1200) {
        if ($(".pattern-center").length > 0) { //有图的情况
          tocbot.init({
            // Where to render the table of contents.
            tocSelector: '.toc', // 放置目录的容器
            // Where to grab the headings to build the table of contents.
            contentSelector: '.entry-content', // 正文内容所在
            // Which headings to grab inside of the contentSelector element.
            scrollSmooth: true,
            headingSelector: 'h1, h2, h3, h4, h5', // 需要索引的标题级别
            headingsOffset: -400,
            scrollSmoothOffset: -85
          });
        } else {
          tocbot.init({
            // Where to render the table of contents.
            tocSelector: '.toc', // 放置目录的容器
            // Where to grab the headings to build the table of contents.
            contentSelector: '.entry-content', // 正文内容所在
            // Which headings to grab inside of the contentSelector element.
            scrollSmooth: true,
            headingSelector: 'h1, h2, h3, h4, h5', // 需要索引的标题级别
            headingsOffset: -85,
            scrollSmoothOffset: -85
          });
        }
        var offsetTop = $('.toc').offset().top - 135
        window.onscroll = function () {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop >= offsetTop) {
            $('.toc').addClass('toc-fixed')
          } else {
            $('.toc').removeClass('toc-fixed')
          }
        }
        $.getScript('//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js');
      }
    },
    AB: function () {
      if (window.location.pathname.indexOf('about') > -1) {
        $.getScript('/js/botui.js', function () {
          if (typeof (botui) == undefined && !botui.message) {
            bot_ui_ini()
          }
        })
      }
    },
    MJ: function () {
      if (mashiro_option.mathjax == '1') {
        $.getScript('//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML', function () {
          MathJax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] } })
          var math = document.getElementsByClassName('entry-content')[0]
          MathJax.Hub.Queue(['Typeset', MathJax.Hub, math])
        })
      }
    },
    MN: function () {
      $('.iconflat').on('click', function () {
        if ($('#main-container').hasClass('open')) {
          $('.iconflat').css('width', '50px').css('height', '50px')
          $('.openNav').css('height', '50px')
        } else {
          $('.iconflat').css('width', '100%').css('height', '100%')
          $('.openNav').css('height', '100%')
        }
        $('body').toggleClass('navOpen')
        $('#main-container,#mo-nav,.openNav').toggleClass('open')
      })
    }, MNH: function () {
      if ($('body').hasClass('navOpen')) {
        $('body').toggleClass('navOpen')
        $('#main-container,#mo-nav,.openNav').toggleClass('open')
      }
    }, splay: function () {
      $('#video-btn').addClass('video-pause').removeClass('video-play').show()
      $('.video-stu').css({
        'bottom': '-100px'
      })
      $('.focusinfo').css({
        'top': '-999px'
      })
      $('#banner_wave_1').addClass('banner_wave_hide')
      $('#banner_wave_2').addClass('banner_wave_hide')
      // for (var i = 0; i < ap.length; i++) {
      //     try {
      //         ap[i].destroy()
      //     } catch (e) {}
      // }
      // try {
      //     hermitInit()
      // } catch (e) {}
      s.play()
    }, spause: function () {
      $('#video-btn').addClass('video-play').removeClass('video-pause')
      $('.focusinfo').css({
        'top': '49.3%'
      })
      $('#banner_wave_1').removeClass('banner_wave_hide')
      $('#banner_wave_2').removeClass('banner_wave_hide')
      s.pause()
    }, liveplay: function () {
      if (s.oncanplay != undefined && $('.haslive').length > 0) {
        if ($('.videolive').length > 0) {
          Siren.splay()
        }
      }
    }, livepause: function () {
      if (s.oncanplay != undefined && $('.haslive').length > 0) {
        Siren.spause()
        $('.video-stu').css({
          'bottom': '0px'
        }).html('已暂停 ...')
      }
    }, addsource: function () {
      $('.video-stu').html('正在载入视频 ...').css({
        'bottom': '0px'
      })
      var t = Poi.movies.name.split(','),
        _t = t[Math.floor(Math.random() * t.length)]
      $('#bgvideo').attr('src', Poi.movies.url + '/' + _t)
      $('#bgvideo').attr('video-name', _t)
    }, LV: function () {
      var _btn = $('#video-btn')
      _btn.on('click', function () {
        if ($(this).hasClass('loadvideo')) {
          $(this).addClass('video-pause').removeClass('loadvideo').hide()
          Siren.addsource()
          s.oncanplay = function () {
            Siren.splay()
            $('#video-add').show()
            _btn.addClass('videolive')
            _btn.addClass('haslive')
          }
        } else {
          if ($(this).hasClass('video-pause')) {
            Siren.spause()
            _btn.removeClass('videolive')
            $('.video-stu').css({
              'bottom': '0px'
            }).html('已暂停 ...')
          } else {
            Siren.splay()
            _btn.addClass('videolive')
          }
        }
        s.onended = function () {
          $('#bgvideo').attr('src', '')
          $('#video-add').hide()
          _btn.addClass('loadvideo').removeClass('video-pause')
          _btn.removeClass('videolive')
          _btn.removeClass('haslive')
          $('.focusinfo').css({
            'top': '49.3%'
          })
        }
      })
      $('#video-add').on('click', function () {
        Siren.addsource()
      })
    }, AH: function () {
      if (Poi.windowheight == 'auto') {
        if ($('h1.main-title').length > 0) {
          var _height = $(window).height()
          $('#centerbg').css({
            'height': _height
          })
          $('#bgvideo').css({
            'min-height': _height
          })
          $(window).resize(function () {
            Siren.AH()
          })
        }
      } else {
        $('.headertop').addClass('headertop-bar')
      }
    }, PE: function () {
      if ($('.headertop').length > 0) {
        if ($('h1.main-title').length > 0) {
          $('.blank').css({
            'padding-top': '0px'
          })
          $('.headertop').css({
            'height': 'auto'
          }).show()
          if (Poi.movies.live == 'open') Siren.liveplay()
          $('.site-header').addClass('is-homepage')
        } else {
          $('.blank').css({
            'padding-top': '75px'
          })
          $('.headertop').css({
            'height': '0px'
          }).hide()
          Siren.livepause()
        }
      }
    }, CE: function () {
      $('.comments-hidden').show()
      $('.comments-main').hide()
      $('.comments-hidden').click(function () {
        $('.comments-main').slideDown(500)
        $('.comments-hidden').hide()
      })
      $('.archives').hide()
      $('.archives:first').show()
      $('#archives-temp h3').click(function () {
        $(this).next().slideToggle('fast')
        return false
      })
      $('.js-toggle-search').on('click', function () {
        $('.js-toggle-search').toggleClass('is-active')
        $('.js-search').toggleClass('is-visible')
      })
      $('.search_close').on('click', function () {
        if ($('.js-search').hasClass('is-visible')) {
          $('.js-toggle-search').toggleClass('is-active')
          $('.js-search').toggleClass('is-visible')
        }
      })
      $('#show-nav').on('click', function () {
        if ($('#show-nav').hasClass('showNav')) {
          $('#show-nav').removeClass('showNav').addClass('hideNav')
          $('.site-top .lower nav').addClass('navbar')
          $('.mobile-fit-control').removeClass('hide')
          if (screen && screen.width <= 1200) {
            $('.site-title').toggle()
          }
        } else {
          $('#show-nav').removeClass('hideNav').addClass('showNav')
          $('.site-top .lower nav').removeClass('navbar')
          $('.mobile-fit-control').addClass('hide')
          if (screen && screen.width <= 1200) {
            $('.site-title').toggle()
          }
        }
      })
      $('#loading').click(function () {
        $('#loading').fadeOut(500)
      })
    }, NH: function () {
      var h1 = 0,
        h2 = 50,
        ss = $(document).scrollTop()
      $(window).scroll(function () {
        var s = $(document).scrollTop()
        if (s == h1) {
          $('.site-header').removeClass('yya')
        }
        if (s > h1) {
          $('.site-header').addClass('yya')
        }
        if (s > h2) {
          $('.site-header').addClass('gizle')
          if (s > ss) {
            $('.site-header').removeClass('sabit')
          } else {
            $('.site-header').addClass('sabit')
          }
          ss = s
        }
      })
    }, XLS: function () {
      $body = (window.opera) ? (document.compatMode == 'CSS1Compat' ? $('html') : $('body')) : $('html,body')
      $('body').on('click', '#pagination a', function () {
        $(this).addClass('loading').text('')
        $.ajax({
          type: 'GET',
          url: $(this).attr('href') + '#main',
          success: function (data) {
            result = $(data).find('#main .post')
            nextHref = $(data).find('#pagination a').attr('href')
            $('#main').append(result.fadeIn(500))
            $('#pagination a').removeClass('loading').text('Previous')
            lazyload()
            mashiro_global.post_list_show_animation.ini(50)
            if (nextHref != undefined) {
              $('#pagination a').attr('href', nextHref)
            } else {
              $('#pagination').html('<span>很高兴你翻到这里，但是真的没有了...</span>')
            }
          }
        })
        return false
      })
    }, IA: function () {
      POWERMODE.colorful = true
      POWERMODE.shake = false
      document.body.addEventListener('input', POWERMODE)
    }, GT: function () {
      var offset = 100,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top')
      $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
          $back_to_top.addClass('cd-is-visible')
          if ($(window).height() > 950) {
            $('.cd-top.cd-is-visible').css('top', '0')
          } else {
            $('.cd-top.cd-is-visible').css('top', ($(window).height() - 950) + 'px')
          }
        } else {
          $('.cd-top.cd-is-visible').css('top', '-900px')
          $back_to_top.removeClass('cd-is-visible cd-fade-out')
        }
        if ($(this).scrollTop() > offset_opacity) {
          $back_to_top.addClass('cd-fade-out')
        }
      })
      $back_to_top.on('click', function (event) {
        event.preventDefault()
        $('body,html').animate({
          scrollTop: 0
        }, scroll_top_duration)
      })
    }
  }
$(function () {
  Siren.AH()
  Siren.PE()
  Siren.NH()
  Siren.GT()
  Siren.XLS()
  Siren.CE()
  Siren.MN()
  Siren.IA()
  Siren.LV()
  if (window.is_app) injectStyles('#nprogress .bar { display: none; }')
  if (Poi.pjax) {
    $(document).pjax('a[target!=_top]', '#page', {
      fragment: '#page',
      timeout: 8000
    }).on('pjax:send', function () {
      $('#bar').css('width', '0%')
      if (mashiro_option.NProgressON) NProgress.start()
      Siren.MNH()
    }).on('pjax:complete', function () {
      Siren.AH()
      Siren.PE()
      Siren.CE()
      Siren.MJ()
      Siren.AB()
      Siren.TOC()
      Siren.BSZ()
      if (mashiro_option.NProgressON) NProgress.done()
      mashiro_global.ini.pjax()
      $('#loading').fadeOut(500)
      if (Poi.codelamp == 'open') {
        self.Prism.highlightAll(event)
      };
    }).on('submit', '.search-form,.s-search', function (event) {
      event.preventDefault()
      $.pjax.submit(event, '#page', {
        fragment: '#page',
        timeout: 8000
      })
      if ($('.js-search.is-visible').length > 0) {
        $('.js-toggle-search').toggleClass('is-active')
        $('.js-search').toggleClass('is-visible')
      }
    })
    mashiro_global.lib.pjax_to_url = function (url, ele) {
      $.pjax({
        url: url,
        container: ele,
        fragment: ele,
        timeout: 8000
      })
    }
    window.addEventListener('popstate', function (e) {
      Siren.AH()
      Siren.PE()
      Siren.CE()
      timeSeriesReload(true)
    }, false)
  }
  console.log('%c Mashiro %c', 'background:#24272A; color:#ffffff', '', 'https://2heng.xin/')
  console.log('%c hojun %c', 'background:#24272A; color:#ffffff', '', 'https://www.hojun.cn/')
  console.log('%c Github %c', 'background:#24272A; color:#ffffff', '', 'https://github.com/honjun/hexo-theme-sakura')
})
var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
  isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
  isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1
if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
  window.addEventListener('hashchange', function () {
    var id = location.hash.substring(1),
      element
    if (!(/^[A-z0-9_-]+$/.test(id))) {
      return
    }
    element = document.getElementById(id)
    if (element) {
      if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
        element.tabIndex = -1
      }
      element.focus()
    }
  }, false)
}

function render(template, context) {
  var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g
  return template.replace(tokenReg, function (word, slash1, token, slash2) {
    if (slash1 || slash2) {
      return word.replace('\\', '')
    }
    var variables = token.replace(/\s/g, '').split('.')
    var currentObject = context
    var i, length, variable
    for (i = 0, length = variables.length; i < length; ++i) {
      variable = variables[i]
      currentObject = currentObject[variable]
      if (currentObject === undefined || currentObject === null) return ''
    }
    return currentObject
  })
}
String.prototype.render = function (context) {
  return render(this, context)
}

$(document).ready(function () {
  setTimeout(function () {
    isFirstLoad = true
    $('p').remove('.head-copyright')
  }, 0)
})
