;(function () {
  var Const = {
    IS: Object.freeze({
      DESKTOP: 'isDesktop',
      TABLET: 'isTablet',
      MOBILE: 'isMobile'
    }),
    BREAKPOINTS: Object.freeze({
      DESKTOP: 1440,
      DESKTOP_UNDER: 1024,
      MOBILE: 768,
      MOBILE_UNDER: 360
    }),
    KEY_CODE: Object.freeze({
      TAB: 9,
      ENTER: 13,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      ESC: 27
    })
  }
  var Util = {
    _toConsumableArray: function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i]
        }
        return arr2
      } else {
        return Array.from(arr)
      }
    },
    checkingPlatform: function () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? Const.IS.MOBILE
        : Const.IS.DESKTOP
    },
    getViewPort: function () {
      var doc = window
      if (!('innerWidth' in window)) {
        doc = document.documentElement || document.body
        return {
          width: doc['clientWidth'],
          height: doc['clientHeight']
        }
      } else {
        return {
          width: doc['innerWidth'],
          height: doc['innerHeight']
        }
      }
    },
    getCurrentDevice: function () {
      var width = this.getViewPort().width
      var result = ''
      if (width > Const.BREAKPOINTS.DESKTOP_UNDER) {
        result = Const.IS.DESKTOP
      } else if (width >= Const.BREAKPOINTS.MOBILE && width <= Const.BREAKPOINTS.DESKTOP_UNDER) {
        result = Const.IS.TABLET
      } else {
        result = Const.IS.MOBILE
      }
      return result
    }
  }
  var Map = {
    init: function () {
      var JqMap = function () {
        this.map = new Object()
      }
      JqMap.prototype = {
        /* key, value 값으로 구성된 데이터를 추가 */
        put: function (key, value) {
          this.map[key] = value
        },
        /* 지정한 key값의 value값 반환 */
        get: function (key) {
          return this.map[key]
        },
        /* 구성된 key 값 존재여부 반환 */
        containsKey: function (key) {
          return key in this.map
        },
        /* 구성된 value 값 존재여부 반환 */
        containsValue: function (value) {
          for (var prop in this.map) {
            if (this.map[prop] == value) {
              return true
            }
          }
          return false
        },
        /* 구성된 데이터 초기화 */
        clear: function () {
          for (var prop in this.map) {
            delete this.map[prop]
          }
        },
        /*  key에 해당하는 데이터 삭제 */
        remove: function (key) {
          delete this.map[key]
        },
        /* 배열로 key 반환 */
        keys: function () {
          var arKey = new Array()
          for (var prop in this.map) {
            arKey.push(prop)
          }
          return arKey
        },
        /* 배열로 value 반환 */
        values: function () {
          var arVal = new Array()
          for (var prop in this.map) {
            arVal.push(this.map[prop])
          }
          return arVal
        },
        /* Map에 구성된 개수 반환 */
        size: function () {
          var count = 0
          for (var prop in this.map) {
            count++
          }
          return count
        }
      }
      var jqMap = new JqMap()
      return jqMap
    }
  }

  var Ui = {
    generateDomIter: function (iter) {
      var parent = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1]

      return iter.reduce(function (acc, cur) {
        var currentArray = parent.querySelectorAll(cur)
        return [].concat(Util._toConsumableArray(acc), Util._toConsumableArray(currentArray))
      }, [])
    },
    siblings: function (el) {
      return [].concat(Util._toConsumableArray(el.parentElement.children)).filter(function (e) {
        return e !== el
      })
    },
    closest: function (el, selector) {
      do {
        if (el.matches ? el.matches(selector) : el.msMatchesSelector(selector)) {
          return el
        }
        el = el.parentElement || el.parentNode
      } while (el !== null && el.nodeType === 1)
      return null
    }
  }
  var Event = {
    sceneIns: Map.init(),
    controllerIns: Map.init(),
    timeoutIds: Map.init(),
    isIndicator: false,
    activeClass: 'on',
    lastScrollY: 0,
    scrollDirection: '',
    currentDevice: '',
    setDevice: function () {
      var _this = this
      var body = document.querySelector('body')
      _this.currentDevice = Util.getCurrentDevice()
      body.classList.remove('isDesktop', 'isTablet', 'isMobile')
      body.classList.add(_this.currentDevice)
    },
    checkScrolldirection: function () {
      var _this = this
      window.addEventListener('scroll', function (e) {
        const scrollY = window.scrollY

        // 이전의 스크롤 위치와 비교하기
        const direction = scrollY > _this.lastScrollY ? 'scrollDown' : 'scrollUp'

        // 현재의 스크롤 값을 저장
        _this.lastScrollY = scrollY
        _this.scrollDirection = direction

        // console.log(direction)
      })
    },
    resizeWindow: function () {
      var _this = this
      _this.setDevice()
      window.addEventListener('resize', function (e) {
        _this.refreshScene()
        _this.setDevice()
      })
    },
    clearTimeout: function () {
      var _this = this
      _this.timeoutIds.values().forEach(function (item, idx) {
        clearTimeout(item)
      })
    },
    createSequence: function (target, sequence) {
      var _this = this
      var arr = sequence.slice()
      var length = arr.length
      if (length === 0) {
        return false
      }
      _this.timeoutIds.put(
        arr[0].class,
        setTimeout(function () {
          if (arr[0].class) {
            target.classList.add(arr[0].class)
          }
          if (arr[0].callback) {
            arr[0].callback(arr[0])
          }
          arr.shift()
          _this.createSequence(target, arr)
        }, arr[0].delay)
      )
    },
    removeSequence: function (target, sequence) {
      var _this = this
      sequence.forEach(function (item, idx) {
        if (item.class) {
          target.classList.remove(item.class)
        }
      })
      _this.clearTimeout()
    },
    createController: function (option) {
      return new ScrollMagic.Controller(option)
    },
    createScene: function (option) {
      return new ScrollMagic.Scene(option)
    },
    refreshScene: function () {
      var _this = this
      _this.controllerIns.values().forEach(function (item, idx) {
        // item.update(true)
        item.destroy()
      })
      _this.sceneIns.values().forEach(function (item, idx) {
        item.destroy()
      })
      window.scrollTo(0, 0)
      document.querySelector('.our_story .story_keyvisual').classList.remove('isZeroOpacity')
      setTimeout(function () {
        _this.setPages()
      }, 2000)
    },
    setController: function (hash, option) {
      var _this = this
      var controller = _this.createController(option)
      _this.controllerIns.put(hash, controller)
      return controller
    },
    setScene: function (controller, option) {
      var _this = this
      Ui.generateDomIter([option.trigger]).forEach(function (item, idx) {
        var duration = option.duration === 0 ? 0 : option.duration || '90%'
        var offset = option.offset === 0 ? 0 : option.offset || 50
        var triggerHook = option.triggerHook === 0 ? 0 : option.triggerHook || 0.9

        var scene = _this
          .createScene({
            triggerElement: item, // y value not modified, so we can use element as trigger as well
            duration: duration, // hide 10% before exiting view (80% + 10% from bottom)
            offset: offset, // start a little later, move trigger to center of element
            triggerHook: triggerHook // show, when scrolled 10% into view,
          })
          // .setTween(tween)
          .setClassToggle(item, _this.activeClass) // add class toggle
          .addIndicators({name: option.trigger + ' ' + (idx + 1)}) // add indicators (requires plugin)
          .on('enter', function (e) {
            option.enter && option.enter(e)
          })
          .on('leave', function (e) {
            option.leave && option.leave(e)
          })

        if (option.tween) {
          scene.setTween(option.tween)
        }
        if (option.setPin) {
          scene.setPin(option.setPin)
        }
        if (!_this.isIndicator) {
          scene.removeIndicators()
        }

        scene.addTo(controller)
        _this.sceneIns.put(option.hash, scene)
      })
    },
    setOurStory: function () {
      var _this = this
      var _id = 'our_story'
      var _parentClass = '.' + _id + ' '
      var $layerTarget = Ui.generateDomIter(['.trigger_layer .layer_item'])
      var isMobile = _this.currentDevice === Const.IS.MOBILE
      var controller = _this.setController(_id)

      Ui.generateDomIter([_parentClass + '.trigger_box_v']).forEach(function (item, idx) {
        var hashString = _id + '-trigger_box_v' + (idx + 1)
        var parent = Ui.generateDomIter([_parentClass + '.trigger_box_v'])[0]
        var sceneSequence = [
          {class: 'sceneA', delay: 1000},
          {
            class: 'sceneB',
            delay: 700,
            callback: function (e) {}
          },
          {class: 'sceneC', delay: 700}
        ]
        _this.setScene(controller, {
          trigger: _parentClass + '[data-trigger="' + hashString + '"]',
          hash: hashString,
          enter: function (e) {
            _this.createSequence(parent, sceneSequence)
          },
          leave: function (e) {
            _this.removeSequence(parent, sceneSequence)
          }
        })
      })
      Ui.generateDomIter([_parentClass + '.trigger_box_txt .box']).forEach(function (item, idx) {
        var hashString = _id + '-trigger_box_txt-box' + (idx + 1)
        _this.setScene(controller, {
          trigger: _parentClass + '.trigger_box_txt',
          tween: TweenMax.fromTo(
            _parentClass + '[data-trigger="' + hashString + '"]',
            1,
            {
              opacity: 0,
              'line-height': isMobile ? '50px' : '70px'
            },
            {
              opacity: 1,
              'line-height': isMobile ? '30px' : '50px'
            }
          ),
          triggerHook: 3,
          duration: '50%',
          hash: hashString
        })
      })
      Ui.generateDomIter([_parentClass + '.trigger_box_v .box_bg']).forEach(function (item, idx) {
        var hashString = _id + '-trigger_box_v-box_bg'
        _this.setScene(controller, {
          trigger: _parentClass + '.trigger_box_v',
          tween: TweenMax.fromTo(
            _parentClass + '[data-trigger="' + hashString + '"]',
            1,
            {
              opacity: 0,
              backgroundPosition: isMobile ? 'ceneter 0px' : 'ceneter 0px'
            },
            {
              opacity: 1,
              backgroundPosition: isMobile ? 'ceneter -150px' : 'ceneter -400px'
            }
          ),
          hash: hashString,
          triggerHook: 0.5,
          duration: isMobile ? '80%' : '100%',
          enter: function (e) {},
          leave: function (e) {}
        })
      })

      Ui.generateDomIter([_parentClass + '.trigger_box_sub']).forEach(function (item, idx) {
        var hashString = _id + '-trigger_box_sub'

        _this.setScene(controller, {
          trigger: _parentClass + '[data-trigger="' + hashString + '"]',
          hash: hashString,
          enter: function (e) {
            // console.log('enter')
            document.querySelector(_parentClass + '.story_keyvisual').classList.add('isZeroOpacity')
          },
          leave: function (e) {
            // console.log('leave')
            if (_this.scrollDirection === 'scrollUp') {
              document.querySelector(_parentClass + '.story_keyvisual').classList.remove('isZeroOpacity')
            }
          }
        })
      })
      Ui.generateDomIter([_parentClass + '.trigger_box_sub .box']).forEach(function (item, idx) {
        var hashString = _id + '-trigger_box_sub-box'
        _this.setScene(controller, {
          trigger: _parentClass + '.trigger_box_sub',
          tween: TweenMax.to(_parentClass + '[data-trigger="' + hashString + '"]', 1, {
            opacity: 0
          }),
          hash: hashString,
          duration: '170%'
        })
      })

      Ui.generateDomIter([_parentClass + '.trigger_txt .box']).forEach(function (item, idx) {
        var hashString = _id + '-trigger_txt-box' + (idx + 1)
        _this.setScene(controller, {
          trigger: _parentClass + '.trigger_txt',
          tween: TweenMax.to(_parentClass + '[data-trigger="' + hashString + '"]', 1, {opacity: 1, x: 0}),
          hash: hashString
        })
      })

      Ui.generateDomIter([_parentClass + '.trigger_txt2']).forEach(function (item, idx) {
        var hashString = _id + '-trigger_txt2'
        _this.setScene(controller, {
          trigger: _parentClass + '.trigger_txt2',
          tween: TweenMax.fromTo(
            _parentClass + '[data-trigger="' + hashString + '"]',
            1,
            {
              opacity: 0,
              'line-height': isMobile ? '50px' : '70px'
            },
            {
              opacity: 1,
              'line-height': isMobile ? '20px' : '40px'
            }
          ),
          hash: hashString
        })
      })

      Ui.generateDomIter([_parentClass + '.trigger_txt3 .box']).forEach(function (item, idx) {
        var hashString = _id + '-trigger_txt3-box' + (idx + 1)
        _this.setScene(controller, {
          trigger: _parentClass + '.trigger_txt3',
          tween: TweenMax.to(_parentClass + '[data-trigger="' + hashString + '"]', 1, {opacity: 1, x: 0}),
          hash: hashString
        })
      })

      Ui.generateDomIter([_parentClass + '.trigger_box']).forEach(function (item, idx) {
        var hashString = _id + '-trigger_box' + (idx + 1)
        _this.setScene(controller, {
          trigger: _parentClass + '[data-trigger="' + hashString + '"]',
          duration: 0,
          hash: hashString
        })
      })
      // console.log(_this.sceneIns)
      _this.setLayer($layerTarget)

      _this.setOurStoryVisualViewPort()
      window.addEventListener('resize', function (e) {
        _this.setOurStoryVisualViewPort()
      })
    },
    setViewPortWidth: function (target, multi) {
      var multiValue = multi ? multi : 1
      target.forEach(function (item, idx) {
        item.style.width = Util.getViewPort().width * multiValue + 'px'
      })
    },
    setViewPortHeight: function (target, multi) {
      var multiValue = multi ? multi : 1
      target.forEach(function (item, idx) {
        item.style.height = Util.getViewPort().height * multiValue + 'px'
      })
    },
    setOurStoryVisualViewPort: function () {
      var _this = this
      var $story_keyvisuals = Ui.generateDomIter(['.story_keyvisual .brand_intro', '.story_keyvisual .interview_video'])
      var $story_keyvisual_items = Ui.generateDomIter([
        '.story_keyvisual .story_title',
        '.story_keyvisual .text_info',
        '.story_keyvisual .story_bg'
      ])
      _this.setViewPortHeight($story_keyvisuals, 2.1)
      _this.setViewPortWidth($story_keyvisual_items)
      _this.setViewPortHeight($story_keyvisual_items)
    },
    setLayer: function (target) {
      var _this = this
      _this.setViewPortWidth(target)
      document.addEventListener('click', function (e) {
        var isLayerOpen = e.target.classList.contains('trigger_layer_open')
        var isLayerClose = e.target.classList.contains('trigger_layer_close')
        if (isLayerOpen) {
          // e.target.closest('.trigger_layer').style.transform = 'translateX(-' + Util.getViewPort().width + 'px)'
          e.target.closest('.trigger_layer').style.left = '-100%'
        } else if (isLayerClose) {
          // e.target.closest('.trigger_layer').style.transform = 'translateX(0)'
          e.target.closest('.trigger_layer').style.left = '0'
        }
      })
      window.addEventListener('resize', function (e) {
        _this.setViewPortWidth(target)
      })
    },
    setPages: function () {
      var _this = this
      _this.setOurStory()
    },
    init: function () {
      var _this = this
      _this.checkScrolldirection()
      _this.resizeWindow()
      _this.setPages()
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    Event.init()
  })
})()
