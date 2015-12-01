(function($) {


  var hotspot = $('.hotspot'),
      timeline = $('.timeline'),
      $currentYear = $('.current--date span');
      $img = $('.figure'); 
      $GB = $('.GB'),
      $GER = $('.GER'),
      $USA = $('.USA'),
      position = {
        pageTop: 0,
        timelineTop:0,
        percent: 0
      }

  $img.each(function(i, el){
    var $el = $(this);
    var src = $el.data('src');
    $el.css({
      'background-image': 'url(' + src + ')'
    })
  })

  window.addEventListener('scroll', function (){
    scrub();
    focus();
    currentYear();
  })

  
  var $years = [];

  $('.tl--year').each(function(i, el){
    $years.push($(el));
  });
  

  var year = '';

  function currentYear () {

    var potential = [];
    var current = '';

    potential = $years.filter(function(el){
      var calc = el.offset().top - position.pageTop;
      if(calc < 0) {
        return el
      }
    });
    if(potential.length > 0){
      current = potential[potential.length -1].data('year'); 
      if (current != year) {
        $currentYear.text(current);
      } 
    } else {
      $currentYear.text('');
    }
  }

  function scrub() {
    var p = position;
    p.pageTop = window.pageYOffset;
    p.timelineTop = timeline.offset().top;

    if(p.pageTop > (p.timelineTop - window.innerHeight / 2)){
      p.percent = p.pageTop / p.timelineTop;
      tgt = p.timelineTop -25 + (p.percent * ((window.innerHeight / 2) - p.timelineTop));
      if(p.percent <= 1) {
        hotspot.css({
          'top': tgt + 'px',
          // 'opacity': p.percent,
          'transform':'scale3d('+ p.percent +','+ p.percent + ',1)'      
        })
        if(hotspot.hasClass('fixed')){
          hotspot.removeClass('fixed');
        }
      } else {
        if(!hotspot.hasClass('fixed')){
          hotspot.attr('style', '');
          hotspot.addClass('fixed');

        }
      }
    }
  }

  var $events = [];

  $('.event').each(function(i, el){
    $events.push($(el));
  });

  function focus() {
    var range = document.documentElement.scrollHeight / 2,
        centre = (window.pageYOffset + window.innerHeight) - window.innerHeight/2,
        focusMin = centre - (window.innerHeight / 4),
        focusMax = centre + (window.innerHeight / 4);

    for(index in $events){
      var $el = $events[index];
      var $eltop = $el.offset().top;
      var $elbot = $eltop + $events[0].height();

      if($eltop > focusMin && $elbot > centre){
        if($eltop < centre) {
          if(!$el.hasClass('focus')){
            $el.addClass('focus');
          }
        } else {
          if($el.hasClass('focus')){
            $el.removeClass('focus');
          }
        }
      } else {
        if($elbot < centre) {
          if($el.hasClass('focus')){
            $el.removeClass('focus');
          }
        }  
      }
      
    }
  }

  $('.country--all').on('click', function (el) {
    $GB.each(function(i, el){
      $(this).addClass('all')
    });
    $GER.each(function(i, el){
      $(this).addClass('all')
    });
    $USA.each(function(i, el){
      $(this).addClass('all')
    });
  })

  $('.country--gb').on('click', function (el) {
    $GB.each(function(i, el){
      $(this).addClass('all')
    });
    $GER.each(function(i, el){
      $(this).removeClass('all')
    });
    $USA.each(function(i, el){
      $(this).removeClass('all')
    });
  })
  $('.country--ger').on('click', function (el) {
    $GER.each(function(i, el){
      $(this).addClass('all')
    });
    $GB.each(function(i, el){
      $(this).removeClass('all')
    });
    $USA.each(function(i, el){
      $(this).removeClass('all')
    });
  })
  $('.country--usa').on('click', function (el) {
    $USA.each(function(i, el){
      $(this).addClass('all')
    });
    $GER.each(function(i, el){
      $(this).removeClass('all')
    });
    $GB.each(function(i, el){
      $(this).removeClass('all')
    });
  })


})(jQuery);