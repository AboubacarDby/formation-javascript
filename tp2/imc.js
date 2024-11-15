function calculerIMC() {
    // Récupérer les valeurs saisies par l'utilisateur
    const poids = parseFloat(document.getElementById("poids").value);
    const taille = parseFloat(document.getElementById("taille").value);
  
    // Vérifier si les valeurs sont des nombres valides
    if (isNaN(poids) || isNaN(taille) || poids <= 0 || taille <= 0) {
      alert("Veuillez entrer des valeurs numériques positives pour le poids et la taille.");
      return;
    }
  
    // Calculer l'IMC
    const imc = poids / (taille * taille);
  
    // Afficher le résultat
    let resultat = "Votre IMC est de " + imc.toFixed(2) + ". ";
  
    // Déterminer la catégorie de poids
    if (imc < 18.5) {
      resultat += "Vous êtes en situation de maigreur.";
    } else if (imc < 25) {
      resultat += "Votre poids est normal.";
    } else if (imc < 30) {
      resultat += "Vous êtes en surpoids.";
    } else if (imc < 35) {
      resultat += "Vous êtes en obésité.";
    } else if (imc < 40) {
      resultat += "Vous êtes en obésité sévère.";
    } else {
      resultat += "Vous êtes en obésité morbide.";
    }
  
    // Afficher le résultat dans un élément HTML (ici, un élément avec l'id "resultat")
    document.getElementById("resultat").textContent = resultat;
  }