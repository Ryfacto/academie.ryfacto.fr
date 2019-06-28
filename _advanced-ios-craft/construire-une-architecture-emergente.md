---
layout: article
excerpt_separator: <!--more-->
image: /images/2019/06/growth.jpg
title: Construire une architecture émergente
description: a
date: 27/06/2019
updated_at: 27/06/2019
published: false
beta: true
writing_time: 2
ahah: 1
comments:
---

Dans [l'article précédent](la-seule-architecture-qui-compte), je te parlais de ce qu'est une architecture logicielle et de la nécessité de la faire émerger.

Pour y arriver, il faut manipuler son code comme de la __pâte à modeler__ ; car avoir une conception qui tape dans le mille du premier coup est proche de l'impossible.

Qui dit manipuler son code dit potentiellement introduire des bugs, casser des choses.

Pour s'en prémunir il n'y a pas trente-six solutions, __il faut tester__.

Dans cet article, je vais parler de plusieurs stratégies pour à la fois prévenir l'apparition de bugs mais aussi permettre de faire émerger une architecture saine et évolutive.

En somme l'objectif est toujours d'avoir la conception la plus optimale possible pour répondre au besoin présent ; sans sur-ingénierie (pas de code "au cas où") et sans sous-ingénierie (pas de duplication partout).

__Une conception aux petits oignons pour apporter de la valeur MAINTENANT.__

Voici la liste des stratégies que je vais développer :
- tester manuellement,
- laisser le compilateur tester pour nous,
- automatiser nos tests.

<!--more-->

## Tester manuellement

Cette pratique est la plus répandue.

Après avoir écrit un bout de code, tu executes ton app (avec ou sans le debugger) et tu vérifies qu'elle fonctionne. Facile non ?

> Simple comme bonjour oui !

Es-tu sûr que ce soit si simple ?

> Bah, je le fais tous les jours, ce n'est pas compliqué !

Effectivement, cette pratique n'a rien de compliqué à première vue, il suffit d'utiliser le logiciel que l'on crée.

Elle a l'avantage d'être simple à mettre en œuvre, un clic ou un raccourci clavier et le tour est joué !

Sous cette simplicité apparente se cache cependant une grande complexité.

Imagine que la fonctionnalité que tu vas tester à la main se trouve au fin fond de ton app et qu'elle nécessite de communiquer avec un autre logiciel (au hasard, un webservice !) dont tu ne maîtrises pas le comportement.

Ajoute à cela du paiement, la nécessité d'être physiquement géolocalisé dans un lieu bien précis, l'utilisation de capteurs comme le Bluetooth et tu obtiens un test manuel qui est complexe à mettre en œuvre.

Et pour le plaisir pourquoi pas aussi tester les différents cas de figures : que se passe-t-il si je suis au mauvais endroit ? Et si je n'ai pas de Bluetooth ? Et que le webservice est lent ? Ou qu'il ne répond pas ? Ou qu'il répond avec une erreur ? Ou qu'il répond avec succès mais sans les bonnes infos ?

Et maintenant dis-toi que pour éviter les regressions il faut faire tous ces tests à la main __à chaque fois que le code change !__ 😨

> Ah ouais, je n'avais pas vu ça comme ça. Mais du coup, tu fais comment ?

Je n'ai pas de recette miracle, tu as trois options :
1. tu te prends le temps de tout tester à la main tout le temps,
2. tu travailles avec une armée de testeurs et testeuses,
3. tu laisses les utilisateurs et utilisatrices finaux faire le sale boulot.

La première option est longue, trèèèès longue et franchement pas amusante ! Tu te vois, toi, tester tout ça à chaque fois que tu relances ton app ? Ce n'est pas viable.

Clairement, personne ne le fait et je le comprends parfaitement ! Je ne le fais pas non plus !

Pourtant si on veut être confiant sur ce que l'on réalise, c'est ce qu'il __faudrait faire__ !

Mais c'est bien trop énergivore et trop coûteux.

Cette option a cependant l'avantage de fournir un feedback relativement court quand on se concentre sur les tests concernant le petit bout que l'on est en train de développer. Mais pour être certain qu'on ne casse rien _à côté_ il faudrait tester la périphérie de la fonctionnalité avec une grande minutie.

La deuxième option nécessite d'avoir assez d'argent pour recruter des personnes dédiées aux tests.

Elle a l'avantage de réduire le temps de test.

Le feedback est cependant très long pour nous, développeuse ou développeur.

Attendre que l'équipe de test (parfois appelée QA pour Quality Assurance) ait fini tous les tests pour savoir si j'ai cassé quelque chose m'ennuie. Je vais commencer autre chose en attendant. Je vais devoir m'interrompre pour traiter leurs retours. Cela induit du _changement de contexte_, ce qui nuit à ma productivité et à mon plaisir de travailler.

J'ai discuté avec un lead dev qui me disait mettre à contribution toute l'entreprise pour une "journée de test". Tout le monde mettait la main à la pâte afin de vérifier que l'app fonctionnait toujours correctement. Ils faisaient cela en déroulant un plan de test qui se trouvait dans un excel. J'imagine juste le coût d'une telle pratique : immobiliser tous les services de l'entreprise (compta, com, vente, service client, etc) pendant toute une journée pour tester !

La troisième option présente l'avantage de la deuxième, à savoir réduire le temps de test. Autre avantage : on n'a pas besoin de payer nos utilisateurs et utilisatrices pour faire les tests.

Par contre, je pense que tu l'as deviné, il y a un inconvénient majeur : ce sont les utilisateurs et utilisatrices finaux qui vont trouver les problèmes, ce qui va générer de la frustration et avoir un impact négatif sur la qualité perçue de l'app avec très probablement une mauvaise note sur l'App Store.

Je ne l'ai pas encore évoqué mais toutes ces options présentent un inconvénient majeur : les tests ne sont pas fiables car le facteur humain conduit forcément à des erreurs. Il se peut très bien que tu ais oublié de tester un cas de figure, que tu n'as pas retester ce qui pour toi est censé continuer à marcher.

__Résultat des courses, non seulement les tests manuels sont longs et coûteux, mais en plus, ils ne sont pas d'une grande fiabilité ! Et pourtant c'est l'approche choisie par la plupart des entreprises que j'ai eu la chance de rencontrer.__

## Laisser le compilateur tester pour nous

Utiliser un langage comme Swift présente certains avantages.

Le premier est d'avoir du typage statique. Ce qui permet au compilateur de vérifier que le code respecte certaines règles essentielles comme le type des paramètres passées aux fonctions.

Si on sait en tirer partie, on peut éviter de nombreux bugs en utilisant correctement le système de type.

Laisse-moi te donner un petit exemple rapide.

__Une des grandes forces de Swift est notamment le nil explicite.__

En Java, si j'écris ceci :

{% highlight java %}
public class LoginBehavior {

  public void logIn(String username, String password) {
    // do something
  }
}
{% endhighlight %}

Je vais devoir faire attention aux valeurs `null` pour `username` et `password`.

En Swift, si j'écris ceci :

{% highlight swift %}
class LoginBehavior {

  func logIn(username: String, password: String) {
    // do something
  }
}
{% endhighlight %}

Je n'ai pas besoin de faire attention aux valeurs `nil` car le compilateur m'empêche de passer une valeur `nil` car c'est un type explicite (`Optional` en l'occurence) !

