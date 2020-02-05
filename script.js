/**
 * Exemple 1 : on lance l'animation après le chargement de la page
 */
window.addEventListener('load', function () {
  document.querySelector('#player-1').play()
})



/******************************************************************************/



/**
 * Exemple 2 : on lance l'animation quand le player entre dans le viewport
 */

// Étape 1 : on enregistre la position du player au resize
// ça génère un repaint donc autant éviter de l'appeler
// à chaque événement scroll
window.addEventListener('resize', function () {
  var player  = document.querySelector('#player-2')
  var bounding = player.getBoundingClientRect()

  // On calcule le point à partir duquel l'élément rentre dans le viewport
  // = La position y de l'élément dans la page (bounding.top)
  // + la valeur scroll Y de la fenêtre (les valeurs de getBoundingClientRect() varient en fonction du scroll)
  // - la hauteur du viewport pour que le point de départ soit situé en bas et pas en haut
  var start = bounding.top + window.scrollY - window.innerHeight

  // On calcule le point à partir duquel l'élément sort du viewport
  // = la position de départ
  // + la hauteur de l'élement
  // + la hauteur du viewport
  var end = start + player.clientHeight + window.innerHeight

  // On enregistre ces valeurs dans les attributs de l'élément pour les utiliser plus tard
  player.setAttribute('data-start', start)
  player.setAttribute('data-end', end)
})

// Étape 2 : au scroll on vérifie si l'élément est dans ou hors du viewport
window.addEventListener('scroll', function (e) {
  var player  = document.querySelector('#player-2')
  var start = Number(player.getAttribute('data-start'))
  var end = Number(player.getAttribute('data-end'))

  if (window.scrollY > start  && window.scrollY < end) {
    player.play()
  } else {
    player.stop()
  }
})



/******************************************************************************/



/**
 * Exemple 3 : on fait avancer l'animation au scroll en fonction de sa position dans le viewport
 */
// Étape 1 : même chose que pour l'exemple 2
window.addEventListener('resize', function () {
  var player  = document.querySelector('#player-3')
  var bounding = player.getBoundingClientRect()
  var start = bounding.top + window.scrollY - window.innerHeight
  var end = start + player.clientHeight + window.innerHeight

  player.setAttribute('data-start', start)
  player.setAttribute('data-end', end)
})

// Étape 2 : au scroll on vérifie la position de l'élément dans le viewport.
// Quand il rentre en bas du viewport l'animation est à 0%,
// quand il sort en haut du viewport l'animation est à 100%
window.addEventListener('scroll', function (e) {
  var player  = document.querySelector('#player-3')
  var start = Number(player.getAttribute('data-start'))
  var end = Number(player.getAttribute('data-end'))

  if (window.scrollY < start) {
    // Le player est plus bas dans la page, l'animation est à 0%
    var progress = 0
  } else if (window.scrollY > end) {
    // Le player est plus haut dans la page, l'animation est à 100%
    progress = 1
  } else {
    // Le player est dans le viewport, on calcule l'avancement
    progress = (window.scrollY - start) / (end - start)
  }

  // On positionne l'animation avec la valeur progress
  player.seek(Math.round(progress * 100) + '%')
})



/******************************************************************************/



/**
 * Exemple 4 : on lance/arrête l'animation quand on clique dessus
 */
window.addEventListener('load', function () {
  document.querySelector('#player-4').addEventListener('click', e => {
    var player = e.currentTarget
    player.togglePlay()
  })
})



/******************************************************************************/



/**
 * Exemple 5 : on fait avancer l'animation en fonction de la position du curseur dans le viewport
 */
window.addEventListener('mousemove', function (e) {
  var player  = document.querySelector('#player-5')

  // On calcule la position du curseur en x en %
  var progress = e.clientX / window.innerWidth

  // On positionne l'animation avec la valeur progress
  player.seek(Math.round(progress * 100) + '%')
})



/******************************************************************************/



/**
 * Global
 */
// On force un resize après le chargement de la page pour que les éléments soient bien initialisés
window.addEventListener('load', function () {
  window.dispatchEvent(new Event('resize'))
})
