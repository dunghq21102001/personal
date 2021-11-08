const taskbar = document.querySelector.bind(document)('.fixed-scroll')
const taskbarBtns = document.querySelectorAll.bind(document)('.rainbow.rainbow-4')
const mainContents = document.querySelectorAll.bind(document)('.main-content')
const mainContentActive = document.querySelector.bind(document)('.main-content.main-content-displayBlock')
const topTopBtn = $('#button-to-top')

// scroll taskbar
if (document.documentElement.clientWidth >= 1024) {
    window.onscroll = () => {
        if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
            taskbar.style.position = "fixed"
            taskbar.style.top = 0
            taskbar.style.width = "163.32px"
            taskbar.style.marginTop = "30px"
            taskbar.style.transition = "all 0.2s linear"
        } else {
            taskbar.style.position = "static"
            taskbar.style.marginTop = 0
            taskbar.style.transition = "all 0.2s linear"
        }
    }

}
console.log(document.documentElement.clientWidth)

// onclick taskbar btn
taskbarBtns.forEach((taskbarBtn, index) => {
    const mainContent = mainContents[index]
    taskbarBtn.onclick = function () {
        document.querySelector('.rainbow.rainbow-4.fixed-active').classList.remove('fixed-active')
        document.querySelector('.main-content.main-content-displayBlock').classList.remove('main-content-displayBlock')
        this.classList.add('fixed-active')
        mainContent.classList.add('main-content-displayBlock')
    }
})



// skills bar
;
(function ($) {
    "use strict"
    var $bars = $(".bar"),
        methods = {
            init: function () {
                // Bind events
                methods.bindEvents()
            },
            bindEvents: function () {
                // Loop through each of the bars...
                $bars.each(function () {
                    var $bar = $(this),
                        $pct = $bar.find(".pct"),
                        data = $bar.data("bar")
                    setTimeout(function () {
                        $bar
                            .css("background-color", data.color)
                            .animate({
                                "width": $pct.html()
                            }, data.speed || 3000, function () {
                                $pct.css({
                                    "color": data.color,
                                    "opacity": 1
                                })
                            })
                    }, data.delay || 0)
                })
            }
        }
    // Initialize on page load
    methods.init()
})(jQuery)


// timeline education
$('.dot:nth-child(1)').click(function () {
    $('.inside').animate({
        'width': '20%'
    }, 500)
});
$('.dot:nth-child(2)').click(function () {
    $('.inside').animate({
        'width': '40%'
    }, 500)
});
$('.dot:nth-child(3)').click(function () {
    $('.inside').animate({
        'width': '60%'
    }, 500)
});
$('.dot:nth-child(4)').click(function () {
    $('.inside').animate({
        'width': '80%'
    }, 500)
});
if ($('#switch1').not(':checked')) {
    $('.modal').wrap('<div class="mask"></div>')
    $('.mask').click(function () {
        $(this).fadeOut(300)
        $('.mask article').animate({
            'top': '-100%'
        }, 300)
    });
    $('.dot').click(function () {
        var modal = $(this).attr('id')
        $('.mask').has('article.' + modal).fadeIn(300)
        $('.mask article.' + modal).fadeIn(0).animate({
            'top': '10%'
        }, 300)
    })
}
$("#switch1").click(function () {
    if ($('#switch1').is(':checked')) {
        $('.modal').unwrap('<div class="mask"></div>')
        $('.modal').hide()
        $('.modal').addClass('nobox')
        $('.dot').click(function () {
            var modal = $(this).attr('id')
            $('article.nobox').hide()
            $('article.nobox.' + modal).fadeIn(200)
        });
    } else {
        $('article').removeClass("nobox")
        $('.modal').wrap('<div class="mask"></div>')
        $('.mask').click(function () {
            $(this).fadeOut(300)
            $('.mask article').animate({
                'top': '-100%'
            }, 300)
        })
        $('.dot').click(function () {
            var modal = $(this).attr('id')
            $('.mask').has('article.' + modal).fadeIn(300)
            $('.mask article.' + modal).fadeIn(0).animate({
                'top': '10%'
            }, 300)
        })
    }
})


// button to top
$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        topTopBtn.addClass('show')
    } else {
        topTopBtn.removeClass('show')
    }
});

topTopBtn.on('click', function (e) {
    e.preventDefault()
    $('html, body').animate({
        scrollTop: 0
    }, '300')
});

// slideshow
const items = document.querySelectorAll('.item'),
    controls = document.querySelectorAll('.control'),
    headerItems = document.querySelectorAll('.item-header'),
    descriptionItems = document.querySelectorAll('.item-description'),
    activeDelay = .76,
    interval = 5000

let current = 0;

const slider = {
    init: () => {
        controls.forEach(control => control.addEventListener('click', (e) => {
            slider.clickedControl(e)
        }))
        controls[current].classList.add('active')
        items[current].classList.add('active')
    },
    nextSlide: () => { // Increment current slide and add active class
        slider.reset()
        if (current === items.length - 1) current = -1 // Check if current slide is last in array
        current++
        controls[current].classList.add('active')
        items[current].classList.add('active')
        slider.transitionDelay(headerItems)
        slider.transitionDelay(descriptionItems)
    },
    clickedControl: (e) => { // Add active class to clicked control and corresponding slide
        slider.reset()
        clearInterval(intervalF)

        const control = e.target,
            dataIndex = Number(control.dataset.index)

        control.classList.add('active')
        items.forEach((item, index) => {
            if (index === dataIndex) { // Add active class to corresponding slide
                item.classList.add('active')
            }
        })
        current = dataIndex // Update current slide
        slider.transitionDelay(headerItems)
        slider.transitionDelay(descriptionItems)
        intervalF = setInterval(slider.nextSlide, interval) // Fire that bad boi back up
    },
    reset: () => { // Remove active classes
        items.forEach(item => item.classList.remove('active'))
        controls.forEach(control => control.classList.remove('active'))
    },
    transitionDelay: (items) => { // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
        let seconds

        items.forEach(item => {
            const children = item.childNodes // .vertical-part(s)
            let count = 1,
                delay

            item.classList.value === 'item-header' ? seconds = .015 : seconds = .007

            children.forEach(child => { // iterate through .vertical-part(s) and style b element
                if (child.classList) {
                    item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds
                    // child.firstElementChild.style.transitionDelay = `${delay}s`
                    count++
                }
            })
        })
    },
}
let intervalF = setInterval(slider.nextSlide, interval)
slider.init()