---
layout: article
title: La seule architecture qui compte
description: Existe-t-il l'architecture parfaite ? Quelles sont les caractéristiques d'une bonne architecture ? Réponses dans cet article !
date: 11/06/2019
published: true
writing_time: 1
ahah: 1
comments:
    #- author: nverinaud
      #author_url: "twitter.com/nverinaud"
      #avatar: ""
      #body: "<p>Exemple de commentaire</p>"
---

Ah, l'architecture d'une app iOS.

Vaste sujet avec lequel je flirte depuis des années.

À chaque nouvelle app se pose cette question fatidique : __quelle archi mettre en place ?__

Après tout, c'est une choix important, non ? Une fois l'architecture choisie, impossible de revenir en arrière, n'est-ce pas ?

Mais dites-moi, c'est quoi _une architecture_ ?

## Architecture : définition

Si l'on prends la [définition du Larousse](https://www.larousse.fr/dictionnaires/francais/architecture/5078) :

> Organisation des divers éléments constitutifs d'un système informatique, en vue d'optimiser la conception de l'ensemble pour un usage déterminé.

Il y a la notion d'__organisation__ ; il s'agit là d'_organiser_ son code, ses modules, ses frameworks.

L'objectif est d'__optimiser la conception de l'ensemble__ ; il faut prendre du recul sur tout son code afin de l'_optimiser_.

Dans le but de répondre à __un usage déterminé__ ; cette notion d'usage, je l'interprète d'un point de vue _fonctionnel_.

Maintenant que nous sommes d'accord sur la définition ; quelles sont les caractéristiques d'une bonne architecture ?

## Une _bonne_ architecture

Je vais reprendre chacune des notions et tenter de déterminer les caractéristiques que je juge en adéquation avec la définition.

Pour rappel, il s'agit de limiter la réflexion au code d'une app iOS.

### Organisation

Comment déterminer que le code de mon app iOS est __bien organisé__ ?

Primo, __je trouve rapidement ce que je cherche__.

_Ex: je dois modifier l'écran de connexion, il doit bien exister un `LoginViewController` ou quelque chose comme ça._

Deuxio, __je ne me perds pas en cours de route__.

_Contre-Ex: le `LoginViewController` fait quoi exactement ? Dans `viewDidLoad` il configure des singletons, wtf?, modifie des contraintes, wtf??, fait un appel serveur, wtf???, il appelle des méthodes sur une super classe pour...je suis perdu je comprends plus rien !_

Tertio, __les dépendances ne partent pas dans tous les sens__.

_Contre-Ex: `LoginViewController` dépend de `ClientAPI` qui dépend de `Configuration` qui dépend de `ClientAPI`, wtf?_

### Optimiser la conception de l'ensemble

Comment déterminer que la conception est optimisée ?

Primo, __je comprends facilement ce que le code fait__.

_Ex: `LoginViewController` a une méthode `onLoginButtonTapped()` qui appelle `behavior.login()`._

_Contre-Ex: `LoginViewController` a une méthode `buttonTapped(sender: NSObject)` qui teste si `sender == button1` et qui fait plein de trucs sur 200 lignes avec un niveau d'imbrication au-delà de toute raison et peut-être problablement pourquoi pas en rapport avec un appel API peut-être ?_

Deuxio, j'arrive à __changer facilement le code__.

_Contre-Ex: je modifie un peu le login pour corriger un bug, je livre, j'ai 36 nouveaux bugs, wtf?_

<!--

Plan
- Architecture : définition
- Ce que j'attends d'une bonne architecture
- Le spectre de l'over-engineering
- Études de quelques architectures existantes
  - MVC
  - VIPER
  - MVVM
  - MVVM+Coordinator

 -->
