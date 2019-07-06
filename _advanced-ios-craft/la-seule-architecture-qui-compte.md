---
layout: article
excerpt_separator: <!--more-->
image: /images/2019/06/architecture.jpg
title: La seule architecture qui compte
description: Que veut dire "architecture" quand on parle d'un logiciel ? Quelles sont les caractéristiques d'une bonne architecture ?
date: 16/06/2019
updated_at: 21/06/2019
published: true
beta: false
writing_time: 3
ahah: 1
comments:
    - author: Thibaut
      author_url: "https://twitter.com/ThibautSchmidt"
      avatar: "https://www.gravatar.com/avatar/37803293d4f04796cc6a5e952310f3f3"
      body: "<p>Salut, bravo pour ton premier article, je l'ai trouvé vraiment sympa !</p><p>Je trouve qu'il donne des bases simples. Ces bases qui peuvent souvent être oubliées quand on utilise bêtement un framework (genre Symfony) qui fait plein de choses dont on a pas besoin. Du coup ton article parait un peu comme un &quot;retour aux sources&quot;. 😂</p>"
---

Ah, l'architecture d'une app iOS.

Vaste sujet qui me préoccupe depuis que j'ai commencé à créer des apps iOS en 2010 (sortie du premier iPad, de l'iPhone 4 et d'iOS 4 !).

À chaque nouvelle app se pose cette question fatidique : __quelle archi mettre en place ?__

Après tout, c'est un choix important, non ? Une fois l'architecture choisie, impossible de revenir en arrière, n'est-ce pas ?

Mais dites-moi, c'est quoi _une architecture_ ?

<!--more-->

## Architecture : définition

