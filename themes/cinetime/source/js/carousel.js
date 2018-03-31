$(document).ready(function(){
    $('.hero-carousel').slick({
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 8000,
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true,
  variableHeight: true
    });

// $('.movie-carousel').slick({
//   slidesToScroll: 1,
//   slidesToShow: 1,
//   autoplay: false,
//   dots: false,
//   infinite: false,
//   centerMode: false,
//   variableWidth: true,
//   variableHeight: true,
//   responsive: [
//     {
//       breakpoint: 768,
//       settings: {
//         arrows: false,
//         slidesToShow: 1,
//         centerMode: false,
//         // centerPadding: '40px',
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         arrows: false,
//         centerPadding: '40px',
//         slidesToShow: 1,
//         centerMode: false,
//       }
//     }
//   ]
    // });
});

$('.movie-carousel').slick({
infinite: false,
centerMode: false,
slidesToShow: 7,
slidesToScroll: 7,
nextArrow: '<button type="button" class="movie-carousel-next"></button>',
prevArrow: '<button type="button" class="movie-carousel-prev"></button>',
dots: true,
adaptiveHeight: false,
variableWidth: true,
responsive: [
    {
      breakpoint: 768,
      settings: 'unslick'
    },
    {
        breakpoint: 940,
        settings: 
        {
            slidesToShow: 5,
            slidesToScroll: 4,
        }
    },
    {
        breakpoint: 1120,
        settings: 
        {
            slidesToShow: 6,
            slidesToScroll: 5,
        }
    },
    {
        breakpoint: 1300,
        settings: 
        {
            slidesToShow: 7,
            slidesToScroll: 6,
        }
    },
// responsive: [
//     {
//       breakpoint: 768,
//       settings: 'unslick'
//     },
//     {
// 			breakpoint: 950,
// 			settings: 
// 			{
// 				slidesToShow: 5,
// 				slidesToScroll: 4,
// 			}
//     },
//     {
// 			breakpoint: 1260,
// 			settings: 
// 			{
// 				slidesToShow: 6,
// 				slidesToScroll: 5,
// 			}
//     },
]
});