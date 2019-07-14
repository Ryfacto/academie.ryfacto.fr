---
layout: article
image:
title: Test-Driven Development - Premiers pas avec FizzBuzz
description: aa
date: 13/07/2019
updated_at: 13/07/2019
published: false
beta: true
writing_time: 1
ahah: 1
technical_environment:
  swift: 5
  xcode: 10.2.1
comments:
---

OUTLINE

Intro
  Article précédent : l'importance des tests pour faire émerger l'architecture. Pourquoi TDD permet de rendre plus productif.
  Article encore d'avant : qu'est-ce qu'une architecture ?
  Cette fois on rentre dans le vif du sujet en faisant nos premiers pas en TDD, avec une approche par l'exemple comme l'a fait Kent Beck (le papa de TDD) le 8 novembre 2002 lorsqu'il a publié son livre ["Test-Driven Development by Example"](https://amzn.to/2l8qHa3).
  Et on attaque directement avec un kata de code, le kata ["FizzBuzz"](http://kata-log.rocks/fizz-buzz-kata).

FizzBuzz
  Explication du besoin.
  Plutôt simple pour commencer. L'idée est de se concentrer sur la pratique de TDD, pas de relever un défi intellectuel !

(Optionnel) Étape zéro : je prépare mon environnement
  Je crée le projet s'il n'existe pas.
  Je vérifie que mon environnement de tests fonctionnent avec un premier test qui échoue.
  Je fais en sorte que mes tests n'exécutent pas l'app !
    Utilisation des arguments de lancement.
    Pour rendre les tests rapides et indépendants tu te souviens ?

Première étape : je conçois
  Phase de conception que l'on peut faire : dans sa tête ou sur un tableau blanc à plusieurs.
  UML communément admis dans l'industrie, donc un bon moyen de communiquer sa conception.
  Voici ce que j'ai imaginé : `<photo du tableau blanc>`

Deuxième étape : je liste tous les tests qui me viennent en tête
  J'ai pour habitude d'écrire cette liste en commentaire dans le code.
  Ça peut être fait sur un fichier à côté, sur le tableau blanc, on s'en fiche.
  Le plus important est d'avoir cette liste sous les yeux, tu vas la mettre à jour continuellement quand d'autres tests te viendras en tête ou quand tu auras fini d'écrire des tests.
  Voici ma liste en vrac pour l'instant : `<liste ici>`

Troisième étape : je priorise la liste
  > Mais je croyais qu'il fallait écrire un test rouge, toujours pas ?

  Et non toujours pas !
  Qui a dit que TDD voulait dire foncer tête baisser sans concevoir ?
  Tu vas commencer par écrire les tests qui te font écrire le moins de code : les tests les plus simple.
  Tu priorises aussi en commençant par les cas à la marge : valeurs nil, string vide, liste vide, nombre 0, nombre négatif, etc.
  Voici ma liste priorisée et l'explication des priorités : `<liste ici avec commentaires sur pourquoi>`

Quatrième étape : le premier test rouge
  > Enfin !

  1er test : création
    - Suppression du test pour vérifier l'environnement
    - Création du fichier de test au plus proche du code de prod
  J'écris le plus petit test possible qui me fait écrire le plus petit bout de code possible.
  Ici c'est un test "marche-pied" qui me permets de mettre simplement le pied à l'étrier et me forcer à créer la classe.
  `<code du test marche-pied>`
  Dans un prochain article, je montrerai un exemple de l'importance de fonctionner par petites étapes, de commencer par les tests les plus simples, au risque de se retrouver à écrire tout l'algo d'un coup si on ne le fait pas. Pour ne pas le rater, [inscris-toi à la newsletter !](signup)

Cinquième étape : faire passer le test le plus vite possible
  Enfin je fais passer le test le plus vite possible.
  Je crée le type au même endroit que les tests.
  `<code qui fait passer le test>`

Sixième étape (mon étape préféré) : refactoring !
  D'où le nom Ryfacto pour ma petite boîte, aaaah !

  > On n'est pas là pour parler de Ryfacto ou bien ?

  Non, désolé...
  Quelles crimes de conception ai-je commis ici ?
  - Type dispo que dans les tests
  Je bouge donc ce type dans un fichier dédié dans le code de prod. `FizzBuzz.swift`

Septième étape : je mets à jour la liste
  `<liste mise à jour>`

Et le cycle recommence !
  Prochain test : FizzBuzz avec
