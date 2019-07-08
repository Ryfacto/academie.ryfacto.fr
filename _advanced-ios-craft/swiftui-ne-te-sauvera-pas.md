---
layout: article
excerpt_separator: <!--more-->
image: ""
title: SwiftUI ne te sauvera pas
description: ...
date: 07/07/2019
updated_at: 15/07/2019
published: false
beta: true
writing_time: 0
ahah: 0
comments:
---

<!-- OUTLINE
  Quel impact aura SwiftUI
    - À première vue
      - Ce n'est pas pour tout de suite !
        - iOS 13+
        - Est en developpement depuis un moment (trouver le lien) mais des plâtres vont devoir être essuyés
        - Et ce n'est pas nouveau : des frameworks comme React ont déjà une approche déclarative
      - SwiftUI ne se concentre que sur l'UI
        - Positif : une alternative simple et élégante aux XIBs / Storyboards
        - Positif : va simplifier le code d'interface
        - Positif : des outils de prévisualisation qui vont améliorer la productivité !
        - Négatif : il y a bien plus que du code UI dans une app iOS
    - Regarder au-delà du framework
      - Séparer code UI & comportement
        - Le framework Combine, la base qui permet à SwiftUI d'exister et d'être élégant
          - Exemple de code SwiftUI et du data binding
          - Combine est une fondation pour faire de la programmation fonctionnelle reactive, à l'image de Rx
          - La courbe d'apprentissage est importante, il ne faut pas le négliger !
          - Gare à la sur-ingénierie ! Rx / Combine permettent de créer du code plus concis mais à condition d'avoir compris les concepts sous-jacents
          - Il ne faut pas être aveugle aux inconvénients de Rx
          - Je fais un projet avec et un sans, et je me rends compte que Rx n'est pas si indispensable !
      - Du coup, mon comportement serait-il testable plus facilement ?
    - Le véritab
 -->

À chaque WWDC tu ressens cette excitation si particulière.

De nouveaux outils sont dévoilés.

De nouveaux frameworks aussi.

Et du coup cet espoir un peu fou renaît : Apple va-t-elle annoncer quelque chose qui va drastiquement amélioré mon quotidien, ma base de code ?

Tu l'as certainement ressenti avec l'arrivée, en cette édition 2019, du framework qui a déjà fait couler beaucoup d'encre : __SwiftUI__.

Tel un messi, la promesse de SwiftUI est belle : simplifier le code des `ViewController`.

Tu es en droit de te poser cette question : __quel sera l'impact de SwiftUI sur mon code et mon quotidien ?__

<!--more-->

## Un impact en demi-teinte

SwiftUI est un framework pour créer des interfaces utilisateurs.

> Sérieux ? C'est donc ça le UI dans le nom du framework ?

Ton sarcasme me va droit au cœur ! ❤️

De quoi est composé ta base de code ?

> Comment ça "de quoi" ?

Et bien, il y a des types (classes, struct, enum, typealias) dédiés à l'UI comme les sous-classes de `UIViewController`, `UIView`, `UITableViewCell`, etc.

Mais encore ?

> J'ai des classes pour la logique métier, des types "Utils", de la logique pour persister les données, pour faire des appels réseaux...

Tu as raison ! Ta base de code n'est pas constitué uniquement de code dédié à l'UI.

Or SwiftUI est un framework dédié à l'UI.

Il est donc évident que son impact sur ton code et ton quotidien va se limiter à la partie UI.

Combien de temps passes-tu, quotidiennement, à travailler sur du code d'UI ?

> Je dirais que cela dépend des interfaces que je dois intégrer. Cette durée varie fortement en fonction de la complexité des interfaces.

J'estime, mais ce n'est qu'un ressenti, que je passe environ 50% de mon temps à travailler sur l'interface.