__Le compilateur permets d'éviter certaines catégories de bugs grâce à un puissant système de type.__

Je ne rentre pas plus dans les détails dans cet article, j'en écrirai un complet prochainement (d'ailleurs pour ne pas le louper [inscris-toi à la newsletter !](signup)).

## Automatiser les tests

Je ne te le cache pas plus longtemps (au cas où tu avais encore un doute 😂), __j'adore automatiser les tests__.

> Quelle surprise !

N'est-ce pas ? 😉

> Mais ça veut dire quoi, pour toi, automatiser les tests ?

Hum...pour résumer en une phrase, automatiser les tests c'est __"en une commande je vérifie que je n'ai rien cassé"__.

_"Une commande"_ peut être un raccourci clavier dans mon IDE (⌘U dans Xcode par exemple) ou bien un clic ou bien une commande dans le terminal (`fastlane test`).

_"Qui vérifie que je n'ai rien cassé"_ consiste à executer une suite de tests qui va exercer mon code, voir carrément simuler une intéraction utilisatrice.

> C'est tout ?

Pour la big picture, oui !

Dans les faits c'est bien plus technique que ça n'en a l'air car écrire de bons tests automatisés est un art qui demande des années de pratique.

Mais tu es au bon endroit pour ne pas avoir à passer des années pour maîtriser cet art, car je vais t'aider à éviter les pièges dans lesquels je suis tombé !

Continuons, si tu le veux bien, à rester au niveau conceptuel.

Automatiser les tests veut dire écrire du code pour tester son app ou tester son code.

> QUOI ! Mais j'ai à peine le temps d'écrire le code pour les fonctionnalités ou les correctifs ! Où vais-je trouver le temps d'écrire le code pour...les tests ?! 😩

Ça c'est parce que tu vois le "codage" comme une seule activité : écrire du code.

> Hum ?

C'est quoi coder selon toi ?

_Vas-y vas-y, je t'invite à prendre un peu de recul sur ton métier._

Pour toi, que faut-il faire au-delà d'__écrire le code__ lorsque tu...codes ?

> Je réflechis au code que je dois écrire !

Exactement, ça s'appelle __la conception__. Quoi d'autre ?

>
