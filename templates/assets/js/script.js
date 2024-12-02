document.addEventListener('DOMContentLoaded', function () {
  function updateImageSources () {
    document.querySelectorAll('img').forEach(img => {
      const srcdesktop = img.getAttribute('data-src')
      const srcmobile = img.getAttribute('data-src-mobile')

      if (srcdesktop) {
        if (window.innerWidth < 768 && srcmobile) {
          img.setAttribute('src', srcmobile)
        } else {
          img.setAttribute('src', srcdesktop)
        }
      }
    })
  }
  updateImageSources()
  window.addEventListener('resize', updateImageSources)
  window.addEventListener('orientationchange', updateImageSources)
})

function on (eventType, selector, callback) {
  document.addEventListener(eventType, function (e) {
    let targetElement = e.target
    while (targetElement && targetElement !== document) {
      if (targetElement.matches(selector)) {
        e.preventDefault()
        callback.call(targetElement, e)
        break
      }
      targetElement = targetElement.parentElement
    }
  })
}
document.addEventListener('click', function (e) {
  const newsletter = document.querySelector('.newsletter-text')
  if (newsletter.classList.contains('active')) {
    if (!newsletter.contains(e.target)) {
      newsletter.classList.remove('active')
    }
  }
})
on('click', '.newsletter-button', function () {
  const newsletter = document.querySelector('.newsletter-text')
  newsletter.classList.toggle('active')
})
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    const newsletter = document.querySelector('.newsletter-text')
    newsletter.classList.remove('active')
  }
})

on('click', '.close', function () {
  const newsletter = document.querySelector('.newsletter-text')
  newsletter.classList.remove('active')
})

const fixedHeader = async () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const header = document.querySelector('.header')
  if (scrollTop > 0) {
    header.classList.add('sticky')
  } else {
    header.classList.remove('sticky')
  }
}
document.addEventListener('DOMContentLoaded', fixedHeader)
window.addEventListener('scroll', fixedHeader)

let lastScrollTop = 0
let delta = 350

window.addEventListener('scroll', async () => {
  let st = window.pageYOffset || document.documentElement.scrollTop

  if (Math.abs(lastScrollTop - st) <= delta) return

  if (st > lastScrollTop) {
    document.querySelector('.header').classList.add('hide')
  } else {
    document.querySelector('.header').classList.remove('hide')
  }

  lastScrollTop = st
})

document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.main-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 600,
    loop: true,
    autoplay: {
      delay: 500000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.main-swiper-next',
      prevEl: '.main-swiper-prev'
    }
  })

  function setHeight () {
    const grafElements = document.querySelectorAll('.time-graf')
    grafElements.forEach(el => {
      const capacity = el.getAttribute('data-capacity')
      el.style.height = `${capacity}%`
    })
  }

  function observeScroll () {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setHeight()
          observer.disconnect() // Stop observing after the first activation
        }
      })
    })
    const timesElement = document.querySelector('.times')
    observer.observe(timesElement) // Observe the entire component
  }

  observeScroll()
})



on("click", ".hamburger", function (e) {
  document.querySelector("header .close-bg").classList.add("active");
  document.querySelector("#links").classList.add("active");
  setTimeout(function () {
      const li = document.querySelectorAll("#links ul li");
      let i = 500;
      li.forEach(function (item) {
          setTimeout(function () {
              item.classList.add("activated");
          }, i);
          i += 50;
      });
  }, 100);

  document.documentElement.classList.add("remove");
});

on("click", ".close", function (e) {
  const li = document.querySelectorAll("#links ul li");
  li.forEach(function (item) {
      item.classList.remove("activated");
  });
  document.querySelector("header .close-bg").classList.remove("active");
  document.querySelector("#links").classList.remove("active");
  document.documentElement.classList.remove("remove");
});
on("click", ".close-bg", function (e) {
  const li = document.querySelectorAll("#links ul li");
  li.forEach(function (item) {
      item.classList.remove("activated");
  });
  document.querySelector("header .close-bg").classList.remove("active");
  document.querySelector("#links").classList.remove("active");
  document.documentElement.classList.remove("remove");
});
document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
      const li = document.querySelectorAll("#links ul li");
      li.forEach(function (item) {
          item.classList.remove("activated");
      });
      document.querySelector("header .close-bg").classList.remove("active");
      document.querySelector("#links").classList.remove("active");
      document.documentElement.classList.remove("remove");
  }
});