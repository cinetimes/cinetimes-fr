/*Définis la largeur du side nav à 250px*/
function openNav() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.getElementById("mySidenav").style.width = "500px";
    document.getElementById("main").style.marginLeft = "500px"; 
  } else {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }


//  document.getElementById("main").style.marginRight = "-20em";
}

/*Définis la largeur de la sidenav à 0px*/

function closeNav() {
  document.getElementById("mySidenav").style.width = "0px";
  document.getElementById("main").style.marginLeft = "0px";

//  document.getElementById("main").style.marginRight = "0px";
}