Prenons la [définition du Larousse](https://www.larousse.fr/dictionnaires/francais/architecture/5078) :

> Organisation des divers éléments constitutifs d'un système informatique, en vue d'optimiser la conception de l'ensemble pour un usage déterminé.

Il y a la notion d'__organisation__ ; il s'agit là d'_organiser_ son code, ses modules, ses frameworks.

L'objectif est d'__optimiser la conception de l'ensemble__ ; il faut prendre du recul sur tout son code afin de l'_optimiser_.

Dans le but de répondre à __un usage déterminé__ ; cette notion d'usage, je l'interprète d'un point de vue _fonctionnel_.

Maintenant que nous sommes d'accord sur la définition ; quelles sont les caractéristiques d'une bonne architecture ?

## Une _bonne_ architecture

Je vais reprendre chacune des notions et tenter de déterminer les caractéristiques que je juge en adéquation avec la définition.

Pour rappel, il s'agit de limiter la réflexion au code d'une app iOS. (Même si, en réalité, cette réflexion est applicable à tous logiciels.)

### Organisation

Comment déterminer que le code de mon app iOS est __bien organisé__ ?

Primo, __je trouve rapidement ce que je cherche__.

_Ex:_ je dois modifier l'écran de connexion, il doit bien exister un `LoginViewController` ou quelque chose comme ça.

Deuxio, __je ne me perds pas en cours de route__.

_Contre-Ex:_ le `LoginViewController` fait quoi exactement ? Dans `viewDidLoad` : il configure des singletons (wtf?), modifie des contraintes (wtf??), fait un appel serveur (wtf???) ; il appelle des méthodes sur une super classe pour...je suis perdu je ne comprends plus rien !

Tertio, __les dépendances ne partent pas dans tous les sens__.

_Contre-Ex:_ `LoginViewController` dépend de `ClientAPI` qui dépend de `Configuration` qui dépend de `ClientAPI`, wtf?

### Optimiser la conception de l'ensemble

Comment déterminer que la conception est optimisée ?

Primo, __je comprends facilement ce que le code fait__.

_Ex:_ `LoginViewController` a une méthode `onLoginButtonTapped()` qui appelle `behavior.login()`.

_Contre-Ex:_ `LoginViewController` a une méthode `buttonTapped(_ sender: NSObject)` qui teste si `sender == button1` et qui fait plein de trucs sur 200 lignes avec un niveau d'imbrication au-delà de toute raison et problablement un appel API caché au milieu ?

Deuxio, __je retrouve les termes métiers dans le code__.

_Ex:_ quand je parle avec les utilisateurs et utilisatrices, ils évoquent des _Recettes_ et des _Ingrédients_ ; dans le code j'ai bien les notions de `Recipe` et d'`Ingredient`.

Tertio, j'arrive à __changer facilement le code__.

_Contre-Ex:_ je modifie le login pour améliorer l'expérience utilisateur, je livre, et j'ai 36 nouveaux bugs à des endroits improbables, _whaaaat?_

### Un usage déterminé

Comment déterminer que la conception répond à un usage précis ?

Primo, il n'y a __pas de code au cas où__.

_Contre-Ex:_ je dois afficher des informations textuelles dans la v1. Je crée un `InformationsBuilder` qui accepte une dépendance implémentant le protocole `InformationsStrategy` et je crée une classe `TextualInformationsStrategy` qui implémente ce protocole.

_Autre contre-ex:_ je vais créer une DSL de configuration de style, au cas où je dois changer le thème de l'app un jour.

Deuxio, il n'y a vraiment pas de code au cas où !

Il m'est déjà arrivé de complexifier le code en essayant d'anticiper les besoins. C'est tentant et motivant de créer du code __réutilisable__. Mais dans 95% des cas c'est _too much_.

> Mieux vaut __dupliquer pour trouver la bonne abstraction__ que créer une mauvaise abstraction.

Je préfère dupliquer une ou deux fois, puis prendre du recul pour trouver comment factoriser le code, afin de créer des abstractions qui ont une réelle utilité et un véritable sens.

## Une _bonne_ conception

Une bonne architecture veut donc avant tout dire une bonne conception.

Une bonne conception respecte les critères que j'ai listés ci-dessus et que je rappelle ici :
* je trouve rapidement ce que je cherche,
* je ne me perds pas en cours de route,
* les dépendances ne partent pas dans tous les sens,
* je comprends facilement ce que le code fait,
* je retrouve les termes métiers dans le code,
* j'arrive à changer facilement le code,
* il n'y a pas de code au cas où,
* le code répond à un usage déterminé.

Je ne vais pas vous le cacher, avoir une architecture qui remplit tous ces critères __est très difficile__.

Il faut déjà réussir à bien comprendre le besoin, à déterminer précisément l'usage.

Il ne faut pas anticiper des demandes qui n'arriveront peut-être jamais.

Il faut rendre son code compréhensible par les autres humains qui vont le lire (et nous ne sommes pas tous égaux à ce niveau).

Il faut faire face aux particularités des frameworks et librairies qu'on utilise.

Autant vous dire qu'avoir juste _du premier coup_ relève du miracle !

### Faire émerger la conception

_Mais si je n'arrive pas à avoir juste du premier coup...cela veut dire que je vais devoir changer ma conception en cours de route, la faire évoluer ?_

Exactement ! C'est ce que j'appelle __faire émerger la conception__.

_Oh ! Et du coup faire émerger la conception revient à créer..._

__Une architecture émergente !__

Je pars de deux hypothèses pour justifier le fait de faire émerger l'architecture, plutôt que de la figer dans le marbre à l'avance.

1. Il est impossible d'imaginer la bonne conception du premier coup.
2. Le besoin change.

J'ai déjà détaillé le premier point ci-dessus, passons au second.

### Le besoin change

Si seulement les utilisateurs, utilisatrices, clientes & clients arrêtaient de changer tout le temps d'avis ! Cela serait beaucoup plus simple ! Nous aurions un cahier des charges figé et des spécifications fonctionnelles figées. Il nous serait alors si simple de concevoir une app qui réponde exactement à ce qui est demandé. Nous pourrions prendre le temps de bien concevoir, de faire de beaux diagrammes. Puis nous livrerions une app bien conçue et nous passerions à la suivante.

_Le rêve quoi !_

Vraiment ?

Nous savons que ce n'est __jamais__ le cas. Qui a déjà vécu cette situation, honnêtement ?

__Le besoin change !__

Pourquoi change-t-il ?

Car créer un logiciel est principalement un travail de __communication, de compréhension et d'empathie__.

Entre ce que l'utilisateur a en tête, ce qu'il explique, ce que la développeuse comprend et ce qu'elle exprime par code ; les risques de mauvaise interprétation sont légions ! _(Ajoutez quelques intermédiaires entre les deux personnes et vous multiplierez ces risques. Coucou les Product Owner & Proxy Product Owner & Proxy Proxy Proxy...)_

__Ce n'est pas forcément le besoin réel qui change, c'est notre compréhension qui évolue !__ Il nous arrive (souvent) de mal comprendre le besoin réel. Au fur et à mesure que nous créons et livrons le logiciel, nous apprenons des feedbacks ! Et nous devons refléter cette compréhension dans notre code.

## Conclusion

Bonne _architecture_ veut dire bonne _conception_.

Avoir une conception _juste_ du premier coup est impossible car _le besoin change_, notre compréhension de celui-ci change.

Il faut donc être capable de faire _évoluer_ cette conception, de la faire _émerger_.

Pour cela, nous devons nous assurer que nous ne cassons rien au passage.

_Et pour ne rien casser...on fait comment ?_

Je vous en parle dans le prochain article. 😉
